import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";

/**
 * Resolve e inicia o navegador certo para cada ambiente:
 *
 * - Na Vercel (ou qualquer runtime serverless — detectado pela env VERCEL,
 *   que a própria plataforma injeta automaticamente), usa o binário do
 *   @sparticuz/chromium, compilado especificamente para rodar dentro do
 *   runtime Lambda/serverless da Vercel (puppeteer-core sozinho NÃO baixa
 *   nenhum Chromium — só sabe controlar um executável já existente).
 *
 * - Localmente, usa um Chrome/Chromium já instalado na sua máquina. Defina
 *   PUPPETEER_EXECUTABLE_PATH no seu .env apontando pro executável, ex:
 *     Windows:  C:\Program Files\Google\Chrome\Application\chrome.exe
 *     macOS:    /Applications/Google Chrome.app/Contents/MacOS/Google Chrome
 *     Linux:    /usr/bin/google-chrome
 */
export async function launchBrowser() {
  const isServerless = Boolean(
    process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME
  );

  if (isServerless) {
    return puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });
  }

  const executablePath = process.env.PUPPETEER_EXECUTABLE_PATH;
  if (!executablePath) {
    throw new Error(
      "PUPPETEER_EXECUTABLE_PATH não configurado. Defina no .env o caminho do " +
      "Chrome/Chromium instalado na sua máquina para rodar o Puppeteer localmente."
    );
  }

  return puppeteer.launch({
    headless: true,
    executablePath,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
    ],
  });
}