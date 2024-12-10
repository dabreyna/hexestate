"use client";

import { Label } from "@/components/ui/label";
import { useCanceladosFiltrosConsultaStore } from "@/app/store/dashboard/reportes/cancelados/filtrosConsultaStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
interface fraccionamiento {
  id_fraccionamiento: string;
  fraccionamiento: string;
}

interface FiltrosConsultaProps {
  listaFraccionamientos: fraccionamiento[];
}
interface Manzana {
  id_manzana: string;
  no_manzana: string;
}
interface Terreno {
  id_terreno: string;
  no_terreno: string;
}

export default function FiltrosConsultaCancelados(
  { listaFraccionamientos }: FiltrosConsultaProps,
  { className }: React.HTMLAttributes<HTMLDivElement>
) {
  const seleccionaResultados = useCanceladosFiltrosConsultaStore(
    (state: { setResultados: any }) => state.setResultados
  );

  const [fraccionamiento, setFraccionamiento] = useState<string>("0");
  const [nombreCliente, setNombreCliente] = useState<string>("");
  const [chkDolares, setChkDolares] = useState<boolean>(false);
  const [chkHistorico, setChkHistorico] = useState<boolean>(false);
  const [fInicio, setFInicio] = useState("");
  const [fFin, setFFin] = useState("");
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const [tipoDeCambio, setTipoDeCambio] = useState<string>("0");

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

  function getDatos() {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/dashboard/reportes/cancelados?idFraccionamiento=${fraccionamiento}&fInicio=${fInicio}&fFin=${fFin}&nombreCliente=${nombreCliente}&tipoDeCambio=${tipoDeCambio}
          &chkDolares=${chkDolares}&chkHistorico=${chkHistorico}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }
        const data = await response.json();
        seleccionaResultados(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12">
        <div className="md:col-span-4 lg:col-span-4 xl:col-span-4">
          <Label htmlFor="status">Fraccionamiento</Label>
          <Select onValueChange={setFraccionamiento}>
            <SelectTrigger
              id="status"
              aria-label="Selecciona el fraccionamiento"
            >
              <SelectValue placeholder="Selecciona el fraccionamiento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0" id="0">
                Selecciona el fraccionamiento
              </SelectItem>
              {listaFraccionamientos.map((fraccionamiento) => (
                <SelectItem
                  key={fraccionamiento.id_fraccionamiento}
                  value={fraccionamiento.id_fraccionamiento}
                >
                  {fraccionamiento.fraccionamiento}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="md:col-span-2 lg:col-span-2 xl:col-span-2">
          <Label htmlFor="status">Fecha Inicio-Fin</Label>
          <div className={cn("grid gap-2 item", className)}>
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
        </div>

        <div className="md:col-span-3 lg:col-span-3 xl:col-span-3">
          <Label htmlFor="cliente">Cliente</Label>
          <Input
            placeholder="Ej. Jorge Perez"
            id="cliente"
            className="uppercase"
            onChange={(event) => setNombreCliente(event.target.value)}
          />
        </div>
        <div className="md:col-span-2 lg:col-span-2 xl:col-span-2">
          {/*
          <Label htmlFor="tipoCambio">Tipo de Cambio</Label>
          <Input
            type="number"
            placeholder="Ej. 20.00"
            id="tipoCambio"
            className="uppercase"
            onChange={(event) => setTipoDeCambio(event.target.value)}
          />*/}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12">
        <div className="items-center flex space-x-2 p-4">
          <Checkbox
            id="chkDolares"
            onCheckedChange={(e) => setChkDolares(!chkDolares)}
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="terms1"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Dolares
            </label>
          </div>
        </div>
        <div className="items-center flex space-x-2 p-4">
          <Checkbox
            id="chkHistorico"
            onCheckedChange={(e) => setChkHistorico(!chkHistorico)}
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="terms1"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Historico
            </label>
          </div>
        </div>
      </div>
      <Separator className="my-4 size-1 bg-white" />
      <Button className="p-6" onClick={getDatos}>
        DATOS
      </Button>
    </>
  );
}
