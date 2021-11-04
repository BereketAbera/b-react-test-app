import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// import tinycolor from 'tinycolor2';

const RadioButtonContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
`;

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 3px;
`;
const HiddenRadioButton = styled.input.attrs({ type: 'radio' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledRadioButton = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 10px;
  transition: all 150ms;
  box-shadow: ${(props) =>
    props.selected ? `0 0 0 2px ${props.color}` : '0 0 0 1px gray'};
  background: ${(props) => (props.selected ? props.color : 'white')};

  ${HiddenRadioButton}:focus + & {
    box-shadow: 0 0 0 2px ${(props) => props.color};
  }

  ${HiddenRadioButton}:hover + & {
    box-shadow: 0 0 0 2px ${(props) => props.color};
  }

  ${Icon} {
    visibility: ${(props) => (props.selected ? 'visible' : 'hidden')};
  }
`;

const RadioButton = ({ className, selected, color, ...props }) => (
  <RadioButtonContainer className={className}>
    <HiddenRadioButton selected={selected} {...props} />
    <StyledRadioButton color={color} selected={selected}>
      <Icon color={color} viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12" />
      </Icon>
    </StyledRadioButton>
  </RadioButtonContainer>
);

RadioButton.propTypes = {
  selected: PropTypes.bool,
  color: PropTypes.string,
};

RadioButton.defaultProps = {
  selected: false,
  color: '#F16D37',
};

export default RadioButton;
