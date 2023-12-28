import React from 'react';

import { AvatarFallback, type AvatarFallbackProps } from './avatar-fallback';
import { AvatarImage, type AvatarImageProps } from './avatar-image';
import { AvatarProvider } from './avatar.context';

/* -------------------------------------------------------------------------------------------------
 * Avatar
 * -----------------------------------------------------------------------------------------------*/

const NAME = 'Avatar';
type ELEMENT_TYPE = 'span';

type AvatarEelement = React.ElementRef<ELEMENT_TYPE>;
type PrimitiveSpanProps = React.ComponentPropsWithoutRef<ELEMENT_TYPE>;

type AvatarProps = PrimitiveSpanProps & {};

const AvatarRoot = React.forwardRef<AvatarEelement, AvatarProps>(
  ({ ...avatarProps }, ref) => {
    return (
      <AvatarProvider>
        <span {...avatarProps} ref={ref} />
      </AvatarProvider>
    );
  },
);
AvatarRoot.displayName = NAME;

/* ---------------------------------------------------------------------------------------------- */

const Avatar = Object.assign(
  {},
  {
    Root: AvatarRoot,
    Image: AvatarImage,
    Fallback: AvatarFallback,
  },
);

export { Avatar };
export type { AvatarProps, AvatarImageProps, AvatarFallbackProps };
