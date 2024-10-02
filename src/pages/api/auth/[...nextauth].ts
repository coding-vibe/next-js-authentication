import type { AuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import axios from 'axios';
import CredentialsProvider from 'next-auth/providers/credentials';
import routes from '@/constants/routes';

interface LoginResponse {
  access: string;
  refresh: string;
}

export const authOptions: AuthOptions = {
  pages: {
    signIn: routes.SIGN_IN,
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        try {
          if (!credentials) {
            return null;
          }

          const { email } = credentials;

          const {
            data: { access, refresh },
          } = await axios.post<LoginResponse>(
            `${process.env.NEXT_PUBLIC_API_HOST}/users/login/`,
            credentials,
          );
          const { data: user } = await axios.get(
            `${process.env.NEXT_PUBLIC_API_HOST}/users/${email}/`,
            {
              headers: { Authorization: `Bearer ${access}` },
            },
          );

          return { ...user, access, refresh };
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        return { ...token, user };
      }

      return token;
    },
    session({ session, token }) {
      session.user = token.user;

      return session;
    },
  },
};

export default NextAuth(authOptions);
