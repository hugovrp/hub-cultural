import Link from "next/link";

export default function NotFound() {
  return (
    <main 
      data-aos="fade-up" 
      data-aos-once="true"
      className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center"
    >
      <h1 className="text-7xl font-bold text-blue1">404</h1>

      <h2 className="mt-4 text-2xl font-semibold text-dark-blue">
        Página não encontrada
      </h2>

      <p className="mt-2 text-gray max-w-md">
        A página que você tentou acessar não existe ou foi removida.
      </p>

      <Link
        href="/"
        className="mt-6 rounded-xl bg-blue1 px-6 py-3 text-background font-bold duration-300 hover:shadow-lg hover:-translate-y-[2px] transition-transform hover:bg-blue3"
      >
        Voltar para o início
      </Link>
    </main>
  );
}