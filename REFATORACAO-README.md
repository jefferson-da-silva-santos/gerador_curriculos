# Gerador de Currículos — Refatoração SaaS

## O que foi feito nesta rodada

### 1. Pagamento via Pix + Cartão (widget oficial)
- `src/components/PaymentModal.jsx` (customizado) → **substituído** por
  `src/components/PaymentWidgetSection.jsx`, que usa o
  `@payment-system-mp/react-widget` oficial.
- O download do PDF **continua só liberando após aprovação** — isso já
  existia (`handlePaymentApproved`) e não mudou; só trocou o componente
  que coleta o pagamento.
- **Precisa de ajuste no backend** — veja `backend-additions/INTEGRACAO-BACKEND.md`.

### 2. Tema da interface salvo no `localStorage`
- O tema claro/escuro/slate do **editor** (não o tema de cor do currículo,
  que já era salvo) agora persiste entre visitas, em
  `CurriculumEditor.jsx` (`UI_THEME_STORAGE_KEY`).

### 3. Edição mais fluida — arrastar-e-soltar nas competências
- Os botões de subir/descer viraram **drag-and-drop nativo** (sem
  biblioteca extra) em `SectionSkills`.
- O nível de 1 a 5 virou um **Slider do Material UI**, e o nome da
  competência virou um **Autocomplete do MUI** com sugestões para
  desenvolvedores (mas aceita qualquer texto livre).
- O seletor de ícone dos links de contato também virou um **Select do MUI**.

### 4. Templates — **intocados**, como pedido
- Nenhum arquivo em `src/templates/` foi alterado.

### 5. Landing page de alta conversão
- Projeto novo e independente em `landing/` (Vite + React + **TypeScript**),
  com `App.module.css` (CSS puro, sem Tailwind/Bootstrap), AOS, Boxicons e Notyf.
- Seções: Hero assimétrico, barra de estatísticas, funcionalidades,
  vitrine dos 8 modelos, como funciona, preço (R$ 5, sem assinatura),
  depoimentos, FAQ em acordeão, CTA final e rodapé.
- `overflow-x: hidden` no root/html/body (ver `landing/src/index.css`),
  responsivo até 320px.

## Como rodar

```bash
# App principal (editor de currículos)
npm install
npm run dev

# Landing page (projeto separado)
cd landing
npm install
npm run dev
```

## Próximos passos que ficaram de fora desta rodada (por escopo)
- Backend: aplicar as 3 mudanças de `backend-additions/INTEGRACAO-BACKEND.md`.
- Publicar a landing page num domínio/subdomínio (ex: `curriculopro.com.br`
  apontando pra landing, `app.curriculopro.com.br` apontando pro editor —
  hoje o link é um placeholder em `landing/src/App.tsx`, na constante `APP_URL`).
- Testar o widget de pagamento de ponta a ponta com credenciais de teste
  do Mercado Pago antes de ir pra produção.
