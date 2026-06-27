# 📋 Hub Cultural

Site institucional desenvolvido com Next.js para o Hub Cultural, uma organização fictícia criada para demonstrar soluções voltadas ao setor cultural e comunitário.

A plataforma reúne informações sobre projetos, eventos, ações comunitárias e iniciativas culturais, proporcionando uma experiência moderna, responsiva e com gerenciamento de conteúdo simplificado através do Sanity CMS.

## 🎬 Demonstração

🔗 **Acesse o projeto:** https://hub-cultural.netlify.app

<br>

## 🌐 Tecnologias

- **Next.js** — Framework React para aplicações web modernas.
- **React** — Biblioteca para construção da interface.
- **TypeScript** — Tipagem estática para maior segurança e manutenção do código.
- **Tailwind CSS** — Estilização rápida e responsiva.
- **Sanity CMS** — Gerenciamento de conteúdo headless.
- **EmailJS** — Envio de formulários sem necessidade de backend dedicado.
- **Cloudflare Turnstile** — Proteção contra spam e bots.
- **Zod** — Validação de dados e formulários.
- **AOS (Animate On Scroll)** — Animações durante a navegação.

<br>

## 📦 Pré-requisitos

- Node.js 18+
- npm ou yarn
- Projeto configurado no Sanity
- Conta EmailJS
- Chaves do Cloudflare Turnstile

<br>

## ✨ Funcionalidades

### 📄 Gerenciamento Dinâmico de Conteúdo

Todos os conteúdos do site são gerenciados através do Sanity Studio, permitindo atualização sem necessidade de alterar o código da aplicação.

### 🔗 Rotas Dinâmicas

Os núcleos e projetos possuem páginas geradas dinamicamente utilizando slug, permitindo criar novos conteúdos diretamente pelo CMS.

```text
/nucleos/agroecologia
/nucleos/teatro
/nucleos/economia-solidaria
```

### 📬 Formulário de Contato Funcional

Sistema de contato totalmente funcional utilizando:

- EmailJS para envio de mensagens.
- Validação de dados com Zod.
- Feedback visual para o usuário após o envio.

> Integrado com Cloudflare Turnstile para impedir envios automatizados por bots.

### 🔍 Validação e Segurança

- Validação de dados com Zod.
- Verificação de captcha via Cloudflare Turnstile.
- Variáveis sensíveis protegidas por ambiente (.env).

<br>

## 🗂️ Estrutura Principal do Projeto

```text
src/
├── app/
│   ├── api/
│   │   └── contact/
│   ├── biblioteca/
│   ├── contato/
│   ├── nucleos/
│   │   └── [slug]/
│   ├── sobre/
│   ├── transparencia/
│   ├── fonts.ts
│   ├── layout.tsx
│   ├── not-found.tsx
│   └── page.tsx
├── components/
│   ├── biblioteca/
│   ├── nucleos/
│   ├── sobre/
│   ├── transparencia/
│   ├── AosSetup.tsx
│   ├── Banner.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   └──  Loading.tsx
├── lib/
│   └── sanity.ts
├── public/
│   └── icons/
├── .gitignore
├── next.config.ts
├── package-lock.json
└── package.json
```

<br>

## 🚀 Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/hugovrp/hub-cultural.git
cd repositorio
npm install
```

Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

O painel estará disponível em:

```text
http://localhost:3000
```

### Variáveis de Ambiente

Crie um arquivo .env.local:

```text
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=

# EmailJS
EMAILJS_SERVICE_ID=
EMAILJS_TEMPLATE_ID=
EMAILJS_PUBLIC_KEY=
EMAILJS_PRIVATE_KEY=

# Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
```

<br>

## ☁️ Deploy

Para gerar a versão de produção:

```bash
npm run build
```

Executar localmente:

```bash
npm run start
```

O projeto pode ser publicado em plataformas como:

- Vercel
- Netlify
- Railway

<br>

## 👨‍💻 Desenvolvido por

| Nome | GitHub |
|------|---------|
| Hugo Vinícius Rodrigues Pereira | https://github.com/hugovrp |
