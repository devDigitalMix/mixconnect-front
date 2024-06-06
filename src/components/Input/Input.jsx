/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { InputSpace } from "./InputStyled";

export function Input({
  type,
  placeholder,
  name,
  id,
  required,
  defaultValue,
  value,
  onChange,
  autoComplete,
  style,
  readOnly,
  register,
}) {
  const inputProps = {
    type,
    placeholder,
    name,
    id,
    required,
    defaultValue,
    value,
    onChange,
    autoComplete,
    style,
    readOnly,
  };

  return <InputSpace {...inputProps} {...(register ? register(name) : {})} />;
}
