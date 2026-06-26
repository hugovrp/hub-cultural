import { useState, ReactNode } from "react";

interface AccordionItemProps {
  num: number | string;
  title: string;
  children: ReactNode;
}

// Usa a interface AccordionItemProps para definir os tipos corretos das propriedades do componente.
export default function AccordionItem({ num, title, children }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="group transition-all duration-300 mb-4 border-b border-light-gray2/80 pb-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`font-title flex w-full cursor-pointer items-center justify-between list-none text-[18px] gap-4 text-left hover:text-blue1 
                    ${isOpen ? "text-blue1" : ""}
                  `}
      >
        <span>
          {num}
          <span className="relative -top-[4px] text-[18px] text-blue1 px-1 font-bold">\</span>{" "}
          {title}
        </span>

        <span className={`transition-transform duration-500 shrink-0 ${isOpen ? "rotate-180" : ""}`}>
          ▼
        </span>
      </button>

      <div className={`grid transition-all duration-500 ease-in-out 
                       ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0" }
                      `}>
        <div className="overflow-hidden">
          <div className="pt-4 text-[14px] text-gray font-semibold">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}