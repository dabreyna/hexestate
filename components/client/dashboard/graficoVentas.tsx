"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import moment from "moment";
import "moment/locale/es";
import { useEffect, useState } from "react";

export const description = "A bar chart with a custom label";

// export type listadoVentas = {
//   ventas: number;
//   vendedor: number;
//   nombre_completo: string;
// };

// const chartData = [
//   { month: "January", desktop: 186, mobile: 80 },
//   { month: "February", desktop: 305, mobile: 200 },
//   { month: "March", desktop: 237, mobile: 120 },
//   { month: "April", desktop: 73, mobile: 190 },
//   { month: "May", desktop: 209, mobile: 130 },
//   { month: "June", desktop: 214, mobile: 140 },
// ];

const chartConfig = {
  nombre_completo: {
    label: "Ventas",
    color: "hsl(var(--chart-1))",
  },
  ventas: {
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export default function GraficoVentasDashboard() {
  const [dataGrafico, setDataGrafico] = useState<any>(null); // Initialize with null
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/dashboard/graficaVentasMes");
        if (!response.ok) {
          throw new Error(`API call failed with status ${response.status}`);
        }
        const data = await response.json();
        setDataGrafico(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const fechaActual = moment().locale("es");
  const fechaMesActual = fechaActual.format("MMMM YYYY");
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ventas del Mes</CardTitle>
        <CardDescription>{fechaMesActual}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="max-h-[400px] max-w-[600]"
        >
          <BarChart
            accessibilityLayer
            data={dataGrafico}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="nombre_completo"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="ventas" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey="ventas" layout="vertical" fill="fill-red" radius={4}>
              <LabelList
                dataKey="nombre_completo" // Change this to the appropriate data key for your chart
                position="insideLeft"
                offset={8}
                className="fill-white"
                fontSize={14}
              />
              <LabelList
                dataKey="ventas"
                position="right"
                offset={8}
                className="fill-black"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
