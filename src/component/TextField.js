import React from 'react';

const TextField = ({ value, onChange, onRemove }) => {
  return (
    <div>
      <input type="text" value={value} onChange={onChange} />
      <span onClick={onRemove}>-</span>
    </div>
  );
};

export default TextField;
