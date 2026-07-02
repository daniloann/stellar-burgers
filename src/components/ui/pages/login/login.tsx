import { ChangeEvent, FC, SyntheticEvent } from 'react';
import { Input, Button } from '@zlden/react-developer-burger-ui-components';

type TLoginUIProps = {
  errorText?: string;
  email: string;
  password: string;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  handleSubmit: (e: SyntheticEvent) => void;
};

export const LoginUI: FC<TLoginUIProps> = ({
  errorText,
  email,
  password,
  setEmail,
  setPassword,
  handleSubmit
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
    <div className='mb-6'>
      <Input
        type='password'
        placeholder='Введите пароль'
        onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        value={password}
        name='password'
        error={Boolean(errorText)}
        errorText={errorText || ''}
        size='default'
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
      />
    </div>
    <div className='button'>
      <Button htmlType='submit' type='primary' size='medium'>
        Войти
      </Button>
    </div>
  </form>
);