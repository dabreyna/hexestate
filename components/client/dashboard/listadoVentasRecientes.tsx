"use client";

import { TrendingUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import moment from "moment";
import "moment/locale/es";
import { useEffect, useState } from "react";
import { Separator } from "@radix-ui/react-menubar";
import { Card } from "@/components/ui/card";

export const description = "A bar chart with a custom label";

export default function ListadoVentasRecientesDashboard() {
  const [dataVentasRecientes, setVentasRecientes] = useState<any>(null); // Initialize with null
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/dashboard/ventasRecientesListado");
        if (!response.ok) {
          throw new Error(`API call failed with status ${response.status}`);
        }
        const data = await response.json();
        setVentasRecientes(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const fechaActual = moment().locale("es");
  const fechaMesActual = fechaActual.format("MMMM YYYY");
  return (
    <>
    {dataVentasRecientes ? (
        <div>
            <ul>
            {dataVentasRecientes.map((venta:any, index:number) => (
                <li key={index}>
                    <Card className="xl:col-span-2">
                    <div className="items-center grid gap-4 lg:gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
                        <Avatar className="hidden h-9 w-9 sm:flex">
                            <AvatarImage src="" alt="Avatar" />
                                <AvatarFallback>{venta.nomenclatura}</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1">
                            <p className="text-sm font-medium leading-none">
                                {venta.vendedor}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {venta.vendedor_secundario}
                            </p>
                        </div>
                        <div className=" font-medium text-xs">{venta.terreno}</div>
                    </div>
                    </Card>
                </li>
                ))}
            </ul>
        </div>
    ):( 
    <p>No hay ventas recientes</p>
    )}
    </>
  );
}
