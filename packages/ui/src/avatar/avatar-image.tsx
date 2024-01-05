import React, { useLayoutEffect, useState } from 'react';

import { Primitive } from '..';
import {
  type AvatarImageLoadingStatus,
  useAvatarActions,
} from './avatar.context';

/* -------------------------------------------------------------------------------------------------
 * Avatar Image
 * -----------------------------------------------------------------------------------------------*/

const NAME = 'AvatarImage';

type ELEMENT_TYPE = typeof Primitive.img;
type AvatarEelement = React.ElementRef<ELEMENT_TYPE>;
type PrimitiveImgProps = React.ComponentPropsWithoutRef<ELEMENT_TYPE>;

type AvatarImageProps = PrimitiveImgProps & {};

const AvatarImage = React.forwardRef<AvatarEelement, AvatarImageProps>(
  ({ src, ...avatarImageProps }, ref) => {
    const imageLoadingStatus = useImageLoadingStatus(src);
    const { setImageLoadingStatus } = useAvatarActions();

    useLayoutEffect(() => {
      setImageLoadingStatus(imageLoadingStatus);
    }, [imageLoadingStatus, setImageLoadingStatus]);

    return imageLoadingStatus === 'loaded' ? (
      <Primitive.img
        {...avatarImageProps}
        ref={ref}
        src={src}
        data-status={imageLoadingStatus}
      />
    ) : null;
  },
);
AvatarImage.displayName = NAME;

/* ---------------------------------------------------------------------------------------------- */

const useImageLoadingStatus = (src?: string) => {
  const [loadingStatus, setLoadingStatus] =
    useState<AvatarImageLoadingStatus>('idle');

  useLayoutEffect(() => {
    if (!src) {
      setLoadingStatus('error');
      return;
    }

    setLoadingStatus('loading');
    const image = new Image();
    image.onload = () => setLoadingStatus('loaded');
    image.onerror = () => setLoadingStatus('error');
    image.src = src;
  }, [src]);

  return loadingStatus;
};

export { AvatarImage };
export type { AvatarImageProps };
