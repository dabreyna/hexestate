import dbQuery from '@/lib/dbQuery';

export async function getDatos() {
    const query = `SELECT C.ID_FRACCIONAMIENTO,C.FRACCIONAMIENTO
                    FROM CAT_TERRENOS A
                    INNER JOIN CAT_MANZANAS B ON A.ID_MANZANA = B.ID_MANZANA
                    INNER JOIN CAT_FRACCIONAMIENTOS C ON B.ID_FRACCIONAMIENTO = C.ID_FRACCIONAMIENTO
                    WHERE A.BND_ACTIVO = TRUE AND A.ESTATUS = 1
                    GROUP BY C.ID_FRACCIONAMIENTO,C.FRACCIONAMIENTO
                    ORDER BY C.FRACCIONAMIENTO ASC`;
    const { rows } = await dbQuery(query);
    return rows;
}