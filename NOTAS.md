## para generar los modelos en prisma desde la base de datos existente

correr el comando `npx prisma db pull` esto va a generar los modelos en el directorio `prisma/schema.prisma`

## para generar las interfaces en typescript desde el modelo de prisma

paso 1: en el archivo xxx.ts iniciar con: import { PrismaClient} from '@prisma/client';
paso 2: escribir interface nombreModelo { y esperar a que la herramienta de autocompletar me de la lista de los campos que tiene el modelo, pero hay que revisar que cargue todos los campos, ya que aveces algunos no los agrega a la interface...

## A estas tablas le voy a tener que agregar un campo llamado idRow que es un numero autoincremental de tipo bigserial que se incrementa en cada nueva fila que se agrega a la tabla ya que estas tablas al no tenerlo, cuando se hace el npx prisma db pull, me da el error: The following models were ignored as they do not have a valid unique identifier or id. This is currently not supported by Prisma Client:....

- "ajuste_anual_detalle" [x]
- "atencion_a_clientes_comentarios" [x]
- "atencion_a_clientes_levantamiento_servicios_comentarios" [x]
- "cobranza_cartas_devolucion" [x]
- "consumo_agua_config" [x]
- "lista_precios" [x]
- "servicios_fraccionamiento" [x]
- "servicios_informativos_terrenos" [x]
- "sistema_traspasos_folios" [x]

## revisar los siguientes urls para darme una idea de como acomodar el dashboard y caja con los datos del cliente

https://dash-tail.vercel.app/en/user-profile
https://themes.themesbrand.com/steex/angular/default/pages/profile

## para usuarios

https://themes.kopyov.com/limitless/demo/template/html/layout_1/full/user_pages_list.
https://themes.kopyov.com/limitless/demo/template/html/layout_1/full/user_pages_profile_tabbed.html

## ejemplos para recibos

https://preview.themeforest.net/item/pages-admin-dashboard-template-web-app/full_screen_preview/9694847

##extras
-->NOTAS https://react.vristo.sbthemes.com/apps/notes
-->SCRUM BOARD https://react.vristo.sbthemes.com/apps/scrumboard
