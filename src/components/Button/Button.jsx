import { ButtonSpace } from "./ButtonStyled";

/* eslint-disable react/prop-types */
export function Button({ type, text, click }) {
  return (
    <ButtonSpace type={type} onClick={click}>
      {text}
    </ButtonSpace>
  );
}
