/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { AuthContainer, Section } from "./AuthenticationStyled";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinSchema } from "../../schemas/signinSchema";
import { ErrorSpan } from "../../components/Navbar/NavbarStyled";
import { signin } from "../../services/employeeService";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function Authentication() {
  const [pass, setPass] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register: registerSignin,
    handleSubmit: handleSubmitSignin,
    formState: { errors: errorsSignin },
  } = useForm({ resolver: zodResolver(signinSchema) });

  async function inHandleSubmit(data) {
    try {
      const response = await signin(data);
      Cookies.set("token", response.data, { expires: 7 });
      navigate("/home");
    } catch (error) {
      if (error.response.data == "Wrong password or email") {
        setErrorMessage("E-mail ou senha estão incorretos");
      }
      console.log(error);
    }
  }

  function togglePassword() {
    setPass(!pass);
  }

  const navigate = useNavigate();

  return (
    <AuthContainer>
      <div>
        <Section type="signin">
          <img src="logo-login.svg" alt="" />
          <form onSubmit={handleSubmitSignin(inHandleSubmit)}>
            <div>
              <label htmlFor="email">Usuário</label>
              <Input
                type="email"
                placeholder="email@digitalmix.tech"
                name="email"
                register={registerSignin}
              />
              {errorsSignin.email && (
                <ErrorSpan>{errorsSignin.email.message}</ErrorSpan>
              )}
            </div>
            <div>
              <label htmlFor="password">Senha</label>
              <article>
                <Input
                  type={pass ? "password" : "text"}
                  placeholder="Senha de acesso"
                  name="password"
                  register={registerSignin}
                />
                <span id="pass" onClick={togglePassword}>
                  {pass ? (
                    <img src="hide-password.svg" alt="" />
                  ) : (
                    <img src="view-password.svg" alt="" />
                  )}
                </span>
              </article>
              {errorsSignin.password && (
                <ErrorSpan>{errorsSignin.password.message}</ErrorSpan>
              )}
              {errorMessage && <ErrorSpan>{errorMessage}</ErrorSpan>}
            </div>
            <Button type="submit" text="Entrar" />
          </form>
        </Section>
      </div>
    </AuthContainer>
  );
}
