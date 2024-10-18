import { create } from "zustand";



type ContratoStore = {
  idCliente: string | null;
  idContrato: string | null;
  setContrato: (contrato_id: string) => void;
  setCliente: (cliente_id: string) => void;
}
// interface Contrato{
//   idContrato:string | null
//   seleccionaContrato: (contrato_id: string) => void;
// }

export const useContratoSelectedStore = create<ContratoStore>((set) => ({
  idCliente: null,
  idContrato: null,
  // setCliente: (cliente_id: string) => set((state) => ({ idCliente: cliente_id })),
  // setContrato: (contrato_id: string) => set((state) => ({ idContrato: contrato_id })),
  setCliente: (cliente_id: string) => set({ idCliente: cliente_id }),
  setContrato: (contrato_id: string) => set({ idContrato: contrato_id }),

  // seleccionaContrato: (contrato_id: string) => set({ idContrato: contrato_id }),
  // seleccionaCliente: (cliente_id: string) => set({ idCliente: cliente_id }),
}));

