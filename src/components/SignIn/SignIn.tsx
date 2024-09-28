import { FC } from 'react';
import { Form } from 'react-final-form';
import { useSnackbar } from 'notistack';
import TextField from '@/components/TextField';
import Button from '@mui/material/Button';
import * as classes from './styles';
import { signIn } from 'next-auth/react';
import routes from '@/constants/routes';
import { useRouter } from 'next/router';

interface FormValues {
  email: string;
  password: string;
}

const SignIn: FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const handleSignIn = async (values: FormValues) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        ...values,
      });

      if (result?.ok) {
        router.push(routes.HOME);
      } else if (result?.error) {
        throw new Error();
      }
    } catch {
      enqueueSnackbar('Invalid email/password', { variant: 'error' });
    }
  };
  return (
    <div css={classes.container}>
      <Form<FormValues>
        onSubmit={handleSignIn}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} css={classes.form}>
            <TextField label="Email" name="email" type="email" fullWidth sx={{ mb: 2 }} />
            <TextField label="Password" name="password" type="password" fullWidth sx={{ mb: 2 }} />
            <div css={classes.buttonContainer}>
              <Button variant="contained" type="submit">
                Sign in
              </Button>
            </div>
          </form>
        )}
      ></Form>
    </div>
  );
};

export default SignIn;
