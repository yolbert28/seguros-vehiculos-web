import { useEffect, useRef, useState } from "react";
import "../tabla.css";
import { useNavigate, useParams } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import { useInfoStore } from "../store";
import BasicMap from "../components/BasicMap";
import { io } from "socket.io-client";

export function meta({}) {
  return [
    { title: "SmartRide" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Report() {
  const description = useRef(null);
  const [address, setAddress] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);

  const navigate = useNavigate();

  const user = useInfoStore((state) => state.user);
  const token = useInfoStore((state) => state.token);

  useEffect(() => {

    console.log(token)
    // Verifica que el token exista antes de crear el socket
    if (!token) {
      console.error("No se proporcionó un token válido");
      return;
    }

    console.log("token: ",token)
    // Configuración inicial del socket con opciones mejoradas
    const socketInstance = io(
      "wss://seguros-vehiculos-backend-production.up.railway.app",
      {
        auth: {
          token: token,
          serverOffset: 0,
        },
        transports: ["websocket"], // Forzar transporte WebSocket
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        timeout: 20000, // Aumentar tiempo de espera
        withCredentials: true,
        secure: true, // Asegurar conexión segura
      }
    );

    setSocket(socketInstance);

    // Manejadores de eventos mejorados
    socketInstance.on("connect", () => {
      console.log("Conexión WebSocket establecida");
    });

    socketInstance.on("connect_error", (error) => {
      console.error("Error de conexión:", error.message);
      // Intentar reconexión manual si es necesario
      setTimeout(() => socketInstance.connect(), 5000);
    });

    socketInstance.on("report", (msg) => {
      console.log("Reporte recibido:", msg);
    });

    socketInstance.on("unauthorized", (msg) => {
      console.error("No autorizado:", msg);
      // Manejar error de autenticación
    });

    socketInstance.on("disconnect", (reason) => {
      console.log("Desconectado:", reason);
      if (reason === "io server disconnect") {
        // El servidor desconectó deliberadamente, podrías necesitar reautenticar
        socketInstance.connect();
      }
    });

    // Limpieza al desmontar el componente
    return () => {
      socketInstance.off("connect");
      socketInstance.off("connect_error");
      socketInstance.off("report");
      socketInstance.off("unauthorized");
      socketInstance.off("disconnect");
      socketInstance.disconnect();
    };
  }, [token]); // Añadir token como dependencia

  const validateForm = () => {
    const descriptionValue = description.current?.value.trim();

    if (!descriptionValue) {
      setError("La descripción no puede estar vacía");
      return false;
    }

    if (descriptionValue.length < 10) {
      setError("La descripción debe tener al menos 10 caracteres");
      return false;
    }

    setError("");
    return true;
  };

  const handlerClick = async () => {
    if (!validateForm()) {
      return;
    }
    const descriptionValue = description.current?.value;
    const addressValue = address.toString();
    const date = new Date().toISOString().slice(0, 10);

    const response = await fetch(
      "https://seguros-vehiculos-backend-production.up.railway.app/accidentReport",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cliente_doc: user.documento,
          descripcion: descriptionValue,
          direccion: addressValue,
          fecha: date,
        }),
        // ...
      }
    );

    const result = await response.json();
    socket.emit("report");
    navigate(`/accidentReport/${result.id}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handlerClick();
    }
  };

  return (
    <ProtectedRoute>
      <main className="text-[#002651] flex flex-col items-center max-w-[1000px] w-full">
        <h1 className="text-5xl font-bold pt-16 text-center w-[90%]">
          Reportar un sinistro
        </h1>
        <div className="pt-16 grid grid-cols-1 w-[80%] gap-8">
          <div>
            <span className="font-bold">Descripción: </span>
            <br />
            <textarea
              id="description"
              className=" bg-[#FAFDFF] border-amber-500 border-1 rounded-md w-full h-32 resize-none"
              ref={description}
              minLength={5}
              maxLength={450}
              onChange={validateForm} // Validar mientras escribe
              onBlur={validateForm} // Validar al salir del campo
              onKeyDown={handleKeyDown} // <- Aquí añadimos el manejador
            />
            <p className="text-sm text-red-500 ">{error}</p>
          </div>
          <div>
            <span className="font-bold">Dirección: </span> <br />
            {/* <textarea
              id="address"
              className=" bg-[#FAFDFF] border-amber-500 border-1 rounded-md w-full h-24 resize-none"
              ref={address}
            /> */}
            <BasicMap getPosition={setAddress} />
          </div>
        </div>
        <div
          className="bg-[#003366] py-6 px-16 mt-12 mb-12 text-2xl font-bold text-[#FAFDFF] rounded-2xl active:bg-[#0057B4]"
          onClick={handlerClick}
        >
          Reportar siniestro
        </div>
        <button
          className="bg-[#003366] py-6 px-28 mt-12 mb-16 text-2xl font-bold text-[#FAFDFF] rounded-2xl active:bg-[#0057B4]"
          onClick={() => {
            navigate(-1);
          }}
        >
          Volver
        </button>
      </main>
    </ProtectedRoute>
  );
}
