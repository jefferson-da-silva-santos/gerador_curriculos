import { useEffect, useRef } from "react";
import { useFormikContext } from "formik";

const SAVE_DEBOUNCE_MS = 500;

/**
 * Salva os values do Formik no localStorage automaticamente, com
 * debounce. Precisa ser renderizado como filho de <Formik> (dentro do
 * render-prop), pra ter acesso ao contexto via useFormikContext.
 *
 * forceInitialSave: quando os valores iniciais já são "reais" (vieram
 * do wizard, ou de um rascunho salvo antes), salva desde já. Quando
 * os valores iniciais são só o exemplo de demonstração (nome "Ana
 * Beatriz Lima" etc.), só começa a salvar depois que o Formik marcar
 * `dirty=true` - assim, quem nunca editou nada não tem os dados de
 * exemplo salvos como se fossem progresso de verdade.
 */
export default function FormikAutosave({ storageKey, forceInitialSave = false }) {
  const { values, dirty } = useFormikContext();
  const hasStartedSaving = useRef(forceInitialSave);

  useEffect(() => {
    if (dirty) hasStartedSaving.current = true;
    if (!hasStartedSaving.current) return;

    const timeout = setTimeout(() => {
      try {
        localStorage.setItem(storageKey, JSON.stringify(values));
      } catch {
        /* localStorage indisponível (modo privado, quota cheia) - não é crítico */
      }
    }, SAVE_DEBOUNCE_MS);

    return () => clearTimeout(timeout);
  }, [values, dirty, storageKey]);

  return null;
}