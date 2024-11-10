import { create } from "zustand";

interface Comision {
    asesor: string;
    terreno: string;
    fecha_contrato: string;
    fecha_pago: string;
    nombre_cliente: string;
    cancelado: string;
    no_comision: string;
    monto_primario: string;
    id_contrato: string;
    max_comision: string;
    comisionpagada: string | null;
}
interface Asesor {
    asesor: string;
    comisiones: Comision[];
}

interface ComisionesStore {
    asesor: Asesor[];
    setAsesor: (asesor: Asesor[]) => void;
}

// interface reporteResultados {
//     resultados: Resultado[];
//     setResultados: (resultados: Resultado[]) => void;
// }


export const useComisionesFiltrosConsultaStore = create<ComisionesStore>((set) => ({
    asesor: [],
    setAsesor: (resultados) => set({ asesor: resultados }),
}));

