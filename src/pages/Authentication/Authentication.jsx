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
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register: registerSignin,
    handleSubmit: handleSubmitSignin,
    formState: { errors: errorsSignin },
  } = useForm({ resolver: zodResolver(signinSchema) });

  async function inHandleSubmit(data) {
    setIsLoading(true);
    try {
      const response = await signin(data);
      Cookies.set("token", response.data, { expires: 7 });
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      if (error.response.data == "Invalid password") {
        setErrorMessage("E-mail ou senha estão incorretos");
      }
      setIsLoading(false);
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
          <img src="logo-login.svg" draggable="false" />
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
                    <img src="hide-password.svg" draggable="false" />
                  ) : (
                    <img src="view-password.svg" draggable="false" />
                  )}
                </span>
              </article>
              {errorsSignin.password && (
                <ErrorSpan>{errorsSignin.password.message}</ErrorSpan>
              )}
              {errorMessage && <ErrorSpan>{errorMessage}</ErrorSpan>}
            </div>
            {!isLoading ? (
              <Button type="submit" text="Entrar" />
            ) : (
              <div className="custom-loader"></div>
            )}
          </form>
        </Section>
      </div>
    </AuthContainer>
  );
}
