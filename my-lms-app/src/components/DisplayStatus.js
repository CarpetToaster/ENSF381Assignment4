import React from 'react';

const DisplayStatus = ({ type, message }) => {
  const bgColor = type === 'error' ? '#f8d7da' : '#d4edda';
  const textColor = type === 'error' ? '#721c24' : '#155724';
  const borderColor = type === 'error' ? '#f5c6cb' : '#c3e6cb';

  const styles = {
    backgroundColor: bgColor,
    color: textColor,
    padding: '15px',
    marginTop: '20px',
    borderRadius: '5px',
    border: `1px solid ${borderColor}`,
    fontWeight: 'bold',
  };

  return (
    <div style={styles}>
      {message}
    </div>
  );
};

export default DisplayStatus;