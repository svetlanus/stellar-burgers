import { ForgotPasswordUI } from '@ui-pages';
import { useState, useEffect, type SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '@/services/store';
import {
  forgotPasswordUser,
  selectIsSuccessForgotPassword,
  selectUserError,
  clearError,
  clearForgotPasswordSuccess,
} from '@services/slices/user-slice';

export const ForgotPassword = (): React.JSX.Element => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSuccess = useSelector(selectIsSuccessForgotPassword);
  const error = useSelector(selectUserError);

  const handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();
    void dispatch(forgotPasswordUser({ email }));
  };

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem('resetPassword', 'true');
      void navigate('/reset-password', { replace: true });
      dispatch(clearForgotPasswordSuccess());
    }
  }, [isSuccess, navigate, dispatch]);

  return (
    <ForgotPasswordUI
      errorText={error ?? ''}
      email={email}
      setEmail={setEmail}
      handleSubmit={handleSubmit}
    />
  );
};
