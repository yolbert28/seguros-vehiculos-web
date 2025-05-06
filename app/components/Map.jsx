import { MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Solución para los iconos que no se muestran
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

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

const Map = ({position}) => {

  return (
    <div className="w-full flex flex-col items-center rounded-lg overflow-hidden mt-12">
      <MapContainer 
        center={position} 
        zoom={13} 
        className="h-[400px] w-full max-w-[90%]"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            Posición <br />
            Latitud: {position[0]} <br />
            Longitud: {position[1]}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;