"use client";

import { Label } from "@/components/ui/label"
import { useMercadotecniaFiltrosConsultaStore } from '@/app/store/dashboard/reportes/mercadotecnia/filtrosConsultaStore';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import * as React from "react"
import { Calendar as CalendarIcon } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { DateRange } from "react-day-picker"
import { format } from "date-fns"
import { es } from 'date-fns/locale';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { useEffect, useState } from "react";

interface MedioPublicitario {
    id_medio: string;
    medio: string;
  }

interface EstatusContrato {
    id_estatus: string;
    estatus: string;
}

interface Asesor {
    id_usuario: string;
    nombre_asesor: string;
}

interface FiltrosConsultaProps {
    mediosPublicitarios: MedioPublicitario[];
    estatusContrato: EstatusContrato[];
    asesoresActivos: Asesor[];
    asesoresInactivos: Asesor[];
    id_usuario: string | undefined | null;
    perfil_usuario: string |undefined |null;
}

export default function ListadoFraccionamientos({ mediosPublicitarios,estatusContrato,asesoresActivos,asesoresInactivos,id_usuario,perfil_usuario }: FiltrosConsultaProps,{
    className,
  }: React.HTMLAttributes<HTMLDivElement>) {
    const seleccionaResultados = useMercadotecniaFiltrosConsultaStore((state: { setResultados: any; }) => state.setResultados);

    const [date, setDate] = useState<DateRange | undefined>(undefined);
    const [medio,setMedio]=useState<string>("");
    const [estatus,setEstatus]=useState<string>("");
    const [asesorActivo,setAsesorActivo]=useState<string>("");
    const [asesorInactivo,setAsesorInactivo]=useState<string>("");
    const [fInicio, setFInicio] = useState("");
    const [fFin, setFFin] = useState("");

    useEffect(() => {
        if (date?.from && date?.to) { // Check for both from and to dates
          setFInicio(format(date.from, "yyyy-MM-dd", { locale: es }));
          setFFin(format(date.to, "yyyy-MM-dd", { locale: es }));
        } else {
          setFInicio("");
          setFFin("");
        }
      }, [date]); // Update fInicio and fFin whenever date changes

      const datos = () => {
        setMedio(medio);
        setEstatus(estatus);
        setAsesorActivo(asesorActivo);
        setAsesorInactivo(asesorInactivo);
        if (date?.from && date?.to) { // Check for both from and to dates
            setFInicio(format(date.from, "yyyy-MM-dd", { locale: es }));
            setFFin(format(date.to, "yyyy-MM-dd", { locale: es }));
          } else {
            setFInicio("");
            setFFin("");
          }
        const fetchData = async () => {
            try {
              console.log(id_usuario);
              console.log(perfil_usuario);
              //console.log(`/api/dashboard/reportes/mercadotecnia?idMedio=${idMedio}&idEstatus=${idEstatus}&idAsesorActivo=${idAsesorActivo}&idAsesorInactivo=${idAsesorInactivo}&fInicio=${fInicio}&fFin=${fFin}&usuario=${id_usuario}&perfil=${perfil_usuario}`);
              const response = await fetch(`/api/dashboard/reportes/mercadotecnia?idMedio=${medio}&idEstatus=${estatus}&idAsesorActivo=${asesorActivo}&idAsesorInactivo=${asesorInactivo}&fInicio=${fInicio}&fFin=${fFin}&usuario=${id_usuario}&perfil=${perfil_usuario}`);
              if (!response.ok) {
                throw new Error(`Failed to fetch data: ${response.status}`);
              }
              const data = await response.json();
              seleccionaResultados(data);
              // console.log(data);
            } catch (error) {
              console.error(error);
            }
          };
          fetchData();
      }
      
    return (
        <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1"> 
            <Label htmlFor="status">Medio Publicitario</Label>
            <Select onValueChange={setMedio}>
                <SelectTrigger id="status" aria-label="Selecciona el medio">
                <SelectValue placeholder="Selecciona el medio" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="0" id="0">Todos</SelectItem>
                {mediosPublicitarios.map((medio) => (
                    <SelectItem
                    key={medio.id_medio}
                    value={medio.id_medio}
                    >
                    {medio.medio}
                    </SelectItem>
                ))}
                </SelectContent>
            </Select>
            </div>
            <Separator className="my-4 size-1 bg-white" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1"> 
            <Label htmlFor="status">Estatus Contrato</Label>
            <Select onValueChange={setEstatus}>
                <SelectTrigger id="status" aria-label="Selecciona el estatus">
                <SelectValue placeholder="Selecciona el estatus" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0" id="0">Todos</SelectItem>
                {estatusContrato.map((estatus) => (
                    <SelectItem
                    key={estatus.id_estatus}
                    value={estatus.id_estatus}
                    >
                    {estatus.estatus}
                    </SelectItem>
                ))}
                </SelectContent>
            </Select>
            </div>
            <Separator className="my-4 size-1 bg-white" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1"> 
            <Label htmlFor="status">Asesores Activos</Label>
            <Select onValueChange={setAsesorActivo}>
                <SelectTrigger id="status" aria-label="Selecciona el asesor">
                <SelectValue placeholder="Selecciona el asesor" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="0" id="0">Todos</SelectItem>
                {asesoresActivos.map((asesor) => (
                    <SelectItem
                    key={asesor.id_usuario}
                    value={asesor.id_usuario}
                    >
                    {asesor.nombre_asesor}
                    </SelectItem>
                ))}
                </SelectContent>
            </Select>
            </div>
            <Separator className="my-4 size-1 bg-white" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1"> 
            <Label htmlFor="status">Asesores Inactivos</Label>
            <Select onValueChange={setAsesorInactivo}>
                <SelectTrigger id="status" aria-label="Selecciona el asesor">
                <SelectValue placeholder="Selecciona el asesor" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="0" id="0">Todos</SelectItem>
                {asesoresInactivos.map((asesor) => (
                    <SelectItem
                    key={asesor.id_usuario}
                    value={asesor.id_usuario}
                    >
                    {asesor.nombre_asesor}
                    </SelectItem>
                ))}
                </SelectContent>
            </Select>
            </div>
            <Separator className="my-4 size-1 bg-white" />            
            <div className={cn("grid gap-2", className)}>
                <Popover>
                    <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                        "w-[300px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon />
                        {date?.from ? (
                        date.to ? (
                            <>
                            {format(date.from, "LLL dd, y",{locale:es})} -{" "}
                            {format(date.to, "LLL dd, y",{locale:es})}
                            </>   
                        ) : (
                            format(date.from, "LLL dd, y",{locale:es})
                        )
                        ) : (
                        <span>Estalece un rango de fechas</span>
                        )}
                    </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                        locale={es}
                    />
                    </PopoverContent>
                </Popover>
                </div>
            <Separator className="my-4 size-1 bg-white" />
            <Button className="p-6" onClick={datos} disabled={!date}>DATOS</Button>
        </>
    )
}