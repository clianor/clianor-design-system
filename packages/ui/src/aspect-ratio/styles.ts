import React from 'react';

export const wrapper = (ratio: number): React.CSSProperties => ({
  position: 'relative',
  width: '100%',
  paddingBottom: `${100 / ratio}%`,
});

export const content: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
};
