import { useFormikContext } from "formik";
import { useEffect } from "react"; 

const FormikPersist = ({ name }) => {
  const { values } = useFormikContext();

  useEffect(() => {
    localStorage.setItem(name, JSON.stringify(values));
  }, [values, name]);

  return null;
};

export default FormikPersist;
