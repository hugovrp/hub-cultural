import Image from "next/image";

interface ResponsibleCardProps{
  num: number,
  image: string,
  name: string,
  position: string,
}

export default function ResponsibleCard( {num, image, name, position} : ResponsibleCardProps ) {
  return (
    <div 
      data-aos="fade-right" 
      data-aos-offset="200"
      data-aos-once="true"
      key={num} 
      className="flex flex-col items-center justify-start mt-10"
    >
      <div className="relative overflow-hidden h-[250px] w-[250px] grid place-items-center rounded-full bg-blue1">
        <Image src={image} alt={`Foto do responsável: ` + name} loading="eager" fill sizes="250px" className="object-cover object-center"/>
      </div>
      <h3 className="text-[18px] text-blue1 font-bold mt-2">{name}</h3>
      <h4 className="text-[18px] text-blue2 font-medium tracking-wider max-w-[300px] break-words">{position}</h4>
    </div>
  );
}