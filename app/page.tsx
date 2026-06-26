import Link from "next/link";
import Image from "next/image";
import { client } from '@/lib/sanity';
import CTA from "@/components/nucleos/cta";

interface LinkProps {
  name: string;
  href: string;
}

interface StatProps {
  value: string;
  label: string;
}

interface ProjectsProps {
  nucleo: string;
  image: string;
  title: string;
  description: string;
}

async function getHomePage() {
  return await client.fetch(`
    *[_type == "home"][0]{
      ...,
      "heroImage": heroImage.asset->url,
      mainProject{
        ...,
        "image": image.asset->url
      },
      projects[]{
        ...,
        "image": image.asset->url
      },
      "coworkingImage": coworkingImage.asset->url,
      "shopImage": shopImage.asset->url
    }
  `);
}

export default async function HomePage() {
  const data = await getHomePage();

  const words = data.title ? data.title.split(' ') : [];

  return (
    <div>
      <main data-aos="fade-up" className="bg-light-blue1/60 grid grid-cols-1 gap-4 md:gap-0 md:grid-cols-2 justify-between shadow-md">
        <div 
          data-aos="fade-up" 
          data-aos-once="true"
          className="sm:mx-2 p-4 sm:p-6 lg:p-10"
        >
          <p className="hidden font-title sm:inline sm:inline-flex sm:items-center bg-light-blue3/20 text-dark-blue/80 py-1 px-2 rounded-2xl sm:tracking-widest text-[10px] font-semibold uppercase mb-4 text-center sm:py-1.5 sm:px-3">
            <span className="h-[6px] w-[6px] bg-dark-blue/80 rounded-full mr-1 sm:mr-2"></span>
            {data.badge}
          </p>
          <h1 className="text-dark-blue text-[24px]/[1.5] md:text-[28px]/[1.5] md:text-[32px]/[1.5] font-semibold break-normal tracking-wider mb-4 md:mb-2">
            {words.length > 0 && words[0]} {' '}

            {words.length > 1 && (
              <span className="italic text-blue2">
                {words[1]}
              </span>
            )} {' '}

            {words.slice(2).join(' ')}
          </h1>
          <p className="text-[16px]/[1.6] py-4 font-medium md:text-[18px] mr-4 text-dark-blue">
            {data.description}
          </p>
          
          <div className="flex flex-wrap gap-4 mt-6 md:mt-4">
            {data.links?.map((link: LinkProps, index: number) => {
              const style = index === 0
                ? 'bg-blue1 text-background border-blue1 hover:bg-light-blue1/60 hover:text-blue1'
                : 'bg-light-blue1/60 text-blue1 border-blue1 hover:bg-blue1 hover:text-background';

              return (
                <Link
                  key={link.href} 
                  href={link.href}
                  className={`
                    text-[12px] font-semibold md:text-sm px-5 py-2.5 border-2 rounded-md transition-all duration-300 hover:shadow-lg hover:-translate-y-[2px] ${style} 
                  `}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

        </div>
        <div className="relative h-full min-h-[300px]">
          <Image 
            src={data.heroImage} 
            alt="Casa Verde" 
            fill 
            data-aos="fade-up" 
            data-aos-once="true"
            className="object-cover object-center" 
            sizes="(max-width: 768px) 100vw, 50vw" 
            priority // priority - já implica em loading="eager" e ajuda no LCP
          /> 

          <div className="absolute bottom-1 left-1 sm:bottom-4 sm:left-4 right-4 md:right-auto">
            <div 
              className="bg-background/90 backdrop-blur-sm rounded-xl px-3 py-2 sm:px-4 sm:py-3 flex gap-3 sm:gap-6 shadow-sm w-fit"
            >
              {data.stats?.map((stat: StatProps, i: number) => (
                <div key={i} className="flex flex-col items-center">
                  <span className="font-title text-dark-blue font-bold text-lg leading-tight">{stat.value}</span>
                  <span className="font-title text-blue1 text-[10px] font-semibold uppercase tracking-widest">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <section 
        data-aos="fade-up" 
        data-aos-offset="200" 
        data-aos-once="true"
        className="container mx-auto text-center py-10 px-10 md:px-20 lg:px-40"
      >
        <p className="text-blue1/90 font-semibold text-[12px] md:text-sm uppercase tracking-widest font-title">Propósito</p>
        <h1 className="text-[34px] md:text-[42px] font-semibold text-dark-blue my-6">Nossa Missão</h1>
        <q className="italic text-blue2 font-semibold text-[16px] md:text-[18px]">{data.mission}</q>

        <div className="flex flex-col md:flex-row justify-center my-10 gap-4 lg:gap-8">
          {data.missionValues?.map( (mission: string) => {
            return (
              <p key={mission} className="inline inline-flex items-center justify-center px-4 py-2 border-1 rounded-3xl border-light-gray2 center ">
                <span className="h-[6px] w-[6px] bg-blue2 rounded-full mr-1 sm:mr-2"/>
                {mission}
              </p>
            );
          })}
        </div>
      </section>

      <section
        data-aos="fade-up" 
        data-aos-offset="200" 
        data-aos-once="true"
        className="container mx-auto py-14 px-6 md:px-12 lg:px-24"
      >
        <div 
          data-aos="fade-up" 
          data-aos-once="true" 
          className="text-center max-w-3xl mx-auto"
        >
          <p className="text-blue1/90 font-semibold text-[12px] md:text-sm uppercase tracking-widest font-title">
            Nossos Projetos
          </p>

          <h1 className="text-[34px] md:text-[42px] font-semibold text-dark-blue my-4">
            {data.projectsTitle}
          </h1>

          <p className="text-[16px]/[1.6]">
            {data.projectsText}
          </p>
        </div>

        <div 
          data-aos="fade-up" 
          data-aos-once="true"
          className="mt-12 flex flex-col gap-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-3xl bg-background shadow-lg border border-light-gray2">
            <div className="relative min-h-[320px]">
              <Image
                src={data.mainProject.image}
                alt={data.mainProject.title}
                fill
                sizes="320px"
                className="object-cover"
              />
            </div>

            <div className="p-8 lg:p-10 flex flex-col justify-center">
              <p className="text-[12px] uppercase tracking-widest text-blue1 font-semibold mb-3">
                {`Núcleo ${data.mainProject.nucleo}`}
              </p>

              <h2 className="text-[30px] md:text-[38px] font-semibold text-dark-blue mb-4">
                {data.mainProject.title}
              </h2>

              <p className="text-dark-blue/80 text-[16px]/[1.8] mb-8">
                {data.mainProject.description}
              </p>

              <Link
                href={`/nucleos/${data.mainProject.nucleo}`}
                className="mt-2 inline-flex items-center justify-center gap-2 text-[14px] bg-blue1 font-semibold text-background px-4 py-2.5 rounded-lg duration-300 transition-all 
                           hover:opacity-80 hover:gap-3 w-fit hover:-translate-y-[2px] capitalize"
              >
                {`Conhecer Núcleo ${data.mainProject.nucleo}`}
                <span>→</span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {data.projects?.map((project: ProjectsProps, i: number) => (
              <div
                key={i}
                className="bg-background border border-light-gray2 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full"
              >
                <div className="relative h-[220px]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="220px"
                    className="object-cover"
                  />
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <p className="text-[11px] uppercase tracking-widest text-blue1 font-semibold mb-2">
                    {`Núcleo ${project.nucleo}`}
                  </p>

                  <h3 className="text-2xl font-semibold text-dark-blue mb-3">
                    {project.title}
                  </h3>

                  <p className="text-dark-blue/80 text-[16px]/[1.6] mb-6 line-clamp-3">
                    {project.description}
                  </p>

                  <Link
                    href={`/nucleos/${project.nucleo}`}
                    className="mt-auto inline-flex items-center justify-center gap-2 text-[13px] font-semibold text-background px-4 py-2 rounded-lg duration-300 transition-all hover:opacity-80 hover:gap-3 w-fit bg-blue1"
                  >
                    Ver núcleo
                    <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div 
            data-aos="fade-up" 
            data-aos-once="true"
            className="text-center pt-6"
          >
            <Link
              href="/nucleos"
              className="bg-blue1 text-background border-blue1 hover:bg-background hover:text-blue1 hover:shadow-lg text-[12px] font-semibold md:text-sm 
                px-5 py-2.5 border-2 rounded-md duration-300 hover:shadow-lg hover:-translate-y-[2px] transition-all"
            >
              Conheça todos os núcleos
            </Link>
          </div>
          
        </div>
      </section>

      <section 
        data-aos="fade-up" 
        data-aos-offset="200" 
        data-aos-once="true"
        className="container mx-auto py-14 px-6 md:px-12 lg:px-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          <div 
            data-aos="fade-up" 
            data-aos-once="true"
            className="order-2 lg:order-1 relative h-full min-h-[300px] rounded-3xl overflow-hidden shadow-lg"
          >
            <Image
              src={data.coworkingImage}
              alt="Espaço colaborativo"
              fill
              sizes="300px"
              className="object-cover"
            />
          </div>

          <div 
            data-aos="fade-up" 
            data-aos-once="true"
            className="order-1 lg:order-2"
          >
            <p className="text-blue1/90 font-semibold text-[12px] md:text-sm uppercase tracking-widest font-title">
              Espaço Colaborativo
            </p>

            <h2 className="text-[34px] md:text-[42px] font-semibold text-dark-blue my-4">
              {data.coworkingTitle}
            </h2>

            <p className="text-[16px]/[1.6] mb-4">
              {data.coworkingText}
            </p>

            <div className="flex flex-col gap-4 mb-8">
              {data.coworkingStats?.map((stat: string, i: number) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="text-2xl text-blue1 font-bold">
                    ✓
                  </div>

                  <h3 className="font-semibold text-dark-blue">
                    {stat}
                  </h3>
                </div>
              ))}
            </div>

            <Link
              href={`/`} target="_blank"
              className="bg-blue1 text-background border-blue1 hover:bg-background hover:text-blue1 hover:shadow-lg text-[12px] font-semibold md:text-sm 
                px-5 py-2.5 border-2 rounded-md hover:shadow-lg hover:-translate-y-[2px] duration-300 transition-all"
            >
              Agende uma visita
            </Link>
          </div>
        </div>
      </section>

      <section 
        data-aos="fade-up" 
        data-aos-offset="200" 
        data-aos-once="true"
        className="container mx-auto py-14 px-6 md:px-12 lg:px-24"
      >
        <div 
          data-aos="fade-up" 
          data-aos-once="true"
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch"
        >
          <div>
            <p className="text-blue1/90 font-semibold text-[12px] md:text-sm uppercase tracking-widest font-title">
              Loja Virtual
            </p>

            <h2 className="text-[34px] md:text-[42px] font-semibold text-dark-blue my-4">
              {data.shopTitle}
            </h2>

            <p className="text-[16px]/[1.6] mb-4">
              {data.shopText}
            </p>

            <div className="flex flex-col gap-4 mb-8">
              {data.shopStats?.map((stat: string, i: number) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="text-2xl text-blue1 font-bold">
                    ✓
                  </div>

                  <h3 className="font-semibold text-dark-blue">
                    {stat}
                  </h3>
                </div>
              ))}
            </div>

            <Link
              href={`/`} target="_blank"
              className="bg-blue1 text-background border-blue1 hover:bg-background hover:text-blue1 hover:shadow-lg text-[12px] font-semibold md:text-sm 
                px-5 py-2.5 border-2 rounded-md hover:shadow-lg hover:-translate-y-[2px] duration-300 transition-all"
            >
              Acessar loja
            </Link>
          </div>

          <div 
            data-aos="fade-up" 
            data-aos-once="true"
            className="relative h-full min-h-[300px] rounded-3xl overflow-hidden shadow-lg"
          >
            <Image
              src={data.shopImage}
              alt="Loja virtual"
              fill
              sizes="300px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="container mx-auto p-8">
        <CTA
          title={data.ctaTitle}
          text={data.ctaText}
          whatsappUrl={`/`}
        />
      </section>
    </div>
  );
}