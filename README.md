# 🩺 IMC Saúde - Calculadora Personalizada

Uma calculadora de **Índice de Massa Corporal (IMC)** moderna, desenvolvida em **React + Vite**, com design exclusivo, tema claro/escuro persistente e experiência totalmente fluida.

<img src="./preview/light-mode.png" alt="Modo Claro" width="100%"/>
<img src="./preview/dark-mode.png" alt="Modo Escuro" width="100%"/>

> Single Page Application (SPA) • 100% responsiva • Sem recarregamento de página

## 🎨 Identidade Visual

Paleta de cores personalizada e aconchegante:

**Modo Claro**  
![#F2E0DC](https://via.placeholder.com/15/F2E0DC/000000?text=+) `#F2E0DC` Pêssego • ![#F2D0E9](https://via.placeholder.com/15/F2D0E9/000000?text=+) `#F2D0E9` Rosa • ![#ACF2DE](https://via.placeholder.com/15/ACF2DE/000000?text=+) `#ACF2DE` Menta

**Modo Escuro**  
![#0D0D0D](https://via.placeholder.com/15/0D0D0D/000000?text=+) `#0D0D0D` Fundo • ![#F2BBBB](https://via.placeholder.com/15/F2BBBB/000000?text=+) `#F2BBBB` Rosa Médio • Menta com alto contraste

## ✨ Funcionalidades

- Cálculo preciso de IMC com classificação OMS
- Entrada de nome e idade para personalização
- Resultado visual com indicador colorido e mensagem motivacional
- Alternância de tema (Light / Dark) com persistência
- Navegação interna instantânea (Home → Resultado → Configurações)
- Totalmente responsivo (mobile-first)

## 🚀 Tecnologias

<div align="center">

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Lucide](https://img.shields.io/badge/Lucide-000000?style=for-the-badge&logo=lucide&logoColor=white)

</div>

- **React 18** + **Context API** (gerenciamento global de tema)
- **Vite** – build ultra rápido
- **Tailwind CSS** – estilização utilitária
- **Lucide React** – ícones leves e modernos

## ⚡ Como executar localmente

git clone https://github.com/camilamariano10/meu-imc.git
cd meu-imc
npm install
npm run dev

Acesse: http://localhost:5173

## 🌳 TreeView

└── 📁 meu-imc
    ├── 📁 public
    │   └── 🖼️ vite.svg
    ├── 📁 src
    │   ├── 📁 assets
    │   │   └── 🖼️ react.svg
    │   ├── 🎨 App.css
    │   ├── 📄 App.jsx
    │   ├── 🎨 index.css
    │   └── 📄 main.jsx
    ├── ⚙️ .gitignore
    ├── 📝 README.md
    ├── 📄 eslint.config.js
    ├── 🌐 index.html
    ├── ⚙️ package-lock.json
    ├── ⚙️ package.json
    ├── 📄 postcss.config.js
    ├── 📄 tailwind.config.js
    └── 📄 vite.config.js

## 📂 Estrutura Principal
plaintextsrc/
├── App.jsx          → Lógica completa: telas, navegação e contexto
├── context/         → ThemeContext (Dark/Light Mode)
├── components/      → Componentes reutilizáveis
├── main.jsx         → Entrypoint do React
└── index.css        → Configurações globais do Tailwind

## 🤝 Contribuições

Fique à vontade para:

Abrir uma Issue com sugestões ou bugs
Fazer um Fork e enviar um Pull Request

Qualquer melhoria é super bem-vinda! ✨

<p style="text-align: center;">Feito com 💙 por Camila Mariano • Projeto para estudo e portfólio </p>