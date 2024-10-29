import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightLeft,
  ArrowUpWideNarrow,
  BookUser,
  BookOpenText,
  ChartArea,
  ChartBarDecreasing,
  ChartNoAxesCombined,
  ChartPie,
  ChartScatter,
  ClipboardCheck,
  FileClock,
  FileDigit,
  FileOutput,
  HandCoins,
  History,
  LandPlot,
  MessageSquareText,
  NotebookPen,
  PanelsTopLeft,
  PhoneForwarded,
  ReceiptText,
  Scale,
  TriangleAlert,
  Trophy,
  UserCheck,
  Wallet,
  BookOpenCheck,
  Percent,
  ThumbsDown,
} from "lucide-react";


import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import TablaDatos from "@/components/client/dashboard/reportes/terrenosDisponibles/tablaDatos";
import MontosGenerales from "@/components/client/dashboard/reportes/terrenosDisponibles/montosGenerales";
import {getDatos} from "@/lib/reportes/terrenosDisponibles/listadoFraccionamientos";
import ListadoFraccionamientos from "@/components/client/dashboard/reportes/terrenosDisponibles/listadoFraccionamientos";

export default async function TerrenosDisponibles({  
    params,
  }: {
    params: { clienteId: string };
  }) {
    const session = await auth();
    if (!session) {
      redirect("/sistema");
    }
  
    const listadoFraccionamientos = await getDatos();
    console.log(listadoFraccionamientos);
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
                  <div className="grid gap-6 md:grid-cols-8 sm:grid-cols-12">
                    <Card className="col-span-2">
                      <CardHeader>
                      </CardHeader>
                      <CardContent>
                        <ListadoFraccionamientos Fraccionamientos={listadoFraccionamientos}/>
                      </CardContent>
                    </Card>
                    <Card className="col-span-1">
                      <CardHeader>
                      </CardHeader>
                      <CardContent>
                        <MontosGenerales/>
                      </CardContent>
                    </Card>
                    <Card className="col-span-5">
                      <CardHeader>
                      </CardHeader>
                      <CardContent>
                        <TablaDatos/>
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