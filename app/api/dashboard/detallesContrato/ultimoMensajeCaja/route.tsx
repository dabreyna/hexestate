import { NextRequest, NextResponse } from "next/server";
import dbQuery from "@/lib/dbQuery";


/*TODO:

*/
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);   

  const idContrato = searchParams.get('idContrato');
//   const idCliente = searchParams.get('idCliente');
  if (!idContrato) {
    return NextResponse.json({ error: 'El parámetro "idContrato" es requerido.' }, { status: 400 });
  }
  let query = `SELECT A.COMENTARIO,TO_CHAR(A.FECHA_COMENTARIO,'DD/MM/YYYY') AS FECHA_COMENTARIO,CONCAT(B.NOMBRE,' ',B.AP_PATERNO) AS USUARIO
                FROM COMENTARIOS_CAJA A
                INNER JOIN CAT_USUARIOS B ON A.ID_USUARIO=B.ID_USUARIO
                WHERE A.ID_CONTRATO = ${idContrato}
                    AND A.FECHA_COMENTARIO =(SELECT MAX(FECHA_COMENTARIO)FROM COMENTARIOS_CAJA WHERE ID_CONTRATO = ${idContrato})
             `;
  let tempData = await dbQuery(query);
  // const r = JSON.parse(tempData.rows);
  // console.log(tempData.rows);

  return NextResponse.json(tempData.rows, { status: 200 });
}
