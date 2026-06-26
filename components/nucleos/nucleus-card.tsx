import Link from "next/link";
import Image from "next/image";
import { NucleusCardProps } from "@/app/nucleos/page";

export default function NucleusCard( { image, title, description, slug, hexadecimal } : NucleusCardProps ) {
  return (
    <div 
      data-aos="fade-up" 
      data-aos-once="true"
      className="group flex flex-col overflow-hidden rounded-2xl bg-background border border-light-gray2 shadow-md 
                 hover:shadow-xl duration-300 transition-all hover:-translate-y-2"
    >
      {/* Faixa do topo */}
      <div className="h-1.5" style={{ backgroundColor: hexadecimal }}></div>

      <div className="relative flex items-center justify-center h-40 bg-light-gray2/20 border-b border-light-gray2"> 
        <div className="relative w-full h-full max-w-[240px]"> 
          {image ? (
            <Image
              src={image}
              alt={`Logo ${title}`}
              fill
              sizes="240px"
              className="object-contain duration-300 transition-transform group-hover:scale-105 p-2"
            />
            ) : (
              <div className="h-full w-full bg-gray/20 flex items-center justify-center text-sm text-gray">Sem Imagem</div>
            )
          }
        </div> 
      </div>

      <div 
        className="flex flex-1 flex-col p-6 gap-3"
      >
        <h3 
          style={{ color: hexadecimal }}
          className="text-2xl font-bold"
        >
          {title}
        </h3>

        <p className="text-[16px]/[1.6] text-gray flex-1 line-clamp-3 ">
          {description}
        </p>

        <Link
          href={`/nucleos/${slug.current}`}
          style={{ backgroundColor: hexadecimal }}
          className="mt-2 inline-flex items-center justify-center gap-2 text-[13px] font-semibold text-background px-4 py-2 rounded-lg duration-300 transition-all 
                      hover:opacity-80 hover:gap-3 w-fit"
        >
          Saiba mais
          <span className="duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </div>
  );
}