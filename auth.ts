import NextAuth from "next-auth"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import client from "./lib/db"
import Credentials from "next-auth/providers/credentials"
import { saltAndHashPassword } from "@/lib/utils"

import { object, string } from "zod"

export const signInSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});


export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(client),
  providers: [Credentials({
    // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    // e.g. domain, username, password, 2FA token, etc.
    credentials: {
      email: {},
      password: {},
    },
    authorize: async (credentials) => {
      let user = null
      console.log(credentials);
      // logic to salt and hash password
      // const pwHash = saltAndHashPassword(credentials?.password as string)

      // logic to verify if the user exists
      //TODO: Fix this Later
    //   user = await getUserFromDb(credentials.email, pwHash)
      user = { firstName: "John", lastName: "Doe", email: "aloktrify@gmail.com"}
      if (!user) {
        // No user found, so this is their first attempt to login
        // Optionally, this is also the place you could do a user registration
        throw new Error("Invalid credentials.")
      }

      // return user object with their profile data
      return user
    },
  }),],
})