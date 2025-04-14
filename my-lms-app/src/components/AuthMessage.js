import React, { useContext } from 'react';
import { AuthContextLogin } from './LoginForm';
import { AuthContextSignup } from './SignupPage';
import DisplayStatus from './DisplayStatus';

const AuthMessage = () => {
  const login = useContext(AuthContextLogin);
  const signup = useContext(AuthContextSignup);
  const status = login?.status || signup?.status;

  if (!status?.message) return null;

  return (
    <DisplayStatus type={status.type} message={status.message} />
  );
};

export default AuthMessage;