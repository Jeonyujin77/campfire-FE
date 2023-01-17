import { useCallback, useState } from "react";

const useInput = (initialState: any) => {
  const [value, setValue] = useState(initialState);
  const handler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    },
    [value]
  );
  return [value, setValue, handler];
};

export default useInput;
