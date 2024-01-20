import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { dbClient } from "@/lib/db";
import User from "@/models/User";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET!,
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account, profile, email }) {
      // @ts-ignore
      const emailVerified = profile.email_verified;
      if (!profile?.email || !emailVerified) {
        console.log("No Email or Email not verified");
        return false;
      }
      const client = dbClient;
      // check if user exists in db
      const user = await User.findOne({ email: profile.email });
      // @ts-ignore
      const profilePicture = profile.picture;

      if (!user) {
        try {
          // create user
          const newUser = new User({
            email: profile.email,
            name: profile.name,
            image: profilePicture,
          });
          await newUser.save();
          console.log("newUser", newUser);
          return true;
        } catch (error) {}
        return false;
      } else {
        // update user
        try {
          const user = await User.findOneAndUpdate(
            { email: profile.email },
            {
              name: profile.name,
              image: profilePicture,
            },
            { new: false }
          );
          console.log("user", user);
          return true;
        } catch (error) {
          return false;
        }
      }
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
