import { useEffect, useState } from "react";
import "../tabla.css";
import styles from "../policy.module.css";
import { Link, useNavigate } from "react-router";

export function meta({}) {
  return [
    { title: "SmartRide" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Profile() {
  const [showPolicy, setShowPolicy] = useState(false);
  const [showVehicle, setShowVehicle] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const navigate = useNavigate();

  const [user, setUser] = useState({
    documento: "30601662",
    nombre: "Yolbert Torrealba",
    correo: "yolberttorrealba@gmail.com",
    telefono: "0414-1234567",
    direccion: "Calle 1, casa 2",
  });

  const [policy, setPolicy] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [accidentReport, setAccidentReport] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://seguros-vehiculos-backend-production.up.railway.app/policy/client/" +
            user.documento,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const response1 = await fetch(
          "https://seguros-vehiculos-backend-production.up.railway.app/vehicle/client/" +
            user.documento,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const response2 = await fetch(
          "https://seguros-vehiculos-backend-production.up.railway.app/accidentReport/client/" +
            user.documento,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const result = await response.json();
        const result1 = await response1.json();
        const result2 = await response2.json();
        setPolicy(result);
        setVehicles(result1);
        setAccidentReport(result2);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (!policy || !vehicles || !accidentReport) setLoading(false);

  return (
    <main className="text-[#002651] flex flex-col items-center max-w-[1000px] w-full">
      <h1 className="text-5xl font-bold pt-16 text-center">Mi perfil</h1>
      {!loading ? (
        <>
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
          <Link
            className="bg-[#003366] py-6 px-16 mt-12 mb-12 text-2xl font-bold text-[#FAFDFF] rounded-2xl active:bg-[#0057B4]"
            to="/report/306016362"
          >
            Reportar siniestro
          </Link>
          <h2
            className="text-3xl font-bold py-16 text-center w-[90%] border-y-[#003366] border-t-3 "
            onClick={() => setShowPolicy(!showPolicy)}
          >
            Informacion de polizas
          </h2>
          <div
            className={styles.vehiclesList}
            style={showPolicy ? {} : { display: "none" }}
          >
            {policy.map((policy) => (
              <div key={policy.id} className={`${styles.vehicleItem}`}  onClick={() => navigate("/policy/" + policy.id)}>
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
          <h2
            className="text-3xl font-bold py-16 text-center w-[90%] border-y-[#003366] border-t-3 "
            onClick={() => setShowVehicle(!showVehicle)}
          >
            Informacion de vehículos
          </h2>
          <div
            className={styles.vehiclesList}
            style={showVehicle ? {} : { display: "none" }}
          >
            {vehicles.map((vehicle) => (
              <div key={vehicle.matricula} className={`${styles.vehicleItem}`} onClick={() => navigate("/vehicle/" + vehicle.matricula)}>
                <div className={styles.vehicleInfo}>
                  <span className={styles.vehiclePlate}>
                    {vehicle.matricula}
                  </span>
                  <span>{vehicle.marca} - {vehicle.modelo}</span>
                  <span>Año: {vehicle.anno}</span>
                  <span>Capacidad de carga: {vehicle.capacidad_carga}</span>
                  <span>Valoración: ${vehicle.valoracion}</span>
                </div>
              </div>
            ))}
          </div>
          <h2
            className="text-3xl font-bold py-16 text-center w-[90%] border-y-[#003366] border-t-3 "
            onClick={() => setShowReport(!showReport)}
          >
            Informacion de reportes de siniestro
          </h2>
          <div
            className={styles.vehiclesList}
            style={showReport ? {} : { display: "none" }}
          >
            {accidentReport.map((report) => (
              <div key={report.id} className={`${styles.vehicleItem}`}  onClick={() => navigate("/accidentReport/" + report.id)}>
                <div className={styles.vehicleInfo}>
                  <span className={styles.vehiclePlate}>
                    {String(report.id).padStart(6, "0")}
                  </span>
                  <span>Descripcion: {report.descripcion}</span>
                  <span>Direccion: {report.direccion}</span>
                  <span>Fecha: {report.fecha}</span>
                  <span>
                    Estado: {report.atendido ? "Atendido" : "Pendiente"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>Cargando</div>
      )}
    </main>
  );
}
