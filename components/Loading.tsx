"use client"

export default function Loading() {
  return(
      <div className="h-[400px] bg-light-blue1 flex items-center justify-center gap-3">
        <svg className="size-8 animate-spin text-blue1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
        </svg>
        <p className="text-blue1 text-2xl font-bold animate-pulse">Carregando...</p>
      </div>
  );
}