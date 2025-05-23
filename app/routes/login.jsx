import { useRef, useState } from "react";
import "../tabla.css";
import { useNavigate } from "react-router";
import { useInfoStore } from "../store";
import ProtectedLoginRoute from "./ProtectedLoginRoute";

export function meta({}) {
  return [
    { title: "SmartRide" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Login() {
  const document = useRef(null);
  const password = useRef(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [status, setStatus] = useState(200);

  const login = useInfoStore((status) => status.login);

  const validateForm = () => {
    const documentValue = document.current?.value.trim();
    const passwordValue = password.current?.value.trim();

    if (!documentValue) {
      setError("El documento no puede estar vacío");
      return false;
    }
    
    if (!/^\d+$/.test(documentValue)) {
      setError("El documento solo puede contener números");
      return false;
    }

    if (documentValue.length < 7 || documentValue.length > 8) {
      setError("El documento debe tener entre 7 y 8 caracteres");
      return false;
    }

    if (!passwordValue) {
      setError("La contraseña no puede estar vacía");
      return false;
    }

    if (passwordValue.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return false;
    }

    if (passwordValue.length > 20) {
      setError("La contraseña no debe tener más de 20 caracteres");
      return false;
    }

    setError("");
    return true;
  };

  const handlerClick = async () => {
    if (!validateForm()) {
      return;
    }

    const documentValue = document.current?.value;
    const passwordValue = password.current?.value;

    console.log("documento", documentValue);

    const response = await fetch(
      "https://seguros-vehiculos-backend-production.up.railway.app/client/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          documento: documentValue,
          contrasena: passwordValue,
        }),
        // ...
      }
    );

    console.log("Response status:",response);
    if (response.status == 400) 
      setError("Credenciales incorrectas");
    else if (!response.ok) {
      console.log("Error");
    } else {
      const result = await response.json();
      console.log(result);

      login(result.token, result.user);

      navigate("/profile");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handlerClick();
    }
  };

  return (
    <ProtectedLoginRoute>
      <main className="text-[#81b9f9] bg-[#003366] flex flex-col items-center w-full h-full">
        <h1 className="text-5xl font-bold pt-24 text-center w-[90%]">
          Iniciar Sesion
        </h1>
        <div className="pt-16 flex flex-col items-center w-[80%] gap-8 relative">
          <div className="flex flex-col items-center max-w-96 w-full">
            <span className="font-bold w-full">Documento: </span>
            <br />
            <input
              id="document"
              className=" bg-[#FAFDFF] text-[#002651] border-amber-500 border-1 rounded-md max-w-96 w-full h-12 resize-none"
              ref={document}
              onChange={validateForm} // Validar mientras escribe
              onBlur={validateForm} // Validar al salir del campo
              onKeyDown={handleKeyDown}  // <- Aquí añadimos el manejador
            />
          </div>
          <div className="flex flex-col items-center max-w-96 w-full">
            <span className="font-bold w-full">Contraseña: </span> <br />
            <input
              type="password"
              id="password"
              className=" bg-[#FAFDFF] text-[#002651] border-amber-500 border-1 rounded-md max-w-96 w-full h-12 resize-none"
              ref={password}
              onChange={validateForm} // Validar mientras escribe
              onBlur={validateForm} // Validar al salir del campo
              onKeyDown={handleKeyDown}  // <- Aquí añadimos el manejador
            />
          </div>
          {!error ? (
            <></>
          ) : (
            <p className="text-[#ff3939] text-lg absolute bottom-38 sm:bottom-44">{error}</p>
          )}
          <div
            className="bg-[#0057B4] max-w-96 w-full text-center py-6 mt-16 mb-12 text-2xl font-bold text-[#FAFDFF] rounded-2xl active:bg-[#5377c7]"
            onClick={handlerClick}
          >
            Ingresar
          </div>
        </div>
      </main>
    </ProtectedLoginRoute>
  );
}
