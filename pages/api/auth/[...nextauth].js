import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const redirectBaseUrlAllowlist = ['https://account-d.docusign.com'];


export default NextAuth({
  adapter: PrismaAdapter(prisma),
  // TODO: Support username+password auth.
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_AUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_AUTH_SECRET,
      // TODO: Remove this after debugging:
      httpOptions: {
        timeout: 40000,
      },
    }),
  ],
  callbacks: {
    redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url;
      // Allows relative callback URLs
      if (url.startsWith('/')) return new URL(url, baseUrl).toString();
      if (redirectBaseUrlAllowlist.some((element) => url.startsWith(element))) {
        return url;
      }
      return baseUrl;
    },
  },
});
