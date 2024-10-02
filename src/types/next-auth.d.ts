import NextAuth, { User } from 'next-auth';
import { JWT } from 'next-auth/jwt';

interface CustomUser {
  id: string;
  first_name: string;
  last_name: string;
  avatar: string;
  access: string;
  refresh: string;
  email: string;
  is_admin: boolean;
}

declare module 'next-auth' {
  interface User extends CustomUser {
    email: string;
  }

  interface Session {
    user: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: User;
  }
}
