"use client" // Necessário para transformar Header em um Client Component, para conseguir ler a URL em tempo real.

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Hook de navegação, usado para ler a URL.
import { useState } from "react"; // Hook de estado, controla o abrir/fechar do menu.

export interface NavLinkProps {
  name: string;
  href: string;
}

export default function Header( { links }: { links: NavLinkProps[] } ) {
  if (!links) return null;

  const pathname = usePathname(); // Captura a rota atual
  const [isOpen, setIsOpen] = useState(false); // Estado do menu

  return(
    <header className="bg-background shadow sticky top-0 z-50">
      <div className="flex items-center container mx-auto justify-between py-0.5 px-4">
        <Link href='/' className="flex gap-2 items-center p-2 cursor-pointer">
            <Image src={"/lgo.png"} alt="Logo" width={60} height={60} priority/> {/* priority - já implica em loading="eager" e ajuda no LCP */}
            <div className="flex flex-col uppercase">
                <h2 className="text-dark-gray font-semibold text-lg text-dark-blue/90">Hub Cultural</h2>
                <p className="font-title text-blue2 text-[10px] lg:text-[11px] tracking-wider">Ponto de Cultura</p>
            </div>
        </Link>

        {/* Menu Hamburguer */}
        <button
          className="lg:hidden p-2 text-blue1 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Abrir menu"
        >
          <div className="w-6 h-0.5 bg-current mb-1.5 transition-all"></div>
          <div className="w-6 h-0.5 bg-current mb-1.5 transition-all"></div>
          <div className="w-6 h-0.5 bg-current transition-all"></div>
        </button>

        <nav 
          className={`
            absolute top-full left-0 w-full bg-background flex flex-col item-center gap-y-2 shadow transition-all duration-300 text-center p-2

            ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}

            lg:static lg:flex-row lg:w-auto lg:bg-transparent lg:py-0 lg:shadow-none lg:opacity-100 lg:visible lg:gap-x-4
          `}
        >
          {/** 
           *  Percorre o Array de links.
           *  Cada link deve ter uma propriedade "key" única.
           */}
          {links.map((link, index) => {
            // Compara a rota atual com a rota do link.
            const isActive = pathname === link.href;

            const isLastItem = index === links.length - 1;

            if (isLastItem) {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="font-title text-sm text-blue1 px-3 py-1 font-semibold lg:px-4 lg:py-1 transition-all duration-300 lg:border-2 lg:border-blue1 lg:bg-blue1 lg:rounded-md lg:text-background lg:hover:bg-light-blue3/5 lg:hover:text-blue1 tracking-wide"
                >
                  {link.name}
                </Link>
              );
            }

            return (
              <Link
                key={link.href} 
                href={link.href}
                onClick={() => setIsOpen(false)} // Fecha ao clicar

                // Usa template literals para aplicar efeitos condicionais no after
                className={`
                  relative text-sm text-blue1 font-medium px-3 py-1 transition-colors duration-300 tracking-wide

                  lg:after:content-[''] lg:after:block lg:after:h-[2px] lg:after:bg-blue1
                  lg:after:bottom-0 lg:after:left-0 lg:after:transisition-all lg:after:duration-300
                  ${isActive  
                    ? 'lg:after:w-full' 
                    : 'lg:after:w-0 lg:hover:after:w-full'}
                `}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  )
}