import { useRef, useState } from "react";
import "../tabla.css";
import { useNavigate, useParams } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import { useInfoStore } from "../store";
import BasicMap from "../components/BasicMap";

export function meta({}) {
  return [
    { title: "SmartRide" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Report() {
  const description = useRef(null);
  const [address, setAddress] = useState(null);
  const navigate = useNavigate();

  const user = useInfoStore((state) => state.user);

  const handlerClick = async () => {
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
    navigate(`/accidentReport/${result.id}`);
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
            />
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
