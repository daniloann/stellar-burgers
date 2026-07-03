import { ChangeEvent, FC, SyntheticEvent } from 'react';
import { Input, Button } from '@zlden/react-developer-burger-ui-components';

type TResetPasswordUIProps = {
  password: string;
  token: string;
  setPassword: (value: string) => void;
  setToken: (value: string) => void;
  handleSubmit: (e: SyntheticEvent) => void;
  errorText?: string;
};

export const ResetPasswordUI: FC<TResetPasswordUIProps> = ({
  password,
  token,
  setPassword,
  setToken,
  handleSubmit,
  errorText
}) => (
  <form className='form' onSubmit={handleSubmit}>
    <div className='mb-6'>
      <Input
        type='password'
        placeholder='Введите новый пароль'
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
    <div className='mb-6'>
      <Input
        type='text'
        placeholder='Введите код из письма'
        onChange={(e: ChangeEvent<HTMLInputElement>) => setToken(e.target.value)}
        value={token}
        name='token'
        error={Boolean(errorText)}
        errorText={errorText || ''}
        size='default'
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
      />
    </div>
    <div className='button'>
      <Button htmlType='submit' type='primary' size='medium'>
        Сохранить
      </Button>
    </div>
  </form>
);