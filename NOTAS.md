## para generar los modelos en prisma desde la base de datos existente

correr el comando `npx prisma db pull` esto va a generar los modelos en el directorio `prisma/schema.prisma`

## para generar las interfaces en typescript desde el modelo de prisma

paso 1: en el archivo xxx.ts iniciar con: import { PrismaClient} from '@prisma/client';
paso 2: escribir interface nombreModelo { y esperar a que la herramienta de autocompletar me de la lista de los campos que tiene el modelo, pero hay que revisar que cargue todos los campos, ya que aveces algunos no los agrega a la interface...
