import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useInfoStore = create(persist((set) => ({
  token: null,
  loginTime: null,  // Guardamos el momento del login
  expirationTimer: null,  // Referencia al temporizador
  user: {},
  setUser: (newUser) => set(() => ({ user: newUser })),
  // Acción para iniciar sesión
  login: (token, user) => {
    // Limpiar cualquier temporizador previo
    const { expirationTimer } = useInfoStore.getState();
    if (expirationTimer) clearTimeout(expirationTimer);

    window.removeEventListener('beforeunload', useInfoStore.getState().handleWindowClose);
    window.removeEventListener('pagehide', useInfoStore.getState().handleWindowClose);

    // Establecer el nuevo token y hora de login
    const loginTime = new Date().getTime();
    useInfoStore.getState().initializeTimer();
    
    // Configurar el event listener para cerrar sesión al salir
    window.addEventListener('beforeunload', useInfoStore.getState().handleWindowClose);
    window.addEventListener('pagehide', useInfoStore.getState().handleWindowClose);

    set({ user, token, loginTime});
  },

  // Acción para cerrar sesión
  logout: () => {
    const { expirationTimer } = useInfoStore.getState();
    if (expirationTimer) clearTimeout(expirationTimer);

    // Remover event listeners al hacer logout
    window.removeEventListener('beforeunload', useInfoStore.getState().handleWindowClose);
    window.removeEventListener('pagehide', useInfoStore.getState().handleWindowClose);
    
    set(() => ({ user: {}, token: null, loginTime: null, expirationTimer: null }));
    
  },

  // Manejador para cuando se cierra la ventana/pestaña
  handleWindowClose: () => {
    useInfoStore.getState().logout();
  },

  // Nueva acción para inicializar el temporizador al cargar la página
  initializeTimer: () => {
    const { token, loginTime, expirationTimer } = useInfoStore.getState();
    if (!token || !loginTime) return;

    // Limpiar temporizador existente (por si acaso)
    if (expirationTimer) clearTimeout(expirationTimer);

    // Calcular tiempo restante
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - loginTime;
    const remainingTime = 1200000 - elapsedTime; // 2 minutos - tiempo transcurrido

    // Si ya pasó el tiempo, hacer logout inmediatamente
    if (remainingTime <= 0) {
      useInfoStore.getState().logout();
      return;
    }

    // Configurar nuevo temporizador con el tiempo restante
    const timer = setTimeout(() => {
      useInfoStore.getState().logout();
      console.log('Sesión expirada automáticamente después de 2 minutos');
    }, remainingTime);

    set({ expirationTimer: timer});
  }
})))

// {
//   documento: "30601662",
//   nombre: "Yolbert Torrealba",
//   correo: "yolberttorrealba@gmail.com",
//   telefono: "0414-1234567",
//   direccion: "Calle 1, casa 2",
// }