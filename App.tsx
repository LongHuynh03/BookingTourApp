import MainNavigation from "@navigations/MainNavigation";
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import "./global.css";
import { GluestackUIProvider } from './src/lib/ui/gluestack-ui-provider';
import { persistor, store } from './src/store';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate 
        loading={
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#3B82F6" />
          </View>
        } 
        persistor={persistor}
      >
        <NavigationContainer>
          <GluestackUIProvider mode="light">
            <MainNavigation />
          </GluestackUIProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}