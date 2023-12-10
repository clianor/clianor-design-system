import React from 'react';

import { composeRefs } from '@repo/utils';

/* -------------------------------------------------------------------------------------------------
 * Slot
 * -----------------------------------------------------------------------------------------------*/

type SlotProps = React.HTMLAttributes<HTMLElement>;

/**
 * 자식 요소 중에서 isSlottable 함수에 의해 Slottable 하다고 판정된 요소가 있다면,
 * 그 요소의 자식을 새로운 요소로 렌더링 하는 컴포넌트.
 */
const Slot = React.forwardRef<HTMLElement, SlotProps>((props, forwardedRef) => {
  const { children, ...slotProps } = props;
  const childrenArray = React.Children.toArray(children);
  const slottable = childrenArray.find(isSlottable);

  if (slottable) {
    // 'Slottable'의 자식이 새로운 요소로 렌더링됩니다.
    const newElement = slottable.props.children as React.ReactNode;
    const newChildren = getNewChildren(childrenArray, slottable, newElement);

    return (
      <SlotClone {...slotProps} ref={forwardedRef}>
        {React.isValidElement(newElement)
          ? React.cloneElement(newElement, undefined, newChildren)
          : null}
      </SlotClone>
    );
  }

  return (
    <SlotClone {...slotProps} ref={forwardedRef}>
      {children}
    </SlotClone>
  );
});
Slot.displayName = 'Slot';

/* -------------------------------------------------------------------------------------------------
 * SlotClone
 * -----------------------------------------------------------------------------------------------*/

type SlotCloneProps = React.PropsWithChildren;

/**
 * 자식 요소가 유효한 React 요소라면 해당 요소를 복제해서 복제한 요소에 props와 ref를 병합하는 컴포넌트.
 */
const SlotClone = React.forwardRef<any, SlotCloneProps>(
  (props, forwardedRef) => {
    const { children, ...slotProps } = props;

    if (React.isValidElement(children)) {
      return React.cloneElement(children, {
        ...mergeProps(slotProps, children.props),
        ref: (forwardedRef
          ? composeRefs(forwardedRef, (children as any).ref)
          : (children as any).ref) as any,
      } as any);
    }

    return React.Children.count(children) > 1
      ? React.Children.only(null)
      : null;
  },
);
SlotClone.displayName = 'SlotClone';

/* -------------------------------------------------------------------------------------------------
 * Slottable
 * -----------------------------------------------------------------------------------------------*/

type SlottableProps = React.PropsWithChildren;

const Slottable: React.FC<SlottableProps> = ({ children }) => {
  return <>{children}</>;
};

/* -------------------------------------------------------------------------------------------------
 * Utils
 * -----------------------------------------------------------------------------------------------*/
type AnyProps = Record<string, any>;

function isSlottable(child: React.ReactNode): child is React.ReactElement {
  return React.isValidElement(child) && child.type === Slottable;
}

function getNewChildren(
  childrenArray: React.ReactNode[],
  slottable: React.ReactElement,
  newElement: React.ReactNode,
) {
  return childrenArray.map((child) => {
    if (child !== slottable) return child;
    if (React.Children.count(newElement) > 1) return React.Children.only(null);
    return React.isValidElement(newElement) ? newElement.props.children : null;
  });
}

function mergeProps(slotProps: AnyProps, childProps: AnyProps): AnyProps {
  const overrideProps = { ...childProps };

  Object.entries(childProps).forEach(([propName, childPropValue]) => {
    const slotPropValue = slotProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);

    if (isHandler && slotPropValue) {
      overrideProps[propName] = (...args: unknown[]) => {
        childPropValue(...args);
        slotPropValue(...args);
      };
    } else if (isHandler && !childPropValue) {
      overrideProps[propName] = slotPropValue;
    } else if (propName === 'style') {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === 'className') {
      overrideProps[propName] = [slotPropValue, childPropValue]
        .filter(Boolean)
        .join(' ');
    }
  });

  return { ...slotProps, ...overrideProps };
}

/* ---------------------------------------------------------------------------------------------- */

export { Slot, Slottable };
export type { SlotProps };
