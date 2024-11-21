import { FC } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Button from '@mui/material/Button';
import APIClient from '@/APIClient';

const ProtectedPage: FC = () => {
  const { data } = useSession();

  const handleRetrieveUser = async () => {
    const response = await APIClient.get(`/users/${data?.user.email}/`);
    console.log(response);
  };

  return (
    <>
      <div>Hello {data?.user?.first_name}! </div>
      <button onClick={handleRetrieveUser}>Fetch profile</button>
      <Button onClick={() => signOut()}>Sign out</Button>
    </>
  );
};

export default ProtectedPage;
