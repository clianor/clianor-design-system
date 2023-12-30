import React from 'react';

import { Slot } from '..';

const NODES = [
  'a',
  'button',
  'div',
  'form',
  'h2',
  'h3',
  'img',
  'input',
  'label',
  'li',
  'nav',
  'ol',
  'p',
  'span',
  'svg',
  'ul',
] as const;

type PropsWithoutRef<P> = P extends any
  ? 'ref' extends keyof P
    ? Pick<P, Exclude<keyof P, 'ref'>>
    : P
  : P;
type ComponentPropsWithoutRef<T extends React.ElementType> = PropsWithoutRef<
  React.ComponentProps<T>
>;

/* -------------------------------------------------------------------------------------------------
 * Primitive
 * -----------------------------------------------------------------------------------------------*/

type PrimitivePropsWithRef<E extends React.ElementType> =
  React.ComponentPropsWithRef<E> & {
    asChild?: boolean;
  };
type PrimitiveForwardRefComponent<E extends React.ElementType> =
  React.ForwardRefExoticComponent<PrimitivePropsWithRef<E>>;
type Primitives = {
  [E in (typeof NODES)[number]]: PrimitiveForwardRefComponent<E>;
};

const Primitive = NODES.reduce((primitives, node) => {
  const Node = React.forwardRef(
    (
      { asChild, ...primitiveProps }: PrimitivePropsWithRef<typeof node>,
      ref: unknown,
    ) => {
      const Comp: React.ElementType = asChild ? Slot : node;
      return <Comp {...primitiveProps} ref={ref} />;
    },
  );
  Node.displayName = `Primitive.${node}`;
  return { ...primitives, [node]: Node };
}, {} as Primitives);

/* -----------------------------------------------------------------------------------------------*/

export { Primitive };
export type { ComponentPropsWithoutRef, PrimitivePropsWithRef };
