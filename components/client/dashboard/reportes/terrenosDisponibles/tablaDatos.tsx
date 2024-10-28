import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

  const invoices = [
    {
      terreno: "016",
      superficie: "367.171",
      preciom2: "$4,000.00",
      gl120: "$12,243.90",
      express: "$40,813.00",
      dolares18: "$14,447.80",
      gl144: "$10,203.25",
      contado: "$1,469,268.00",
      premier2021: "$13,774.39",
    },
    {
      terreno: "017",
      superficie: "367.171",
      preciom2: "$4,000.00",
      gl120: "$12,243.90",
      express: "$40,813.00",
      dolares18: "$14,447.80",
      gl144: "$10,203.25",
      contado: "$1,469,268.00",
      premier2021: "$13,774.39",
    },
    {
      terreno: "018",
      superficie: "367.171",
      preciom2: "$4,000.00",
      gl120: "$12,243.90",
      express: "$40,813.00",
      dolares18: "$14,447.80",
      gl144: "$10,203.25",
      contado: "$1,469,268.00",
      premier2021: "$13,774.39",
    },
    {
      terreno: "024",
      superficie: "367.171",
      preciom2: "$4,000.00",
      gl120: "$12,243.90",
      express: "$40,813.00",
      dolares18: "$14,447.80",
      gl144: "$10,203.25",
      contado: "$1,469,268.00",
      premier2021: "$13,774.39",
    },

  ]
   

  export default function TablaDatos() {
    return (
        <>
            <Table>
                <TableCaption>EL PARAISO</TableCaption>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[100px]">Terreno</TableHead>
                    <TableHead>Superficie</TableHead>
                    <TableHead>Precio m2</TableHead>
                    <TableHead>GL 120</TableHead>
                    <TableHead>Express</TableHead>
                    <TableHead>Dolares18</TableHead>
                    <TableHead>GL144</TableHead>
                    <TableHead>Contado</TableHead>
                    <TableHead>Premier 2021</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow className="shadownc-table__row my-row" >
                        <TableCell colSpan={9} className="font-medium text-xs bg-slate-100" style={{ height: '10px', padding: 2,}}>Manzana: 002</TableCell>
                    </TableRow>
                    {invoices.map((invoice) => (
                    <TableRow key={invoice.terreno}>
                        <TableCell className="font-medium text-xs">{invoice.terreno}</TableCell>
                        <TableCell className="text-right">{invoice.superficie}</TableCell>
                        <TableCell className="text-right">{invoice.preciom2}</TableCell>
                        <TableCell className="text-right">{invoice.gl120}</TableCell>
                        <TableCell className="text-right">{invoice.express}</TableCell>
                        <TableCell className="text-right">{invoice.dolares18}</TableCell>
                        <TableCell className="text-right">{invoice.gl144}</TableCell>
                        <TableCell className="text-right">{invoice.contado}</TableCell>
                        <TableCell className="text-right">{invoice.premier2021}</TableCell>
                        {/* <TableCell className="text-right">{invoice.totalAmount}</TableCell> */}
                    </TableRow>
                    ))
                    }
                    <TableRow>
                        <TableCell colSpan={1}>Subotal</TableCell>
                        <TableCell className="font-semibold text-right">2,500.00</TableCell>
                        <TableCell colSpan={5}></TableCell>
                        <TableCell colSpan={1} className="font-semibold text-right">$7,122,500.00</TableCell>
                    </TableRow>
                    <TableRow className="bg-slate-300">
                        <TableCell colSpan={9} className="font-medium text-xs bg-slate-100" style={{ height: '10px', padding: 2,}}>Manzana: 003</TableCell>
                    </TableRow>
                    {invoices.map((invoice) => (
                    <TableRow key={invoice.terreno}>
                        <TableCell className="font-medium text-xs">{invoice.terreno}</TableCell>
                        <TableCell className="text-right">{invoice.superficie}</TableCell>
                        <TableCell className="text-right">{invoice.preciom2}</TableCell>
                        <TableCell className="text-right">{invoice.gl120}</TableCell>
                        <TableCell className="text-right">{invoice.express}</TableCell>
                        <TableCell className="text-right">{invoice.dolares18}</TableCell>
                        <TableCell className="text-right">{invoice.gl144}</TableCell>
                        <TableCell className="text-right">{invoice.contado}</TableCell>
                        <TableCell className="text-right">{invoice.premier2021}</TableCell>
                    </TableRow>
                    ))
                    }
                    <TableRow>
                        <TableCell colSpan={1}>Subotal</TableCell>
                        <TableCell className="font-semibold text-right">2,500.00</TableCell>
                        <TableCell colSpan={5}></TableCell>
                        <TableCell colSpan={1} className="font-semibold text-right">$7,122,500.00</TableCell>
                    </TableRow>
                </TableBody>
                <TableFooter>
                    <TableRow style={{backgroundColor:'#fcf5e5',color:'#b31c45'}}>
                        <TableCell colSpan={1}>Total</TableCell>
                        <TableCell className="text-right">5,000.00</TableCell>
                        <TableCell colSpan={5}></TableCell>
                        <TableCell colSpan={1} className="font-semibold text-right">$15,122,500.00</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </>
    )
}