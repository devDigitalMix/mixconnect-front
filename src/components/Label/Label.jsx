/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { LabelSpace } from "./LabelStyled";

export function Label({ htmlFor, text }) {
  return <LabelSpace htmlFor={htmlFor}>{text}</LabelSpace>;
}
