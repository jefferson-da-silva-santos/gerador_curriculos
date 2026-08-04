import { useState, useRef } from "react";
import { showNotification } from "../utils/notyf";

const API_URL = "https://resume-generation-payment.vercel.app";
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

/**
 * Envia a foto do usuário para o backend (que faz o upload no Cloudinary)
 * e devolve a URL segura (https) via onUploaded(url).
 *
 * Uso dentro do Formik:
 *   <ImageUploader
 *     currentUrl={values.personal.imageSrc}
 *     onUploaded={(url) => setFieldValue("personal.imageSrc", url)}
 *   />
 */
const ImageUploader = ({ currentUrl, onUploaded }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(currentUrl || "");
  const inputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      showNotification("error", "Use uma imagem JPG, PNG ou WebP.");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      showNotification("error", "A imagem deve ter até 5 MB.");
      return;
    }

    // Preview local instantâneo, antes mesmo do upload terminar
    const localPreviewUrl = URL.createObjectURL(file);
    setPreview(localPreviewUrl);

    const formData = new FormData();
    formData.append("imagem", file);

    setIsUploading(true);
    try {
      const res = await fetch(`${API_URL}/upload-imagem`, {
        method: "POST",
        body: formData,
        signal: AbortSignal.timeout(30_000),
      });

      if (!res.ok) {
        const msg = await res.text().catch(() => `HTTP ${res.status}`);
        throw new Error(msg);
      }

      const { url } = await res.json();
      onUploaded?.(url);
      setPreview(url);
      showNotification("success", "Foto enviada com sucesso!");
    } catch (err) {
      console.error("Erro ao enviar imagem:", err);
      showNotification("error", "Falha ao enviar a foto. Tente novamente.");
      setPreview(currentUrl || "");
    } finally {
      setIsUploading(false);
      URL.revokeObjectURL(localPreviewUrl);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="image-uploader">
      <div className="image-uploader__preview">
        {preview ? (
          <img src={preview} alt="Prévia da foto" />
        ) : (
          <i className="bx bx-user-circle" style={{ fontSize: "2.5rem" }} />
        )}
      </div>

      <div className="image-uploader__actions">
        <label className="btn-add" htmlFor="curriculum-photo-input">
          <i className={`bx ${isUploading ? "bx-loader-alt bx-spin" : "bx-upload"}`} />
          {isUploading ? "Enviando..." : "Enviar foto"}
        </label>
        <input
          ref={inputRef}
          id="curriculum-photo-input"
          type="file"
          accept={ACCEPTED_TYPES.join(",")}
          onChange={handleFileChange}
          disabled={isUploading}
          style={{ display: "none" }}
        />
        <p className="field-hint">JPG, PNG ou WebP — até 5 MB</p>
      </div>
    </div>
  );
};

export default ImageUploader;
