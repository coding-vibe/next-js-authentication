import { signOut, useSession } from 'next-auth/react';
import useAPIClient from './useAPIClient';

const useLogout = () => {
  const APIClient = useAPIClient();
  const { data: session } = useSession();

  const handleLogout = () => {
    signOut();

    APIClient.post('/users/revoke/', { refresh: session?.user.refresh });
  };

  return handleLogout;
};

export default useLogout;
