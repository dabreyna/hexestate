"use client";

import { Label } from "@/components/ui/label";
import { useMercadotecniaFiltrosConsultaStore } from "@/app/store/dashboard/reportes/mercadotecnia/filtrosConsultaStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Checkbox } from "@/components/ui/checkbox";

interface Asesor {
  id_usuario: string;
  nombre_asesor: string;
}

interface FiltrosConsultaProps {
  asesoresActivos: Asesor[];
  id_usuario: string | undefined | null;
  perfil_usuario: string | undefined | null;
}

export default function ListadoFraccionamientos(
  { asesoresActivos, id_usuario, perfil_usuario }: FiltrosConsultaProps,
  { className }: React.HTMLAttributes<HTMLDivElement>
) {
  const seleccionaResultados = useMercadotecniaFiltrosConsultaStore(
    (state: { setResultados: any }) => state.setResultados
  );

  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const [chkVenta, setChkVenta] = useState<boolean>(false);
  const [chkPostVenta, setChkPostVenta] = useState<boolean>(false);
  const [chkCancelado, setChkCancelado] = useState<boolean>(false);
  const [asesorActivo, setAsesorActivo] = useState<string>("0");
  const [fInicio, setFInicio] = useState("");
  const [fFin, setFFin] = useState("");

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
    setAsesorActivo(asesorActivo);
    if (date?.from && date?.to) {
      // Check for both from and to dates
      setFInicio(format(date.from, "yyyy-MM-dd", { locale: es }));
      setFFin(format(date.to, "yyyy-MM-dd", { locale: es }));
    } else {
      setFInicio("");
      setFFin("");
    }
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/dashboard/reportes/ventasMaduradas/datosVentas?idAsesorActivo=${asesorActivo}&chkVenta=${chkVenta}&chkPostVenta=${chkPostVenta}&chkCancelado=${chkCancelado}&fInicio=${fInicio}&fFin=${fFin}&usuario=${id_usuario}&perfil=${perfil_usuario}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }
        const data = await response.json();
        seleccionaResultados(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1">
        <Label htmlFor="status">Asesor</Label>
        <Select onValueChange={setAsesorActivo}>
          <SelectTrigger id="status" aria-label="Selecciona el asesor">
            <SelectValue placeholder="Selecciona el asesor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0" id="0">
              Todos
            </SelectItem>
            {asesoresActivos.map((asesor) => (
              <SelectItem key={asesor.id_usuario} value={asesor.id_usuario}>
                {asesor.nombre_asesor}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Separator className="my-4 size-1 bg-white" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1">
        <div className="items-top flex space-x-2">
          <Checkbox
            id="chkVentas"
            checked={true}
            onCheckedChange={setChkVenta}
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="terms1"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Accept terms and conditions
            </label>
          </div>
        </div>
      </div>
      <Separator className="my-4 size-1 bg-white" />
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
      <Button className="p-6" onClick={datos} disabled={!date}>
        DATOS
      </Button>
    </>
  );
}
