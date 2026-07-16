# Pagamento via Pix (R$ 5,00 por currículo) — Mercado Pago

## Como funciona, de ponta a ponta

1. Usuário clica em **"Exportar PDF"** → o frontend monta o HTML do currículo (como já fazia), mas em vez de mandar pro backend, abre o **modal de pagamento**.
2. O modal chama `POST /pagamento/criar` → o backend cria um registro `Payment` (status `pending`) no banco **e** cria uma cobrança Pix de verdade no Mercado Pago.
3. O modal mostra o **QR Code** e o **código "copia e cola"**, e fica consultando `GET /pagamento/status/:id` a cada 3 segundos.
4. Quando o usuário paga, o **Mercado Pago chama seu backend** (`POST /pagamento/webhook`) — é aqui, e só aqui, que o status vira `approved` no banco. O frontend nunca decide isso sozinho.
5. Assim que o polling detecta `approved`, o modal fecha e o frontend chama `POST /gerar-curriculo` de novo, agora **com o `paymentId`**.
6. O backend confere no banco: pagamento existe, está `approved`, e ainda não foi `used`. Se estiver tudo certo, marca como usado **numa transação** (evita gerar 2 PDFs com o mesmo pagamento) e só então roda o Puppeteer.

## Passo a passo pra instalar

### 1. Banco de dados (Neon Postgres)
Se você ainda não tem um banco Neon pra esse projeto (o do Futebol Holandês é outro banco, não reaproveite o mesmo):
1. Crie um projeto novo em https://neon.tech (tem plano gratuito).
2. Copie a "Connection string" com pooling (`...-pooler...`) para `DATABASE_URL`, e a versão sem pooling pra `DIRECT_URL` (o Prisma precisa da direta pra rodar migrations).

### 2. Instalar dependências no backend
```bash
cd backend
npm install @prisma/client mercadopago
npm install -D prisma
```

### 3. Copiar os arquivos deste pacote
| Arquivo | Destino |
|---|---|
| `backend/prisma/schema.prisma` | `backend/prisma/schema.prisma` |
| `backend/config/prisma.js` | `backend/config/prisma.js` |
| `backend/config/mercadopago.js` | `backend/config/mercadopago.js` |
| `backend/routes/payment.js` | `backend/routes/payment.js` |
| `backend/server.js` | **substitui** `backend/server.js` |
| `backend/.env.example` | **substitui** `backend/.env.example` |
| `frontend/src/components/PaymentModal.jsx` | `frontend/src/components/PaymentModal.jsx` |
| `frontend/src/components/paymentModal.css` | `frontend/src/components/paymentModal.css` |
| `frontend/src/components/CurriculumEditor.jsx` | **substitui** `frontend/src/components/CurriculumEditor.jsx` |

(`config/cloudinary.js` e `middleware/uploadMiddleware.js` também estão inclusos aqui só por completude — são os mesmos de antes, não precisa trocar se já estão no seu projeto.)

### 4. Rodar a migration do Prisma
```bash
npx prisma generate
npx prisma migrate dev --name init_payments
```
Isso cria a tabela `Payment` no seu banco Neon.

### 5. Configurar o Mercado Pago
1. Crie uma conta em https://www.mercadopago.com.br/developers/panel (se ainda não tiver).
2. Crie uma aplicação → copie o **Access Token de teste** primeiro (pra testar sem dinheiro real).
3. Preencha no `.env`:
   ```
   MERCADOPAGO_ACCESS_TOKEN=TEST-xxxxxxxx...
   PAYMENT_AMOUNT=5.00
   ```
4. **Sobre o webhook em desenvolvimento local:** o Mercado Pago precisa conseguir chamar seu backend pela internet — `localhost` não funciona. Use um túnel temporário, por exemplo:
   ```bash
   npx ngrok http 3000
   ```
   Isso te dá uma URL tipo `https://abc123.ngrok-free.app`. Coloque no `.env`:
   ```
   MERCADOPAGO_WEBHOOK_URL=https://abc123.ngrok-free.app/pagamento/webhook
   ```
5. No dashboard do Mercado Pago, em **Webhooks**, cadastre essa mesma URL e copie o **"Assinatura secreta"** gerada pra `MERCADOPAGO_WEBHOOK_SECRET` no `.env`.
6. Quando for pra produção (domínio real, com HTTPS), troque o Access Token de teste pelo de produção e atualize a `MERCADOPAGO_WEBHOOK_URL`/`MERCADOPAGO_WEBHOOK_SECRET` de acordo.

### 6. Testar o pagamento sem gastar dinheiro de verdade
Com credenciais de **teste**, o Mercado Pago aceita CPFs e comportamentos de teste específicos pra simular aprovação/rejeição — veja a documentação de "Usuários e Credenciais de Teste" em https://www.mercadopago.com.br/developers/pt/docs/checkout-pro/additional-content/your-integrations/test-integration.

## Coisas importantes a saber

- **Nunca confie no frontend para liberar o PDF.** É por isso que existe o webhook + a checagem no banco antes de gerar — mesmo que alguém adultere o JavaScript do navegador, o backend sempre confere o status real no banco de dados.
- **`used: true` evita reuso.** Um `paymentId` só gera um PDF. Se a geração falhar de verdade (erro do Puppeteer, por exemplo), o backend devolve o "crédito" automaticamente (`used: false`) pra não cobrar do usuário sem entregar nada.
- **Nota fiscal / MEI:** vender um serviço mesmo que pequeno (R$5) geralmente exige emissão de nota fiscal e, dependendo do volume, abertura de MEI ou outro CNPJ. Isso é uma questão contábil/tributária — vale conversar com um contador antes de colocar isso no ar publicamente, principalmente se o volume crescer. Não é algo que o código resolve sozinho.
- **Taxas do Mercado Pago:** o Pix tem taxa (geralmente a menor entre os métodos), mas ainda existe — confira o valor atual no dashboard, porque incide sobre os R$5.

## Próximos passos possíveis (não incluídos)
- Reenviar o e-mail de confirmação com o PDF anexado (hoje o download acontece só no navegador).
- Página de "recibo"/histórico de compras pro usuário, caso ele tenha um login.
- Cupom de desconto / primeiro currículo grátis.
