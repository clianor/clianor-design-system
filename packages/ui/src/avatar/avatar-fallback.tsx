import React, { useEffect, useState } from 'react';

import { useAvatar } from './avatar.context';

/* -------------------------------------------------------------------------------------------------
 * Avatar Fallback
 * -----------------------------------------------------------------------------------------------*/

const NAME = 'AvatarFallback';
type ELEMENT_TYPE = 'span';

type AvatarEelement = React.ElementRef<ELEMENT_TYPE>;
type PrimitiveSpanProps = React.ComponentPropsWithoutRef<ELEMENT_TYPE>;

type AvatarFallbackProps = PrimitiveSpanProps & {
  delayMs?: number;
};

const AvatarFallback = React.forwardRef<AvatarEelement, AvatarFallbackProps>(
  ({ delayMs, ...avatarFallbackProps }, ref) => {
    const { imageLoadingStatus } = useAvatar();
    const [canRender, setCanRender] = useState(delayMs === undefined);

    useEffect(() => {
      const timerId = window.setTimeout(() => setCanRender(true), delayMs);
      return () => {
        clearTimeout(timerId);
      };
    }, [delayMs]);

    return canRender && imageLoadingStatus !== 'loaded' ? (
      <span
        {...avatarFallbackProps}
        ref={ref}
        data-status={imageLoadingStatus}
      />
    ) : null;
  },
);
AvatarFallback.displayName = NAME;

/* ---------------------------------------------------------------------------------------------- */

export { AvatarFallback };
export type { AvatarFallbackProps };
