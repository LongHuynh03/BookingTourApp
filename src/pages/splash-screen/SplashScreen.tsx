import BackgroundApp from '@components/BackgroundApp'
import { Image, Text } from '@libs/ui'
import { StackProps } from '@navigations/MainNavigation'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useEffect } from 'react'

const SplashScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackProps>>();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Content', { screen: 'Main', params: { screen: 'Home' } });
    }, 3000);
  }, []);

  return (
    <BackgroundApp className="flex-1 justify-center items-center" source={require('@assets/images/bg-plash.png')}>
      <Image source={require('@assets/images/tour-logo.png')} className="w-50 h-50" alt="BNB Tour Logo" />
      <Text className='text-6xl font-bold m-8 text-white'>BNB TOUR</Text>
    </BackgroundApp>
  )
}

export default SplashScreen