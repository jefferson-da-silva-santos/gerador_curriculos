import { useFormikContext } from "formik";
import { useEffect, useRef } from "react";

const DEBOUNCE_MS = 500;

const FormikPersist = ({ name }) => {
  const { values } = useFormikContext();
  const timeoutRef = useRef(null);

  useEffect(() => {
    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      try {
        localStorage.setItem(name, JSON.stringify(values));
      } catch (err) {
        // localStorage pode falhar em modo anônimo estrito ou com a
        // cota cheia - perder o autosave não deve quebrar o app.
        console.warn(
          "Não foi possível salvar o rascunho localmente:",
          err.message,
        );
      }
    }, DEBOUNCE_MS);

    return () => clearTimeout(timeoutRef.current);
  }, [values, name]);

  return null;
};

export default FormikPersist;
