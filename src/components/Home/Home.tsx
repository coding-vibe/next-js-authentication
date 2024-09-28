import { FC } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Button from '@mui/material/Button';

const ProtectedPage: FC = () => {
  const { data } = useSession();

  return (
    <div>
      <p>Hello {data?.user?.email}!</p>
      <Button onClick={() => signOut()}>Sign out</Button>
    </div>
  );
};

export default ProtectedPage;
