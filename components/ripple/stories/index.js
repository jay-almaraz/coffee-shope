import React from 'react';
import { storiesOf } from '@storybook/react';
import { Ripple } from '../';

const lightBox = {
  overflow: 'hidden',
  position: 'relative',
  width: '360px',
  height: '100px',
  backgroundColor: '#f7f7f7'
};

const darkBox = {
  ...lightBox,
  backgroundColor: '#2d2926'
}

const greenRoundBox = {
  ...lightBox,
  height: '60px',
  width: '120px',
  backgroundColor: '#00653e',
  borderRadius: '50px'
}

storiesOf('Ripple', module)
  .add('dark', () => (
    <Ripple dark>
      {({ ripple, eventHandlers, mergeEventHandlers }) => {
        return (
          <div style={lightBox} {...eventHandlers}>
            {ripple}
          </div>
        );
      }}
    </Ripple>
  ))
  .add('light', () => (
    <Ripple>
      {({ ripple, eventHandlers, mergeEventHandlers }) => {
        return (
          <div style={darkBox} {...eventHandlers}>
            {ripple}
          </div>
        );
      }}
    </Ripple>
  ))
  .add('round', () => (
    <Ripple>
      {({ ripple, eventHandlers, mergeEventHandlers }) => {
        return (
          <div style={greenRoundBox} {...eventHandlers}>
            {ripple}
          </div>
        );
      }}
    </Ripple>
  ))
  .add('merge event handlers', () => (
    <Ripple dark>
      {({ ripple, eventHandlers, mergeEventHandlers }) => {
        return (
          <div style={lightBox} {...mergeEventHandlers({ onClick: () => console.log('clicked') })}>
            {ripple}
          </div>
        );
      }}
    </Ripple>
  ));