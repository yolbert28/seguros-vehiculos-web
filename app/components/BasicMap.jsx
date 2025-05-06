import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Solución para los iconos que no se muestran
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import LocateButton from "./LocateButton";

// Configurar los iconos por defecto
const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Componente para manejar los eventos del mapa
function MapEvents({ setPosition }) {
  useMapEvents({
    click(e) {
      // Actualizar la posición cuando se hace click en el mapa
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

const BasicMap = ({getPosition = () => {} }) => {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPosition(position);
  }, [position])

  useEffect(() => {
    // Verificar si el navegador soporta geolocalización
    if (!navigator.geolocation) {
      setError("Geolocalización no soportada por tu navegador");
    } else {
      // Obtener la ubicación actual
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
        },
        (err) => {
          setError(err.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    }
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!position) {
    return <div>Cargando ubicación...</div>;
  }

  return (
    <div className="w-full rounded-lg overflow-hidden">
      <MapContainer 
        center={position} 
        zoom={13} 
        className="h-[400px] w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            Posición seleccionada <br />
            Latitud: {position[0].toFixed(4)} <br />
            Longitud: {position[1].toFixed(4)}
          </Popup>
        </Marker>
        <MapEvents setPosition={setPosition} />
        <LocateButton setPosition={setPosition}/>
      </MapContainer>
    </div>
  );
};

export default BasicMap;