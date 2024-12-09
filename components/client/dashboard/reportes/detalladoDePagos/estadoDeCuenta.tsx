import Image from "next/image";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import logoLotificadora from "@/public/logo.png";
import { useEffect, useState } from "react";
import { exit } from "process";

interface Empresa {
  nombre: string;
  calle: string;
  ciudad: string;
  estado: string;
  cp: string;
  telefono_principal: string;
}
interface Cliente {
  nombre: string;
  calle: string;
  numero: string;
  fecha_contrato: string;
  colonia: string;
  tel_cel: string;
  tel_casa: string;
  ciudad: string;
  cp: string;
  empresa: string;
  moneda: string;
  no_manzana: string;
  no_terreno: string;
  fraccionamiento: string;
  tel_cod_cel: string;
  tel_cod_casa: string;
}

export function EstadoDeCuentaDetalles({id}:{id:string}) {

  const [dataEmpresa, setDataEmpresa] = useState<Empresa[]>([]);
  const [dataCliente, setDataCliente] = useState<Cliente[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/dashboard/reportes/detalladoDePagos/detalles/datosEmpresa?idContrato=${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`);
      }
      const data = await response.json();
      setDataEmpresa(data);
    } catch (error) {
      console.error(error);
    }
    try {
      const response = await fetch(`/api/dashboard/reportes/detalladoDePagos/detalles/datosCliente?idContrato=${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`);
      }
      const data = await response.json();
      setDataCliente(data);
    } catch (error) {
      console.error(error);
    }

  };


  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" onClick={fetchData}>Ver Detalles</Button>
      </SheetTrigger>
      <SheetContent className=" md:max-w-full sm:min-w-[430px]">
        <SheetHeader>
          <SheetTitle className="text-center">DETALLADO DE PAGOS</SheetTitle>
          <SheetDescription>
            <div className="grid gap-4 py-4 grid-cols-3">
              <div className="flex flex-col items-center">
                <Image src={logoLotificadora} alt="Grupo Lotificadora" className="w-[170px] h-[130px] transition-all"/> 
              </div>
              <div className="flex flex-col col-span-2">
                <div className="text-left">
                  <p className="text-xl font-bold"> {dataEmpresa[0]?.nombre}<br/> 
                    {dataEmpresa[0]?.calle}<br/>
                    {dataEmpresa[0]?.ciudad},{dataEmpresa[0]?.estado} C.P. {dataEmpresa[0]?.cp}<br/>
                    TEL&Eacute;FONO: 686 - <span className="text-blue-500">{dataEmpresa[0]?.telefono_principal}</span>
                    </p>
                </div>
              </div>
              <div className="flex flex-col col-span-3">
                <div className="grid gap-1 px-4 py-1 grid-cols-6 place-items-stretch">
                    <span className="text-sm">Cliente</span>
                    <span className="text-sm col-span-2">{dataCliente[0]?.nombre}</span>
                    <span className="text-sm row-span-2">Direccion</span>
                    <p className="text-sm col-span-2 row-span-2 uppercase">{dataCliente[0]?.calle} {dataCliente[0]?.numero} <br/>{dataCliente[0]?.colonia}<br/> {dataCliente[0]?.ciudad}, C.P. {dataCliente[0]?.cp}</p>
                    <span className="text-sm">Fecha Contrato</span>
                    <span className="text-sm col-span-2">{dataCliente[0]?.fecha_contrato}</span>
                    <span className="text-sm">Telefono(s)</span>
                    <p className="text-sm col-span-2">{dataCliente[0]?.tel_cod_casa}-{dataCliente[0]?.tel_casa} <br/>{dataCliente[0]?.tel_cod_cel} - {dataCliente[0]?.tel_cel} </p>
                    <span className="text-sm col-span-3">Terreno: {dataCliente[0]?.no_terreno} <br/> Manzana: {dataCliente[0]?.no_manzana}</span>
                    {/* <span className="text-sm col-span-2"></span> */}
                    <span className="text-sm">Desarrollo</span>
                    <span className="text-sm col-span-2">{dataCliente[0]?.fraccionamiento} ({dataCliente[0]?.fraccionamiento? 'PESOS' : 'DLLS'})</span>

                </div>
                
              </div>


            </div>
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-5/6 w-full rounded-md border p-4">
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 items-center gap-4">
            <span className="text-sm text-center">
            TABLA DE ESTADO DE CUENTA 
            </span>
            <span className="text-sm text-center">
            TABLA DE DETALLE DE PAGOS REALIZADOS 
            </span>
            <span className="text-sm text-center">
            TABLA DE RESUMEN DE PAGOS
            </span>
            
          </div>
        </div>
        </ScrollArea>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Imprimir</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
