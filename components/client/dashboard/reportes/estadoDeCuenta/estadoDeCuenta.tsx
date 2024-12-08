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
  telefono_cel: string;
  telefono_casa: string;
  ciudad: string;
  cp: string;
  empresa: string;
  moneda: string;
  no_manzana: string;
  no_terreno: string;
  fraccionamiento: string;
  telefono_cod_cel: string;
  telefono_cod_casa: string;
}

export function EstadoDeCuentaDetalles({id}:{id:string}) {

  const [dataEmpresa, setDataEmpresa] = useState<Empresa[]>([]);
  const [dataCliente, setDataCliente] = useState<Cliente[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/dashboard/reportes/estadoDeCuenta/detalles/datosEmpresa?idContrato=${id}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`);
      }
      const data = await response.json();
      setDataEmpresa(data);
    } catch (error) {
      console.error(error);
    }
    try {
      const response = await fetch(`/api/dashboard/reportes/estadoDeCuenta/detalles/datosCliente?idContrato=${id}`);
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
          <SheetTitle className="text-center">Estado de cuenta individual</SheetTitle>
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
                <div className="grid gap-4 py-4 grid-cols-4 items-center">
                <span className="text-sm">Cliente</span>
                <span className="text-sm">{dataCliente[0]?.nombre}</span>
                <span className="text-sm">Direccion</span>
                <span className="text-sm">{dataCliente[0]?.calle} {dataCliente[0]?.numero} {dataCliente[0]?.colonia}</span>
                </div>
                
              </div>


            </div>
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-5/6 w-full rounded-md border p-4">
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
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
