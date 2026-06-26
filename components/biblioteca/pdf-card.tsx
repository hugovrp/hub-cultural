import Image from "next/image";
import { PdfProps } from "@/app/biblioteca/page";

interface PdfCardProps {
  index: number,
  material: PdfProps,
  downloadUrl: string,
}

export default function PdfCard( {index, material, downloadUrl} : PdfCardProps ) {
  return(
    <div 
      key={index} 
      data-aos="fade-up" 
      data-aos-once="true"
      className="flex flex-col overflow-hidden rounded-2xl border border-light-gray2 shadow-md"
    >
      <div className="flex items-center justify-center h-40 bg-light-gray2/20 border-b border-light-gray2">
        <div className="relative w-full h-full overflow-hidden">
          {material.image ? (
            <Image
              src={material.image}
              alt={material.title}
              fill
              sizes="240px"
              className="object-cover duration-300 transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-gray/20 flex items-center justify-center text-sm text-gray">Sem Imagem</div>
          )}

          <span className="font-title absolute right-2 top-2 rounded-md bg-blue1 px-2 py-1 text-xs font-bold text-background shadow">
            PDF
          </span>
        </div>
      </div>

      <div 
        className="flex flex-1 flex-col p-4"
      >
        {material.category ? (
          <span className="inline-block w-fit rounded-full bg-light-blue1/70 px-3 py-1 text-xs font-semibold text-blue1 mb-3">
            {material.category}
          </span>
        ) : (
          <span className="inline-block w-fit py-1 text-xs font-semibold text-red-500 mb-3">
            Sem categoria
          </span>
        )}

        <h2 className="text-xl font-bold text-dark-blue mb-2 line-clamp-2">{material.title}</h2>
        <p className="text-sm text-gray line-clamp-2 mb-2">{material.description}</p>

        <div className="mt-auto flex items-center gap-2 pt-4">
          <a 
            href={material.file}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-background bg-blue1 
                      border border-blue1 transition-transform hover:-translate-y-[2px]"
          >
            <div className="relative h-[18px] w-[18px] shrink-0"> 
              <Image
                src={"/icons/view.svg"}
                alt="Ícone Visualizar"
                loading="eager"
                fill
                sizes="18px"
                className="object-contain"
              />
            </div> 
            <span className="hidden sm:inline">Visualizar</span>
          </a>

          <a 
            href={downloadUrl}
            download
            className="flex-1 flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-blue1 
                      border border-blue1 transition-transform hover:-translate-y-[2px] hover:shadow-lg"
          >
            <div className="relative h-[18px] w-[18px] shrink-0"> 
              <Image
                src={"/icons/download.svg"}
                alt="Ícone Download"
                loading="eager"
                fill
                sizes="18px"
                className="object-contain"
              />
            </div> 
            <span className="hidden sm:inline">Baixar</span> 
          </a>
        </div>
      </div>
    </div>
  );
}