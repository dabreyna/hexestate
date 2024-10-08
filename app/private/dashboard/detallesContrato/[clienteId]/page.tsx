import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Upload,
  Users2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function CajaCliente({
  params,
}: {
  params: { clienteId: string };
}) {
  const session = await auth();
  if (!session) {
    redirect("/sistema");
  }

  const cliente = {
    nombre: params.clienteId,
    apPaterno: "Perez",
    apMaterno: "Garcia",
    email: "juan@gmail.com",
    telefono: "123456789",
    direccion: "Av. Juan Perez, 123",
    ciudad: "Ciudad de México",
    provincia: "Estado de México",
    pais: "México",
  };
  return (
    <>
      <div className="mx-auto grid  flex-1 auto-rows-max gap-4 w-full">
        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <Card x-chunk="dashboard-07-chunk-0">
              <CardHeader>
                <CardTitle>Datos de Contrato</CardTitle>
                <CardDescription>
                  aqui van los datos del cliente (conyugue,telefonos,estado
                  civil,fecha nacimiento,etc)
                </CardDescription>
              </CardHeader>
              <CardContent></CardContent>
            </Card>

            <Card x-chunk="dashboard-07-chunk-1">
              <CardHeader>
                {/* <CardTitle>Stock</CardTitle> */}
                {/* <CardDescription>
                  Lipsum dolor sit amet, consectetur adipiscing elit
                </CardDescription> */}
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="copropietarios" className="w-full">
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="copropietarios">
                      Copropietarios
                    </TabsTrigger>
                    <TabsTrigger value="beneficiarios">
                      Beneficiarios
                    </TabsTrigger>
                    <TabsTrigger value="referencias">Referencias</TabsTrigger>
                    <TabsTrigger value="requisitos">Requisitos</TabsTrigger>
                    <TabsTrigger value="servicios">Servicios</TabsTrigger>
                  </TabsList>
                  <TabsContent value="copropietarios">
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
                  </TabsContent>
                  <TabsContent value="beneficiarios">
                    <Card>
                      <CardHeader>
                        <CardTitle>Password</CardTitle>
                        <CardDescription>
                          Change your password here. After saving, you'll be
                          logged out.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="space-y-1">
                          <Label htmlFor="current">Current password</Label>
                          <Input id="current" type="password" />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="new">New password</Label>
                          <Input id="new" type="password" />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button></Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                  <TabsContent value="referencias">
                    <Card>
                      <CardHeader>
                        <CardTitle></CardTitle>
                        <CardDescription></CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2"></CardContent>
                      <CardFooter>
                        <Button></Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                  <TabsContent value="requisitos">
                    <Card>
                      <CardHeader>
                        <CardTitle>Account</CardTitle>
                        <CardDescription>
                          Make changes to your account here. Click save when
                          you're done.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="space-y-1">
                          <Label htmlFor="name">Name</Label>
                          <Input id="name" defaultValue="Pedro Duarte" />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="username">Username</Label>
                          <Input id="username" defaultValue="@peduarte" />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button></Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                  <TabsContent value="servicios">
                    <Card>
                      <CardHeader>
                        <CardTitle>Account</CardTitle>
                        <CardDescription>
                          Make changes to your account here. Click save when
                          you're done.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="space-y-1">
                          <Label htmlFor="name">Name</Label>
                          <Input id="name" defaultValue="Pedro Duarte" />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="username">Username</Label>
                          <Input id="username" defaultValue="@peduarte" />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button></Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="justify-center border-t p-4"></CardFooter>
            </Card>
            <Card x-chunk="dashboard-07-chunk-2">
              <CardHeader>
                <CardTitle></CardTitle>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <Card x-chunk="dashboard-07-chunk-3">
              <CardHeader>
                <CardTitle className="text-lg">
                  {cliente.nombre} {cliente.apPaterno} {cliente.apMaterno}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="status">Terrenos</Label>
                    <Select>
                      <SelectTrigger
                        id="status"
                        aria-label="Selecciona el terreno"
                      >
                        <SelectValue placeholder="Selecciona el terreno" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">OASIS4-019-011</SelectItem>
                        <SelectItem value="draft2">OASIS4-019-012</SelectItem>
                        <SelectItem value="draft3">OASIS4-019-013</SelectItem>
                        <SelectItem value="draft4">OASIS4-019-014</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
              <CardHeader>
                <CardTitle>Product Images</CardTitle>
                <CardDescription>
                  Lipsum dolor sit amet, consectetur adipiscing elit
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <Image
                    alt="Product image"
                    className="aspect-square w-full rounded-md object-cover"
                    height="300"
                    src="/placeholder.svg"
                    width="300"
                  />
                  <div className="grid grid-cols-3 gap-2">
                    <button>
                      <Image
                        alt="Product image"
                        className="aspect-square w-full rounded-md object-cover"
                        height="84"
                        src="/placeholder.svg"
                        width="84"
                      />
                    </button>
                    <button>
                      <Image
                        alt="Product image"
                        className="aspect-square w-full rounded-md object-cover"
                        height="84"
                        src="/placeholder.svg"
                        width="84"
                      />
                    </button>
                    <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                      <Upload className="h-4 w-4 text-muted-foreground" />
                      <span className="sr-only">Upload</span>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-07-chunk-5">
              <CardHeader>
                <CardTitle>Archive Product</CardTitle>
                <CardDescription>
                  Lipsum dolor sit amet, consectetur adipiscing elit.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div></div>
                <Button size="sm" variant="secondary">
                  Archive Product
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 md:hidden">
          <Button variant="outline" size="sm">
            Discard
          </Button>
          <Button size="sm">Save Product</Button>
        </div>
      </div>
    </>
  );
}
