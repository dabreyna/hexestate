import { NextRequest, NextResponse } from "next/server";
import dbQuery from "@/lib/dbQuery";
import _ from 'lodash';


export async function GET(request: NextRequest) {
  
  const { searchParams } = new URL(request.url);   
  const idFraccionamiento = searchParams.get('idFraccionamiento'); 

  let query = `SELECT B.NO_MANZANA,A.NO_TERRENO,A.SUPERFICIE,A.PRECIO_M2,A.TOTAL_TERRENO,A.ID_TERRENO
                FROM CAT_TERRENOS A
                INNER JOIN CAT_MANZANAS B ON B.ID_MANZANA = A.ID_MANZANA
                INNER JOIN CAT_FRACCIONAMIENTOS C ON C.ID_FRACCIONAMIENTO = B.ID_FRACCIONAMIENTO
                WHERE A.BND_ACTIVO = TRUE
                  AND A.ESTATUS = 1
                  AND C.ID_FRACCIONAMIENTO=${idFraccionamiento}
                ORDER BY B.NO_MANZANA,A.NO_TERRENO
             `;
  const tempData = await dbQuery(query);

 // Agrupando los datos por manzana usando Lodash
const groupedData = _.groupBy(tempData.rows, 'no_manzana');

// Transformando los datos agrupados al formato deseado
const formattedData = Object.keys(groupedData).map(manzana => ({
    manzana,
    terrenos: groupedData[manzana]
}));

  return NextResponse.json(formattedData, { status: 200 });
  //return NextResponse.json(tempData.rows, { status: 200 });
}
