import "./globals.css";
import type { Metadata } from "next";
import { client } from "@/lib/sanity";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AosSetup from "@/components/AosSetup";
import { roboto, ibmPlexSerif } from "./fonts";

export const metadata: Metadata = {
  title: {
    default: "Hub Cultural",
    template: "%s | Hub Cultural",
  },

  description:
    "O Hub Cultural promove arte, cultura, educação e inclusão social por meio de projetos comunitários, oficinas, eventos culturais e iniciativas voltadas ao desenvolvimento humano e à transformação social.",

  keywords: [
    "Hub Cultural",
    "Ponto de Cultura",
    "Arte e cultura",
    "Projetos culturais",
    "Oficinas culturais",
    "Teatro",
    "Música",
    "Dança",
    "Artes visuais",
    "Audiovisual",
    "Economia criativa",
    "Inclusão social",
    "Educação cultural",
    "Comunidade",
    "Patrimônio cultural",
    "Transformação social",
    "Cultura popular",
    "Eventos culturais",
  ],

  authors: [
    {
      name: "Hub Cultural",
    },
  ],

  creator: "Hub Cultural",

  openGraph: {
    title: "Hub Cultural",
    description:
      "Arte, cultura, educação e transformação social conectando pessoas, ideias e territórios por meio de projetos e iniciativas culturais.",
    siteName: "Hub Cultural",
    locale: "pt_BR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Hub Cultural",
    description:
      "Arte, cultura, educação e transformação social conectando pessoas, ideias e territórios por meio de projetos e iniciativas culturais.",
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const links = await client.fetch(`*[_type == "settings"][0].links`);

  return (
    <html
      lang="pt-BR"
      className={`${roboto.variable} ${ibmPlexSerif.variable} h-full antialiased`}
    >
      <body>
        <Header links={links || []} />

        <AosSetup />
        <main>
          {children}
        </main>
        
        <Footer links={links || []} />
      </body>
    </html>
  );
}
