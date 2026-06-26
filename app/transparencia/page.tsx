"use client"

import { client } from '@/lib/sanity';
import Banner from "@/components/Banner";
import Loading from '@/components/Loading';
import { useState, useEffect } from "react";
import AccordionItem from "@/components/transparencia/accordion-item";

interface PublicProps {
  infoTitle: string,
  info: string,
}

async function getTransparencyPage() {
  return await client.fetch(`*[_type == "transparency"][0]{ ... }`);
}

export default function TransparencyPage() {
  const [data, setData] = useState<any>(null);

  useEffect( () => {
    async function fetchData() {
      try {
        const result = await getTransparencyPage();
        setData(result);
      } catch {
          console.error("Erro ao buscar dados");
      }
    }
    fetchData();
  }, []);

  if (!data) return <Loading/>;

  return (
    <div>
      <Banner title={data.bannerTitle} subtitle={data.bannerSubtitle} />

      <main 
        data-aos="fade-up" 
        data-aos-once="true"
        className="p-6 sm:p-8 flex flex-col container mx-auto xl:w-[90%]"
      >
        <h1 className="text-[24px] sm:text-[32px] md:text-[48px] text-dark-blue font-bold tracking-widest pr-4">
         {data.title}
        </h1>
        <p className="pt-2 pb-16 text-[16px]/[1.6] break-normal sm:pr-4 md:w-[90%] lg:w-[80%]">
          {data.text}
        </p>

        <div className="flex flex-col gap-4">
          {data.publicInfo?.map((item: PublicProps, i: number) => (
            <AccordionItem num={++i} title={item.infoTitle} key={i}>
              <p className="whitespace-pre-line">{item.info}</p>
            </AccordionItem>
          ))}
        </div>
      </main>
    </div>
  );
}