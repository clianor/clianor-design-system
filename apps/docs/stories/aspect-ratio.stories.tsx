import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { AspectRatio } from '@repo/ui';

const meta: Meta<typeof AspectRatio> = {
  component: AspectRatio,
};
export default meta;

type Story = StoryObj<typeof AspectRatio>;

export const CustomRatio: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        <div style={{ width: 200 }}>
          <AspectRatio ratio={1 / 2}>{image}</AspectRatio>
        </div>
        <div style={{ width: 200 }}>
          <AspectRatio>{image}</AspectRatio>
        </div>
        <div style={{ width: 200 }}>
          <AspectRatio ratio={16 / 9}>{image}</AspectRatio>
        </div>
        <div style={{ width: 200 }}>
          <AspectRatio ratio={2 / 1}>{image}</AspectRatio>
        </div>
      </div>
    );
  },
};

const image = (
  <img
    src="https://images.unsplash.com/photo-1605030753481-bb38b08c384a?&auto=format&fit=crop&w=400&q=80"
    alt="A house in a forest"
    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
  />
);
