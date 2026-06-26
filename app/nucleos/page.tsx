import { client } from '@/lib/sanity';
import Banner from "@/components/Banner";
import CTA from "@/components/nucleos/cta";
import NucleusCard from "@/components/nucleos/nucleus-card";

export interface NucleusCardProps {
  image: string;
  title: string;
  description: string;
  slug: { current: string; };
  hexadecimal: string;
}

async function getNucleosPage() {
  return await client.fetch(` *[_type == "nucleos"][0] { ... } `);
}

async function getNucleus() {
  return await client.fetch(` 
    *[_type == "nucleus"] { 
      "image": image.asset->url,
      title,
      description,
      slug,
      hexadecimal,
    } 
  `);
}

async function getWhatsapp() {
  return await client.fetch(`*[_type == "settings"][0]{ whatsapp, }`);
}

export default async function NucleusPage() {
  const data = await getNucleosPage();
  const nucleus = await getNucleus();
  const { whatsapp } = await getWhatsapp();
  const whatsappUrl = `/`;

  return (
    <div>
      <Banner title={data.bannerTitle} subtitle={data.bannerSubtitle} />

      <main className="p-6 sm:p-8 flex flex-col container mx-auto xl:w-[90%] gap-10">
        <div 
          data-aos="fade-up" 
          data-aos-once="true"
          className="flex flex-col items-center text-center gap-4"
        >
          <h2 className="text-lg text-dark-blue font-bold">
            {data.title}
          </h2>
          <p className="w-[90%] lg:w-[70%] text-[16px]/[1.6]">
            {data.text}
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          {nucleus
            .sort( ( a : NucleusCardProps, b : NucleusCardProps) => a.title.localeCompare(b.title, 'pt-BR'))
            .map( (nucleo : NucleusCardProps, i: number) => (
              <NucleusCard key={i} image={nucleo.image} title={nucleo.title} description={nucleo.description} slug={nucleo.slug} hexadecimal={nucleo.hexadecimal} />
            ))
          }
        </div>

        <CTA title={data.talkTitle} text={data.talkText} whatsappUrl={whatsappUrl}/>
      </main>
    </div>
  );
}