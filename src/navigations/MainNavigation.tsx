import LoginScreen from "@pages/auth-screen/LoginScreen";
import RegisterScreen from "@pages/auth-screen/RegisterScreen";
import DetailTourScreen from "@pages/detail-tour-screen/DetailTourScreen";
import HomeScreen from "@pages/home-screen/HomeScreen";
import OrderScreen from "@pages/order-screen/OrderScreen";
import ProfileScreen from "@pages/profile-screen/ProfileScreen";
import SearchScreen from "@pages/search-screen/SearchScreen";
import SearchLocationScreen from "@pages/search-screen/SearchLocationScreen";
import Onboarding_Product_Tour_02 from "@pages/Onboarding_Product_Tour_02/Onboarding_Product_Tour_02";
import SplashScreen from "@pages/splash-screen/SplashScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Home, Search, User } from 'lucide-react-native'

export type StackProps = {
    Splash: undefined;
    Auth: { screen?: string };
    Content: { screen?: string };
    Login: undefined;
    Register: undefined;
    Home: undefined;
    Detail: undefined;
    Search: undefined;
    SearchLocation: undefined;
    OnboardingTour02: undefined;
    Order: undefined;
    Profile: undefined;
    Main: undefined;
}

const Stack = createNativeStackNavigator();
const Bottomtab = createBottomTabNavigator();

const MainStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName={"Login"} screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="SearchLocation" component={SearchLocationScreen} />
            <Stack.Screen name="OnboardingTour02" component={Onboarding_Product_Tour_02} />
        </Stack.Navigator>
    )
}

const OrderStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Detail" component={DetailTourScreen} />
            <Stack.Screen name="Order" component={OrderScreen} />
        </Stack.Navigator>
    )
}

const TabBarHomeIcon = ({ color }: { color: string }) => {
    return <Home size={16} color={color} />;
};

const TabBarSearchIcon = ({ color }: { color: string }) => {
    return <Search size={16} color={color} />;
};

const TabBarProfileIcon = ({ color }: { color: string }) => {
    return <User size={16} color={color} />;
};

const MainBottomTabNavigator = () => {
    return (
        <Bottomtab.Navigator screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#0891b2',
            tabBarInactiveTintColor: '#b4b4b4ff',
            tabBarStyle: {
                height: 60,
                paddingBottom: 10,
                paddingTop: 5
            }
        }}>
            <Bottomtab.Screen name="Main" component={OrderStackNavigator} options={{
                tabBarIcon: ({ color }) => <TabBarHomeIcon color={color} />,
                tabBarLabel: 'Home'
            }} />
            <Bottomtab.Screen name="Search" component={SearchScreen} options={{
                tabBarIcon: ({ color }) => <TabBarSearchIcon color={color} />,
                tabBarLabel: 'Search'
            }} />
            <Bottomtab.Screen name="Profile" component={ProfileScreen} options={{
                tabBarIcon: ({ color }) => <TabBarProfileIcon color={color} />,
                tabBarLabel: 'Profile'
            }} />
        </Bottomtab.Navigator>
    )
}



const MainNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Auth" component={MainStackNavigator}/>
            <Stack.Screen name="Content" component={MainBottomTabNavigator}/>
        </Stack.Navigator>
  )
}

export default MainNavigation