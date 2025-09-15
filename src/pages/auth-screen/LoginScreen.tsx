import { Button, ButtonText } from '@libs/ui';
import { StackProps } from '@navigations/MainNavigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ArrowLeft, Eye, EyeOff, Lock, User } from 'lucide-react-native';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, ImageBackground, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomInput } from '../../components';
import { useAuth, useSafeNavigation } from '../../hooks';
import { LoginRequest } from '../../services';

// Form data type
type LoginFormData = {
  username: string;
  password: string;
};

// Validation functions
const validateUsername = (username: string) => {
  if (username.trim().length < 3) {
    return 'Tên đăng nhập phải có ít nhất 3 ký tự';
  }
  return true;
};

const validatePassword = (password: string) => {
  if (password.length < 6) {
    return 'Mật khẩu phải có ít nhất 6 ký tự';
  }
  return true;
};

type PropsType = NativeStackScreenProps<StackProps, 'Login'>;
const LoginScreen: React.FC<PropsType> = props => {
  const { navigation } = props;
  const [hidePassword, setHidePassword] = useState(true);
  
  // Auth hook
  const { login, loading, error, isLoggedIn } = useAuth();
  const { safeGoBack, safeNavigate, safeReset, canGoBack } = useSafeNavigation();
  
  // React Hook Form setup
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: LoginFormData) => {
    console.log('Attempting login with:', data);
    
    const loginData: LoginRequest = {
      username: data.username.trim(),
      password: data.password,
    };

    const result = await login(loginData);
    
    if (result.success && result.data) {
      console.log('Login successful:', result.data);
      Alert.alert(
        'Đăng nhập thành công',
        `Chào mừng ${result.data.user.name}!`,
        [
          {
            text: 'OK',
            onPress: () => {
              // Navigate back to Content (MainBottomTabNavigator)
              // User will see the updated UI with Profile tab
              safeNavigate('Content');
            },
          },
        ]
      );
    }
  };

  return (
    <ImageBackground 
      className="flex-1"
      resizeMode="cover"
    >
      <SafeAreaView className="flex-1">
        <ScrollView 
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
          automaticallyAdjustKeyboardInsets={true}
        >
          <View className="mx-6">
        {/* Header */}
        <View className="flex-row items-center mt-4 mb-6">
          <Pressable 
            onPress={() => {
              if (canGoBack) {
                safeGoBack();
              } else {
                // If can't go back, navigate to Content (main app)
                safeNavigate('Content');
              }
            }}
            className="p-2 -ml-2"
          >
            <ArrowLeft size={24} color="#374151" />
          </Pressable>
        </View>

        {/* Title */}
        <View className="mb-8">
          <Text className="text-2xl text-gray-700 leading-8">
            Chào mừng <Text className="font-bold text-blue-500">trở lại</Text>
          </Text>
          <View className="flex-row items-center mt-2">
            <Text className="text-xs text-gray-700">
              Đăng nhập để tiếp tục sử dụng ứng dụng
            </Text>
          </View>
        </View>

        {/* Form */}
        <View className="space-y-6">
          {/* Username Input */}
          <CustomInput<LoginFormData>
            label="Tên đăng nhập"
            placeholder="Nhập tên đăng nhập"
            name="username"
            control={control}
            leftIcon={User}
            className="mb-8"
            autoCapitalize="none"
            rules={{
              required: 'Vui lòng nhập tên đăng nhập',
              validate: validateUsername,
            }}
          />

          {/* Password Input */}
          <CustomInput<LoginFormData>
            label="Mật khẩu"
            placeholder="Nhập mật khẩu"
            name="password"
            control={control}
            leftIcon={Lock}
            rightIcon={hidePassword ? Eye : EyeOff}
            onRightIconPress={() => setHidePassword(!hidePassword)}
            secureTextEntry={hidePassword}
            className="mb-3"
            rules={{
              required: 'Vui lòng nhập mật khẩu',
              validate: validatePassword,
            }}
          />
        </View>

        {/* Error Message */}
        {error && (
          <View className="mb-4 p-3 bg-red-100 rounded-lg">
            <Text className="text-red-600 text-sm text-center">{error}</Text>
          </View>
        )}

          </View>
        </ScrollView>

        {/* Login Button */}
        <View className="px-6 pb-8 pt-4">
          <Button 
            onPress={handleSubmit(onSubmit)}
            size="lg"
            className="w-full rounded-2xl"
            disabled={loading}
          >
            <ButtonText>
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </ButtonText>
          </Button>
        </View>

        {/* Register Link */}
        <View className="flex-row justify-center mt-4 mb-8 px-6">
          <Text className="text-sm text-gray-600">
            Chưa có tài khoản?{' '}
          </Text>
          <Pressable onPress={() => safeNavigate('Register')}>
            <Text className="text-sm font-semibold text-blue-500">
              Đăng ký ngay
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default LoginScreen;
