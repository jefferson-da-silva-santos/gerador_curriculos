import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { v2 as cloudinary } from "cloudinary";

// Resolve o caminho absoluto do .env (um nível acima desta pasta "config/",
// ou seja, backend/.env) — assim não importa de qual diretório o processo
// node foi iniciado (ex: quando roda via `concurrently` a partir da raiz
// do projeto, o cwd não é necessariamente a pasta backend/).
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// Nunca coloque as chaves reais aqui — elas vêm do .env (ver .env.example).
// CLOUDINARY_CLOUD_NAME / CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET
// são encontradas no dashboard do Cloudinary, em "API Environment variable"
// ou nos campos separados "Cloud name", "API Key" e "API Secret".
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const requiredVars = [
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
];

export function assertCloudinaryConfigured() {
  const missing = requiredVars.filter((v) => !process.env[v]);
  if (missing.length > 0) {
    throw new Error(
      `Cloudinary não configurado. Faltam as variáveis de ambiente: ${missing.join(", ")}`
    );
  }
}

export default cloudinary;
