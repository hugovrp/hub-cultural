"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { ProjectProps, GalleryItem } from "@/app/nucleos/[slug]/page";

interface ModalProps {
  nucleoTitle: string;
  project: ProjectProps;
  whatsapp: string;
  onClose: () => void;
}

interface ImpactItem {
  value: string;
  label: string;
}


export default function ProjectModal( { nucleoTitle, project, whatsapp, onClose}: ModalProps) {
  const gallery = (project.content?.gallery || []).filter((item) => {
    if (item._type === "galleryImage") 
      return item.image && item.image.trim() !== "";

    if (item._type === "galleryVideo") 
      return item.video && item.video.trim() !== "";

    return false;
  });
  const hasGallery = gallery.length > 0;
  const displayGallery: GalleryItem[] = hasGallery
    ? gallery
    : [
        {
          _type: "galleryImage",
          image: project.image,
          alt: project.title,
        },
      ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentItem = displayGallery[currentIndex];

  const message = `Olá! Vi o site da Ivert e me interessei no projeto '${project.title}', como faço para participar?`;
  const whatsappUrl = `/`;

  function nextSlide() {
    setCurrentIndex((prev) =>
      prev === displayGallery.length - 1 ? 0 : prev + 1
    );
  }

  function prevSlide() {
    setCurrentIndex((prev) =>
      prev === 0 ? displayGallery.length - 1 : prev - 1
    );
  }

  const slideStyle = "absolute -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-black/50 text-white hover:bg-black/60 transition-all duration-300";

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
    >
      <main 
        data-aos="fade-right" 
        data-aos-once="true"
        onClick={(e) => e.stopPropagation()}
        className="grid sm:grid-cols-2 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl bg-background p-3 sm:p-6 shadow-xl"
      >
        <div 
          data-aos="fade-right" 
          data-aos-once="true"
          className="relative min-w-0"
        >
          <button
            onClick={onClose}
            className="sm:hidden absolute z-2 right-0 top-[-16] text-3xl font-bold text-gray hover:text-red-500 cursor-pointer"
          >
            ×
          </button>

          <div
            className="absolute left-2 top-0 sm:top-2 z-20 flex items-center gap-2 rounded-full
                       sm:border sm:border-white/20 sm:bg-black/35 sm:backdrop-blur-md sm:px-3 sm:py-1.5 sm:shadow-lg"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue1"/>

            <p className="text-[10px] font-title font-semibold uppercase tracking-[0.15em] text-blue1 sm:text-white">
              {nucleoTitle}
            </p>
          </div>

          <div className="relative h-[180px] sm:h-[360px] w-full overflow-hidden rounded-xl border border-light-gray1 mt-6 sm:mt-0">
            {currentItem?._type === "galleryImage" ? (
              <Image
                src={currentItem.image}
                alt={currentItem.alt || project.title}
                fill
                sizes="600px"
                className="object-cover transition-all duration-300"
              />
            ) : (
              <video
                src={currentItem?.video}
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            )}

            {hasGallery && displayGallery.length > 1 && (
              <button
                onClick={prevSlide}
                className={`left-3 top-1/2 ${slideStyle}`}
              >
                <ChevronLeft size={16} />
              </button>
            )}

            {hasGallery && displayGallery.length > 1 && (
              <button
                onClick={nextSlide}
                className={`right-3 top-1/2 ${slideStyle}`}
              >
                <ChevronRight size={16} />
              </button>
            )}
          </div>

          {hasGallery && displayGallery.length > 1 && (
            <div className="flex gap-2 mt-3 overflow-x-auto pb-1">

              {displayGallery.map((item: GalleryItem, index: number) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`relative min-w-[80px] h-[65px] overflow-hidden rounded-lg border-2 transition-all duration-300
                              ${
                                currentIndex === index
                                  ? "border-blue1"
                                  : "border-transparent opacity-70 hover:opacity-100"
                              }
                            `}
                >

                  {/* THUMB IMAGEM */}
                  {item._type === "galleryImage" ? (
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  ) : (
                    /* THUMB VÍDEO */
                    <div className="relative w-full h-full">

                      <video
                        src={item.video}
                        className="absolute inset-0 w-full h-full object-cover"
                      />

                      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <Play
                          size={18}
                          className="text-white fill-white"
                        />
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <div 
          data-aos="fade-up" 
          data-aos-once="true"
          className="relative min-w-0"
        >
          <button
            onClick={onClose}
            className="hidden sm:block absolute right-0 top-[-16] text-3xl font-bold text-gray hover:text-red-500 cursor-pointer"
          >
            ×
          </button>

          <div className="px-6 py-2 flex flex-col h-full">
            <h2 className="text-3xl font-bold text-dark-blue mb-2 break-normal">
              {project.content.aboutTitle}
            </h2>
            <span className="block content-[''] w-[40px] h-[2px] bg-blue2 mb-4"/>

            <p className="mb-8 text-[16px]/[1.6] break-normal text-dark-gray/80">
              {project.content.about}
            </p>

            <h4 className="text-lg font-bold text-dark-blue mb-1 break-normal">
              {project.content.impactTitle}
            </h4>
            <span className="block content-[''] w-[20px] h-[2px] bg-blue2 mb-4"/>

            <ul className="text-sm/[1.5] list-disc ml-5 marker:text-blue1 break-normal">
              <div className="flex flex-col items-left">
                {project.content.listImpact?.map( (i :ImpactItem, index :number) => (
                  <li key={index}><strong className="text-blue1">{i.value}:{" "}</strong>{i.label}</li>
                ))}
              </div>
            </ul>

            <div className="flex-1" />

            <Link
              href={whatsappUrl} target="_blank"
              className="bottom-0 inline-flex items-center justify-center gap-2 mt-8 w-full rounded-xl bg-blue1 px-5 py-3 text-sm 
                         font-semibold text-background transition-all duration-300 hover:opacity-90 hover:gap-3 shadow-lg"
            >
              Participar do Projeto
              <span className="duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}