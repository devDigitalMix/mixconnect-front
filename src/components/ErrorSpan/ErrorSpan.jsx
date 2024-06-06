/* eslint-disable react/prop-types */
import { ErrorSpanStyled } from "./ErrorSpanStyled";

export function ErrorSpan(props) {
  return <ErrorSpanStyled>{props.text}</ErrorSpanStyled>;
}
