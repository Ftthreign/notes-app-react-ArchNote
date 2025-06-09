import { useState } from "react";

export default function useInput(valueParams = "") {
  const [value, setValue] = useState(valueParams);

  const onValueChangeHandler = (e) => setValue(e.target.value);

  return [value, onValueChangeHandler];
}
