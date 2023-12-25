/* -------------------------------------------------------------------------------------------------
 * AspectRatio
 * -----------------------------------------------------------------------------------------------*/
import React from 'react';

import * as styles from './styles';

const NAME = 'AspectRatio';
type ELEMENT_TYPE = 'div';

type AspectRatioElement = React.ElementRef<ELEMENT_TYPE>;
type PrimitiveDivProps = React.ComponentPropsWithoutRef<ELEMENT_TYPE>;

type AspectRatioProps = PrimitiveDivProps & { ratio?: number };

const AspectRatio = React.forwardRef<AspectRatioElement, AspectRatioProps>(
  ({ ratio = 1, style, ...aspectRatioProps }, ref) => {
    return (
      <div style={styles.wrapper(ratio)}>
        <div
          {...aspectRatioProps}
          ref={ref}
          style={{ ...style, ...styles.content }}
        ></div>
      </div>
    );
  },
);
AspectRatio.displayName = NAME;

export { AspectRatio };
export type { AspectRatioProps };
