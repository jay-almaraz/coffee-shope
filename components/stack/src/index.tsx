import React, { useState } from 'react';
import styled from '@emotion/styled';

const StackContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const RowContainer = styled.div`
  padding: ${props => props.style?.padding}
`;

interface Props {
  children: React.ElementType[] | React.ElementType;
}

function makeChildren({
  children,
  ...rest
}: any) {
  if (children instanceof Array) {
    return children.map((v, i) => (
      <RowContainer {...rest} key={i}>{v}</RowContainer>
    ));
  }

  return children;
}

function Stack (props: Props) {
  const children = makeChildren(props);

  return (
    <StackContainer>
      {children}
    </StackContainer>
  );
}

export { Stack };