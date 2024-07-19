import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { LoginSchema } from "./schemas/login.schema"
import { db } from "./lib/db";
import bcrypt from "bcryptjs";
import { error } from "console";


 
// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // credentials: {
      //   email: {},
      //   password: {},
      // },
      authorize: async (credentials) => {
        const { data, success } = LoginSchema.safeParse(credentials);
        
        if (!success) {
           throw new Error("Datos incorrectos");
        }
        // verificar si existe el usuario en la base de datos

        const user = await db.cat_usuarios.findUnique({
          where: {
            username: data.username,
          },
        });

        if (!user || !user.password) {
          throw new Error("Usuario no encontrado");
        }
        // verificar si la contraseña es correcta
        const isValid = await bcrypt.compare(data.password, user.password);
        if (!isValid) {
          throw new Error("Contraseña incorrecta");
        }


        // return user object with the their profile data
        return user
      },
    }),
  ],
} satisfies NextAuthConfig;
