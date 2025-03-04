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
  className,
  onKeyDown,
  onClick,
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
    className,
    onKeyDown,
    onClick,
  };

  return <InputSpace {...inputProps} {...(register ? register(name) : {})} />;
}
