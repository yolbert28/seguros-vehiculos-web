import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigate,
} from "react-router";
import LeftArrow from "./icons/LeftArrow";

import "./app.css";
import { useState } from "react";
import { useInfoStore } from "./store";

export const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }) {
  const token = useInfoStore((state) => state.token);
  const logout = useInfoStore((state) => state.logout);
  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(false);

  const handlerMenu = () => {
    setIsVisible(!isVisible);
  };

  const handlerClick = () => {
    if(!token)
      navigate("/Login");
    else {
       if (confirm("Seguro que desea cerrar la sesión"))
          logout();
    }
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-[#B2DFFF66] flex flex-col items-center h-screen">
        <nav
          className="sticky top-0 w-screen h-screen bg-[#003366] z-40 text-[#FAFDFF]"
          style={{ display: isVisible ? "block" : "none" }}
        >
          <ul>
            <li className="py-4 hover:bg-[#0057B4]" onClick={handlerMenu}>
              <LeftArrow />
            </li>
            <li className="py-4 hover:bg-[#0057B4]">
              <a href="/" className="py-4 pl-[4vw] pr-[80vw] w-full">
                Inicio
              </a>
            </li>
            <li className="py-4 hover:bg-[#0057B4]">
              <a href="/profile" className="py-4 pl-[4vw] pr-[80vw] w-full">
                Mi perfil
              </a>
            </li>
            <li className="py-4 hover:bg-[#0057B4]">
              <a href="/" className="py-4 pl-[4vw] pr-[80vw] w-full ">
                Login
              </a>
            </li>
          </ul>
        </nav>
        <div className="h-20 w-full relative bg-[#003366] flex flex-col items-center text-[#FAFDFF] font-bold">
          <div className="h-20 w-full max-w-[1000px] relative bg-[#003366] flex flex-row items-center overflow-hidden">
            <a href="/" className="mr-auto">
              <img
                src="/white.png"
                alt="logo"
                className="h-20 relative -left-5 sm:hidden "
              />
              <img
                src="/logoLetras.png"
                alt="logo"
                className="h-20 relative left-4 sm:inline hidden"
              />
            </a>
            <a href="/" className="hidden sm:inline px-6 py-8 hover:bg-[#0057B4]">
              Inicio
            </a>
            <a href="/profile" className="hidden sm:inline px-6 py-8 hover:bg-[#0057B4]">
              Mi perfil
            </a>
            <button onClick={handlerClick} className="hidden sm:inline px-6 py-8 hover:bg-[#0057B4]">
              {token ? "Logout" : "Login"}
            </button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              width={45}
              height={45}
              style={{ marginRight: 20 }}
              onClick={handlerMenu}
              className="sm:hidden cursor-pointer"
            >
              <path
                fill="#FAFDFF"
                d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"
              />
            </svg>
          </div>
        </div>

        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
