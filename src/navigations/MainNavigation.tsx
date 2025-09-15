import LoginScreen from "@pages/auth-screen/LoginScreen";
import RegisterScreen from "@pages/auth-screen/RegisterScreen";
import DetailTourScreen from "@pages/detail-tour-screen/DetailTourScreen";
import HomeScreen from "@pages/home-screen/HomeScreen";
import OrderScreen from "@pages/order-screen/OrderScreen";
import ProfileScreen from "@pages/profile-screen/ProfileScreen";
import SearchScreen from "@pages/search-screen/SearchScreen";
import SplashScreen from "@pages/splash-screen/SplashScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home, Search, User } from 'lucide-react-native';
import { useAuth } from '../hooks';

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

const LoginScreenWrapper = (props: any) => <LoginScreen {...props} />;
const RegisterScreenWrapper = (props: any) => <RegisterScreen {...props} />;

const LoginTabWrapper = () => {
  return null;
};

const MainStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName={"Login"} screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="Login" component={LoginScreenWrapper} />
            <Stack.Screen name="Register" component={RegisterScreenWrapper} />
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
    const { isLoggedIn } = useAuth();
    
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
            {isLoggedIn ? (
                <Bottomtab.Screen name="Profile" component={ProfileScreen} options={{
                    tabBarIcon: ({ color }) => <TabBarProfileIcon color={color} />,
                    tabBarLabel: 'Profile'
                }} />
            ) : (
                <Bottomtab.Screen 
                    name="LoginTab" 
                    component={LoginTabWrapper} 
                    options={{
                        tabBarIcon: ({ color }) => <TabBarProfileIcon color={color} />,
                        tabBarLabel: 'Đăng nhập'
                    }}
                    listeners={({ navigation }) => ({
                        tabPress: (e) => {
                            e.preventDefault();
                            navigation.navigate('Login');
                        },
                    })}
                />
            )}
        </Bottomtab.Navigator>
    )
}



const MainNavigation = () => {
    const { isLoggedIn, loading } = useAuth();
    
    // Show splash screen while loading
    if (loading) {
        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Splash" component={SplashScreen} />
            </Stack.Navigator>
        );
    }
    
    return (
        <Stack.Navigator 
            screenOptions={{ headerShown: false }}
            initialRouteName="Content"
        >
            <Stack.Screen name="Splash" component={SplashScreen}/>
            <Stack.Screen name="Auth" component={MainStackNavigator}/>
            <Stack.Screen name="Content" component={MainBottomTabNavigator}/>
            <Stack.Screen 
                name="Login" 
                component={LoginScreenWrapper} 
                options={{
                    presentation: 'modal', // Full screen modal
                    gestureEnabled: true, // Allow swipe to dismiss
                }}
            />
            <Stack.Screen 
                name="Register" 
                component={RegisterScreenWrapper} 
                options={{
                    presentation: 'modal', // Full screen modal
                    gestureEnabled: true, // Allow swipe to dismiss
                }}
            />
        </Stack.Navigator>
  )
}

export default MainNavigation