import Image from "next/image";
import Link from "next/link";
import { NavLinkProps } from "./Header";

import { client } from '@/lib/sanity';

async function getFooterInfo() {
  return await client.fetch(`*[_type == "settings"][0]{ ... }`);
}

export default async function Footer( { links }: { links: NavLinkProps[] } ) {
    if (!links) return null;

    const data = await getFooterInfo();

    const phoneNumbersOnly = data.telephone.replace(/\D/g, '');
    const whatsappUrl = `/`;

    return(
        <footer 
            data-aos="fade-up" 
            data-aos-once="true"
            className="bg-dark-blue text-background"
        >
            <div className="container mx-auto px-10 py-10 grid grid-cols-1 gap-10 sm:grid-cols-2 text-sm sm:gap-10 md:px-4 md:gap-10 md:grid-cols-3 lg:px-10 lg:gap-20 lg:w-[90%]">
                <div className="hidden md:block">
                    <h1 className="uppercase font-bold text-[32px] pb-1 cursor-default">Hub Cultural</h1>
                    <p className="text-light-gray1/90 text-[16px]/[1.6]">{data.description}</p>
                </div>
                <div>
                    <h2 className="uppercase font-semibold text-[22px] tracking-wider pb-4">Contato</h2>
                    <nav className="text-[16px]">
                        <ul className="text-light-gray1/90 grid gap-2.5">
                            <li className="hover:text-background hover:font-semibold">
                                <a href={`tel:+${phoneNumbersOnly}`}>{data.telephone}</a>
                            </li>
                            <li className="hover:text-background hover:font-semibold after:my-4 after:content-[''] after:block after:h-[2px] after:bg-light-gray1/20 after:bottom-0 after:left-0 after:transition-all after:duration-300">
                                <a href={`mailto:${data.email}`}>{data.email}</a>
                            </li>
                            <li>{data.address.streetInfo}</li>
                            <li className="after:my-4 after:content-[''] after:block after:h-[2px] after:bg-light-gray1/20 after:bottom-0 after:left-0 after:transition-all after:duration-300">
                                {data.address.cityInfo}
                            </li>
                        </ul>
                    </nav>
                    <div className="flex gap-4 py-4 sm:gap-6 sm:py-4">
                        <a href={data.instagram} target="_blank" rel="noopener noreferrer" className="shrink-0 hover:opacity-80 transition-opacity">
                            <Image src={"/icons/instagram.svg"} alt="Instagram" loading="eager" width={32} height={32}/>
                        </a>
                        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="shrink-0 hover:opacity-80 transition-opacity">
                            <Image src={"/icons/whatsapp.svg"} alt="Whatsapp" loading="eager" width={34} height={34}/>
                        </a>
                        <a href={data.facebook} target="_blank" rel="noopener noreferrer" className="shrink-0 hover:opacity-80 transition-opacity">
                            <Image src={"/icons/facebook.svg"} alt="Facebook" loading="eager" width={32} height={32}/>
                        </a>
                    </div>
                </div>
                <div>
                    <h2 className="uppercase font-semibold text-[22px] tracking-wider pb-4">Navegação</h2>
                    <nav className="flex flex-col gap-2 text-[16px]">
                        {/** 
                          *  Percorre o Array de links.
                          *  Cada link deve ter uma propriedade "key" única.
                          */}
                        {links.map((link) => {
                            return (
                                <Link
                                    key={link.href} 
                                    href={link.href}
                                    className="text-light-gray1/90 pb-1 hover:text-background hover:font-semibold"
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </div>
            <div className="container mx-auto w-[90%] font-medium text-[16px] text-center pb-8 lg:px-10 lg:text-left">
                <p>{data.copyright}</p>
            </div>
        </footer>
    );
}