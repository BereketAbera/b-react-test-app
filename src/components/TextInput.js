import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Input = styled.input`
  border: 1px solid #aaa;
  border-radius: 4px;
  &:placeholder {
    color: #333;
  }
  &:hover {
    border: 1px solid #888;
    outline: none;
  }
  &:focus {
    border: 1px solid #888;
    outline: none;
  }
`;

function TextInput({ className, suffix, prefix, ...props }) {
  const getValue = (exts) => {
    if (!exts) return '';
    if (typeof exts === 'string') return exts;
    else return exts();
  };

  return (
    <div className={`relative ${className}`}>
      {prefix && (
        <span className="absolute text-sm left-2 top-3">
          {getValue(prefix)}
        </span>
      )}
      <Input
        className={`w-full p-2 text-sm ${prefix ? 'pl-6' : ''} ${
          suffix ? 'pr-6' : ''
        }`}
        {...props}
      />
      {suffix && (
        <span className="absolute text-sm text-gray-400 right-3 top-2">
          {getValue(suffix)}
        </span>
      )}
    </div>
  );
}

TextInput.propTypes = {
  className: PropTypes.string,
};

export default TextInput;
