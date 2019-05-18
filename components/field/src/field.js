import React, { PureComponent } from 'react';
import types from 'prop-types';
import styled from '@emotion/styled';
import FieldStatus from './field-status';
import Error from './error.svg';
import THEME from '@coffee-shope/theme';

const Container = styled.div`
  position: relative;
`;

const Input = styled.input`
  font-size: 0.8rem;
  line-height: 1rem;
  font-weight: 700;
  padding: 5px 20px 5px 0px;
  width: 100%;
  height: 30px;
  outline: none;
  border: none;
  border-bottom: 1px solid ${props => (props.error ? THEME.COLORS.colorRed : THEME.COLORS.colorCeramic)};
  background-color: transparent;
  &:focus {
    border-bottom: 1px solid ${THEME.COLORS.colorGreenStarbucks};
    transition: 0.25s;
  }
`;

const FloatingLabel = styled.span`
  position: absolute;
  pointer-events: none;
  left: 0px;
  top: 7px;
  transition: 0.2s ease all;
  opacity: ${props => (props.value.length || props.inputIsFocussed ? '0' : '1')};
`;

const FloatingLabelFocus = styled.span`
  position: absolute;
  font-size: 10px;
  left: 0px;
  bottom: 30px;
  opacity: ${props => (props.value.length || props.inputIsFocussed ? 1 : 0)};
  transition: 0.2s ease all;
`;

const ErrorIcon = styled.span`
  position: absolute;
  top: 8px;
  right: 10px;
  fill: ${THEME.COLORS.colorRed};
`;

class Field extends PureComponent {
  static propTypes = {
    onChange: types.func,
    onFocus: types.func,
    onBlur: types.func,
    type: types.string,
    value: types.any,
    error: types.any,
    required: types.any,
    name: types.string,
    errorMessage: types.any,
  };

  state = {
    inputIsFocussed: false,
  };

  onFocus = e => {
    const { onFocus } = this.props;
    this.setState({ inputIsFocussed: true });
    onFocus(e);
  };

  onBlur = e => {
    const { onBlur } = this.props;
    this.setState({ inputIsFocussed: false });
    onBlur(e);
  };

  Input = () => {
    const { type, error, value, onChange, required, name } = this.props;

    return (
      <Container>
        <Input
          error={error}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          required={required}
        />
        <FloatingLabel {...this.state} value={value}>
          {name}
        </FloatingLabel>
        <FloatingLabelFocus {...this.state} value={value}>
          {name}
        </FloatingLabelFocus>
        {error && (
          <ErrorIcon>
            <Error />
          </ErrorIcon>
        )}
      </Container>
    );
  };

  ErrorStatus = () => {
    const { errorMessage } = this.props;

    return !!errorMessage
      ? typeof errorMessage === 'string'
        ? (
          <FieldStatus error={true}>{errorMessage}</FieldStatus>
        ) : (
          <span>errorMessage</span>
        )
      : null;
  };

  render() {
    const { Input, ErrorStatus } = this;
    console.log(THEME.COLORS);
    return (
      <Container>
        <Input />
        <ErrorStatus />
      </Container>
    );
  }
}

export default Field;
