"use client";

import { Label } from "@/components/ui/label";
import { useComisionesFiltrosConsultaStore } from "@/app/store/dashboard/reportes/comisiones/filtrosConsultaStore";
import { Separator } from "@/components/ui/separator";
import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import FiltrosConsulta from "@/components/client/dashboard/reportes/catalogoClientes/filtrosConsulta";

interface Asesor {
  id_usuario: string;
  nombre_asesor: string;
}
interface TotalesComisiones {
  total_generado: string;
  total_pagado: string;
}
interface asesor {
  asesor: string;
}

interface FiltrosConsultaProps {
  id_usuario: string | undefined | null;
  perfil_usuario: string | undefined | null;
}

export default function FiltrosConsultaComisiones(
  { id_usuario, perfil_usuario }: FiltrosConsultaProps,
  { className }: React.HTMLAttributes<HTMLDivElement>
) {
  const tablaResumen = useComisionesFiltrosConsultaStore(
    (state: { setResumen: any }) => state.setResumen
  );
  const tablaDetallados = useComisionesFiltrosConsultaStore(
    (state: { setDetallado: any }) => state.setDetallado
  );

  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const [fInicio, setFInicio] = useState("");
  const [fFin, setFFin] = useState("");
  const [totalesComisiones, setTotalesComisiones] = useState<TotalesComisiones>(
    { total_generado: "0", total_pagado: "0" }
  );

  useEffect(() => {
    if (date?.from && date?.to) {
      // Check for both from and to dates
      setFInicio(format(date.from, "yyyy-MM-dd", { locale: es }));
      setFFin(format(date.to, "yyyy-MM-dd", { locale: es }));
    } else {
      setFInicio("");
      setFFin("");
    }
  }, [date]); // Update fInicio and fFin whenever date changes

  const datos = () => {
    if (date?.from && date?.to) {
      // Check for both from and to dates
      setFInicio(format(date.from, "yyyy-MM-dd", { locale: es }));
      setFFin(format(date.to, "yyyy-MM-dd", { locale: es }));
    } else {
      setFInicio("");
      setFFin("");
    }

    const fetchResumen = async () => {
      try {
        const response = await fetch(
          `/api/dashboard/reportes/comisiones/resumen?fInicio=${fInicio}&fFin=${fFin}&idUsuario=${id_usuario}&perfil=${perfil_usuario}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }
        const data = await response.json();
        tablaResumen(data);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchDetallado = async () => {
      try {
        const response = await fetch(
          `/api/dashboard/reportes/comisiones/detallado?fInicio=${fInicio}&fFin=${fFin}&usuario=${id_usuario}&perfil=${perfil_usuario}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }
        const data = await response.json();
        tablaDetallados(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchResumen();
    fetchDetallado();
  };

  return (
    <>
      <div className={cn("grid gap-2", className)}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y", { locale: es })} -{" "}
                    {format(date.to, "LLL dd, y", { locale: es })}
                  </>
                ) : (
                  format(date.from, "LLL dd, y", { locale: es })
                )
              ) : (
                <span>Estalece un rango de fechas</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="center">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={4}
              locale={es}
            />
          </PopoverContent>
        </Popover>
      </div>
      <Separator className="my-4 size-1 bg-white" />
      <Button className="p-6 w-full" onClick={datos} disabled={!date}>
        VER DATOS
      </Button>
      <Separator className="my-4 w-full bg-slate-200" />
      {/* <Label>Totales</Label>
            <Separator className="my-4 size-1 bg-white" />
            <Label>Generado: {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number(totalesComisiones.total_generado))}</Label>
            <Separator className="h-0 bg-white" />
            <Label>Pagado: {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number(totalesComisiones.total_pagado))}</Label> */}
    </>
  );
}
