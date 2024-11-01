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
  } from "@/components/ui/table"

import { useFraccionamientoSelectedStore } from "@/app/store/dashboard/reportes/terrenosDisponibles/fraccionamientoSelectedStore";
import { useEffect,useState } from "react";

  const invoices = [
      {manzana:"001",
        terreno: "016",
        superficie: "367.171",
        preciom2: "$4,000.00",
        gl120: "$12,243.90",
        express: "$40,813.00",
        dolares18: "$14,447.80",
        gl144: "$10,203.25",
        contado: "$1,469,268.00",
        premier2021: "$13,774.39",
    },
      {
        terreno: "017",
        superficie: "367.171",
        preciom2: "$4,000.00",
        gl120: "$12,243.90",
        express: "$40,813.00",
        dolares18: "$14,447.80",
        gl144: "$10,203.25",
        contado: "$1,469,268.00",
        premier2021: "$13,774.39",
      },
      {
        terreno: "018",
        superficie: "367.171",
        preciom2: "$4,000.00",
        gl120: "$12,243.90",
        express: "$40,813.00",
        dolares18: "$14,447.80",
        gl144: "$10,203.25",
        contado: "$1,469,268.00",
        premier2021: "$13,774.39",
      },
      {
        terreno: "024",
        superficie: "367.171",
        preciom2: "$4,000.00",
        gl120: "$12,243.90",
        express: "$40,813.00",
        dolares18: "$14,447.80",
        gl144: "$10,203.25",
        contado: "$1,469,268.00",
        premier2021: "$13,774.39",
      },
  ] 

 
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
  
  



  export default function TablaDatos() {
    const idFraccionamiento = useFraccionamientoSelectedStore((state) => state.idFraccionamiento);
    const [manzanas,setManzanas]=useState<Manzana[]>([]);
    const [financiamientos,setFinanciamientos]=useState<Financiamiento[]>([]);

 

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`/api/dashboard/reportes/terrenosDisponibles/listadoFinanciamientos`);
          if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status}`);
          }
          const data = await response.json();
          setFinanciamientos(data);
        } catch (error) {
          console.error(error);
        }
        try {
          const response = await fetch(`/api/dashboard/reportes/terrenosDisponibles/listadoTerrenos?idFraccionamiento=${idFraccionamiento}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status}`);
          }
          const data = await response.json();
          console.log(data);
          setManzanas(data);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchData();
    }, [idFraccionamiento]);

    function calculaMonto(porcentaje:string,no_pagos:string,total_terreno:string){
      const porcentaje_num = Number(porcentaje)/100;
      const precioTerreno = Number((Number(total_terreno)*porcentaje_num)+Number(total_terreno));
      const mensualidad = Number((precioTerreno / Number(no_pagos)).toFixed(2));

      return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(mensualidad);
    }
    return (
        <>
            <Table>
                <TableCaption> {idFraccionamiento}</TableCaption>
                <TableHeader>
                    <TableRow >
                    <TableHead className="w-[100px]">Terreno</TableHead>
                    <TableHead className="text-right">Superficie</TableHead>
                    <TableHead className="text-right">Precio m2</TableHead>
                    
                    {
                      financiamientos ? (
                        <>
                        {financiamientos.map((financiamiento)=>(
                          <TableHead key={financiamiento.financiamiento} className="text-right">{financiamiento.financiamiento}</TableHead>
                        ))}
                        </>
                      ):
                        <>
                        <TableHead>cargando Financiamientos...</TableHead>
                        </>
                    }

                    </TableRow>
                </TableHeader>
                <TableBody>
                      {manzanas.map((manzana)=>(
                        <>
                          <TableRow key={manzana.manzana} className="shadownc-table__row my-row">
                             <TableCell colSpan={9} className="font-medium text-xs bg-slate-100" style={{ height: '10px', padding: 2,}}>Manzana: {manzana.manzana}</TableCell>
                          </TableRow>
                          {manzana.terrenos.map((terreno) => (
                            <TableRow key={`${terreno.id_terreno}-${terreno.no_terreno}`}>
                                <TableCell className="font-medium text-xs">{terreno.no_terreno}</TableCell>
                                <TableCell className="text-right">{terreno.superficie}</TableCell>
                                <TableCell className="text-right">{terreno.precio_m2}</TableCell>
                                {financiamientos.map((financiamiento)=>(
                                  <TableCell key={financiamiento.financiamiento} className="text-right">{calculaMonto(financiamiento.porcentaje,financiamiento.no_pagos,terreno.total_terreno)}</TableCell>
                                ))}
                                {/* <TableCell className="text-right">{invoice.totalAmount}</TableCell> */}
                            </TableRow>
                          ))}
                      </>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow style={{backgroundColor:'#fcf5e5',color:'#b31c45'}}>
                        <TableCell colSpan={1}>Total</TableCell>
                        <TableCell className="text-right">5,000.00</TableCell>
                        <TableCell colSpan={5}></TableCell>
                        <TableCell colSpan={1} className="font-semibold text-right">$15,122,500.00</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </>
    )
}