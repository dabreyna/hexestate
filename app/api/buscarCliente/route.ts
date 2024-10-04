
import { NextRequest, NextResponse } from "next/server";
import {db} from "@/lib/db";
import { Prisma } from "@prisma/client";
//const prisma = new PrismaClient();

interface Usuario {
  id_cliente?: number;
  nombre?: string;
  ap_paterno?: string;
  ap_materno?: string;
}


export const GET = async (request: Request) => {
  
  try {
    // Obtener el parámetro "nombre" de la URL
    const url = new URL(request.url);
    const nombre = url.searchParams.get('nombre');

    // Verificar si el parámetro existe
    if (!nombre) {
      return new NextResponse(JSON.stringify({ error: 'El parámetro "nombre" es requerido' }), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    //const nombre = "daniel"; // Suponiendo que el valor de nombre es este

    const r2: Usuario[] = await db.$queryRaw`
      SELECT id_cliente, nombre, ap_paterno, ap_materno
      FROM clientes
      WHERE LOWER(nombre) LIKE LOWER('%${nombre}%')
    `;
    //console.log(users);
    console.log(r2);


    // Aquí puedes realizar alguna acción con el nombre recibido, por ejemplo:
    return new NextResponse(JSON.stringify({ mensaje: `Hola, ${r2}!` }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error: 'Ocurrió un error' }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};