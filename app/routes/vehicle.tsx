import { useState } from "react";
import "../tabla.css";
import styles from "../policy.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SmartRide" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Vehicle() {
  const [vehicle, setVehicle] = useState({
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
    poliza: {
      id: 3,
      cliente_doc: "30601662",
      asesor_doc: "30601362",
      fecha_creacion: "2025-03-15",
      fecha_fin: "2025-04-22",
      tipo_pago: 1,
      vehicles: [
        {
          matricula: "SD95k3D",
          poliza_id: 3,
          modelo_id: 1,
          riesgo_id: 2,
          capacidad_carga: 1000,
          anno: 2002,
          valoracion: 1000,
          ultima_actualizacion: "2025-04-08",
        },
        {
          matricula: "A41CD8S",
          poliza_id: 3,
          modelo_id: 1,
          riesgo_id: 2,
          capacidad_carga: 8000,
          anno: 1969,
          valoracion: 10000,
          ultima_actualizacion: "2025-04-12",
        },
      ],
      primas: [
        {
          id: 4,
          poliza_id: 3,
          monto: 664.89,
          fecha: "2024-02-14",
        },
      ],
      asesor: {
        documento: "30601362",
        nombre: "Yolbert",
        correo: "yolbert3@gmail.com",
        telefono: "04123113313",
        tipo_empleado_id: 2,
      },
    },
    mantenimientos: [
      {
        id: 1,
        vehiculo_mat: "SD95k3D",
        taller_rif: "V30016d624",
        descripcion: "cambio de aceite",
        fecha: "2025-03-22",
      },
      {
        id: 3,
        vehiculo_mat: "SD95k3D",
        taller_rif: "V30016d624",
        descripcion: "reparacion motor",
        fecha: "2025-03-12",
      },
      {
        id: 4,
        vehiculo_mat: "SD95k3D",
        taller_rif: "V30016d624",
        descripcion: "cambio de aceite",
        fecha: "2025-03-15",
      },
    ],
    siniestros: [
      {
        id: 1,
        reporte_siniestro_id: 2,
        vehiculo_mat: "SD95k3D",
        descripcion: "choque lateral",
        lugar: "barquisimeto",
        monto_estimado: 30000,
        tipo_siniestro_id: 1,
        fecha: "2025-04-05",
        estado: 3,
      },
    ],
  });

  return (
    <main className="text-[#002651] flex flex-col items-center max-w-[1000px] w-full">
      <h1 className="text-5xl font-bold pt-16 text-center">
        Información de vehículo
      </h1>
      <div className="pt-16 grid grid-cols-1 sm:grid-cols-2 w-[80%] gap-8">
        <div>
          <span className="font-bold">Matricula: </span> {vehicle.matricula}
        </div>
        <div>
          <span className="font-bold">Marca: </span> Chevrolet{}
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
          <span className="font-bold">Valoración:</span> {vehicle.valoracion}
        </div>
        <div>
          <span className="font-bold">Nivel de riesgo: </span>
          {vehicle.riesgo_id}
        </div>
        <div>
          <span className="font-bold">Ultima actualizacion: </span>
          {vehicle.ultima_actualizacion}
        </div>
      </div>
      <button className="bg-[#003366] py-6 px-16 mt-12 text-2xl font-bold text-[#FAFDFF] rounded-2xl active:bg-[#0057B4]">
        Reportar siniestro
      </button>
      <h2 className="text-3xl font-bold pt-16 text-center w-[90%]">
        Informacion de póliza
      </h2>
      <div className="pt-16 grid grid-cols-1 sm:grid-cols-2 w-[80%] gap-8">
        <div>
          <span className="font-bold">Identificador:</span> {vehicle.poliza.id}
        </div>
        <div>
          <span className="font-bold">Asesor:</span>{" "}
          {vehicle.poliza.asesor.nombre}
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
          {vehicle.poliza.tipo_pago}
        </div>
      </div>
      <h2 className="text-3xl font-bold pt-16 text-center w-[90%]">
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
      </div>
    </main>
  );
}
