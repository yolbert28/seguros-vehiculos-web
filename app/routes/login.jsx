import { useRef, useState } from "react";
import "../tabla.css";
import { useNavigate } from "react-router";
import { useInfoStore } from "../store";

export function meta({}) {
  return [
    { title: "SmartRide" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Login() {
  const document = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();
  const [status, setStatus] = useState(200);

  const login = useInfoStore((status) => status.login);

  const handlerClick = async () => {
    const documentValue = document.current?.value;
    const passwordValue = password.current?.value;
    console.log("Response status:");

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

    console.log(response.status);
    if(response.status == 401)
      setStatus(401)
    else if (!response.ok) {
      console.log("Error");
    } else {
      const result = await response.json();
      console.log(result);

      login(result.token,result.user);

      navigate("/profile");
    }
  };

  return (
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
          />
        </div>
        <div className="flex flex-col items-center max-w-96 w-full">
          <span className="font-bold w-full">Contraseña: </span> <br />
          <input
            id="password"
            className=" bg-[#FAFDFF] text-[#002651] border-amber-500 border-1 rounded-md max-w-96 w-full h-12 resize-none"
            ref={password}
          />
        </div>
        {(status == 200) ? (<></>):(<p className="text-[#ff3939] text-lg absolute bottom-38">Credenciales incorrectas</p>)}
        <div
          className="bg-[#0057B4] max-w-96 w-full text-center py-6 mt-16 mb-12 text-2xl font-bold text-[#FAFDFF] rounded-2xl active:bg-[#0057B4]"
          onClick={handlerClick}
        >
          Ingresar
        </div>
      </div>
    </main>
  );
}
