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

    // Establecer el nuevo token y hora de login
    const loginTime = new Date().getTime();
    const timer = setTimeout(() => {
      useInfoStore.getState().logout();
      console.log('Sesión expirada automáticamente después de 1 hora');
    }, 3600000); // 1 hora en milisegundos

    set({ user, token, loginTime, expirationTimer: timer });
  },

  // Acción para cerrar sesión
  logout: () => {
    const { expirationTimer } = useInfoStore.getState();
    if (expirationTimer) clearTimeout(expirationTimer);
    
    set(() => ({ user: {}, token: null, loginTime: null, expirationTimer: null }));
    
  }
})))

// {
//   documento: "30601662",
//   nombre: "Yolbert Torrealba",
//   correo: "yolberttorrealba@gmail.com",
//   telefono: "0414-1234567",
//   direccion: "Calle 1, casa 2",
// }