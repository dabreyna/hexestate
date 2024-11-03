"use client";

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import {useFraccionamientoSelectedStore} from '@/app/store/dashboard/reportes/terrenosDisponibles/fraccionamientoSelectedStore'; 
// import { getMediosPublicitarios } from '@/lib/reportes/mercadotecnia/filtrosBusqueda';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import * as React from "react"
import { Calendar as CalendarIcon } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { DateRange } from "react-day-picker"
import { addDays,subDays, format,Locale } from "date-fns"
import { es } from 'date-fns/locale';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { useState } from "react";

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
}

export default function ListadoFraccionamientos({ mediosPublicitarios,estatusContrato,asesoresActivos,asesoresInactivos }: FiltrosConsultaProps,{
    className,
  }: React.HTMLAttributes<HTMLDivElement>) {
    //const seleccionaMedioPublicitario = useFraccionamientoSelectedStore((state: { setFraccionamiento: any; }) => state.setFraccionamiento);

    const handleMedioPublicitarioElegido = (value: string) => {
        //seleccionaFraccionamiento(value);
        console.log(value);
      };

    
    //const [date, setDate] = React.useState<DateRange | undefined>({from: new Date(),to: addDays(new Date(), 0),})
    const [date, setDate] = useState<DateRange | undefined>(undefined);
    const [fechaInicio,setFechaInicio]=useState<Date | undefined>(new Date());
    const [fechaFin,setFechaFin]=useState<Date | undefined>(new Date());
    const [medio,setMedio]=useState<string>("");
    const [estatus,setEstatus]=useState<string>("");
    const [asesorActivo,setAsesorActivo]=useState<string>("");
    const [asesorInactivo,setAsesorInactivo]=useState<string>("");


      const datos = () => {
        setFechaInicio(format(date?.from, "yyyy-MM-dd"));
        setFechaFin(date?.to);
        console.log(`fechas: ${date?.from} - ${date?.to}`);
        console.log(`fecha INicio: ${fechaInicio} - ${fechaFin}`);
        console.log(`medio: ${medio}`);
        console.log(`estatus: ${estatus}`);
        console.log(`asesorActivo: ${asesorActivo}`);
        console.log(`asesorInactivo: ${asesorInactivo}`);
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
            <Select onValueChange={handleMedioPublicitarioElegido}>
                <SelectTrigger id="status" aria-label="Selecciona el estatus">
                <SelectValue placeholder="Selecciona el estatus" />
                </SelectTrigger>
                <SelectContent>
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
            <Select onValueChange={handleMedioPublicitarioElegido}>
                <SelectTrigger id="status" aria-label="Selecciona el asesor">
                <SelectValue placeholder="Selecciona el asesor" />
                </SelectTrigger>
                <SelectContent>
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
            <Select onValueChange={handleMedioPublicitarioElegido}>
                <SelectTrigger id="status" aria-label="Selecciona el asesor">
                <SelectValue placeholder="Selecciona el asesor" />
                </SelectTrigger>
                <SelectContent>
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
                            format(date.from, "yyyy-MM-dd",{locale:es})
                        )
                        ) : (
                        <span>Pick a date</span>
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
            <Button className="p-6" onClick={datos}>DATOS</Button>
        </>
    )
}