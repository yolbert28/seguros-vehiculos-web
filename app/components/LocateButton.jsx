import { useMap } from "react-leaflet";

export default function LocateButton({ setPosition }) {
  const map = useMap();
  
  const handleClick = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const newPos = [pos.coords.latitude, pos.coords.longitude];
        setPosition(newPos);
        map.flyTo(newPos, map.getZoom());
      },
      (err) => alert(err.message)
    );
  };

  return (
    <button
      onClick={handleClick}
      className="leaflet-control-locate bg-[#003366] text-[#FAFDFF] font-bold text-md p-2 rounded shadow-md absolute bottom-4 right-4 z-[1000]"
    >
      Mi ubicación
    </button>
  );
}