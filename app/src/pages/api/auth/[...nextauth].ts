import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Ensure environment variables are defined
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
// Use a more descriptive name for the base URL environment variable
const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  throw new Error("GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET is not defined");
}

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      // Dynamically set the callback URL based on the environment
      authorization: {
        params: {
          redirect_uri: `${NEXT_PUBLIC_BASE_URL}/api/auth/callback/google`,
        },
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // Modify the session object as needed
      return session;
    },
  },
  // Additional configuration as needed
});
