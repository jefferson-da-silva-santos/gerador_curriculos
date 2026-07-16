import "dotenv/config";
import { defineConfig, env } from "prisma/config";

// Usado pelo Prisma CLI (npx prisma migrate dev / generate / studio).
// Migrations precisam da conexão DIRETA (sem pooler), por isso usamos
// DIRECT_URL aqui — diferente do config/prisma.js, que usa a DATABASE_URL
// com pooler para as queries da aplicação em runtime.
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DIRECT_URL"),
  },
});