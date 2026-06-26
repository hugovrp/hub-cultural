import Link from "next/link";
import Image from "next/image";
import { client } from '@/lib/sanity';
import Banner from "@/components/Banner";
import ResponsibleCard from "@/components/sobre/responsible-card";

interface ActivitiesProps {
  value: string;
  label: string;
}

interface ResponsibleProps {
  image: string,
  name: string;
  position: string;
}

async function getAboutPage() {
  return await client.fetch(`
    *[_type == "about"][0]{ 
      ...,
      "heroImage": heroImage.asset->url,
      "imageCS": imageCS.asset->url,
      "responsible": responsible[]{
        ...,
        "image": image.asset->url
      }
    }
  `);
}

async function getWhatsapp() {
  return await client.fetch(`*[_type == "settings"][0]{ whatsapp, }`);
}

export default async function AboutPage() {
  const data = await getAboutPage();
  const { whatsapp } = await getWhatsapp();
  const whatsappUrl = `/`;
  const whatsappUrlCS = `/`;

  return (
    <div>
      <Banner title={data.bannerTitle} subtitle={data.bannerSubtitle} />

      <main className="container mx-auto py-10 px-6 grid grid-cols-1 lg:px-10 md:gap-10 md:grid-cols-2 md:pl-0 lg:items-center">
        <div 
          data-aos="fade-up" 
          data-aos-once="true"
          className="hidden md:flex justify-center"
        >
          <Image src={data.heroImage} alt="Sobre Imagem" width={400} height={400} priority
                className="object-cover object-center w-full max-w-md h-auto rounded-lg" 
          />
        </div>

        <div
          data-aos="fade-up" 
          data-aos-once="true"
        >
          <h1 className="text-3xl text-dark-blue tracking-wide font-bold pb-4">{data.title}</h1>
          <div className="after:content-[''] after:block after:h-[2px] after:w-[40px] after:bg-blue1 after:bottom-0 after:left-0 after:transisition-all after:duration-300 mb-4">
            <h2 className="text-blue1 text-[18px] tracking-wide pb-2 font-semibold">{data.subtitle}</h2>
          </div>
          <p className="text-[18px]/[1.5] pb-4 whitespace-pre-line">
            {data.mainText}
          </p>
        </div>
      </main>

      <section className="container mx-auto px-6 pb-8 gap-10 grid items-start grid-cols-1 md:grid-cols-2 md:gap-20 md:py-8 md:w-[90%]">
        <div
          data-aos="fade-up" 
          data-aos-offset="200" 
          data-aos-once="true"
        >
          <div className="after:content-[''] after:block after:h-[2px] after:w-[40px] after:bg-blue1 after:bottom-0 after:left-0 after:transisition-all after:duration-300 mb-4">
            <h1 className="text-[22px] text-dark-blue font-semibold pb-1">O que fazemos</h1>
          </div>
          <p className="text-[18px]/[1.5]">
            {data.textFazemos}
          </p>
        </div>
        
        <div
          data-aos="fade-up" 
          data-aos-offset="200" 
          data-aos-once="true"
        >
          <div className="after:content-[''] after:block after:h-[2px] after:w-[40px] after:bg-blue1 after:bottom-0 after:left-0 after:transisition-all after:duration-300 mb-4">
            <h1 className="text-[22px] text-dark-blue font-semibold pb-1">Como atuamos</h1>
          </div>
          <ul className="text-[18px]/[1.5] list-disc ml-5 marker:text-blue2">
            {data.listActivities?.map((l: ActivitiesProps, i: number) => (
              <div key={i} className="flex flex-col items-left">
                <li><strong>{l.value}:</strong> {l.label}</li>
              </div>
            ))}
          </ul>
        </div>
      </section>

      <section 
        data-aos="fade-up" 
        data-aos-offset="200" 
        data-aos-once="true"
        className="py-12 my-4 bg-dark-blue text-center text-light-gray1 shadow-lg"
      >
        <h2 className="text-[20px] font-bold mb-6">{data.invitingBannerSubtitle}</h2>
        <Link href={whatsappUrl} target="_blank"
           className="bg-dark-blue text-light-gray1/90 border-light-gray1/90 hover:bg-light-gray1/90 hover:text-dark-blue hover:shadow-lg text-[12px] font-semibold md:text-sm 
                      px-5 py-2.5 border-2 rounded-md duration-300 hover:-translate-y-[2px] transition-all"
        >
          {data.buttonText}
        </Link>
      </section>

      <section className="container mx-auto py-10 px-6 grid grid-cols-1 gap-10 md:w-[90%] lg:grid-cols-2 lg:items-center lg:gap-4">
        <div
          data-aos="fade-up" 
          data-aos-offset="200" 
          data-aos-once="true"
        >
          <h1 className="text-3xl text-dark-blue font-bold pb-4">{data.titleCS}</h1>
          <div className="after:content-[''] after:block after:h-[2px] after:w-[40px] after:bg-blue1 after:bottom-0 after:left-0 after:transisition-all after:duration-300 mb-4">
            <h2 className="text-blue1 text-[18h2x] pb-2 font-semibold">{data.subtitleCS}</h2>
          </div>
          <p className="text-[18px]/[1.5] pb-8">
            {data.textCS}
          </p>
          <div className="text-center md:text-left">
            <Link href={whatsappUrlCS} target="_blank"
                className="bg-blue1 text-background border-blue1 hover:bg-background hover:text-blue1 hover:shadow-lg text-[12px] font-semibold md:text-sm 
                px-5 py-2.5 border-2 rounded-md duration-300 hover:-translate-y-[2px] transition-all"
            >
              {data.buttonTextCS}
            </Link> 
          </div>
        </div>

        <div 
          data-aos="fade-up" 
          data-aos-offset="200" 
          data-aos-once="true"
          className="flex justify-center relative min-h-[300px]"
        >
          <Image src={data.imageCS} alt="Imagem Casa Verde" width={400} height={400} priority className="object-cover object-right w-full lg:max-w-lg h-auto rounded-lg"/>
        </div>
      </section>

      <section className="container mx-auto p-10 text-center mb-10">
        <h1 
          data-aos="fade-right" 
          data-aos-offset="200" 
          data-aos-once="true"
          className="text-[42px] font-semibold text-dark-blue">Gestão</h1
        >
        <div className="flex flex-col gap-4 justify-center md:gap-x-30 md:flex-row md:flex-wrap">
          {data.responsible?.map((r: ResponsibleProps, i: number) => (
            <ResponsibleCard num={++i} name={r.name} image={r.image} position={r.position} key={i} />
          ))}
        </div>
      </section>
    </div>
  );
}