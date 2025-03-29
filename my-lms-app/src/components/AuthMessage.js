import React, { useContext } from 'react';
import { AuthContext } from './LoginForm';
import DisplayStatus from './DisplayStatus';

const AuthMessage = () => {
  const { status } = useContext(AuthContext);

  // Don't show anything if there's no message
  if (!status.message) return null;

  return (
    <DisplayStatus type={status.type} message={status.message} />
  );
};

export default AuthMessage;