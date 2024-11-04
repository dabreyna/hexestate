
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import TablaDatos from "@/components/client/dashboard/reportes/mercadotecnia/tablaDatos";
import {getAsesores,getAsesoresInactivos,getEstatus,getMediosPublicitarios} from "@/lib/reportes/mercadotecnia/filtrosBusqueda";
import FiltrosConsulta from "@/components/client/dashboard/reportes/mercadotecnia/filtrosConsulta";





export default async function ReporteMercadotecnia() {
    const session = await auth();
    if (!session) {
      redirect("/sistema");
    }
  
    const mediosPublicitarios=await getMediosPublicitarios();
    const estatusContrato=await getEstatus();
    const asesoresActivos=await getAsesores();
    const asesoresInactivos=await getAsesoresInactivos(); 
  return (
      <>
        <div className="mx-auto grid  flex-1 auto-rows-max gap-4  w-full">
          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-1 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card x-chunk="dashboard-07-chunk-0">
                <CardHeader>
                <CardTitle className="text-center"></CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-12 sm:grid-cols-12">
                    <Card className="col-span-2">
                      <CardHeader>
                      </CardHeader>
                      <CardContent>
                        <FiltrosConsulta mediosPublicitarios={mediosPublicitarios} estatusContrato={estatusContrato} asesoresActivos={asesoresActivos} asesoresInactivos={asesoresInactivos} id_usuario={session.user.id_usuario} perfil_usuario={session.user.perfil_usuario}/>
                      </CardContent>
                    </Card>
                    <Card className="col-span-10">
                      <CardHeader>
                      </CardHeader>
                      <CardContent>
                        <TablaDatos />
                      </CardContent>
                    </Card>                                        
                  </div>
                </CardContent>
                <CardFooter className="justify-center border-t p-4"></CardFooter>
              </Card>

            </div>
          </div>
        </div>
      </>
  );
}