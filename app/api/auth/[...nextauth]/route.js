import NextAuth, { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";

const adminEmails = ["rachitgala05@gmail.com"];

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: ({ session, token, user }) => {
      if (adminEmails.includes(session?.user?.email)) {
        return session;
      } else {
        return false;
      }
    },
    // async redirect({ url, baseUrl }) {
    //   const redirectUrl = url.startsWith("/")
    //     ? new URL(url, baseUrl).toString()
    //     : url;
    //   console.log(
    //     `[next-auth] Redirecting to "${redirectUrl}" (resolved from url "${url}" and baseUrl "${baseUrl}")`
    //   );
    //   return redirectUrl;
    // },
  },
};

const handler = NextAuth(authOptions);

export async function isAdminRequest() {
  const session = await getServerSession(authOptions);
  // console.log(session);
  if (!adminEmails.includes(session?.user?.email)) {
    res.status(401);
    res.end();
    throw "not an admin";
  }
}

export { handler as GET, handler as POST };
