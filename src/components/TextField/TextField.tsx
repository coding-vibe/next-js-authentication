import { FC } from 'react';
import { useField } from 'react-final-form';
import TextField from '@mui/material/TextField';
import { TextFieldProps } from '@mui/material';

interface Props {
  name: string;
}

const TextFieldContainer: FC<TextFieldProps & Props> = ({ className, name, ...rest }) => {
  const { input, meta } = useField<string>(name);

  return (
    <div css={className}>
      <TextField {...input} {...rest} error={!!meta.error} helperText={meta.error} />
    </div>
  );
};

export default TextFieldContainer;
