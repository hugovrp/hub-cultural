"use client"

import Image from "next/image";
import { client } from '@/lib/sanity';
import Banner from "@/components/Banner";
import Loading from "@/components/Loading";
import { useState, useEffect, useMemo } from "react";
import PdfCard  from "@/components/biblioteca/pdf-card";
import Pagination from "@/components/biblioteca/pagination";

export interface PdfProps {
  image: string;
  title: string;
  description: string;
  category: string;
  file: string;
}

async function getLibraryPage() {
  return await client.fetch(`
    *[_type == "library"][0]{ 
      ...,
      "pdfList": pdfList[]{
        ...,
        "image": image.asset->url,
        "file": file.asset->url
      }
    }
  `);
}

function sanitizeSearch(value: string) {
  return value
    .replace(/[<>]/g, "")
    .replace(/[{}]/g, "")
    .trimStart();
}

export default function LibraryPage() {
  const ITEMS_PER_PAGE = 12;
  const DEFAULT_CATEGORY = "Todos";

  const [data, setData] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(DEFAULT_CATEGORY);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect( () => {
    async function fetchData() {
      try {
        const result = await getLibraryPage();
        setData(result);
      } catch {
        console.error("Erro ao buscar dados");
      }
    }
    fetchData();
  }, []);

  // Garante que se o pdfList não existir no Sanity, ele não quebre o map
  const materials = data?.pdfList || [];

  const filteredMaterials = useMemo( () => {
    const searchValue = search.toLowerCase();

    return materials.filter( (material : PdfProps) => {
      if (!material) return false;

      const title = (material.title || "").toLowerCase();
      const description = (material.description || "").toLowerCase();
      const category = (material.category || "").toLowerCase();

      const matchesSearch =
        title.includes(searchValue) ||
        description.includes(searchValue) ||
        category.includes(searchValue);

      const matchesCategory =
        selectedCategory === DEFAULT_CATEGORY ||
        material.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory, materials]);

  const totalPages = Math.ceil(filteredMaterials.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentMaterials = filteredMaterials.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const categories = useMemo(() => {
    const counts: Record<string, number> = {};

    materials.forEach( (material : PdfProps) => {
      if (material && material.category) {
        counts[material.category] = (counts[material.category] || 0) + 1;
      }
    });

    return [
      {
        name: DEFAULT_CATEGORY,
        count: materials.length,
      },

      ...Object.entries(counts).map(([name, count]) => ({
        name,
        count,
      })),
    ];
  }, [materials]);

  if (!data) return <Loading/>;

  return (
    <div>
      <Banner title={data.bannerTitle} subtitle={data.bannerSubtitle} />

      <main 
        data-aos="fade-up" 
        data-aos-once="true"
        className="container mx-auto py-10 px-6"
      >
        {/* Input de pesquisa */}
        <div className="flex h-[56px] items-center gap-3 rounded-2xl border border-blue3 bg-background px-4 py-3 shadow-lg transition-all focus-within:border-blue3 focus-within:ring-4 focus-within:ring-blue3/20">
          <div className="relative h-[22px] w-[22px] shrink-0">
            <Image
              src={"/icons/search.svg"}
              alt="Ícone Lupa"
              loading="eager"
              fill
              sizes="22px"
              className="object-contain opacity-80"
            />
          </div>

          <input
            type="text"
            value={search}
            maxLength={50}
            autoComplete="off"
            onChange={(e) => {
              const cleanValue = sanitizeSearch(e.target.value);

              setSearch(cleanValue);
              setCurrentPage(1);
            }}
            placeholder="Buscar nomes, categorias ou palavras-chave..."
            className="w-full bg-transparent outline-none text-[15px] placeholder:text-gray/90"
          />
        </div>

        {/* Categorias */}
        <div className={`font-title mt-6 flex gap-3 overflow-x-auto pb-2 scrollbar-hide ${ currentMaterials.length === 0 ? "hidden" : ""}`}>
          {categories.map( (category) => (
            <button
              key={category.name}
              onClick={ () => {
                setSelectedCategory(category.name);
                setCurrentPage(1);
              }}
              className={`
                  whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-all
                  ${
                    selectedCategory === category.name
                      ? "bg-blue1 text-background border-blue1 font-semibold"
                      : "border-light-gray2 hover:border-blue1 hover:text-blue1"
                  }
                `}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        <div className={`my-6 ${ currentMaterials.length === 0 ? "hidden" : ""}`}>
          <p className="text-sm text-dark-gray">
            Mostrando{" "}
            <span className="font-semibold">
              {currentMaterials.length}
            </span>{" "}
            de{" "}
            <span className="font-semibold">
              {filteredMaterials.length}
            </span>{" "}
            materiais.
          </p>
        </div>

        {/* Conteúdo - Cards PDFs */}
        {currentMaterials.length === 0 ? (
          <div className="flex justify-center mt-10">
            <p className="text-blue1 text-2xl font-bold">Nenhum material encontrado.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {currentMaterials.map( (material : PdfProps, index : number) => {
              const downloadUrl = material.file ? `${material.file}?dl=${encodeURIComponent(material.title)}.pdf` : "#";
            
              return ( <PdfCard index={index} material={material} downloadUrl={downloadUrl} key={index}/> )
            })}
          </div>
        )}

        <Pagination totalPages={totalPages} currentMaterials={currentMaterials}/>
      </main>
    </div>
  );
}