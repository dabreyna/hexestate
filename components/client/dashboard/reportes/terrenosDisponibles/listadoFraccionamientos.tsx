"use client";

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {useFraccionamientoSelectedStore} from '@/app/store/dashboard/reportes/terrenosDisponibles/fraccionamientoSelectedStore'; 

interface Fraccionamiento {
    id_fraccionamiento: string;
    fraccionamiento: string;
  }
  
  interface ListadoFraccionamientosProps {
    Fraccionamientos: Fraccionamiento[];
  }

export default function ListadoFraccionamientos({ Fraccionamientos }: ListadoFraccionamientosProps) {
    const seleccionaFraccionamiento = useFraccionamientoSelectedStore((state: { setFraccionamiento: any; }) => state.setFraccionamiento);

    const handleFraccionamientoElegido = (value: string) => {
        seleccionaFraccionamiento(value);
      };
    return (
        <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <RadioGroup onValueChange={handleFraccionamientoElegido}>   
                    {Fraccionamientos.map((fraccionamiento) => (
                    <div className="flex items-center space-x-2"  key={fraccionamiento.id_fraccionamiento}>
                        <RadioGroupItem key={fraccionamiento.id_fraccionamiento} 
                                        value={fraccionamiento.id_fraccionamiento} 
                                        id={fraccionamiento.fraccionamiento} />
                            <Label htmlFor={fraccionamiento.fraccionamiento}>
                                {fraccionamiento.fraccionamiento}
                            </Label>
                    </div>
                    ))}
                </RadioGroup>
            </div>
        </>
    )
}