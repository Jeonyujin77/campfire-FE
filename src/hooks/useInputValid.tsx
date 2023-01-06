import { useCallback, useState } from "react";

const useInputValid = (input: string, validator: (arg1: any) => boolean) => {
  const [flag, setFlag] = useState(true);
  const handler = useCallback(() => {
    if (!validator(input)) {
      setFlag(false);
    } else {
      setFlag(true);
    }
  }, [input, setFlag, validator]);
  return [flag, handler];
};

export default useInputValid;
