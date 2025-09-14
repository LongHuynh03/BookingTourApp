import { ImageBackground } from '@libs/ui';
import React from 'react';
import { ImageSourcePropType, StatusBar } from 'react-native';

export type BackgroundProps = {
  children: React.ReactNode;
  source: ImageSourcePropType;
  className?: string;
};

const BackgroundApp: React.FC<BackgroundProps> = props => {
  const {children, className, source} = props;
  return (
    <ImageBackground
      source={source}
      className={`w-full h-full ${className || ''}`}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={'transparent'}
        translucent
      />
      {children}
    </ImageBackground>
  );
};

export default BackgroundApp