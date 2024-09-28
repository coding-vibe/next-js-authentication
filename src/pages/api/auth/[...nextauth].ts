import routes from '@/constants/routes';
import axios from 'axios';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

interface LoginResponse {
  access: string;
  refresh: string;
}

export const authOptions = {
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
            data: { access },
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

          return user;
        } catch {
          return null;
        }
      },
    }),
  ],
};

export default NextAuth(authOptions);
