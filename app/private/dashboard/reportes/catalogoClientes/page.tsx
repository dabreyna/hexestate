import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import TablaDatos from "@/components/client/dashboard/reportes/comisiones/tablaDatosDetallada";
import FiltrosConsultaComisiones from "@/components/client/dashboard/reportes/comisiones/filtrosConsulta";
import { Tabs } from "@radix-ui/react-tabs";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TablaDatosDetallada from "@/components/client/dashboard/reportes/comisiones/tablaDatosDetallada";
import TablaDatosResumen from "@/components/client/dashboard/reportes/comisiones/tablaDatosResumen";
import FiltrosConsultaCatalogoClientes from "@/components/client/dashboard/reportes/catalogoClientes/filtrosConsulta";

export default async function CatalogoClientes() {
  const session = await auth();
  if (!session) {
    redirect("/sistema");
  }

  return (
    <>
      <div className="mx-auto grid  flex-1 auto-rows-max gap-4  w-full">
        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-1 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <Card x-chunk="dashboard-contenedor-reporte">
              <CardHeader>
                <CardTitle className="text-center"></CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-12 sm:grid-cols-12">
                  <Card className="col-span-12">
                    <CardHeader></CardHeader>
                    <CardContent>
                      {/* <FiltrosConsultaCatalogoClientes
                        id_usuario={session.user.id_usuario}
                        perfil_usuario={session.user.perfil_usuario}
                      /> */}
                      <TablaDatosDetallada />
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
