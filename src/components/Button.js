import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import tinycolor from 'tinycolor2';

const Btn = styled.button`
  background: ${(props) => props.color};
  border-radius: 3px;
  border: 1px solid transparent;
  &:hover {
    border: 1px solid white;
    outline: none;
    background-color: ${(props) => tinycolor(props.color).darken(10)};
  }
  &:focus {
    border: 1px solid white;
    outline: none;
    background-color: ${(props) => tinycolor(props.color).darken(10)};
  }
  &:active {
    outline: none;
    background-color: ${(props) => tinycolor(props.color).darken(10)};
  }
`;

function Button({ children, className, color, ...props }) {
  return (
    <Btn
      {...props}
      color={color}
      className={`px-4 py-2 text-lg text-white ${className}`}
    >
      {children}
    </Btn>
  );
}

Button.propTypes = {
  color: PropTypes.string,
};

Button.defaultProps = {
  color: '#F16D37',
};

export default Button;
