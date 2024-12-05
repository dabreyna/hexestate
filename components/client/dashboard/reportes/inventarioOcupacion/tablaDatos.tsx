"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

//import { useInventarioOcupacionFiltrosConsultaStore } from "@/app/store/dashboard/reportes/terrenosDisponibles/fraccionamientoSelectedStore";
import { useInventarioOcupacionFiltrosConsultaStore } from "@/app/store/dashboard/reportes/inventarioOcupacion/filtrosConsultaStore";

import { useEffect, useState } from "react";
import { FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Resultados } from "../../../../../app/private/dashboard/buscarCliente/resultados";

interface Terreno {
  no_terreno: string;
  superficie: string;
  precio_m2: string;
  total_terreno: string;
  id_terreno: string;
}

interface Financiamiento {
  financiamiento: string;
  porcentaje: string;
  id_financiamiento: string;
  no_pagos: string;
}

interface Manzana {
  manzana: string;
  terrenos: Terreno[];
}

interface TotalesFraccionamiento {
  total_superficie: string;
  total_valor: string;
}

export default function TablaDatos() {
  const idFraccionamiento = useInventarioOcupacionFiltrosConsultaStore(
    (state) => state.idFraccionamiento
  );
  const manzanas = useInventarioOcupacionFiltrosConsultaStore(
    (state) => state.resultados
  );
  console.log(manzanas.data);
  return (
    <>
      <div className="flex justify-end">
        <Button id="toPDF" className="p-6" onClick={() => alert("PENDIENTE")}>
          <FileDown style={{ height: "30px", width: "30px" }} />
          PDF
        </Button>
      </div>
      <Table
        id="tablaDatos"
        className="rounded-md border-1 border-slate-200 shadow-sm"
      >
        <TableCaption>
          GRUPO LOTIFICADORA - REPORTE DE INVENTARIO VS. OCUPACION -{" "}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center" colSpan={12}>
              {
                // nombreFraccionamiento
              }
            </TableHead>
          </TableRow>
          <TableRow>
            <TableHead className="w-[100px]">Terreno</TableHead>
            <TableHead className="text-right">Ubicación</TableHead>
            <TableHead className="text-right">Superficie</TableHead>
            <TableHead className="text-right">Precio m2</TableHead>
            <TableHead className="text-right">Cliente</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody></TableBody>
      </Table>
    </>
  );
}
