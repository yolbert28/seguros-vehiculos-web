import { useEffect, useState } from "react";
import "../tabla.css";
import { useNavigate, useParams } from "react-router";
import { useInfoStore } from "../store";
import ProtectedRoute from "./ProtectedRoute";

export function meta({}) {
  return [
    { title: "SmartRide" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function AccidentReport() {
  const [report, setReport] = useState({});
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const user = useInfoStore((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://seguros-vehiculos-backend-production.up.railway.app/accidentReport/" +
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
        setReport(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  return (
    <ProtectedRoute>
      <main className="text-[#002651] flex flex-col items-center max-w-[1000px] w-full">
        {!loading ? (
          <>
            {user.documento == report.cliente_doc ? (
              <>
                <h1 className="text-5xl font-bold pt-16 text-center">
                  Información del reporte del siniestro
                </h1>
                <div className="pt-16 grid grid-cols-1 sm:grid-cols-2 w-[80%] gap-8">
                  <div className="w-[95%] wrap-break-word">
                    <span className="font-bold">Identificador: </span>{" "}
                    {String(report.id).padStart(6, "0")}
                  </div>
                  <div className="w-[95%] wrap-break-word">
                    <span className="font-bold">Descripción: </span>{" "}
                    {report.descripcion}
                  </div>
                  <div className="w-[95%] wrap-break-word">
                    <span className="font-bold">Dirección: </span>{" "}
                    {report.direccion}
                  </div>
                  <div className="w-[95%] wrap-break-word">
                    <span className="font-bold">fecha: </span>
                    {report.fecha}
                  </div>
                  <div className="w-[95%] wrap-break-word">
                    <span className="font-bold">Estado: </span>
                    {report.atendido ? "Pendiente" : "Finalizado"}
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
              <h1 className="text-5xl font-bold pt-16 text-center">
                No existe la página
              </h1>
            )}
          </>
        ) : (
          <div> cargando</div>
        )}
      </main>
    </ProtectedRoute>
  );
}
