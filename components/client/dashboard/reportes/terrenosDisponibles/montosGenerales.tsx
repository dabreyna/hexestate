
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getDatos } from "@/lib/reportes/terrenosDisponibles/montosGenerales";



export default async function MontosGenerales() {
    const datos = await getDatos();
    console.log(datos);

    return (
        <>
        <Card>
            <CardContent className="p-4" style={{backgroundColor:'#fcf5e5',color:'#b31c45'}}>
                <div className="grid grid-cols-1 gap-4">
                    <span className="font-semibold text-center text-uppercase uppercase text-sm">Terrenos Disponibles</span>
                <span className="text-center font-black" style={{backgroundColor:'#fcf5e5'}}>{datos.total_terrenos}</span>
                </div>
            </CardContent>
        </Card>
        <br />
        <Card>
            <CardContent className="p-4" style={{backgroundColor:'#fcf5e5',color:'#b31c45'}}>
                <div className="grid grid-cols-1 gap-4">
                    <span className="font-semibold text-center text-uppercase uppercase text-sm">Superficie</span>
                <span className="text-center font-black">{datos.total_superficie}</span>
                </div>
            </CardContent>
        </Card>
        <br />
        <Card>
            <CardContent className="p-4" style={{backgroundColor:'#fcf5e5',color:'#b31c45'}}>
                <div className="grid grid-cols-1 gap-4">
                    <span className="font-semibold text-center text-uppercase uppercase text-sm">Valor</span>
                <span className="text-center font-black">{datos.total_valor}</span>
                </div>
            </CardContent>
        </Card>
        </>
        )
}