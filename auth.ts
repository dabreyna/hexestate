import NextAuth from "next-auth"
import authConfig from "./auth.config"
 
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db"
 
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt", maxAge: 4 * 60*60}, // 1 hr
  callbacks: {
    // jwt() se ejecuta cada vez que se crea o actualiza un token JWT.
    // Aquí es donde puedes agregar información adicional al token.
    jwt({ token, user }) {
      if (user) {
        token.perfil_usuario = user.perfil_usuario;
        token.nombre = user.nombre;
        token.id_usuario = user.id_usuario; 
      }
      return token;
    },
    // session() se utiliza para agregar la información del token a la sesión del usuario,
    // lo que hace que esté disponible en el cliente.
    session({ session, token }) {
      if (session.user) {
        session.user.perfil_usuario = token.perfil_usuario;
        session.user.nombre = token.nombre;
        session.user.id_usuario= token.id_usuario; 
      }
      return session;
    },
  },
  ...authConfig,
})