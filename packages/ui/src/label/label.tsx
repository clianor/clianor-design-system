import React from 'react';

import { Primitive } from '..';

/* -------------------------------------------------------------------------------------------------
 * Label
 * -----------------------------------------------------------------------------------------------*/

const NAME = 'Label' as const;

type ELEMENT_TYPE = typeof Primitive.label;
type LabelElement = React.ElementRef<ELEMENT_TYPE>;
type PrimitiveLabelProps = React.ComponentPropsWithoutRef<ELEMENT_TYPE>;

type LabelProps = PrimitiveLabelProps;

const Label = React.forwardRef<LabelElement, LabelProps>((props, ref) => {
  return (
    <Primitive.label
      {...props}
      ref={ref}
      onMouseDown={(event) => {
        props.onMouseDown?.(event);
        // Label을 더블 클릭할때 텍스트 선택 방지
        if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
      }}
    />
  );
});
Label.displayName = NAME;

/* ---------------------------------------------------------------------------------------------- */

export { Label };
export type { LabelProps };
