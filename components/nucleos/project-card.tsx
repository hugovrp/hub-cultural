import Image from "next/image";
import { ProjectProps } from "@/app/nucleos/[slug]/page";

interface CardProps {
  project: ProjectProps;
  onOpen: () => void;
}

export default function ProjectCard( { project, onOpen } : CardProps ) {
  return (
    <div 
      data-aos="fade-up" 
      data-aos-once="true"
      className="group flex flex-col overflow-hidden rounded-2xl bg-background border border-light-gray2 shadow-md 
                 hover:shadow-xl duration-300 transition-all hover:-translate-y-2"
    >

      <div className="flex items-center justify-center h-40 bg-light-gray2/20 border-b border-light-gray2">
        <div className="relative w-full h-full overflow-hidden">
          {project.image ? (
            <Image
              src={project.image}
              alt={`Logo ${project.title}`}
              fill
              sizes="240px"
              className="object-cover duration-300 transition-transform group-hover:scale-105"
            />
            ) : (
              <div className="h-full w-full bg-gray/20 flex items-center justify-center text-sm text-gray">Sem Imagem</div>
            )
          }
        </div>
      </div>

      <div 
        data-aos="fade-up" 
        data-aos-once="true"
        className="flex flex-1 flex-col p-6 gap-3"
      >
        <h3 className="text-2xl font-bold text-dark-blue">
          {project.title}
        </h3>

        <p className="text-[16px]/[1.6] text-gray flex-1 line-clamp-3 ">
          {project.description}
        </p>

        <button
          onClick={onOpen}
          className="mt-2 inline-flex items-center justify-center gap-2 text-[13px] font-semibold text-background px-4 py-2 rounded-lg duration-300 transition-all 
                      hover:opacity-80 hover:gap-3 w-fit bg-blue1 cursor-pointer"
        >
          Saiba mais
          <span className="duration-300 group-hover:translate-x-1">→</span>
        </button>
      </div>
    </div>
  );
}