import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const apiUrl = process.env.NEXT_PUBLIC_SITE_URL;

const handler = NextAuth({
    providers: [
      CredentialsProvider({
        id: "credentials",
        name: "Credentials",
        async authorize(credentials) {
          console.log("authorize function invoked");
          try {

            const res = await fetch(apiUrl+ `/api/teachers/email/${credentials.email}`, {
              method: 'GET'
            });

            const teacher = await res.json();

            if (teacher && teacher.id && teacher.password) {
              // check password
              const isPasswordCorrect = await bcrypt.compare(credentials.password, teacher.password);
  
              if (isPasswordCorrect) {
                return {
                  id: teacher.id,
                  name: teacher
                }
              } else {
                throw new Error("Wrong Credentials !");
              }
  
            } else {
              throw new Error(`User : ${teacher.email} not found`);
            }
  
          } catch (error) {
            throw new Error(error);
          }
        }
      }),
    
    ],
    pages: {
      error: "/"
    }
});
  
export { handler as GET, handler as POST };