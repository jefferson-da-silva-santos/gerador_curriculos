import express from "express";
import fs from "fs";
import path from "path";
import puppeteer from "puppeteer-core";

const app = express();
app.use(express.json());

app.use("/public", express.static(path.join(process.cwd(), "public")));

app.get("/index", (req, res) => {
  res.sendFile(path.join(process.cwd(), "index.html"));
});

const chromePath =
  "C:/Users/jeffr/.codeium/ws-browser/chromium-1155/chrome-win/chrome.exe";

app.get("/gerar-pdf", async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: chromePath,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    await page.goto("http://localhost:3000/index", {
      waitUntil: "networkidle0",
    });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=curriculo.pdf",
    });

    res.send(pdf);
  } catch (err) {
    res.status(500).send("Erro ao gerar PDF.");
  }
});

app.listen(3000, () =>
  console.log("🔥 Servidor rodando: http://localhost:3000/gerar-pdf")
);
