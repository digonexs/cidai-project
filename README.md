# CIDAI — Centro de Inclusão e Dignidade ao Idoso

Landing page institucional do **Projeto CIDAI**, uma iniciativa voluntária sem fins lucrativos dedicada a oferecer cuidados odontológicos, suporte psicológico e tratamento humanizado a idosos residentes em instituições de longa permanência (ILPIs).

---

## Sumário

- [Sobre o Projeto](#sobre-o-projeto)
- [Deploy](#deploy)
- [Stack Tecnológica](#stack-tecnológica)
- [Arquitetura](#arquitetura)
- [Estrutura de Arquivos](#estrutura-de-arquivos)
- [Design System](#design-system)
- [Funcionalidades](#funcionalidades)
- [Decisões Técnicas](#decisões-técnicas)
- [Como Executar Localmente](#como-executar-localmente)
- [Deploy na Vercel](#deploy-na-vercel)

---

## Sobre o Projeto

O CIDAI é um projeto extensionista que reúne voluntários da área da saúde para promover qualidade de vida a idosos institucionalizados. A landing page serve como vitrine digital do projeto, com os objetivos de:

- Apresentar a missão, valores e impacto social do CIDAI
- Recrutar novos voluntários via integração com WhatsApp
- Emitir certificados de participação em PDF para voluntários
- Exibir métricas de impacto de forma animada e engajante

---

## Deploy

A aplicação está publicada e acessível em:

**[https://cidai-project.vercel.app](https://cidai-project.vercel.app)**

Hospedada na **Vercel** com deploy contínuo a partir da branch `main` do repositório GitHub. Cada push para `main` dispara um novo deploy automaticamente.

---

## Stack Tecnológica

| Camada | Tecnologia | Versão |
|---|---|---|
| UI Library | React | 19.2.0 |
| Linguagem | TypeScript | 5.6.3 |
| Bundler / Dev Server | Vite | 7.1.9 |
| Roteamento | wouter | 3.3.5 |
| Estilização | Tailwind CSS | 4.1.14 |
| Componentes base | shadcn/ui + Radix UI | — |
| Animações | Framer Motion | 12.23.24 |
| Formulários | React Hook Form | 7.66.0 |
| Validação de schema | Zod | 3.25.76 |
| State management | TanStack Query (React Query) | 5.60.5 |
| Geração de PDF | jsPDF | 4.0.0 |
| Ícones | Lucide React | 0.545.0 |
| Notificações toast | Sonner | 2.0.7 |

---

## Arquitetura

O projeto é uma **Single Page Application (SPA)** puramente client-side, sem backend próprio. Toda interação que exigiria persistência de dados é delegada a serviços externos:

- **Captação de voluntários** — redirecionamento para WhatsApp com dados pré-preenchidos via URL `wa.me`
- **Emissão de certificados** — geração de PDF 100% no navegador via jsPDF, sem upload ou armazenamento

```
Browser
└── React SPA (Vite)
    ├── Roteador (wouter)
    │   ├── / → Home (landing page)
    │   └── * → NotFound
    ├── Providers
    │   ├── QueryClientProvider (React Query)
    │   └── TooltipProvider (Radix UI)
    └── Componentes
        ├── Navbar / Footer (layout.tsx)
        ├── Seções da Home (home.tsx)
        └── Modais (modals.tsx)
            ├── VolunteerModal → WhatsApp
            └── CertificateModal → jsPDF → PDF no browser
```

Não há chamadas a APIs REST próprias. A aplicação opera totalmente offline após o carregamento inicial.

---

## Estrutura de Arquivos

```
cidai-landing-page/
├── client/                          # Código-fonte do frontend
│   ├── public/
│   │   └── favicon.png
│   ├── index.html                   # Entry point HTML
│   └── src/
│       ├── components/
│       │   ├── ui/                  # Componentes shadcn/ui (apenas os utilizados)
│       │   │   ├── button.tsx
│       │   │   ├── card.tsx
│       │   │   ├── dialog.tsx
│       │   │   ├── form.tsx
│       │   │   ├── input.tsx
│       │   │   ├── label.tsx
│       │   │   ├── section.tsx      # Wrapper de seção com blob backgrounds
│       │   │   ├── toast.tsx
│       │   │   ├── toaster.tsx
│       │   │   └── tooltip.tsx
│       │   ├── layout.tsx           # Navbar e Footer
│       │   └── modals.tsx           # Modal de voluntário e de certificado
│       ├── hooks/
│       │   └── use-toast.ts         # Sistema de toast com reducer
│       ├── lib/
│       │   ├── utils.ts             # Helper cn() (clsx + tailwind-merge)
│       │   ├── queryClient.ts       # Instância do React Query
│       │   └── data.ts              # Conteúdo e configurações estáticas
│       ├── pages/
│       │   ├── home.tsx             # Landing page principal
│       │   └── not-found.tsx        # Página 404
│       ├── App.tsx                  # Componente raiz com providers e rotas
│       ├── main.tsx                 # Entry point React
│       └── index.css                # Estilos globais e tema Tailwind
├── attached_assets/                 # Imagens e assets do projeto
│   ├── Logo_do_Projeto_CIDAI_*.png
│   └── generated_images/
│       ├── happy_elderly_people_with_healthy_smiles.png
│       └── caring_volunteer_helping_elderly_person.png
├── dist/                            # Output do build (gerado automaticamente)
├── package.json
├── tsconfig.json
├── vite.config.ts
├── postcss.config.js
└── components.json                  # Configuração do CLI do shadcn
```

---

## Design System

### Paleta de Cores

| Token | Valor | Uso |
|---|---|---|
| Principal | `#1C3F3A` | Verde-escuro — cor da marca |
| Creme | `#EBE8D8` | Backgrounds e destaques suaves |
| Acento | `#458FF6` | Azul — calls-to-action secundários |
| Texto | `#2D3748` | Cinza escuro — textos principais |
| Fundo | `#FFFFFF` | Fundo base |

As cores são definidas como variáveis CSS no [client/src/index.css](client/src/index.css) e consumidas pelo Tailwind CSS v4 via `@theme`.

### Tipografia

- **Fonte**: Inter (Google Fonts) — pesos 300 a 700
- **Border radius padrão**: `0.5rem`

### Componente `Section`

O componente customizado `section.tsx` encapsula cada seção da página com suporte a blob backgrounds decorativos posicionados via prop `blob="left" | "right" | "none"`, criando o efeito de gradiente difuso característico do design.

---

## Funcionalidades

### Seções da Landing Page

| Seção | ID | Descrição |
|---|---|---|
| Hero | — | Título, subtítulo e CTAs principais |
| Nossa Missão | `#missao` | Cards com os três pilares do projeto |
| Sobre Nós | `#sobre` | Texto institucional, imagem e depoimento |
| Impacto | `#impacto` | Contadores animados de métricas sociais |
| Certificado | `#certificado` | Preview do certificado e CTA de emissão |

### Navbar

- Fixa no topo, transparente no topo e com fundo `backdrop-blur` ao rolar
- Destaque automático do link da seção visível no viewport
- Menu hambúrguer em mobile com animação de entrada

### Modal de Voluntariado

- Coleta: nome completo, e-mail, telefone e área de atuação
- Validação com Zod (mínimos de caracteres, formato de e-mail)
- Submissão: redireciona para `wa.me/5511975455253` com os dados pré-formatados na mensagem
- Nenhum dado é armazenado — privacidade por design

### Geração de Certificado PDF

- Protegido por palavra-chave (`souvoluntario`)
- Validação de CPF no formato `000.000.000-00`
- PDF gerado 100% no navegador via **jsPDF**:
  - Formato A4 paisagem
  - Background creme e paleta da marca
  - Marca d'água com logo do CIDAI (via `GState` com opacidade reduzida)
  - Borda interna, tipografia hierárquica e linha de assinatura
  - Data de emissão automática
- Abre em nova aba — sem servidor, sem upload

### Animações

- Entradas de elemento com **Framer Motion** (`opacity + y`, `opacity + scale`)
- Contadores de impacto com animação por `spring` ao entrar na viewport (`whileInView`)
- Hover elevado nos cards da missão (`whileHover: { y: -10 }`)
- Certificado preview com rotação e hover transition

### Contato WhatsApp

- Botão flutuante fixo no canto inferior direito
- Link direto no footer e nos itens de "Contato" da navbar

---

## Decisões Técnicas

### Por que wouter em vez de React Router?

Landing page de página única com navegação por âncoras. O **wouter** tem ~2 KB (vs ~50 KB do React Router v6), suficiente para gerenciar `/` e o fallback 404 sem overhead.

### Por que Tailwind CSS v4?

A v4 substitui o `tailwind.config.js` por configuração via CSS puro com `@theme` e `@layer`, centralizando tudo no [index.css](client/src/index.css) e eliminando um arquivo de configuração separado.

### shadcn/ui como base de componentes

shadcn/ui não é uma biblioteca empacotada — os componentes são copiados diretamente para o código-fonte. Isso garante controle total, sem dependência de versão de terceiros para UI e customização trivial. Apenas os 10 componentes efetivamente utilizados estão no projeto.

### Geração de PDF no cliente

Elimina a necessidade de servidor. A palavra-chave (`souvoluntario`) é um filtro básico de acesso — adequado ao contexto de um projeto voluntário, sem dados sensíveis envolvidos.

### Arquitetura 100% estática

- Custo zero de hospedagem
- Sem manutenção de servidor
- Privacidade garantida: nenhum dado pessoal é transmitido a um servidor próprio

---

## Como Executar Localmente

### Pré-requisitos

- **Node.js** >= 18
- **npm** >= 9

### 1. Clone o repositório

```bash
git clone https://github.com/digonexs/cidai-project.git
cd cidai-project
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

Disponível em `http://localhost:5173` com Hot Module Replacement (HMR).

### Scripts disponíveis

| Script | Comando | Descrição |
|---|---|---|
| Desenvolvimento | `npm run dev` | Servidor de dev com HMR |
| Build | `npm run build` | Build otimizado em `dist/` |
| Preview | `npm run preview` | Serve o build de produção localmente |
| Type check | `npm run check` | Verificação de tipos TypeScript |

---

## Deploy na Vercel

O projeto está configurado para deploy automático na Vercel.

**URL de produção**: [https://cidai-project.vercel.app](https://cidai-project.vercel.app)

### Como funciona

1. Push para a branch `main` dispara o pipeline da Vercel automaticamente
2. A Vercel executa `npm run build`, que gera a pasta `dist/`
3. O conteúdo de `dist/` é servido como site estático na CDN global da Vercel

### Configuração do Vite

O [vite.config.ts](vite.config.ts) define:

- **Root**: `client/`
- **Output**: `dist/`
- **Aliases**:
  - `@/` → `client/src/`
  - `@assets/` → `attached_assets/`

Nenhuma variável de ambiente é necessária — a aplicação é 100% estática.

---

*Projeto desenvolvido com propósito social. Cada linha de código representa cuidado e dignidade.*
