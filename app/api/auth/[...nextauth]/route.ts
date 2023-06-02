
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from 'next-auth/next'

const handler = NextAuth ({
    providers: [
        CredentialsProvider({
          // The name to display on the sign in form (e.g. "Sign in with...")
          name: "Credentials",
          // `credentials` is used to generate a form on the sign in page.
          // You can specify which fields should be submitted, by adding keys to the `credentials` object.
          // e.g. domain, username, password, 2FA token, etc.
          // You can pass any HTML attribute to the <input> tag through the object.
          credentials: {
            userId: { label: "UserId", type: "text", placeholder: "userid" },
            password: { label: "Password", type: "password", placeholder:"password" }
          },
          async authorize(credentials, req) {
            // Add logic here to look up the user from the credentials supplied
            // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }

            // console.log('bro: ',req)
            // console.log('bra: ',credentials)
            const res = await fetch('http://localhost:3000/api/login',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    Accept: "application/json",
                },
                body:JSON.stringify({
                    userId:credentials?.userId,
                    password:credentials?.password
                })
            })


            const user = await res.json();

            // console.log("why jani: ",user)
      
            if (user) {
              // Any object returned will be saved in `user` property of the JWT
            //   console.log("first: ", user.data[0])
              return user
            } else {
              // If you return null then an error will be displayed advising the user to check their details.
              return null
      
              // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
            }
          }
        })
      ],
      session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
      },
      jwt: {
        signingKey: process.env.SECRET_KEY!,
      },
      callbacks: {
        async session({ session, token }) {
        //   console.log('naaa: ', token);
          session.user = token as any;
        //   console.log("stop: ", session)
        console.log('sesh: ',session.user)
          return session;
        },
        async jwt({ token, user }) {
        //   if (user) {
        //     token.user = user;
        //   }
        //   return token;
        // console.log("how: ", user.data)
        console.log('toto:', token)
        return {...token,...user}
        },
      },
      pages:{
        signIn:'/signin'
      }
});

export { handler as GET, handler as POST };