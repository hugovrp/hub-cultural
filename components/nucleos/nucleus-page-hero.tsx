import Image from "next/image";

interface StatsProps {
  value: string,
  label: string,
}

interface HeroProps {
  image: string,
  title: string,
  text: string,
  hexadecimal: string,
  stats: StatsProps[];
}

export default function NucleusPageHero( {image, title, text, hexadecimal, stats} : HeroProps ) {
  return (
    <div 
      data-aos="fade-up" 
      data-aos-once="true"
      className="relative overflow-hidden shadow"
    >
      <div className="absolute inset-0 bg-[url('/banner-background.png')] bg-cover bg-center" />

      <div className="absolute inset-0 bg-green1/60" style={{ backgroundColor: `${hexadecimal}99` }}/>

      <div className="relative z-10 container mx-auto px-6 py-20">
        <div 
          data-aos="fade-up" 
          data-aos-once="true"
          className="flex flex-col items-center text-center gap-6"
        >
          <div className="relative bg-background rounded-xl px-6 py-4 shadow-lg w-[280px] h-[130px]">
            <Image
              src={image}
              alt={`Logo ${title}`}
              loading="eager"
              fill 
              sizes="280px"
              className="object-contain p-4"
            />
          </div>

          <div>
            <h1 className="text-background text-4xl font-bold mt-2">
              {title}
            </h1>

            <p className="text-light-gray1 mt-4 max-w-2xl text-lg break-normal">
              {text}
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mt-4">
            {stats.map( (stat, i) => (
              <div 
                key={i}
                className="bg-background/10 backdrop-blur-sm rounded-xl px-6 py-4 border border-background/10"
              >
                <p className="text-3xl font-bold text-background">{stat.value}</p>
                <span className="text-sm text-background font-semibold">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}