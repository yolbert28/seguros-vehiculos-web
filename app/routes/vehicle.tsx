import { useEffect, useState } from "react";
import "../tabla.css";
import styles from "../policy.module.css";
import { Link, redirect, useNavigate, useParams } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SmartRide" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Vehicle() {
  const [vehicle, setVehicle] = useState({});
  const { matricula } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://seguros-vehiculos-backend-production.up.railway.app/vehicle/" +
            matricula,
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
        setVehicle(result);
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
        Información de vehículo
      </h1>
      {!loading ? (
        <>
          <div className="pt-16 grid grid-cols-1 sm:grid-cols-2 w-[80%] gap-8">
            <div>
              <span className="font-bold">Matricula: </span> {vehicle.matricula}
            </div>
            <div>
              <span className="font-bold">Marca: </span> {vehicle.modelo.marca}
            </div>
            <div>
              <span className="font-bold">Modelo: </span>
              {vehicle.modelo.nombre}
            </div>
            <div>
              <span className="font-bold">Año: </span>
              {vehicle.anno}
            </div>
            <div>
              <span className="font-bold">Valoración:</span>{" "}
              {vehicle.valoracion}
            </div>
            <div>
              <span className="font-bold">Nivel de riesgo: </span>
              {vehicle.riesgo}
            </div>
            <div>
              <span className="font-bold">Ultima actualizacion: </span>
              {vehicle.ultima_actualizacion}
            </div>
          </div>
          <h2 className="text-3xl font-bold pt-16 text-center w-[90%]">
            Informacion de póliza
          </h2>
          <div className="pt-16 grid grid-cols-1 sm:grid-cols-2 w-[80%] gap-8">
            <div>
              <span className="font-bold">Identificador:</span>{" "}
              {vehicle.poliza.id}
            </div>
            <div>
              <span className="font-bold">Documento del asesor:</span>{" "}
              {vehicle.poliza.asesor_doc}
            </div>
            <div>
              <span className="font-bold">Asesor:</span> {vehicle.poliza.asesor}
            </div>
            <div>
              <span className="font-bold">Fecha de creacion:</span>{" "}
              {vehicle.poliza.fecha_creacion}
            </div>
            <div>
              <span className="font-bold">Fecha de finalizacion:</span>{" "}
              {vehicle.poliza.fecha_fin}
            </div>
            <div>
              <span className="font-bold">Monto total:</span>{" "}
              {vehicle.poliza.tipo_pago}
            </div>
            <div>
              <span className="font-bold">Tipo de pago:</span>{" "}
              {vehicle.poliza.nombre_tipo_pago}
            </div>
          </div>
          <Link
            className="bg-[#003366] py-6 px-16 mt-12 text-2xl font-bold text-[#FAFDFF] rounded-2xl active:bg-[#0057B4]"
            to={`/policy/${vehicle.poliza.id}`}
          >
            Más información
          </Link>
          <h2 className="text-3xl font-bold pt-16 text-center w-[90%]">
            Informacion de mantenimientos
          </h2>
          <div className={styles.vehiclesList}>
            {vehicle.mantenimientos.map((maintenance) => (
              <div key={maintenance.id} className={`${styles.vehicleItem}`} onClick={() => {
                navigate(`/maintenance/${maintenance.id}`);
              }}>
                <div className={styles.vehicleInfo}>
                  <span className={styles.vehiclePlate}>
                    {String(maintenance.id).padStart(6, "0")}
                  </span>
                  <span>Taller rif: {maintenance.taller_rif}</span>
                  <span className=" w-[95%] wrap-break-word">
                    descripcion: {maintenance.descripcion}
                  </span>
                  <span>fecha: {maintenance.fecha}</span>
                </div>
              </div>
            ))}
          </div>
          <h2 className="text-3xl font-bold pt-16 text-center w-[90%]">
            Informacion de siniestros
          </h2>
          <div className={styles.vehiclesList}>
            {vehicle.siniestros.map((sinister) => (
              <div
                key={sinister.id}
                className={`${styles.vehicleItem}`}
                onClick={() => {
                  navigate(`/sinister/${sinister.id}`);
                }}
              >
                <div className={styles.vehicleInfo}>
                  <span className={styles.vehiclePlate}>
                    {String(sinister.id).padStart(6, "0")}
                  </span>
                  <span>Descripción: {sinister.descripcion}</span>
                  <span className=" w-[95%] wrap-break-word">
                    Lugar: {sinister.lugar}
                  </span>
                  <span>fecha: {sinister.fecha}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div> cargando</div>
      )}
    </main>
  );
}
