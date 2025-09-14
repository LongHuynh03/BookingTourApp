import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';

export const useSafeNavigation = () => {
  const navigation = useNavigation();

  const safeGoBack = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      // If can't go back, you might want to navigate to a default screen
      // or show an alert, or do nothing
      console.log('Cannot go back, already at root screen');
    }
  }, [navigation]);

  const safeNavigate = useCallback((screenName: string, params?: any) => {
    try {
      navigation.navigate(screenName as never, params);
    } catch (error) {
      console.error('Navigation error:', error);
    }
  }, [navigation]);

  const safeReset = useCallback((routes: any[]) => {
    try {
      navigation.reset({
        index: 0,
        routes,
      });
    } catch (error) {
      console.error('Navigation reset error:', error);
    }
  }, [navigation]);

  return {
    navigation,
    safeGoBack,
    safeNavigate,
    safeReset,
    canGoBack: navigation.canGoBack(),
  };
};
