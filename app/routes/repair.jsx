import { useEffect, useState } from "react";
import "../tabla.css";
import styles from "../policy.module.css";
import { useNavigate, useParams } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import { useInfoStore } from "../store";

export function meta({}) {
  return [
    { title: "SmartRide" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Repair() {
  const [repair, setRepair] = useState({});

  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const user = useInfoStore((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://seguros-vehiculos-backend-production.up.railway.app/repair/" +
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
        setRepair(result);
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
            {user.documento == repair.cliente_doc ? (
              <>
                <h1 className="text-5xl font-bold pt-16 text-center">
                  Información de reparación
                </h1>
                <div className="pt-16 grid grid-cols-1 sm:grid-cols-2 w-[80%] gap-8">
                  <div className="w-[95%] wrap-break-word">
                    <span className="font-bold">Identificador: </span>{" "}
                    {String(repair.id).padStart(6,"0")}
                  </div>
                  <div className="w-[95%] wrap-break-word">
                    <span className="font-bold">Descripción: </span>{" "}
                    {repair.descripcion}
                  </div>
                  <div className="w-[95%] wrap-break-word">
                    <span className="font-bold">Monto: </span> {repair.monto}
                  </div>
                </div>
                <h2 className="text-3xl font-bold pt-16 text-center w-[90%]">
                  Información del taller
                </h2>
                <div className="pt-16 grid grid-cols-1 sm:grid-cols-2 w-[80%] gap-8">
                  <div className="w-[95%] wrap-break-word">
                    <span className="font-bold">RIF: </span> {repair.taller.rif}
                  </div>
                  <div className="w-[95%] wrap-break-word">
                    <span className="font-bold">Nombre: </span>
                    {repair.taller.nombre}
                  </div>
                  <div className="w-[95%] wrap-break-word">
                    <span className="font-bold">Dirección: </span>
                    {repair.taller.direccion}
                  </div>
                  <div className="w-[95%] wrap-break-word">
                    <span className="font-bold">Correo: </span>
                    {repair.taller.correo}
                  </div>
                  <div className="w-[95%] wrap-break-word">
                    <span className="font-bold">Telefono: </span>
                    {repair.taller.telefono}
                  </div>
                </div>
                <h2 className="text-3xl font-bold pt-16 text-center w-[90%]">
                  Información de los repuestos de la reparación
                </h2>
                <div className={styles.vehiclesList}>
                  {repair.repuestos.map((repuesto) => (
                    <div key={repuesto.id} className={`${styles.vehicleItem}`}>
                      <div className={styles.vehicleInfo}>
                        <span className={styles.vehiclePlate}>
                          {String(repuesto.id).padStart(6, "0")}
                        </span>
                        <span>Nombre: {repuesto.nombre}</span>
                        <span className=" w-[95%] wrap-break-word">
                          Cantidad: {repuesto.cantidad}
                        </span>
                        <span>Precio: {repuesto.precio}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <h2 className="text-3xl font-bold pt-16 text-center w-[90%]">
                  Información de los pagos de la reparación
                </h2>
                <div className={styles.vehiclesList}>
                  {repair.pagos.map((pago) => (
                    <div key={pago.id} className={`${styles.vehicleItem}`}>
                      <div className={styles.vehicleInfo}>
                        <span className={styles.vehiclePlate}>
                          {String(pago.id).padStart(6, "0")}
                        </span>
                        <span>Pagante: {pago.pagante}</span>
                        <span className=" w-[95%] wrap-break-word">
                          Monto: {pago.monto}
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
          <div> cargando</div>
        )}
      </main>
    </ProtectedRoute>
  );
}
