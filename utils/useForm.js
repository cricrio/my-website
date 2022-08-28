import { useState } from 'react';

const useForm = () => {
  const [state, setState] = useState({});
  const changeHandler =
    (name) =>
    ({ target: { value } }) =>
      setState((s) => ({ ...s, [name]: value }));
  return [state, changeHandler];
};

export default useForm;
