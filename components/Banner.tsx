"use client"

interface BannerProps {
    title: string;
    subtitle: string;
}

export default function Banner( { title, subtitle } : BannerProps ) {
  return(
    <div 
      data-aos="fade-down" 
      data-aos-once="true"
      className="relative overflow-hidden py-10"
    >
      <div className="absolute inset-0 bg-[url('/banner-background.png')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-black/20" />

      <div 
        data-aos="fade-down" 
        data-aos-once="true"
        className="relative z-10 text-center text-background"
      >
        <h1 className="text-[28px] sm:text-[38px] tracking-wider font-bold mb-2 break-normal px-1">{title}</h1>
        <p className="font-title text-[16px] px-10 md:px-20 mb-4">{subtitle}</p>
      </div>
    </div>
  );
}