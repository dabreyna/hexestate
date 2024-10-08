import { NextRequest, NextResponse } from "next/server";
import dbQuery from "@/lib/dbQuery";


/*TODO:

*/
export async function GET(request: NextRequest) {
  let query = `select 
                    a.fecha_contrato,concat(d.fraccionamiento,'-',c.no_manzana,'-',b.no_terreno) as terreno,
                    substring(d.nomenclatura,1,3) as nomenclatura,concat(e.nombre,' ',e.ap_paterno) as vendedor,
                    concat(f.nombre,' ',f.ap_paterno) as vendedor_secundario
                from contratos_terrenos a
                inner join cat_terrenos b on a.id_terreno=b.id_terreno
                inner join cat_manzanas c on b.id_manzana=c.id_manzana
                inner join cat_fraccionamientos d on c.id_fraccionamiento=d.id_fraccionamiento
                left join cat_usuarios e on a.vendedor=e.id_usuario
                left join cat_usuarios f on a.vendedor_compartido=f.id_usuario
                where 
                    a.fecha_contrato is not null 
                    and a.id_estatus_contrato=1 
                    and a.bnd_activo=true 
                order by a.fecha_contrato desc 
                limit 10;
             `;
  let tempData = await dbQuery(query);
  // const r = JSON.parse(tempData.rows);

  return NextResponse.json(tempData.rows, { status: 200 });
}
