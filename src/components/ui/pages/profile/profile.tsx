import { ChangeEvent, FC, SyntheticEvent } from 'react';
import { Input, Button } from '@zlden/react-developer-burger-ui-components';
import styles from './profile.module.css';

type TProfileUIProps = {
  formValue: {
    name: string;
    email: string;
    password: string;
  };
  isFormChanged: boolean;
  handleSubmit: (e: SyntheticEvent) => void;
  handleCancel: (e: SyntheticEvent) => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  updateUserError?: string;
};

export const ProfileUI: FC<TProfileUIProps> = ({
  formValue,
  isFormChanged,
  handleSubmit,
  handleCancel,
  handleInputChange,
  updateUserError
}) => (
  <form className={styles.form} onSubmit={handleSubmit}>
    <div className='mb-6'>
      <Input
        type='text'
        placeholder='Имя'
        onChange={handleInputChange}
        value={formValue.name}
        name='name'
        error={Boolean(updateUserError)}
        errorText={updateUserError || ''}
        size='default'
        icon='EditIcon'
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
      />
    </div>
    <div className='mb-6'>
      <Input
        type='email'
        placeholder='Логин'
        onChange={handleInputChange}
        value={formValue.email}
        name='email'
        error={Boolean(updateUserError)}
        errorText={updateUserError || ''}
        size='default'
        icon='EditIcon'
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
      />
    </div>
    <div className='mb-6'>
      <Input
        type='password'
        placeholder='Пароль'
        onChange={handleInputChange}
        value={formValue.password}
        name='password'
        error={Boolean(updateUserError)}
        errorText={updateUserError || ''}
        size='default'
        icon='EditIcon'
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
      />
    </div>
    {isFormChanged && (
      <div className='buttons'>
        <Button htmlType='submit' type='primary' size='medium'>
          Сохранить
        </Button>
        <Button htmlType='button' type='secondary' size='medium' onClick={handleCancel}>
          Отмена
        </Button>
      </div>
    )}
  </form>
);