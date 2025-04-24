import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SmartRide" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <main className="w-full max-w-[1000px] bg-[#FAFDFF] ">
      <div className="w-full h-68 sm:h-[500px] relative" style={{ backgroundImage: "url('/cars.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className=" text-[#FAFDFF] font-bold bg-[#00336699]  h-full w-full backdrop-blur-[2px] text-center flex flex-col items-center">
          <h1 className="text-3xl sm:text-4xl pt-12 sm:pt-24">SmartRide Insurance</h1>
          <p className="pt-2 sm:pt-6 sm:text-2xl w-[90%]">
            Manejamos los imprevistos, tú maneja sin preocupaciones.
          </p>
        </div>
      </div>
      <div className="text-[#002651] font-bold text-center flex flex-col items-center">
        <h1 className="text-3xl pt-16">Nuestros servicios</h1>
        <p className="pt-12 w-[90%]">
          Seguro de Daños (Cobertura Amplia o Limitada): <br />
          <br />
          Protección contra accidentes, robos, incendios, fenómenos naturales y
          más, para que conduzcas con total tranquilidad.
        </p>
        <img src="/choque.jpg" alt="" className="w-[90%] py-12" />
      </div>
      <div className="text-[#002651] font-bold bg-[#B2DFFF] text-center flex flex-col items-center">
        <p className="pt-12 w-[90%]">
          Responsabilidad Civil: <br /> <br /> Amparo legal y económico ante
          daños a terceros en bienes o personas, cumpliendo con los requisitos
          legales y superando tus expectativas.
        </p>
        <img
          src="/responsabilidadCivil.webp"
          alt=""
          className="w-[90%] py-12"
        />
      </div>
      <div className="text-[#002651] font-bold text-center flex flex-col items-center">
        <p className="pt-12 w-[90%]">
          Asistencia Vial 24/7: <br /> <br /> Servicio de grúa, auxilio
          mecánico, paso de corriente y más, disponible en cualquier momento y
          lugar.
        </p>
        <img src="/asistenciaVial.jpg" alt="" className="w-[90%] py-12" />
      </div>
      <div className="text-[#FAFDFF] bg-[#003366] font-bold text-center flex flex-col items-center">
        <h1 className="text-3xl pt-16">Sobre Nosotros</h1>
        <p className="py-12 w-[90%]">
          Somos una compañía líder en el sector asegurador, comprometida con
          brindar servicios de alta calidad y confiabilidad para la protección
          de tu vehículo. Nuestra prioridad es ofrecerte tranquilidad y
          seguridad en cada viaje, con coberturas personalizadas, atención ágil
          y un respaldo sólido ante cualquier imprevisto. Con tecnología
          avanzada, asesoramiento experto y un enfoque centrado en el cliente,
          garantizamos que tu auto esté siempre en las mejores manos. Porque
          para nosotros, no solo se trata de asegurar tu automóvil, sino de
          cuidar lo que más te importa.
        </p>
      </div>
      <div className="h-8"></div>
      <div className="text-[#FAFDFF] bg-[#003366] font-bold text-center flex flex-col items-center">
        <h1 className="text-3xl pt-16">Contactanos</h1>
        <div className="flex flex-row pt-12 pb-16 gap-[8vw]">
          <a href=""><img src="/whatsapp.png" alt="" className="h-20"/></a>
          <a href=""><img src="/social.png" alt="" className="h-20"/></a>
          <a href=""><img src="/google-maps.png" alt="" className="h-20"/></a>
        </div>
      </div>
    </main>
  );
}
