import { useEffect, useState } from "react";
import "../tabla.css";
import styles from "../policy.module.css";
import { useNavigate, useParams } from "react-router";

export function meta({}) {
  return [
    { title: "SmartRide" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function AccidentInspection() {
  const [accidentInspection, setAccidentInspection] = useState({});
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://seguros-vehiculos-backend-production.up.railway.app/accidentInspection/" +
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
        setAccidentInspection(result);
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
        Información de inspección de siniestro
      </h1>
      {!loading ? (
        <>
          <div className="pt-16 grid grid-cols-1 sm:grid-cols-2 w-[80%] gap-8">
            <div className="w-[95%] wrap-break-word">
              <span className="font-bold">Identificador: </span>{" "}
              {accidentInspection.id}
            </div>
            <div className="w-[95%] wrap-break-word">
              <span className="font-bold">Documento del inspector: </span>{" "}
              {accidentInspection.inspector_doc}
            </div>
            <div className="w-[95%] wrap-break-word">
              <span className="font-bold">Inspector: </span>
              {accidentInspection.inspector.nombre}
            </div>
            <div className="w-[95%] wrap-break-word">
              <span className="font-bold">Descripción: </span>
              {accidentInspection.descripcion}
            </div>
          </div>
          <h2 className="text-3xl font-bold pt-16 text-center w-[90%]">
            Información de repuestos afectados en el siniestro
          </h2>
          <div className={styles.vehiclesList}>
            {accidentInspection.repuestos.map((repuesto) => (
              <div key={repuesto.id} className={`${styles.vehicleItem}`}>
                <div className={styles.vehicleInfo}>
                  <span className={styles.vehiclePlate}>
                    {String(repuesto.id).padStart(6, "0")}
                  </span>
                  <span>Nombre: {repuesto.nombre}</span>
                  <span>Cantidad: {repuesto.cantidad}</span>
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
        <div> Cargando</div>
      )}
    </main>
  );
}
