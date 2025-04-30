import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useInfoStore = create(persist((set) => ({
  token: "",
  user: {},
  setUser: (newUser) => set(() => ({ user: newUser })),
  setToken: (newToken) => set(() => ({ token: newToken }))
})))

// {
//   documento: "30601662",
//   nombre: "Yolbert Torrealba",
//   correo: "yolberttorrealba@gmail.com",
//   telefono: "0414-1234567",
//   direccion: "Calle 1, casa 2",
// }