import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { AspectRatio, Avatar } from '@repo/ui';

const meta: Meta<typeof AspectRatio> = {
  component: AspectRatio,
};
export default meta;

type Story = StoryObj<typeof AspectRatio>;

const src = 'https://picsum.photos/id/1005/400/400';
const srcBroken = 'https://broken.link.com/broken-pic.jpg';

export const Examples: Story = {
  render: () => {
    return (
      <>
        <h1>Without image & with fallback</h1>
        <Avatar.Root>
          <Avatar.Fallback>JS</Avatar.Fallback>
        </Avatar.Root>

        <h1>With image & with fallback</h1>
        <Avatar.Root>
          <Avatar.Image alt="John Smith" src={src} />
          <Avatar.Fallback delayMs={300}>JS</Avatar.Fallback>
        </Avatar.Root>

        <h1>With image & with fallback (but broken src)</h1>
        <Avatar.Root>
          <Avatar.Image alt="John Smith" src={srcBroken} />
          <Avatar.Fallback>
            <AvatarIcon />
          </Avatar.Fallback>
        </Avatar.Root>
      </>
    );
  },
};

const AvatarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    width="42"
    height="42"
  >
    <path
      d="M50 51.7a22.1 22.1 0 100-44.2 22.1 22.1 0 000 44.2zM87.9 69.3a27.8 27.8 0 00-21.2-16.1 4 4 0 00-2.8.7 23.5 23.5 0 01-27.6 0 4 4 0 00-2.8-.7 27.5 27.5 0 00-21.2 16.1c-.3.6-.2 1.3.1 1.8a52.8 52.8 0 007 8.9 43.4 43.4 0 0056.9 3.8 56.3 56.3 0 008.9-8.8c.9-1.2 1.8-2.5 2.6-3.9.3-.6.3-1.2.1-1.8z"
      fill="currentColor"
    />
  </svg>
);
