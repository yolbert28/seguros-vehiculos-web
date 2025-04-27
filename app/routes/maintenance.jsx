import { useEffect, useState } from "react";
import "../tabla.css";
import { useNavigate, useParams } from "react-router";

export function meta({}) {
  return [
    { title: "SmartRide" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Maintenance() {
  const [maintenance, setMaintenance] = useState({});
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://seguros-vehiculos-backend-production.up.railway.app/maintenance/" +
            id,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        console.log(result);
        setMaintenance(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="text-[#002651] flex flex-col items-center max-w-[1000px] w-full">
      <h1 className="text-5xl font-bold pt-16 text-center">
        Información de mantenimiento
      </h1>
      {!loading ? (
        <>
          <div className="pt-16 grid grid-cols-1 sm:grid-cols-2 w-[80%] gap-8">
            <div className="w-[95%] wrap-break-word">
              <span className="font-bold">Identificador: </span>{" "}
              {maintenance.id}
            </div>
            <div className="w-[95%] wrap-break-word">
              <span className="font-bold">Matricula del vehículo: </span>{" "}
              {maintenance.vehiculo_mat}
            </div>
            <div className="w-[95%] wrap-break-word">
              <span className="font-bold">Descripcion: </span>{" "}
              {maintenance.descripcion}
            </div>
            <div className="w-[95%] wrap-break-word">
              <span className="font-bold">fecha: </span>
              {maintenance.fecha}
            </div>
          </div>
          <h2 className="text-3xl font-bold pt-16 text-center w-[90%]">
            Información de taller
          </h2>
          <div className="pt-16 grid grid-cols-1 sm:grid-cols-2 w-[80%] gap-8">
            <div className="w-[95%] wrap-break-word">
              <span className="font-bold">RIF:</span>
              {maintenance.taller.rif}
            </div>
            <div className="w-[95%] wrap-break-word">
              <span className="font-bold">Nombre: </span>
              {maintenance.taller.nombre}
            </div>
            <div className="w-[95%] wrap-break-word">
              <span className="font-bold">Dirección: </span>{" "}
              {maintenance.taller.direccion}
            </div>
            <div className="w-[95%] wrap-break-word">
              <span className="font-bold">Correo: </span>
              {maintenance.taller.correo}
            </div>
            <div className="w-[95%] wrap-break-word">
              <span className="font-bold">Telefono: </span>
              {maintenance.taller.telefono}
            </div>
          </div>
          <button
            className="bg-[#003366] py-6 px-28 mt-12 mb-16 text-2xl font-bold text-[#FAFDFF] rounded-2xl active:bg-[#0057B4]"
            onClick={() => {
              navigate(-1);
            }}
          >
            Volver
          </button>
        </>
      ) : (
        <div> cargando</div>
      )}
    </main>
  );
}
