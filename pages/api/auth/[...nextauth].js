import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default (req, res) =>
  NextAuth(req, res, {
    session: { jwt: true },
    providers: [
      Providers.GitHub({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      }),
      Providers.Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
    ],
    debug: process.env.NODE_ENV === "development",
    secret: process.env.AUTH_SECRET,
    jwt: {
      secret: process.env.JWT_SECRET,
    },
    pages: {
      signIn: "/login",
    },
    database: process.env.DATABASE_URL,
    callbacks: {
      session: async (session, user) => {
        //console.log({ user, isNewUser });
        session.userId = user.sub;
        return Promise.resolve(session);
        //return Promise.resolve(session);
      },
    },
  });