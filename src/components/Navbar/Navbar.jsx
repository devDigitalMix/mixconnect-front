/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ErrorSpan, Header, Nav, NavMenu, PerfilMenu } from "./NavbarStyled";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../Button/Button";
// import { searchSchema } from "../../schemas/searchSchema";
import { userLogged } from "../../services/employeeService";
import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { UserContext } from "../../Context/UserContent";
import Skeleton from "react-loading-skeleton";

export function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const [nav, setNav] = useState("");
  const [findingUser, setFindingUser] = useState(true);
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState(null);

  async function findUserLogged() {
    try {
      const response = await userLogged();
      setUser(response.data);
      setFindingUser(false);
    } catch (error) {
      console.log(error);
    }
  }

  function getURL() {
    setNav(window.location.href);
  }

  function signout() {
    Cookies.remove("token");
    setUser(undefined);
    navigate("/");
  }

  function handleButtonClick(buttonName) {
    setActiveButton(buttonName);
  }

  useEffect(() => {
    if (Cookies.get("token")) {
      userLogged()
        .then((response) => {
          setUser(response.data);
        })
        .catch(() => {
          Cookies.remove("token");
          navigate("/");
        });
    } else {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (Cookies.get("token")) findUserLogged();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    getURL();
  }, [activeButton]);

  return (
    <>
      <Header>
        <div id="nav">
          <img src="/navgradbottom.png" id="navgradbottom" />
          <img src="/navgradtop.png" id="navgradtop" />
          <Nav>
            <Link to={"/home"} onClick={() => handleButtonClick("")}>
              <img src="/logo.svg" alt="MixConnect" draggable="false" />
            </Link>

            <NavMenu>
              <Link to={"/home/clients"}>
                <button
                  className={nav.includes("clients") ? "active" : ""}
                  onClick={() => handleButtonClick("clients")}
                >
                  CLIENTES
                </button>
              </Link>
              <Link to={"/home/employees"}>
                <button
                  className={nav.includes("employees") ? "active" : ""}
                  onClick={() => handleButtonClick("employees")}
                >
                  FUNCIONÁRIOS
                </button>
              </Link>
              {/* <button
                className={activeButton === "playbook" ? "active" : ""}
                onClick={() => handleButtonClick("playbook")}
              >
                PLAYBOOK
              </button> */}
              {!findingUser &&
                (user.level == "Líder" ||
                  user.level == "Admin" ||
                  user.role == "Comercial") && (
                  <Link to={"/home/plans"}>
                    <button
                      className={nav.includes("plans") ? "active" : ""}
                      onClick={() => handleButtonClick("plans")}
                    >
                      PLANOS
                    </button>
                  </Link>
                )}
              {!findingUser &&
                (user.level == "Líder" || user.level == "Admin") && (
                  <Link to={"/home/acessos"}>
                    <button
                      className={nav.includes("acessos") ? "active" : ""}
                      onClick={() => handleButtonClick("acessos")}
                    >
                      ACESSOS
                    </button>
                  </Link>
                )}
              {!findingUser &&
                (user.level == "Líder" || user.level == "Admin") && (
                  <Link to={"/home/nps"}>
                    <button
                      className={nav.includes("nps") ? "active" : ""}
                      onClick={() => handleButtonClick("nps")}
                    >
                      NPS
                    </button>
                  </Link>
                )}
              <Link
                to={"https://studiomix.tech/home"}
                onClick={() => handleButtonClick("")}
                className="logoStudio"
              >
                <img src="/studio.svg" alt="MixConnect" draggable="false" />
              </Link>
            </NavMenu>
            <PerfilMenu>
              {!findingUser ? (
                <Link
                  to={"/home/profile"}
                  onClick={() => handleButtonClick("")}
                >
                  <img src={user.avatar} id="perfil-img" draggable="false" />
                </Link>
              ) : (
                <img
                  src="/avatar-default.png"
                  id="perfil-img"
                  draggable="false"
                />
              )}
              <button onClick={signout}>
                <img src="/logout.svg" alt="Sair" title="Sair" />
              </button>
            </PerfilMenu>
          </Nav>
        </div>
      </Header>
      <Outlet />
    </>
  );
}
