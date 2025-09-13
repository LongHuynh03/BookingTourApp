import { Button, ButtonText, ImageBackground, Text } from '@libs/ui'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackProps } from '@navigations/MainNavigation'

const SplashScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackProps>>();

  const onpress = () => {
    navigation.navigate("Auth", { screen: "Login" });
  }


  return (
    <ImageBackground className="flex-1 justify-center items-center bg-white" source={require('@assets/images/bg-plash.png')}>
      <Text className="text-2xl font-bold mb-8">Booking Tour App</Text>
      <Button onPress={onpress} className="bg-blue-500 px-6 py-2 rounded-lg mt-4">
        <ButtonText>Get Started</ButtonText>
      </Button>
    </ImageBackground>
  )
}

export default SplashScreen