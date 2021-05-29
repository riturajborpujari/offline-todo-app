import { useCallback, useState } from "react";

export default function useForm(intitalFieldValues) {
  const [values, setValues] = useState(intitalFieldValues);

  const onChange = useCallback(e => {
    setValues(v => ({
      ...v,
      [e.target.name]: e.target.value
    }));
  }, []);

  const resetForm = useCallback(() => {
    setValues(intitalFieldValues);
  }, [intitalFieldValues]);

  return { values, onChange, resetForm };
}
