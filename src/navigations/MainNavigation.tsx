import LoginScreen from "@pages/auth-screen/LoginScreen";
import RegisterScreen from "@pages/auth-screen/RegisterScreen";
import DetailTourScreen from "@pages/detail-tour-screen/DetailTourScreen";
import HomeScreen from "@pages/home-screen/HomeScreen";
import OrderScreen from "@pages/order-screen/OrderScreen";
import ProfileScreen from "@pages/profile-screen/ProfileScreen";
import SearchScreen from "@pages/search-screen/SearchScreen";
import SplashScreen from "@pages/splash-screen/SplashScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Home, Search, User } from 'lucide-react-native'

export type StackProps = {
    Splash: undefined;
    Login: undefined;
    Register: undefined;
    Home: undefined;
    Detail: undefined;
    Search: undefined;
    Order: undefined;
    Profile: undefined;
}

const Stack = createNativeStackNavigator();
const Bottomtab = createBottomTabNavigator();

const MainStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
    )
}

const OrderStackNavigator = () => {
    return (
        <Stack.Navigator>
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
        <Bottomtab.Navigator>
            <Bottomtab.Screen name="Main" component={OrderStackNavigator} options={
                {
                    tabBarIcon: ({ color }) => <TabBarHomeIcon color={color ?? '#b4b4b4ff'} />
                }} />
            <Bottomtab.Screen name="Search" component={SearchScreen} options={
                {
                    tabBarIcon: ({ color }) => <TabBarSearchIcon color={color ?? '#b4b4b4ff'} />
                }} />
            <Bottomtab.Screen name="Profile" component={ProfileScreen} options={
                {
                    tabBarIcon: ({ color }) => <TabBarProfileIcon color={color ?? '#b4b4b4ff'} />
                }} />
        </Bottomtab.Navigator>
    )
}



const MainNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Auth" component={MainStackNavigator}/>
            <Stack.Screen name="Content" component={MainBottomTabNavigator}/>
        </Stack.Navigator>
  )
}

export default MainNavigation