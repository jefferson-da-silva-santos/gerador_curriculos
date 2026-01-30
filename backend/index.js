import express from "express";
import path from "path";
import puppeteer from "puppeteer";
import cors from "cors";
const app = express();

app.use(cors());

app.use(express.json({ limit: "50mb" }));

const curriculumCache = new Map();

app.use("/public", express.static(path.join(process.cwd(), "public")));
const launchBrowser = async () => {
  return puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
};


/**
 * Rota para receber o HTML final do frontend, armazená-lo e gerar o PDF.
 * O frontend deve enviar o HTML completo (incluindo <style> e <body>)
 * para o body desta requisição.
 */
app.post("/gerar-curriculo", async (req, res) => {
  const { htmlContent } = req.body;
  console.log(htmlContent);
  
  if (!htmlContent) {
    return res.status(400).send("Conteúdo HTML é obrigatório.");
  }

  // 1. Gerar um ID único para o currículo (usando timestamp como exemplo)
  const curriculumId = Date.now().toString();
  curriculumCache.set(curriculumId, htmlContent);

  let browser;
  try {
    // 2. Lançar o Puppeteer
    browser = await launchBrowser();
    const page = await browser.newPage();

    // 3. Acessar a rota dinâmica que irá servir o HTML
    const pageUrl = `http://localhost:3000/curriculo/${curriculumId}`;
    
    // Espera até que a rede fique inativa (carregamento completo)
    await page.goto(pageUrl, {
      waitUntil: "networkidle0",
    });

    // 4. Gerar o PDF
    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      // Margens opcionais para garantir que o CSS @page margin: 0; funcione
      margin: {
        top: "0cm",
        right: "0cm",
        bottom: "0cm",
        left: "0cm"
      }
    });

    // 5. Enviar o PDF para o cliente
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=curriculo.pdf",
    });

    res.send(pdf);
  } catch (err) {
    console.error("Erro ao gerar PDF:", err);
    res.status(500).send("Erro ao gerar PDF.");
  } finally {
    // 6. Fechar o navegador e limpar o cache
    if (browser) {
      await browser.close();
    }
    curriculumCache.delete(curriculumId); // Limpa o HTML do cache
  }
});

/**
 * Rota que o Puppeteer irá acessar para pegar o HTML do currículo.
 * Ela serve o HTML armazenado temporariamente no cache.
 */
app.get("/curriculo/:id", (req, res) => {
  const { id } = req.params;
  const htmlContent = curriculumCache.get(id);

  if (!htmlContent) {
    return res.status(404).send("Currículo não encontrado ou expirado.");
  }
  res.send(htmlContent);
});

// A rota /index original (se ainda for útil para você)
app.get("/index", (req, res) => {
  res.sendFile(path.join(process.cwd(), "index.html"));
});

app.listen(3000, () =>
  console.log("🔥 Servidor rodando: http://localhost:3000")
);