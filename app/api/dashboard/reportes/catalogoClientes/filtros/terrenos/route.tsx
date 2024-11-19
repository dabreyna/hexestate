import { NextRequest, NextResponse } from "next/server";
import dbQuery from "@/lib/dbQuery";


/*TODO:

*/
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);   
  const idManzana = searchParams.get('idManzana');
  let query = `SELECT ID_TERRENO,NO_TERRENO FROM CAT_TERRENOS WHERE BND_ACTIVO = TRUE AND ID_MANZANA= ${idManzana}`; 
  const tempData = await dbQuery(query);


  return NextResponse.json(tempData.rows, { status: 200 });
}
