import Link from "next/link";
import Image from "next/image";

interface CTAProps {
  title: string,
  text: string,
  whatsappUrl: string,
}

export default function CTA( {title, text, whatsappUrl} : CTAProps) {
  return (
    <div 
      data-aos="fade-up" 
      data-aos-offset="200" 
      data-aos-once="true"
      className="flex flex-col sm:flex-row items-center gap-6 bg-light-gray2/60 rounded-2xl p-6 sm:p-8"
    >
      <div className="relative overflow-hidden h-[60px] w-[60px] md:h-[80px] md:w-[80px] grid place-items-center rounded-full bg-blue1 shrink-0">
        <Image src="/icons/handshake.svg" alt="Ícone aperto de mãos" loading="eager" fill sizes="80px" className="object-cover object-center p-3"/>
      </div>

      <div className="flex-1 text-center text-[16px]/[1.6] sm:text-left">
        <h2 className="text-lg text-blue1 font-bold tracking-wide pb-2">{title}</h2>
        <p className="text-dark-gray/90">{text}</p>
      </div>

      <Link href={whatsappUrl} target="_blank"
        className="bg-blue1 text-background border-blue1 text-center hover:bg-light-gray2/60 hover:text-blue1 hover:shadow-lg text-[12px] font-semibold 
                    px-5 py-2.5 border-2 rounded-lg duration-300 hover:-translate-y-[2px] transition-all whitespace-nowrap shrink-0"
      >
        Fale conosco
      </Link>
    </div>
  );
}