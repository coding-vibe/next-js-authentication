import { signIn, useSession } from 'next-auth/react';

export default function Test() {
  const { data } = useSession();
  console.log(data);

  return <button onClick={() => signIn()}>Log in</button>;
}
