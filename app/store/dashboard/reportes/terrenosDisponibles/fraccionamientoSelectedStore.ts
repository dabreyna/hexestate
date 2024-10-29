import { create } from "zustand";


type FraccionamientoStore = {
  idFraccionamiento: string | null;
  setFraccionamiento: (fraccionamiento_id: string) => void;
}


export const useFraccionamientoSelectedStore = create<FraccionamientoStore>((set) => ({
  idFraccionamiento: null,
  setFraccionamiento: (fraccionamiento_id: string) => set({ idFraccionamiento: fraccionamiento_id }), 
}));

