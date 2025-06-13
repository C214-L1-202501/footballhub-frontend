# FootballHub Frontend

## 📋 Descrição

O **FootballHub** é uma aplicação web moderna e completa para gerenciamento de dados de futebol. A plataforma oferece uma interface intuitiva e responsiva para visualizar e administrar informações sobre países, times, jogadores, campeonatos e estádios do mundo do futebol.

### Principais Funcionalidades

- 🌍 **Países**: Visualize países e explore seus times, jogadores e estádios
- ⚽ **Times**: Navegue por times de futebol com informações detalhadas e histórico
- 👤 **Jogadores**: Perfis de jogadores com informações pessoais
- 🏆 **Campeonatos**: Acompanhe campeonatos e competições organizados por país
- 🏟️ **Estádios**: Informações sobre estádios, clubes mandantes e localização

## 🚀 Instalação e Execução

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Git

### Passo a Passo

1. **Clone o repositório**
   ```bash
   git clone https://github.com/C214-L1-202501/footballhub-frontend.git
   cd footballhub-frontend
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```
   ou
   ```bash
   yarn install
   ```

3. **Configure o ambiente**
   - Certifique-se de que o backend esteja rodando em `http://localhost:8000`
   - Se necessário, ajuste a URL da API no arquivo `src/services/api.ts`

4. **Execute o projeto em modo de desenvolvimento**
   ```bash
   npm run dev
   ```
   ou
   ```bash
   yarn dev
   ```

5. **Acesse a aplicação**
   - Abra seu navegador e acesse: `http://localhost:5173`

### Scripts Disponíveis

- `npm run dev` - Executa o projeto em modo de desenvolvimento
- `npm run build` - Gera a build de produção
- `npm run preview` - Visualiza a build de produção localmente
- `npm run lint` - Executa o linter para verificar o código

## 🛠️ Tecnologias Utilizadas

### Frontend Core
- **React** - Biblioteca JavaScript para construção de interfaces
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Vite** - Build tool e dev server ultra-rápido

### Gerenciamento de Estado
- **Redux Toolkit** - Gerenciamento de estado global
- **React Redux** - Integração do Redux com React

### Roteamento
- **React Router DOM** - Roteamento client-side

### Estilização
- **Tailwind CSS** - Framework CSS utility-first
- **PostCSS** - Processador de CSS
- **Autoprefixer** - Plugin para adicionar prefixos CSS automaticamente

### Ícones e UI
- **Lucide React** - Biblioteca de ícones moderna e customizável

### HTTP Client
- **Axios** - Cliente HTTP para requisições à API

### Qualidade de Código
- **ESLint** - Linter para identificar e corrigir problemas no código
- **TypeScript ESLint** - Regras específicas do TypeScript para ESLint

### Arquitetura e Padrões

- **Component-Based Architecture** - Componentes reutilizáveis e modulares
- **Custom Hooks** - Hooks personalizados para lógica compartilhada
- **Redux Slices** - Organização do estado em fatias lógicas
- **Async Thunks** - Gerenciamento de operações assíncronas
- **TypeScript Interfaces** - Tipagem forte para melhor desenvolvimento
- **Responsive Design** - Design adaptável para diferentes dispositivos

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── common/         # Componentes comuns (Card, Badge, etc.)
│   └── layout/         # Componentes de layout (Header, Sidebar, etc.)
├── hooks/              # Custom hooks
├── pages/              # Páginas da aplicação
├── services/           # Serviços de API
├── store/              # Configuração do Redux
│   └── slices/         # Redux slices
├── types/              # Definições de tipos TypeScript
└── main.tsx           # Ponto de entrada da aplicação
```

## 👥 Equipe

### Matheus Pereira - [GitHub](https://github.com/mathzpereira)

### Davi Rosa - [GitHub](https://github.com/DaviRGomes)

### Enzo Couto -

---