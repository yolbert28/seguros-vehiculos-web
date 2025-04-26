import { useState } from "react";
import "../tabla.css";
import styles from "../policy.module.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SmartRide" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Profile() {
  const [showPolicy, setShowPolicy] = useState(false);
  const [showVehicle, setShowVehicle] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const [user, setUser] = useState({
    documento: "30601662",
    nombre: "Yolbert Torrealba",
    correo: "yolberttorrealba@gmail.com",
    telefono: "0414-1234567",
    direccion: "Calle 1, casa 2",
  });

  const availablePolicy = [
    {
      id: 1,
      cliente_doc: "30601662",
      asesor_doc: "30301662",
      fecha_creacion: "2025-03-17",
      fecha_fin: "2025-04-15",
      tipo_pago: 2,
    },
    {
      id: 3,
      cliente_doc: "30601662",
      asesor_doc: "30601362",
      fecha_creacion: "2025-03-15",
      fecha_fin: "2025-04-22",
      tipo_pago: 1,
    },
    {
      id: 6,
      cliente_doc: "30601662",
      asesor_doc: "30301662",
      fecha_creacion: "2025-02-29",
      fecha_fin: "2025-05-12",
      tipo_pago: 2,
    },
    {
      id: 7,
      cliente_doc: "30601662",
      asesor_doc: "30601362",
      fecha_creacion: "2025-03-04",
      fecha_fin: "2025-04-12",
      tipo_pago: 1,
    },
    {
      id: 8,
      cliente_doc: "30601662",
      asesor_doc: "30601362",
      fecha_creacion: "2025-03-09",
      fecha_fin: "2025-08-03",
      tipo_pago: 2,
    },
  ];

  const vehicles = [
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
  ];

  const accidentReport = [
    {
      id: 2,
      cliente_doc: "30601662",
      descripcion: "choque ",
      direccion: "barquisimeto",
      fecha: "2025-04-05",
      atendido: 0,
    },
    {
      id: 5,
      cliente_doc: "30601662",
      descripcion: "choque fuerte",
      direccion: "barquisimeto",
      fecha: "2025-04-05",
      atendido: 0,
    },
  ];

  return (
    <main className="text-[#002651] flex flex-col items-center max-w-[1000px] w-full">
      <h1 className="text-5xl font-bold pt-16 text-center">Mi perfil</h1>
      <div className="pt-16 grid grid-cols-1 sm:grid-cols-2 w-[80%] gap-8">
        <div>
          <span className="font-bold">Nombre:</span> {user.nombre}
        </div>
        <div>
          <span className="font-bold">Correo:</span> {user.correo}
        </div>
        <div>
          <span className="font-bold">Telefono:</span> {user.telefono}
        </div>
        <div>
          <span className="font-bold">Dirección:</span> {user.direccion}
        </div>
      </div>
      <button className="bg-[#003366] py-6 px-16 mt-12 mb-12 text-2xl font-bold text-[#FAFDFF] rounded-2xl active:bg-[#0057B4]">
        Reportar siniestro
      </button>
      <h2 className="text-3xl font-bold py-16 text-center w-[90%] border-y-[#003366] border-t-3 "  onClick={() => setShowPolicy(!showPolicy)}>
        Informacion de polizas
      </h2>
      <div className={styles.vehiclesList} style={showPolicy ? { } : { display: "none" }} >
        {availablePolicy.map((policy) => (
          <div key={policy.id} className={`${styles.vehicleItem}`}>
            <div className={styles.vehicleInfo}>
              <span className={styles.vehiclePlate}>{policy.id}</span>
              <span>Asesor: {policy.cliente_doc}</span>
              <span>
                {policy.fecha_creacion} - {policy.fecha_fin}
              </span>
              <span>tipo de pago: {policy.tipo_pago}</span>
            </div>
          </div>
        ))}
      </div>
      <h2 className="text-3xl font-bold py-16 text-center w-[90%] border-y-[#003366] border-t-3 " onClick={() => setShowVehicle(!showVehicle)}>
        Informacion de vehículos
      </h2>
      <div className={styles.vehiclesList} style={showVehicle ? { } : { display: "none" }} >
        {vehicles.map((vehicle) => (
          <div key={vehicle.matricula} className={`${styles.vehicleItem}`}>
            <div className={styles.vehicleInfo}>
              <span className={styles.vehiclePlate}>{vehicle.matricula}</span>
              <span>marca - {vehicle.modelo_id}</span>
              <span>Año: {vehicle.anno}</span>
              <span>Capacidad de carga: {vehicle.capacidad_carga}</span>
              <span>Valoración: ${vehicle.valoracion}</span>
            </div>
          </div>
        ))}
      </div>
      <h2 className="text-3xl font-bold py-16 text-center w-[90%] border-y-[#003366] border-t-3 " onClick={() => setShowReport(!showReport)}>
        Informacion de reportes de siniestro
      </h2>
      <div className={styles.vehiclesList} style={showReport ? { } : { display: "none" }} >
        {accidentReport.map((report) => (
          <div key={report.id} className={`${styles.vehicleItem}`}>
            <div className={styles.vehicleInfo}>
              <span className={styles.vehiclePlate}>
                {String(report.id).padStart(6, "0")}
              </span>
              <span>Descripcion: {report.descripcion}</span>
              <span>Direccion: {report.direccion}</span>
              <span>Fecha: {report.fecha}</span>
              <span>Estado: {report.atendido ? "Atendido" : "Pendiente"}</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
