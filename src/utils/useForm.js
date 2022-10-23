import { useState } from 'react';

const useForm = (initialState = {}) => {
  const [state, setState] = useState(initialState);
  const changeHandler =
    (name) =>
    ({ target: { value } }) =>
      setState((s) => ({ ...s, [name]: value }));
  return [state, changeHandler];
};

export default useForm;
