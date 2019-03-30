import React, { PureComponent, ReactElement } from 'react';
import { Ripple } from '@coffee-shope/ripple'; 
import { LoadingSpinner } from './loading-circle';
import styled from '@emotion/styled';

const THEME = require('@coffee-shope/theme');

export interface Props {
  onClick: (e: any) => any;
  mini?: boolean;
  circular?: boolean;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  width?: string;
  text?: string;
  bottomRight?: boolean;
}

const Container = styled.div`
  ${(props: Props) => props.bottomRight && `
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  `}
`;

const Button = styled.button<Props>`
  outline: none;
  position: relative;
  display: inline-block;
  z-index: 1;
  padding: 18px 24px;
  background: ${THEME.COLORS.colorGreenApron};
  box-shadow: 0 0 6px rgba(0,0,0,.24), 0 8px 12px rgba(0,0,0,.14);
  border-radius: 500px;
  color: #fff;
  font-size: 19px;
  font-size: 19px;
  font-weight: 700;
  line-height: 1.2;
  overflow: hidden;
  text-align: center;
  text-decoration: none;
  transition-duration: .2s;
  transition-property: transform,box-shadow,width,height;
  transition-timing-function: ease;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  ${props => props.disabled && `
    background: #ccc;
    cursor: not-allowed;
  `}
  ${props => props.circular && `
    width: min-content;
  `}
  ${props => props.circular && props.loading && `
    padding: 5px;
  `}
`;

class Float extends PureComponent<Props, {}> {
  render () {
    const {
      onClick,
      disabled,
      loading,
      text
    } = this.props;

    return (
      <Container {...this.props}>
      <Ripple>
        {({ ripple, mergeEventHandlers }) => (
          <Button
            {...this.props}
            {...mergeEventHandlers({ onClick })}
            disabled={disabled}
          >
            {!disabled && !loading && ripple}
            {loading && <LoadingSpinner {...this.props} />}
            {text}
          </Button>
        )}
      </Ripple>
      </Container>
    );
  }
}

export { Float };