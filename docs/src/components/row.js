import React from 'react';
import types from 'prop-types';

function Row ({ children }) {
  return <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginTop: '20px' }}>{children}</div>;
}

Row.propTypes = {
  children: types.any
};

Row.defaultProps = {
  children: ({ children }) => null
};

export default Row;

export function Feat ({ children }) {
  return <div style={{ paddingRight: '20px', paddingLeft: '20px', display: 'flex', alignItems: 'center' }}>{children}</div>
}