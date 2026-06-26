"use client"; // Client Component

import Image from "next/image";
import { client } from '@/lib/sanity';
import Banner from "@/components/Banner";
import Loading from "@/components/Loading";
import { Turnstile } from "@marsidev/react-turnstile";
import React, { useRef, useEffect, useState } from "react";

async function getContactPage() {
  return await client.fetch(`*[_type == "contact"][0]{ ... }`);
}

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);

  const [token, setToken] = useState("");
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<{ type: 'sucesso' | 'erro'; mensagem: string } | null>(null);
  const [data, setData] = useState<any>(null);

  useEffect( () => {
    async function fetchData() {
      try {
        const result = await getContactPage();
        setData(result);
      } catch(error) {
          console.log('Erro ao buscar dados:', error);
      }
    }
    fetchData();
  }, []);
  
  if (!data) return <Loading/>;

  const phoneNumbersOnly = data.telephone.replace(/\D/g, '');
  const whatsappUrl = `/`;
  const labelStyle = "text-[16px] font-title font-semibold tracking-wider";

  const sendForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) return;

    if (!token) {
      setStatus({
        type: "erro",
        mensagem: "Confirme o captcha antes de enviar.",
      });

      return;
    }

    setSending(true);
    setStatus(null);

    try {
      const formData = new FormData(formRef.current);

      const payload = {
        user_name: formData.get("user_name"),
        user_email: formData.get("user_email"),
        message: formData.get("message"),
        token,
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erro ao enviar");
      }

      setStatus({
        type: "sucesso",
        mensagem:
          "Mensagem enviada com sucesso! Entraremos em contato em breve.",
      });

      formRef.current.reset();

      setToken("");

      setTimeout(() => {
        statusRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 50);

    } catch (error) {
      console.error(error);

      setStatus({
        type: "erro",
        mensagem:
          "Ops! Algo deu errado. Tente novamente mais tarde.",
      });

    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <Banner title={data.bannerTitle} subtitle={data.bannerSubtitle} />

      <main>
        <section className="flex flex-col md:justify-evenly md:container md:mx-auto md:flex-row gap-10 p-4 sm:p-6 lg:p-10">
          <section 
            data-aos="fade-right" 
            data-aos-once="true"
            className="p-6 md:p-10 rounded-lg border border-blue3 rounded-3xl shadow-lg md:w-[60%]"
          >
            <h1 className="text-blue2 text-xl font-bold pb-6">
              Envie uma mensagem
            </h1>
            <form ref={formRef} onSubmit={sendForm} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="user_name" className={labelStyle}>
                  Nome
                </label>

                <input 
                  id="user_name" 
                  type="text" 
                  name="user_name" // Nome do campo no template EmailJS 
                  required
                  maxLength={60}
                  pattern="^[A-Za-zÀ-ÿ\s]+$"
                  placeholder="Seu nome Completo"
                  className="w-full border border-blue3 shadow-sm transition-all outline-none rounded-lg px-4 py-2 focus:border-blue3 focus:ring-4 focus:ring-blue3/20"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="user_email" className={labelStyle}>
                  E-mail
                </label>

                <input 
                  id="user_email" 
                  type="email" 
                  name="user_email" // Nome do campo no template EmailJS 
                  required
                  maxLength={120}
                  placeholder="seu@email.com"
                  className="w-full border border-blue3 shadow-sm transition-all outline-none rounded-lg px-4 py-2 focus:border-blue3 focus:ring-4 focus:ring-blue3/20"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className={labelStyle}>
                  Mensagem
                </label>

                <textarea 
                  id="message" 
                  name="message" // Nome do campo no template EmailJS 
                  required
                  rows={5}
                  maxLength={1000}
                  placeholder="Escreva sua mensagem aqui..."
                  className="w-full border border-blue3 shadow-sm transition-all outline-none rounded-lg px-4 py-2 focus:border-blue3 focus:ring-4 focus:ring-blue3/20 resize-none"
                />
              </div>

              <div className="flex justify-left overflow-hidden">
                <div className="scale-70 sm:scale-100 origin-left">
                  <Turnstile
                    siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                    onSuccess={(token) => setToken(token)}
                    options={{
                      theme: "light",
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={sending}
                className="bg-blue3 text-background font-semibold py-2 px-6 rounded-lg border-2 border-blue3 cursor-pointer
                           hover:bg-background hover:text-blue3 hover:-translate-y-[2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sending ? "Enviando..." : "Enviar mensagem"}
              </button>

              {status && (
                <p
                  ref={statusRef}
                  role="alert"
                  className={`text-[16px]/[1.5] text-center rounded-md py-2 px-4 ${
                    status.type === "sucesso"
                      ? "bg-light-blue2/90 text-blue1 border border-blue1"
                      : "bg-red-200 text-red-700 border border-red-700"
                  }`}
                >
                  {status.mensagem}
                </p>
              )}
            </form>
          </section>

          <section 
            data-aos="fade-right" 
            data-aos-once="true"
            className="p-6 text-[14px] sm:text-sm md:p-10 rounded-lg border border-blue3 rounded-3xl shadow-lg md:w-[40%] h-full flex flex-col justify-between"
          >
            <h1 className="text-blue2 text-xl font-bold pb-6">Informações de contato</h1>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row items-start gap-2">
                <div className="relative overflow-hidden h-[24px] w-[24px] grid place-items-center shrink-0 rounded-lg bg-blue3">
                  <Image src={"/icons/location-pin.svg"} alt="Icone GPS" loading="eager" fill sizes="22px" className="object-cover object-center p-[4px]"/>
                </div>
                <a href={data.location} target="_blank" rel="noopener noreferrer" className="break-words hover:text-blue2 hover:font-semibold pb-2 gap-1">
                  <p>{data.address.streetInfo}</p>
                  <p>{data.address.cityInfo}</p>
                </a>
              </div>
              
              <div className="flex flex-col sm:flex-row items-start gap-2">
                <div className="relative overflow-hidden h-[24px] w-[24px] grid place-items-center shrink-0 rounded-lg bg-blue3">
                  <Image src={"/icons/email.svg"} alt="Icone E-mail" loading="eager" fill sizes="22px" className="object-cover object-center p-[4px]"/>
                </div>
                <a href={`mailto:${data.email}`} target="_blank" rel="noopener noreferrer" className="break-words hover:text-blue2 hover:font-semibold">
                  <p>{data.email}</p>
                </a>
              </div>

              <div className="flex flex-col sm:flex-row items-start gap-2">
                  <div className="relative overflow-hidden h-[24px] w-[24px] grid place-items-center shrink-0 rounded-lg bg-blue3">
                    <Image src={"/icons/telephone.svg"} alt="Icone GPS" loading="eager" fill sizes="22px" className="object-cover object-center p-[4px]"/>
                  </div>
                  <a href={`tel:+${phoneNumbersOnly}`} target="_blank" rel="noopener noreferrer" className="break-words hover:text-blue2 hover:font-semibold pb-2">
                    <p>{data.telephone}</p>
                  </a>
                </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-4 mt-4 border-t border-light-blue3/60">
                <a href={data.instagram} target="_blank" rel="noopener noreferrer" className="shrink-0 hover:opacity-80 transition-opacity relative overflow-hidden h-[42px] w-[42px] grid place-items-center rounded-lg bg-blue3">
                    <Image src={"/icons/instagram.svg"} alt="Instagram" loading="eager" fill sizes="40px" className="object-cover object-center p-2"/>
                </a>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="shrink-0 hover:opacity-80 transition-opacity relative overflow-hidden h-[42px] w-[42px] grid place-items-center rounded-lg bg-blue3">
                    <Image src={"/icons/whatsapp.svg"} alt="Whatsapp" loading="eager" fill sizes="40px" className="object-cover object-center p-2"/>
                </a>
                <a href={data.facebook} target="_blank" rel="noopener noreferrer" className="shrink-0 hover:opacity-80 transition-opacity relative overflow-hidden h-[42px] w-[42px] grid place-items-center rounded-lg bg-blue3">
                    <Image src={"/icons/facebook.svg"} alt="Facebook" loading="eager" fill sizes="40px" className="object-cover object-center p-2"/>
                </a>
              </div>
          </section>
        </section>
      </main>
    </div>
  );
}