"use client";

import Image from "next/image";
import { client } from '@/lib/sanity';
import CTA from "@/components/nucleos/cta";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import ProjectCard from "@/components/nucleos/project-card";
import ProjectModal from "@/components/nucleos/project-modal";
import NucleusPageHero from "@/components/nucleos/nucleus-page-hero";

export interface GalleryImage { 
  _type: "galleryImage"; 
  image: string; 
  alt?: string; 
}

export interface GalleryVideo { 
  _type: "galleryVideo"; 
  video: string; 
} 

export type GalleryItem = GalleryImage | GalleryVideo;

export interface ProjectProps {
  image: string;
  title: string;
  description: string;
  content: { 
    gallery?: GalleryItem[]; 
    aboutTitle: string; 
    about: string; 
    impactTitle: string;
    listImpact: { 
      value: string; 
      label: string; 
    }[]; 
    whatsapp: string; 
  };
}

interface PageProps { 
  params: Promise<{ 
    slug: string; 
  }>; 
}

async function getNucleus(slug : string) {
  return await client.fetch(` 
    *[_type == "nucleus" && slug.current == $slug][0] { 
      ...,
      "image": image.asset->url,
      content {
        ...,
        "aboutImage": aboutImage.asset->url,
      } 
    } 
  `, { slug });
}

async function getProjects(slug : string) {
  return await client.fetch(` 
    *[_type == "project" && nucleus->slug.current == $slug] { 
      ...,
      "image": image.asset->url,
      content {
        ...,
        "aboutImage": aboutImage.asset->url,
        "gallery": gallery[] { 
          _type, 

          _type == "galleryImage" => { 
            "image": image.asset->url, 
            alt 
          }, 
          
          _type == "galleryVideo" => { 
            "video": video.asset->url 
          } 
        }
      }
    }`, { slug });
}

async function getWhatsapp() {
  return await client.fetch(`*[_type == "settings"][0]{ whatsapp, }`);
}


export default function NucleoPage({ params }: PageProps) {
  const router = useRouter();

  const [data, setData] = useState<any>(null);
  const [whatsapp, setWhatsapp] = useState<any>(null);
  const [projects, setProjects] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<ProjectProps | null>(null);

  useEffect(() => {
    if (selectedProject) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [selectedProject]);

  useEffect( () => {
    async function fetchData() {
      try {
        const { slug } = await params;
        const result = await getNucleus(slug);
        const resultWhats = await getWhatsapp();

        if (!result) {
          router.replace("/not-found");
          return;
        }

        const resultProjects = await getProjects(slug);

        setData(result);
        setWhatsapp(resultWhats.whatsapp);
        setProjects(resultProjects);
      } catch {
        router.replace("/not-found");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <Loading/>;
  if (!data) return null;

  const content = data?.content || {};
  const whatsappUrl = `/`;

  return (
    <div>
      <NucleusPageHero 
        image={data.image}
        title={data.title}
        text={data.description}
        hexadecimal={data.hexadecimal}
        stats={content.stats}
      />

      <main className="container mx-auto p-6 sm:p-8 md:px-12">
        <section 
          data-aos="fade-up" 
          data-aos-offset="200" 
          data-aos-once="true"
          className="py-6 mb-10 grid grid-cols-1 md:gap-10 md:grid-cols-2 lg:items-center"
        >
          <div
            data-aos="fade-up" 
            data-aos-once="true"
          >
            <h1 className="text-3xl text-dark-blue tracking-wide font-bold pb-4">{content.aboutTitle}</h1>
            <div className="after:content-[''] after:block after:h-[2px] after:w-[40px] after:bg-blue1 after:bottom-0 after:left-0 after:transisition-all after:duration-300 mb-4">
              <h2 className="text-blue1 text-[18px] tracking-wide pb-2 font-semibold">{content.aboutSubtitle}</h2>
            </div>
            <p className="text-[18px]/[1.5] pb-4 whitespace-pre-line">
              {content.about}
            </p>
          </div>

          <div 
            className="hidden md:flex justify-center"
            data-aos="fade-up" 
            data-aos-once="true"
          >
            <div className="relative w-[400px] h-[350px]">
              <Image src={content.aboutImage} alt="Sobre Imagem" fill sizes="350px" rel="preload"
                     className="object-cover object-center rounded-lg" 
              />
            </div>
          </div>
        </section>

        <section 
          data-aos="fade-up" 
          data-aos-offset="200" 
          data-aos-once="true"
          className="flex flex-col xl:w-[90%] gap-10 mb-10"
        >
          <div className="flex flex-col text-center items-center justify-center gap-4">
            <h2 className="text-[36px] font-semibold text-dark-blue">{content.projectsTitle}</h2>
            <span className="hidden sm:block content-[''] w-[60px] h-[2px] bg-blue1" />
            <p className="font-medium text-[16px] md:text-[18px] w-[90%] mb-6">
              {content.projectsPhrase}
            </p>
          </div>
        
            {projects.length === 0 ? (
                <div className="flex justify-center mt-6 mb-12">
                  <p className="text-2xl font-bold text-blue1">Estamos preparando novos projetos para este núcleo. Volte em breve!</p>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-3">
                  {projects.map( (project :ProjectProps, index :number) => {
                    return( 
                      <ProjectCard 
                        key={index} 
                        project={project}
                        onOpen={() => setSelectedProject(project)}
                      /> 
                    );
                  })}
                </div>
              )
            }
        </section>
        
        <CTA 
          title={content.talkTitle} 
          text={content.talkText} 
          whatsappUrl={whatsappUrl}
        />
      </main>

      {/* Abre o modal do projeto escolhido. */}
      {selectedProject && (
        <ProjectModal
          nucleoTitle={data.title}
          project={selectedProject}
          whatsapp={whatsapp}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}