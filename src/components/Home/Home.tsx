import { FC } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Button from '@mui/material/Button';

const ProtectedPage: FC = () => {
  const { data } = useSession();

  return (
    <>
      <div>Hello {data?.user?.first_name}! </div>
      <Button onClick={() => signOut()}>Sign out</Button>
    </>
  );
};

export default ProtectedPage;
