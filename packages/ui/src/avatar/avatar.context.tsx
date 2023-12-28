'use client';

import React, { createContext, useContext, useState } from 'react';

export type AvatarImageLoadingStatus = 'idle' | 'loading' | 'loaded' | 'error';

type AvatarContextValue = {
  imageLoadingStatus: AvatarImageLoadingStatus;
};

type AvatarActionsContextValue = {
  setImageLoadingStatus: (status: AvatarImageLoadingStatus) => void;
};

const AvatarContext = createContext<AvatarContextValue>({
  imageLoadingStatus: 'idle',
});

const AvatarActionsContext = createContext<AvatarActionsContextValue>({
  setImageLoadingStatus: () => {},
});

type AvatarProviderProps = React.PropsWithChildren<{}>;

export const AvatarProvider: React.FC<AvatarProviderProps> = ({ children }) => {
  const [imageLoadingStatus, setImageLoadingStatus] =
    useState<AvatarImageLoadingStatus>('idle');

  return (
    <AvatarContext.Provider value={{ imageLoadingStatus }}>
      <AvatarActionsContext.Provider value={{ setImageLoadingStatus }}>
        {children}
      </AvatarActionsContext.Provider>
    </AvatarContext.Provider>
  );
};

export const useAvatar = () => {
  const context = useContext(AvatarContext);
  if (!context)
    throw new Error(
      'useAvatar 훅은 AvatarProvider 아래에서만 사용할 수 있습니다.',
    );
  return context;
};

export const useAvatarActions = () => {
  const context = useContext(AvatarActionsContext);
  if (!context)
    throw new Error(
      'useAvatarActions 훅은 AvatarProvider 아래에서만 사용할 수 있습니다.',
    );
  return context;
};
