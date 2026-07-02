import { ChangeEvent, FC, SyntheticEvent } from 'react';
import { Input, Button } from '@zlden/react-developer-burger-ui-components';

type TForgotPasswordUIProps = {
  email: string;
  setEmail: (value: string) => void;
  handleSubmit: (e: SyntheticEvent) => void;
  errorText?: string;
};

export const ForgotPasswordUI: FC<TForgotPasswordUIProps> = ({
  email,
  setEmail,
  handleSubmit,
  errorText
}) => (
  <form className='form' onSubmit={handleSubmit}>
    <div className='mb-6'>
      <Input
        type='email'
        placeholder='Укажите e-mail'
        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        value={email}
        name='email'
        error={Boolean(errorText)}
        errorText={errorText || ''}
        size='default'
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
      />
    </div>
    <div className='button'>
      <Button htmlType='submit' type='primary' size='medium'>
        Восстановить
      </Button>
    </div>
  </form>
);