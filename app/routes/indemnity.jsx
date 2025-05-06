import { useEffect, useState } from "react";
import "../tabla.css";
import styles from "../policy.module.css";
import { useNavigate, useParams } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import { useInfoStore } from "../store";
import Loading from "../components/Loading";

export function meta({}) {
  return [
    { title: "SmartRide" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Indemnity() {
  const [indemnity, setIndemnity] = useState({});
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const user = useInfoStore((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://seguros-vehiculos-backend-production.up.railway.app/indemnity/" +
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
        setIndemnity(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <ProtectedRoute>
      <main className="text-[#002651] flex flex-col items-center max-w-[1000px] w-full">
        {!loading ? (
          <>
            {user.documento == indemnity.cliente_doc ? (
              <>
                <h1 className="text-5xl font-bold pt-16 text-center">
                  Información de indemnización
                </h1>
                <div className="pt-16 grid grid-cols-1 sm:grid-cols-2 w-[80%] gap-8">
                  <div className="w-[95%] wrap-break-word">
                    <span className="font-bold">Identificador: </span>{" "}
                    {String(indemnity.id).padStart(6,"0")}
                  </div>
                  <div className="w-[95%] wrap-break-word">
                    <span className="font-bold">Descripción: </span>{" "}
                    {indemnity.descripcion}
                  </div>
                  <div className="w-[95%] wrap-break-word">
                    <span className="font-bold">Monto reclamado: </span>{" "}
                    {indemnity.monto_reclamado}
                  </div>
                </div>
                <h2 className="text-3xl font-bold pt-16 text-center w-[90%]">
                  Información de reparaciones
                </h2>
                <div className={styles.vehiclesList}>
                  {indemnity.reparaciones.map((reparacion) => (
                    <div
                      key={reparacion.id}
                      className={`${styles.vehicleItem}`}
                      onClick={() => {
                        navigate(`/repair/${reparacion.id}`);
                      }}
                    >
                      <div className={styles.vehicleInfo}>
                        <span className={styles.vehiclePlate}>
                          {String(reparacion.id).padStart(6, "0")}
                        </span>
                        <span className="w-[95%] wrap-break-word">
                          Taller rif: {reparacion.taller_rif}
                        </span>
                        <span className=" w-[95%] wrap-break-word">
                          Descripcion: {reparacion.descripcion}
                        </span>
                        <span className="w-[95%] wrap-break-word">
                          Monto: {reparacion.monto}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <h2 className="text-3xl font-bold pt-16 text-center w-[90%]">
                  Información de inspecciones de indemnización
                </h2>
                <div className={styles.vehiclesList}>
                  {indemnity.inspeccionIndemnizacion.map((inspeccion) => (
                    <div
                      key={inspeccion.id}
                      className={`${styles.vehicleItem}`}
                    >
                      <div className={styles.vehicleInfo}>
                        <span className={styles.vehiclePlate}>
                          {String(inspeccion.id).padStart(6, "0")}
                        </span>
                        <span className="w-[95%] wrap-break-word">
                          Inspector: {inspeccion.inspector_doc}
                        </span>
                        <span className=" w-[95%] wrap-break-word">
                          Descripcion: {inspeccion.descripcion}
                        </span>
                      </div>
                    </div>
                  ))}
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
          <Loading/>
        )}
      </main>
    </ProtectedRoute>
  );
}
