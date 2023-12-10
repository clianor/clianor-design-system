import React from 'react';

/* -------------------------------------------------------------------------------------------------
 * Label
 * -----------------------------------------------------------------------------------------------*/

const NAME = 'label' as const;

type LabelElement = React.ElementRef<typeof NAME>;
type PrimitiveLabelProps = React.ComponentPropsWithoutRef<typeof NAME>;

type LabelProps = PrimitiveLabelProps;

const Label = React.forwardRef<LabelElement, LabelProps>((props, ref) => {
  return (
    <label
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
