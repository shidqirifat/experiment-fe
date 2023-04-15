import { useReducer } from 'react';

const checkIsNotNumber = (value) => value !== '' && !/^\d+$/.test(value);

const formatCurrency = (value) => {
  const number = value.replace(/[^\d]/g, '');
  if (!number) return '';

  return new Intl.NumberFormat('id-ID', { style: 'decimal' }).format(number);
};

const formReducer = (state, action) => {
  const { type, field, value } = action;

  switch (type) {
    case 'INPUT_NUMBER':
      if (checkIsNotNumber(value)) return { ...state };

      return { ...state, [field]: value };
    case 'INPUT_CURRENCY':
      return { ...state, [field]: formatCurrency(value) };
    case 'INPUT_DEFAULT':
      return { ...state, [field]: value };
    default:
      return { ...state };
  }
};

export default function useForm(initForm) {
  const [form, dispatch] = useReducer(formReducer, initForm);

  const onChangeSelect = (field, options) => {
    dispatch({ type: 'INPUT_DEFAULT', field, value: options });
  };

  const onChangeNumber = (field, event) => {
    dispatch({ type: 'INPUT_NUMBER', field, value: event.target.value });
  };

  const onChangeCurrency = (field, event) => {
    dispatch({ type: 'INPUT_CURRENCY', field, value: event.target.value });
  };

  return { form, onChangeCurrency, onChangeNumber, onChangeSelect };
}
