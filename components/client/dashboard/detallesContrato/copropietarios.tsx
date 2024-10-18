"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useContratoSelectedStore } from "@/app/store/dashboard/detallesContrato/contratoSelectedStore";
import { useEffect,useState } from "react";



export default function Copropietarios() {
    // const [data,setData]=useState(null);

    const idCliente = useContratoSelectedStore((state) => state.idCliente);
    const idContrato = useContratoSelectedStore((state) => state.idContrato);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/api/dashboard/detallesContrato/datosCabecera/${idCliente}/${idContrato}`);
            const data = await response.json();
            setData(data);

      }, [idCliente,idContrato]);
    

  return (<>
                      <Card>
                      <CardHeader>
                        <CardTitle>Copropiertario(1)</CardTitle>
                        <CardDescription>
                          Nombre , fecha nacimiento, telefono, direccion,
                          ciudad, provincia, pais, email, lugar de nacimiento,
                          ocupacion, calle, numero, entre, ciudad, cp, colonia,
                          estado, pais, tel_casa, tel_cel, tel_trabajo, email,
                          lugar_trabajo, domicilio_trabajo, conyuge,
                          estado_civil, nacionalidad,
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="space-y-1">
                          <Label htmlFor="name">Nombre</Label>
                          <Input id="name" defaultValue="Pedro" />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="username">Apellido Paterno</Label>
                          <Input id="username" defaultValue="Perez" />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button>Guardar</Button>
                      </CardFooter>
                    </Card>
  </>)
  };