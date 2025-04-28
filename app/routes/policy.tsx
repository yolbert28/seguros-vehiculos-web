import { useEffect, useState } from "react";
import "../tabla.css";
import styles from "../policy.module.css";
import { redirect, useNavigate } from "react-router";
import { useParams } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SmartRide" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Policy() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [policy, setPolicy] = useState({});

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://seguros-vehiculos-backend-production.up.railway.app/policy/" +
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
        setPolicy(result);
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
        Información de póliza
      </h1>
      {!loading ? ( <>
      <div className="pt-16 grid grid-cols-1 sm:grid-cols-2 w-[80%] gap-8">
        <div>
          <span className="font-bold">Identificador:</span> {policy.id}
        </div>
        <div>
          <span className="font-bold">Asesor:</span> {policy.asesor.nombre}
        </div>
        <div>
          <span className="font-bold">Fecha de creacion:</span>{" "}
          {policy.fecha_creacion}
        </div>
        <div>
          <span className="font-bold">Fecha de finalizacion:</span>{" "}
          {policy.fecha_fin}
        </div>
        <div>
          <span className="font-bold">Monto total:</span> {policy.tipo_pago}
        </div>
        <div>
          <span className="font-bold">Tipo de pago:</span> {policy.tipo_pago}
        </div>
      </div>
      {/* <button className="bg-[#003366] py-6 px-16 mt-12 text-2xl font-bold text-[#FAFDFF] rounded-2xl active:bg-[#0057B4]">
        Reportar siniestro
      </button> */}
      <h2 className="text-3xl font-bold pt-16 text-center w-[90%]">
        Informacion de vehículos
      </h2>
      <div className={styles.vehiclesList}>
        {policy.vehiculos.map((vehiculo) => (
          <div
            key={vehiculo.matricula}
            className={`${styles.vehicleItem}`}
            onClick={() => {
              navigate(`/vehicle/${vehiculo.matricula}`);
            }}
          >
            <div className={styles.vehicleInfo}>
              <span className={styles.vehiclePlate}>{vehiculo.matricula}</span>
              <span>{vehiculo.marca} - {vehiculo.modelo}</span>
              <span>Año: {vehiculo.anno}</span>
              <span>Capacidad de carga: {vehiculo.capacidad_carga}</span>
              <span>Valoracion: ${vehiculo.valoracion}</span>
            </div>
          </div>
        ))}
      </div>
      <h2 className="text-3xl font-bold pt-16 text-center w-[90%]">
        Informacion de primas
      </h2>
      <div className={styles.vehiclesList}>
        {policy.primas.map((prima) => (
          <div key={prima.id} className={`${styles.vehicleItem}`}>
            <div className={styles.vehicleInfo}>
              <span className={styles.vehiclePlate}>
                {String(prima.id).padStart(6, "0")}
              </span>
              <span>Monto: {prima.monto}</span>
              <span>Fecha: {prima.fecha}</span>
            </div>
          </div>
        ))}
      </div>
      {/* <h2 className="text-3xl font-bold pt-16 text-center w-[90%]">Informacion de coberturas</h2>
      <div className={styles.vehiclesList}>
        {policy.coberturas.map((cobertura) => (
          <div key={cobertura.id} className={`${styles.vehicleItem}`}>
            <div className={styles.vehicleInfo}>
              <span className={styles.vehiclePlate}>
                {String(cobertura.id).padStart(6, "0")}
              </span>
              <span>Nombre: {cobertura.nombre}</span>
              <span className=" w-[95%] wrap-break-word">
                Descripción: {cobertura.descripcion}
              </span>
            </div>
          </div>
        ))}
      </div> */}
    </>) : (<div>Cargando</div>)}
    </main>
  );
}
