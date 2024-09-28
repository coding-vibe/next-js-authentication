import { FC } from 'react';
import { useSession } from 'next-auth/react';

const ProtectedPage: FC = () => {
  const { data } = useSession();

  return <div>Hello {data?.user?.email}!</div>;
};

export default ProtectedPage;
