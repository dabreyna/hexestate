import { create } from "zustand";
import { Resultados } from '../../../../private/dashboard/buscarCliente/resultados';

interface Terreno {
    no_terreno: string;
    nomenclatura: string;
    no_manzana: string;
    superficie: string;
    precio_m2: string;
    precio_financiar: string;
    nombrecliente: string;
    id_cliente: string;
    id_contrato: string;
    fraccionamiento: string;
}

interface Manzana {
    manzana: string;
    terrenos: Terreno[];
}

interface DatosTerrenos{
    data: Manzana[];
}

interface reporteResultados {
    resultados: DatosTerrenos;
    idFraccionamiento: string;
    setResultados: (resultados: DatosTerrenos) => void;
    setIdFraccionamiento: (idFraccionamiento: string) => void;
}


export const useInventarioOcupacionFiltrosConsultaStore = create<reporteResultados>((set) => ({
    resultados: {data:[]},
    idFraccionamiento: "",
    setIdFraccionamiento: (idFraccionamiento) => set({ idFraccionamiento: idFraccionamiento }),
    setResultados: (resultados) => set({ resultados: resultados }),
}));

