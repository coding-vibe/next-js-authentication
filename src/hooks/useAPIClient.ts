import APIClient from '@/APIClient';
import { useSession } from 'next-auth/react';

const useAPIClient = () => {
  const { data: session } = useSession();

  if (session?.user.access) {
    APIClient.defaults.headers['Authorization'] = `Bearer ${session.user.access}`;
  }

  return APIClient;
};

export default useAPIClient;
