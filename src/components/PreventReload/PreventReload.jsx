import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function PreventReload() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = ""; // Para alguns navegadores
      // Redireciona para a mesma página
      console.log("aqui");
      navigate(location.pathname + location.search);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Remove o listener ao desmontar o componente
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [location, navigate]);

  return null;
}

export default PreventReload;
