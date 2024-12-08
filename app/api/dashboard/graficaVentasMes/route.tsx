import { NextRequest, NextResponse } from "next/server";
import dbQuery from "@/lib/dbQuery";


/*TODO:

MODIFICAR EN EL WHERE: EXTRACT(MONTH FROM fecha_contrato) = EXTRACT(MONTH FROM CURRENT_DATE - INTERVAL '5 months')
REMOVER EL -INTERVAL '5 months'  PARA QUE SEA EL MES ACTUAL Y NO 5 MESES ATRAS
*/
export async function GET(request: NextRequest) {
  let query = `SELECT CONCAT(b.nombre, ' ', b.ap_paterno) AS nombre_completo,cast(COUNT(*) as INT) AS ventas,vendedor
             FROM contratos_terrenos a
             INNER JOIN cat_usuarios b ON a.vendedor = b.id_usuario
             WHERE 
                    EXTRACT(MONTH FROM fecha_contrato) = EXTRACT(MONTH FROM CURRENT_DATE - INTERVAL '7 months')
                    --EXTRACT(MONTH FROM fecha_contrato) = EXTRACT(MONTH FROM CURRENT_DATE)
                    AND EXTRACT(YEAR FROM fecha_contrato) = EXTRACT(YEAR FROM CURRENT_DATE)
                    AND a.id_estatus_contrato IN (1, 4, 5)
             GROUP BY vendedor, nombre_completo;
             `;
  let tempData = await dbQuery(query);
  //console.log(tempData);
  // const r = JSON.parse(tempData.rows);

  return NextResponse.json(tempData.rows, { status: 200 });
}
