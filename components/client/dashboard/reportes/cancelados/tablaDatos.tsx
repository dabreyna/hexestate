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
import { useCanceladosFiltrosConsultaStore } from "@/app/store/dashboard/reportes/cancelados/filtrosConsultaStore";
import Link from "next/link";
// import { useEffect, useState } from "react";
import { FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";

import router from "next/router";
import { useRouter } from "next/navigation";
// import { Estad} from "@/components/client/dashboard/reportes/estadoDeCuenta/estadoDeCuenta";


export default function TablaDatos() {
  const idFraccionamiento = useCanceladosFiltrosConsultaStore(
    (state) => state.idFraccionamiento
  );
  const contratos = useCanceladosFiltrosConsultaStore(
    (state) => state.resultados
  );
  const router = useRouter();
  const handleDetallesCliente = (id_cliente: string) => {
    if (id_cliente != "") {
      router.push(`/private/dashboard/detallesContrato/${id_cliente}`);
    }
  };
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
        className="rounded-md border-2 border-slate-200 shadow-sm max-w-[600px]"
      >
        <TableCaption>
          GRUPO LOTIFICADORA - REPORTE DE CANCELADOS -{" "}
        </TableCaption>
        <TableHeader className="border-2 border-slate-200 shadow-lg">
          <TableRow>
          <TableHead className="text-center"># Contrato</TableHead>
            <TableHead className="text-center">Terreno</TableHead>
            <TableHead className="text-center">Cliente</TableHead>
            <TableHead className="text-center">Fraccionamiento</TableHead>
            <TableHead className="text-center">Mens. pagadas</TableHead>
            <TableHead className="text-center">Cargo cancelacion</TableHead>
            <TableHead className="text-center">Monto devolucion</TableHead>
            <TableHead className="text-center">Precio original contrato</TableHead>
            <TableHead className="text-center">Precio actual</TableHead>
            <TableHead className="text-center">Saldo para liquidar</TableHead>
            <TableHead className="text-center">Capital vencido</TableHead>
            <TableHead className="text-center">Meses vencidos</TableHead>
            <TableHead className="text-center">Mensualidad</TableHead>
            <TableHead className="text-center">Fecha contrato</TableHead>
            <TableHead className="text-center">Estatus carta devolucion</TableHead>
            <TableHead className="text-center">Superficie</TableHead>
            <TableHead className="text-center">Fecha cancelacion</TableHead>
            <TableHead className="text-center">Asesor Ventas</TableHead>
            <TableHead className="text-center">Motivo cancelacion</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
            <>
              {contratos.map((contrato) => (
                <TableRow
                  key={`${contrato.id_contrato}-${contrato.no_terreno}`}
                  className="hover:bg-slate-100 hover:font-semibold hover:cursor-pointer"
                >
                <TableCell className="text-right">{contrato.id_contrato}</TableCell>
                <TableCell className="text-right">{contrato.nomenclatura}-{contrato.no_manzana}-{contrato.no_terreno}</TableCell>
                <TableCell className="text-right">{contrato.nombre_cliente}</TableCell>
                <TableCell className="text-right">{contrato.fraccionamiento}</TableCell>
                <TableCell className="text-right">{contrato.mensualidades_pagadas}</TableCell>
                <TableCell className="text-right">{contrato.cargo_cancelacion}</TableCell>
                <TableCell className="text-right">{contrato.monto_devolucion}</TableCell>
                <TableCell className="text-right">{contrato.monto_terreno_inicial}</TableCell>
                <TableCell className="text-right">{contrato.monto_terreno_actual}</TableCell>
                <TableCell className="text-right">{contrato.saldo_pendiente}</TableCell>
                <TableCell className="text-right">{contrato.capital_vencido}</TableCell>
                <TableCell className="text-right">{contrato.mensualidades_vencidas}</TableCell>
                <TableCell className="text-right">{contrato.mensualidad_actual}</TableCell>
                <TableCell className="text-right">{contrato.fecha_contrato}</TableCell>
                <TableCell className="text-right">{contrato.estatus_carta}</TableCell>
                <TableCell className="text-right">{contrato.superficie}</TableCell>
                <TableCell className="text-right">{contrato.fecha_cancelacion}</TableCell>
                <TableCell className="text-right">{contrato.nombre_vendedor}</TableCell>
                <TableCell className="text-right">{contrato.comentarios_cancelacion}</TableCell>
                
                  <TableCell className="text-right">
                    {/* <EstadoDeCuentaDetalles id={contrato.id_contrato} /> */}
                  </TableCell>
                </TableRow>
              ))}
            </>
        </TableBody>
      </Table>
    </>
  );
}
