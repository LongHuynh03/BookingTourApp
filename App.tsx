import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GluestackUIProvider } from "@libs/ui/gluestack-ui-provider";
import MainNavigation from "@navigations/MainNavigation";
import "./global.css";

export default function App() {
  return (
    <NavigationContainer>
      <GluestackUIProvider>
        <MainNavigation />
      </GluestackUIProvider>
    </NavigationContainer>
  );
}