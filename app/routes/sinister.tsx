import { useEffect, useState } from "react";
import "../tabla.css";
import styles from "../policy.module.css";
import { Link, useNavigate, useParams } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SmartRide" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Sinister() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [sinister, setSinister] = useState();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://seguros-vehiculos-backend-production.up.railway.app/sinister/" +
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
        setSinister(result);
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
        Información de siniestro
      </h1>
      {!loading ? (
        <>
          <div className="pt-16 grid grid-cols-1 sm:grid-cols-2 w-[80%] gap-8">
            <div className="w-[95%] wrap-break-word">
              <span className="font-bold">Identificador: </span> {sinister.id}
            </div>
            <div className="w-[95%] wrap-break-word">
              <span className="font-bold">Descripción: </span>{" "}
              {sinister.descripcion}
            </div>
            <div className="w-[95%] wrap-break-word">
              <span className="font-bold">Lugar: </span>
              {sinister.lugar}
            </div>
            <div className="w-[95%] wrap-break-word">
              <span className="font-bold">Monto estimado: </span>
              {sinister.monto_estimado}
            </div>
            <div className="w-[95%] wrap-break-word">
              <span className="font-bold">Tipo de siniestro:</span>{" "}
              {sinister.tipo_siniestro_id}
            </div>
            <div className="w-[95%] wrap-break-word">
              <span className="font-bold">Fecha: </span>
              {sinister.fecha}
            </div>
            <div className="w-[95%] wrap-break-word">
              <span className="font-bold">Estado: </span>
              {sinister.estado}
            </div>
          </div>
          <h2 className="text-3xl font-bold pt-16 text-center w-[90%]">
            Información del vehículo
          </h2>
          <div className="pt-16 grid grid-cols-1 sm:grid-cols-2 w-[80%] gap-8">
            <div className="w-[95%] wrap-break-word">
              <span className="font-bold">Matricula: </span>{" "}
              {sinister.vehiculo.matricula}
            </div>
            <div className="w-[95%] wrap-break-word">
              <span className="font-bold">Marca: </span> Chevrolet{}
            </div>
            <div className="w-[95%] wrap-break-word">
              <span className="font-bold">Modelo: </span>
              {sinister.vehiculo.modelo.nombre}
            </div>
            <div className="w-[95%] wrap-break-word">
              <span className="font-bold">Año: </span>
              {sinister.vehiculo.anno}
            </div>
            <div className="w-[95%] wrap-break-word">
              <span className="font-bold">Valoración:</span>{" "}
              {sinister.vehiculo.valoracion}
            </div>
            <div className="w-[95%] wrap-break-word">
              <span className="font-bold">Nivel de riesgo: </span>
              {sinister.vehiculo.riesgo_id}
            </div>
            <div className="w-[95%] wrap-break-word">
              <span className="font-bold">Ultima actualizacion: </span>
              {sinister.vehiculo.ultima_actualizacion}
            </div>
          </div>
          <Link
            className="bg-[#003366] py-6 px-16 mt-12 text-2xl font-bold text-[#FAFDFF] rounded-2xl active:bg-[#0057B4]"
            to={`/vehicle/${sinister.vehiculo.matricula}`}
          >
            Más información
          </Link>
          <h2 className="text-3xl font-bold pt-16 text-center w-[90%]">
            Inspección del siniestro
          </h2>
          <div className="pt-16 grid grid-cols-1 sm:grid-cols-2 w-[80%] gap-8">
            <div className="w-[95%] wrap-break-word">
              <span className="font-bold">Documento del inspector: </span>
              {sinister.inspeccionSiniestro.inspector_doc}
            </div>
            <div className="w-[95%] wrap-break-word">
              <span className="font-bold">Inspector: </span>{" "}
              {sinister.inspeccionSiniestro.inspector}
            </div>
            <div className="w-[95%] wrap-break-word">
              <span className="font-bold">Descripción: </span>
              {sinister.inspeccionSiniestro.descripcion}
            </div>
            <div className="w-[95%] wrap-break-word">
              <span className="font-bold">fecha: </span>
              {sinister.inspeccionSiniestro.fecha}
            </div>
          </div>
          <Link
            className="bg-[#003366] py-6 px-16 mt-12 text-2xl font-bold text-[#FAFDFF] rounded-2xl active:bg-[#0057B4]"
            to={`/accidentInspection/${sinister.inspeccionSiniestro.id}`}
          >
            Más información
          </Link>
          <h2 className="text-3xl font-bold pt-16 text-center w-[90%]">
            Evidencias del siniestro
          </h2>
          <div className={styles.vehiclesList}>
            {sinister.evidencias.map((evidence) => (
              <div
                key={evidence.id}
                className={`${styles.vehicleItem}`}
                onClick={() => {
                  navigate(`/evidence/${evidence.id}`);
                }}
              >
                <div className={styles.vehicleInfo}>
                  <span className={styles.vehiclePlate}>
                    {String(evidence.id).padStart(6, "0")}
                  </span>
                  <span>Tipo de evidencia: {evidence.nombre_tipo_evidencia}</span>
                  <span className=" w-[95%] wrap-break-word">
                    Ruta del archivo: {evidence.ruta_archivo}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <h2 className="text-3xl font-bold pt-16 text-center w-[90%]">
            Indemnización
          </h2>
          <div className="pt-16 grid grid-cols-1 sm:grid-cols-2 w-[80%] gap-8">
            <div>
              <span className="font-bold">Identificador:</span>{" "}
              {sinister.indemnizacion.id}
            </div>
            <div>
              <span className="font-bold">Descripción: </span>
              {sinister.indemnizacion.descripcion}
            </div>
            <div>
              <span className="font-bold">Monto reclamado: </span>
              {sinister.indemnizacion.monto_reclamado}
            </div>
          </div>
          <Link
            className="bg-[#003366] py-6 px-16 mt-12 mb-16 text-2xl font-bold text-[#FAFDFF] rounded-2xl active:bg-[#0057B4]"
            to={`/indemnity/${sinister.indemnizacion.id}`}
          >
            Más información
          </Link>
        </>
      ) : (
        <div>Cargando</div>
      )}
      {/* <h2 className="text-3xl font-bold pt-16 text-center w-[90%]">
        Inspecciones de la indemnizacion
      </h2>
      <div className={styles.vehiclesList}>
        {sinister.indemnizacion.inspeccionIndemnizacion.map((inspection) => (
          <div
            key={inspection.id}
            className={`${styles.vehicleItem}`}
            onClick={() => {
              navigate(`/indemnityInspection/${inspection.id}`);
            }}
          >
            <div className={styles.vehicleInfo}>
              <span className={styles.vehiclePlate}>
                {String(inspection.id).padStart(6, "0")}
              </span>
              <span>Documento del inspector: {inspection.inspector_doc}</span>
              <span className=" w-[95%] wrap-break-word">
                Descripción: {inspection.descripcion}
              </span>
            </div>
          </div>
        ))}
      </div>
      <h2 className="text-3xl font-bold pt-16 text-center w-[90%]">
        Reparaciones
      </h2>
      <div className={styles.vehiclesList}>
        {sinister.indemnizacion.reparaciones.map((repair) => (
          <div key={repair.id} className={`${styles.vehicleItem}`}>
            <div className={styles.vehicleInfo}>
              <span className={styles.vehiclePlate}>
                {String(repair.id).padStart(6, "0")}
              </span>
              <span>Taller RIF: {repair.taller_rif}</span>
              <span className=" w-[95%] wrap-break-word">
                Descripción: {repair.descripcion}
              </span>
              <span className=" w-[95%] wrap-break-word">
                Monto: {repair.monto}
              </span>
            </div>
          </div>
        ))}
      </div> */}
      {/* <h2 className="text-3xl font-bold pt-16 text-center w-[90%]">
        Informacion de mantenimientos
      </h2>
      <div className={styles.vehiclesList}>
        {vehicle.mantenimientos.map((maintenance) => (
          <div key={maintenance.id} className={`${styles.vehicleItem}`}>
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
          <div key={sinister.id} className={`${styles.vehicleItem}`}>
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
      </div> */}
    </main>
  );
}
