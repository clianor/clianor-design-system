import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Label } from '@repo/ui';

const meta: Meta<typeof Label> = {
  component: Label,
};

export default meta;

type Story = StoryObj<typeof Label>;

export const WithControl: Story = {
  render: () => (
    <>
      <h1>Label로 감싸 제어하기</h1>
      <Label>
        <Control /> Label
      </Label>

      <h1>참조 방식으로 제어하기</h1>
      <Control id="control" />
      <Label htmlFor="control">Label</Label>
    </>
  ),
};

const Control = (props: React.ComponentProps<'button'>) => {
  return (
    <button
      {...props}
      onClick={() => {
        console.log('클릭됨');
      }}
    >
      제어
    </button>
  );
};
