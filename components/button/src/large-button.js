import React from 'react';
import types from 'prop-types';
import styled from '@emotion/styled';
import THEME from '@coffee-shope/theme';

const { colorGreenDarkApron, colorGreenApron } = THEME.COLORS;

const StyledLargeButton = styled.button`
  font-family: 'Montserrat', sans-serif;
  outline: none;
  width: ${props => props.small ? '33%' : '100%'};
  display: block;
  padding: 16px 32px;
  border-radius: 2px;
  background-color: ${props => props.positive ? colorGreenDarkApron : 'white'};
  border-color: ${colorGreenDarkApron};
  color: ${props => props.positive ? '#fff' : colorGreenDarkApron};
  font-size: 14px;
  border-color: rgba(0,168,98,.9);
  border: ${props => !props.positive && '1px solid ' + colorGreenDarkApron};

  &:not(:disabled) {
    cursor: pointer;
  }

  &:hover {
    background-color: ${props => props.positive ? 'rgba(0,168,98,.9)' : `rgba(0,168,98,.1)`};
    transition: 0.25s
  }

  &:active {
    transform: scale(.95);
    transition: all .2s ease;
  }
`;

function LargeButton ({ children, disabled, onClick, ...restProps }) {
  return (
    <StyledLargeButton 
      onClick={onClick} 
      disabled={disabled}
      {...restProps}
    >
      {children || 'Button'}
    </StyledLargeButton>);
}

LargeButton.propTypes = {
  positive: types.bool,
  disabled: types.bool,
  onClick: types.func
};

LargeButton.defaultProps = {
  positive: false,
  disabled: false,
  onClick: () => {}
};

export default LargeButton;