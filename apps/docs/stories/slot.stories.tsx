import type { Meta, StoryObj } from '@storybook/react';

import { Slot, Slottable } from '@repo/ui';

const meta: Meta<typeof Slot> = {
  component: Slot,
};

export default meta;

type Story = StoryObj<typeof Slot>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  render: () => (
    <SlotWithSlottable>
      <b>Hello</b>
    </SlotWithSlottable>
  ),
};

export const WithComposedEvents: Story = {
  render: () => (
    <>
      <h1>둘다 출력 됨.</h1>
      <SlotWithPreventableEvent>
        <button onClick={() => console.log('button click')}>
          Slot 이벤트가 중단되지 않음.
        </button>
      </SlotWithPreventableEvent>

      <h1>"버튼 클릭"이 출력됨.</h1>
      <SlotWithPreventableEvent>
        <button
          onClick={(event) => {
            console.log('button click');
            event.preventDefault();
          }}
        >
          Slot 이벤트가 중단됨.
        </button>
      </SlotWithPreventableEvent>

      <h1>둘다 출력 됨.</h1>
      <SlotWithoutPreventableEvent>
        <button onClick={() => console.log('button click')}>
          Slot 이벤트가 중단되지 않음.
        </button>
      </SlotWithoutPreventableEvent>

      <h1>둘다 출력 됨.</h1>
      <SlotWithoutPreventableEvent>
        <button
          onClick={(event) => {
            console.log('button click');
            event.preventDefault();
          }}
        >
          Slot 이벤트가 중단됨.
        </button>
      </SlotWithoutPreventableEvent>
    </>
  ),
};

const SlotWithSlottable = ({ children, ...props }: any) => (
  <Slot {...props}>
    <Slottable>{children}</Slottable>&nbsp;
    <span>World</span>
  </Slot>
);

const SlotWithPreventableEvent = (props: any) => (
  <Slot
    {...props}
    onClick={(event) => {
      props.onClick?.(event);
      if (!event.defaultPrevented) {
        console.log(event.target);
      }
    }}
  />
);

const SlotWithoutPreventableEvent = (props: any) => (
  <Slot
    {...props}
    onClick={(event) => {
      props.onClick?.(event);
      console.log(event.target);
    }}
  />
);
