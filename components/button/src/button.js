import React from 'react';
import types from 'prop-types';
import styled from '@emotion/styled'
import THEME from '@coffee-shope/theme';

const { colorGreenDarkApron, colorGreenApron, colorTextWhite } = THEME.COLORS;

const StyledButton = styled.button`
  font-family: 'Montserrat', sans-serif;
  outline: none;
  font-size: 15px;
  color: ${props => props.positive ? colorTextWhite : colorGreenDarkApron};
  font-weight: bold;
  background: ${props => !props.textOnly && 'transparent'};
  background-color: ${props => props.positive ? colorGreenDarkApron : props.textOnly && '#fff'};

  border: none;
  border-style: solid;
  border-width: 1px;
  border-color: ${props => props.textOnly ? 'transparent' : colorGreenDarkApron};
  border-radius: 48px;
  padding: 7px 19px;
  margin-right: 16px;

  &:hover {
    background-color: ${props =>
      !props.disabled && (
      props.positive
        ? `rgba(0,168,98,.9)`
        : `rgba(0,168,98,.1)`
      )};

    transition: 0.25s;
    border-color: ${props => props.positive && colorGreenApron};
  }

  &:active {
    transform: scale(0.95);
    transition: 0.25s;
  }

  &:not(:disabled) {
    cursor: pointer;
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
}
`;

function Button ({ children, disabled, onClick, ...restProps }) {
  return (
    <StyledButton 
      onClick={onClick} 
      disabled={disabled}
      {...restProps}
    >
      {children || 'Button'}
    </StyledButton>);
}

Button.propTypes = {
  positive: types.bool,
  textOnly: types.bool,
  disabled: types.bool,
  onClick: types.func
};

Button.defaultProps = {
  positive: false,
  textOnly: false,
  disabled: false,
  onClick: () => {}
};

export default Button;