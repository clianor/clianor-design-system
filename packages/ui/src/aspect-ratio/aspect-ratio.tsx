import React from 'react';

import { Primitive } from '..';
import * as styles from './styles';

/* -------------------------------------------------------------------------------------------------
 * AspectRatio
 * -----------------------------------------------------------------------------------------------*/

const NAME = 'AspectRatio';

type ELEMENT_TYPE = typeof Primitive.div;
type AspectRatioElement = React.ElementRef<ELEMENT_TYPE>;
type PrimitiveDivProps = React.ComponentPropsWithoutRef<ELEMENT_TYPE>;

type AspectRatioProps = PrimitiveDivProps & { ratio?: number };

const AspectRatio = React.forwardRef<AspectRatioElement, AspectRatioProps>(
  ({ ratio = 1, style, ...aspectRatioProps }, ref) => {
    return (
      <div style={styles.wrapper(ratio)}>
        <Primitive.div
          {...aspectRatioProps}
          ref={ref}
          style={{ ...style, ...styles.content }}
        />
      </div>
    );
  },
);
AspectRatio.displayName = NAME;

export { AspectRatio };
export type { AspectRatioProps };
