import { useState } from "react";
import "../tabla.css";
import styles from "../policy.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SmartRide" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Sinister() {
  const [sinister, setSinister] = useState({
    id: 1,
    reporte_siniestro_id: 2,
    vehiculo_mat: "SD95k3D",
    descripcion: "choque lateral",
    lugar: "barquisimeto",
    monto_estimado: 30000,
    tipo_siniestro_id: 1,
    fecha: "2025-04-05",
    estado: 3,
    vehiculo: {
      matricula: "A41CD8S",
      poliza_id: 3,
      modelo_id: 1,
      riesgo_id: 2,
      capacidad_carga: 8000,
      anno: 1969,
      valoracion: 10000,
      ultima_actualizacion: "2025-04-12",
      modelo: {
        id: 1,
        marca_id: 3,
        nombre: "kodiak",
      },
    },
    evidencias: [
      {
        id: 2,
        siniestro_id: 1,
        tipo_evidencia: 2,
        ruta_archivo: "https://ruta.com",
      },
    ],
    inspeccionSiniestro: [
      {
        id: 1,
        siniestro_id: 1,
        inspector_doc: "30301662",
        descripcion: "choque",
        fecha: "2025-01-04",
      },
    ],
    indemnizacion: {
      id: 1,
      siniestro_id: 1,
      descripcion: "choque lateral",
      monto_reclamado: 25000,
      inspeccionIndemnizacion: [
        {
          id: 1,
          indemnizacion_id: 1,
          inspector_doc: "30301662",
          descripcion: "TODO FINO",
          fecha: "2024-05-03",
        },
        {
          id: 2,
          indemnizacion_id: 1,
          inspector_doc: "30301662",
          descripcion: "TODOO BUENO",
          fecha: "2024-09-04",
        },
      ],
      reparaciones: [
        {
          id: 3,
          indemnizacion_id: 1,
          taller_rif: "V30016d624",
          descripcion: "reparacion choque",
          monto: 25000,
        },
        {
          id: 4,
          indemnizacion_id: 1,
          taller_rif: "V30016d624",
          descripcion: "reparacion choque puerat",
          monto: 10000,
        },
      ],
    },
  });

  return (
    <main className="text-[#002651] flex flex-col items-center max-w-[1000px] w-full">
      <h1 className="text-5xl font-bold pt-16 text-center">
        Información de siniestro
      </h1>
      <div className="pt-16 grid grid-cols-1 sm:grid-cols-2 w-[80%] gap-8">
        <div>
          <span className="font-bold">Identificador: </span> {sinister.id}
        </div>
        <div>
          <span className="font-bold">Descripción: </span>{" "}
          {sinister.descripcion}
        </div>
        <div>
          <span className="font-bold">Lugar: </span>
          {sinister.lugar}
        </div>
        <div>
          <span className="font-bold">Monto estimado: </span>
          {sinister.monto_estimado}
        </div>
        <div>
          <span className="font-bold">Tipo de siniestro:</span>{" "}
          {sinister.tipo_siniestro_id}
        </div>
        <div>
          <span className="font-bold">Fecha: </span>
          {sinister.fecha}
        </div>
        <div>
          <span className="font-bold">Estado: </span>
          {sinister.estado}
        </div>
      </div>
      <h2 className="text-3xl font-bold pt-16 text-center w-[90%]">Vehículo</h2>
      <div className="pt-16 grid grid-cols-1 sm:grid-cols-2 w-[80%] gap-8">
        <div>
          <span className="font-bold">Matricula: </span> {sinister.vehiculo.matricula}
        </div>
        <div>
          <span className="font-bold">Marca: </span> Chevrolet{}
        </div>
        <div>
          <span className="font-bold">Modelo: </span>
          {sinister.vehiculo.modelo.nombre}
        </div>
        <div>
          <span className="font-bold">Año: </span>
          {sinister.vehiculo.anno}
        </div>
        <div>
          <span className="font-bold">Valoración:</span> {sinister.vehiculo.valoracion}
        </div>
        <div>
          <span className="font-bold">Nivel de riesgo: </span>
          {sinister.vehiculo.riesgo_id}
        </div>
        <div>
          <span className="font-bold">Ultima actualizacion: </span>
          {sinister.vehiculo.ultima_actualizacion}
        </div>
      </div>
      <h2 className="text-3xl font-bold pt-16 text-center w-[90%]">
        Evidencias
      </h2>
      <div className={styles.vehiclesList}>
        {sinister.evidencias.map((evidence) => (
          <div key={evidence.id} className={`${styles.vehicleItem}`}>
            <div className={styles.vehicleInfo}>
              <span className={styles.vehiclePlate}>
                {String(evidence.id).padStart(6, "0")}
              </span>
              <span>Tipo de evidencia: {evidence.tipo_evidencia}</span>
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
      <h2 className="text-3xl font-bold pt-16 text-center w-[90%]">
        Inspecciones
      </h2>
      <div className={styles.vehiclesList}>
        {sinister.indemnizacion.inspeccionIndemnizacion.map((inspection) => (
          <div key={inspection.id} className={`${styles.vehicleItem}`}>
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
      </div>
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
