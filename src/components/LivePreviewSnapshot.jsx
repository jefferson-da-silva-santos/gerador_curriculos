import { useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import CurriculumStyles from "./CurriculumStyles";

const SNAPSHOT_DEBOUNCE_MS = 700;
const WATERMARK_TEXT = "AMOSTRA — BAIXE PARA GERAR O PDF";

async function waitForFontsAndLayout() {
  if (document?.fonts?.ready) {
    try {
      await document.fonts.ready;
    } catch {
      /* segue mesmo se falhar */
    }
  }
  await new Promise((resolve) => requestAnimationFrame(resolve));
  await new Promise((resolve) => requestAnimationFrame(resolve));
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

const LivePreviewSnapshot = ({
  TemplateComponent,
  data,
  fontFamily,
  themeSignature,
}) => {
  const captureRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [isRendering, setIsRendering] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setIsRendering(true);

    const timeout = setTimeout(async () => {
      const node = captureRef.current;
      if (!node) return;

      try {
        await waitForFontsAndLayout();
        if (cancelled) return;

        const rawPng = await toPng(node, {
          pixelRatio: 2,
          backgroundColor: "#ffffff",
          width: node.scrollWidth,
          height: node.scrollHeight,
        });
        if (cancelled) return;

        const finalDataUrl = await stampWatermark(rawPng);
        if (cancelled) return;

        setImgSrc(finalDataUrl);
      } catch (err) {
        console.error("Falha ao gerar prévia:", err);
      } finally {
        if (!cancelled) setIsRendering(false);
      }
    }, SNAPSHOT_DEBOUNCE_MS);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(data), fontFamily, themeSignature]);

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 1,
          height: 1,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        <div ref={captureRef} style={{ width: "210mm", background: "#fff" }}>
          <CurriculumStyles />
          <TemplateComponent data={data} fontFamily={fontFamily} />
        </div>
      </div>

      {imgSrc && (
        <img
          src={imgSrc}
          alt="Prévia do currículo"
          draggable={false}
          style={{
            width: "100%",
            display: "block",
            userSelect: "none",
            WebkitUserDrag: "none",
            pointerEvents: "none",
          }}
        />
      )}

      {isRendering && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255,255,255,0.6)",
            fontSize: 13,
            color: "#666",
          }}
        >
          Atualizando prévia...
        </div>
      )}
    </div>
  );
};

/* ─── AQUI é a função que muda ─────────────────────────────── */
async function stampWatermark(cleanDataUrl) {
  const img = await loadImage(cleanDataUrl);

  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  drawWatermark(canvas);

  return canvas.toDataURL("image/png");
}

function drawWatermark(canvas) {
  const ctx = canvas.getContext("2d");
  ctx.save();

  ctx.globalAlpha = 0.06;
  ctx.fillStyle = "#000";
  ctx.font = `bold ${canvas.width * 0.026}px sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(-Math.PI / 8);

  const stepX = canvas.width * 0.42;
  const stepY = canvas.height * 0.1;

  const cols = Math.ceil(canvas.width / stepX) + 2;
  const rows = Math.ceil(canvas.height / stepY) + 2;

  for (let row = -rows; row < rows; row++) {
    const offsetX = row % 2 === 0 ? 0 : stepX / 2;
    for (let col = -cols; col < cols; col++) {
      ctx.fillText(WATERMARK_TEXT, col * stepX + offsetX, row * stepY);
    }
  }

  ctx.restore();
}

export default LivePreviewSnapshot;
