import { Button, ButtonText } from '@libs/ui';
import { StackProps } from '@navigations/MainNavigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ArrowLeft, Eye, EyeOff, Lock, Mail, Phone, User } from 'lucide-react-native';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, ImageBackground, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomInput } from '../../components';
import { useAuth, useSafeNavigation } from '../../hooks';
import { RegisterRequest } from '../../services';

// Form data type
type RegisterFormData = {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  name: string;
  phone_number: string;
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

const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Email không hợp lệ';
  }
  return true;
};

const validatePhone = (phone: string) => {
  const phoneRegex = /^[0-9]{10,11}$/;
  if (!phoneRegex.test(phone)) {
    return 'Số điện thoại phải có 10-11 chữ số';
  }
  return true;
};

const validateName = (name: string) => {
  if (name.trim().length < 2) {
    return 'Tên phải có ít nhất 2 ký tự';
  }
  return true;
};

type PropsType = NativeStackScreenProps<StackProps, 'Register'>;
const RegisterScreen: React.FC<PropsType> = props => {
  const { navigation } = props;
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  
  // Auth hook
  const { register, loading, error } = useAuth();
  const { safeGoBack, safeNavigate, safeReset, canGoBack } = useSafeNavigation();
  
  // React Hook Form setup
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      name: '',
      phone_number: '',
    },
    mode: 'onChange',
  });

  const password = watch('password');

  const onSubmit = async (data: RegisterFormData) => {
    console.log('Attempting registration with:', data);
    
    const registerData: RegisterRequest = {
      username: data.username.trim(),
      password: data.password,
      email: data.email.trim(),
      name: data.name.trim(),
      phone_number: data.phone_number.trim(),
    };

    const result = await register(registerData);
    
    if (result.success && result.data) {
      console.log('Registration successful:', result.data);
      Alert.alert(
        'Đăng ký thành công',
        `Chào mừng ${result.data.user.name}! Tài khoản của bạn đã được tạo thành công.`,
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
              <View className="flex-row items-center mt-4 mb-8">
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
                  Tạo tài khoản <Text className="font-bold text-blue-500">mới</Text>
                </Text>
                <View className="flex-row items-center mt-2">
                  <Text className="text-xs text-gray-700">
                    Điền thông tin để tạo tài khoản mới
                  </Text>
                </View>
              </View>

              {/* Form */}
              <View className="space-y-6">
                {/* Name Input */}
                <CustomInput<RegisterFormData>
                  label="Họ và tên"
                  placeholder="Nhập họ và tên"
                  name="name"
                  control={control}
                  leftIcon={User}
                  className="mb-8"
                  rules={{
                    required: 'Vui lòng nhập họ và tên',
                    validate: validateName,
                  }}
                />

                {/* Username Input */}
                <CustomInput<RegisterFormData>
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

                {/* Email Input */}
                <CustomInput<RegisterFormData>
                  label="Email"
                  placeholder="Nhập email"
                  name="email"
                  control={control}
                  leftIcon={Mail}
                  className="mb-8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  rules={{
                    required: 'Vui lòng nhập email',
                    validate: validateEmail,
                  }}
                />

                {/* Phone Input */}
                <CustomInput<RegisterFormData>
                  label="Số điện thoại"
                  placeholder="Nhập số điện thoại"
                  name="phone_number"
                  control={control}
                  leftIcon={Phone}
                  className="mb-8"
                  keyboardType="phone-pad"
                  rules={{
                    required: 'Vui lòng nhập số điện thoại',
                    validate: validatePhone,
                  }}
                />

                {/* Password Input */}
                <CustomInput<RegisterFormData>
                  label="Mật khẩu"
                  placeholder="Nhập mật khẩu"
                  name="password"
                  control={control}
                  leftIcon={Lock}
                  rightIcon={hidePassword ? Eye : EyeOff}
                  onRightIconPress={() => setHidePassword(!hidePassword)}
                  secureTextEntry={hidePassword}
                  className="mb-8"
                  rules={{
                    required: 'Vui lòng nhập mật khẩu',
                    validate: validatePassword,
                  }}
                />

                {/* Confirm Password Input */}
                <CustomInput<RegisterFormData>
                  label="Xác nhận mật khẩu"
                  placeholder="Nhập lại mật khẩu"
                  name="confirmPassword"
                  control={control}
                  leftIcon={Lock}
                  rightIcon={hideConfirmPassword ? Eye : EyeOff}
                  onRightIconPress={() => setHideConfirmPassword(!hideConfirmPassword)}
                  secureTextEntry={hideConfirmPassword}
                  className="mb-8"
                  rules={{
                    required: 'Vui lòng xác nhận mật khẩu',
                    validate: (value: string) => {
                      if (value !== password) {
                        return 'Mật khẩu xác nhận không khớp';
                      }
                      return true;
                    },
                  }}
                />
              </View>

              {/* Error Message */}
              {error && (
                <View className="mb-8 p-3 bg-red-100 rounded-lg">
                  <Text className="text-red-600 text-sm text-center">{error}</Text>
                </View>
              )}

              {/* Login Link */}
              <View className="flex-row justify-center mt-6 mb-8">
                <Text className="text-sm text-gray-600">
                  Đã có tài khoản?{' '}
                </Text>
                <Pressable onPress={() => safeNavigate('Login')}>
                  <Text className="text-sm font-semibold text-blue-500">
                    Đăng nhập ngay
                  </Text>
                </Pressable>
              </View>
            </View>
        </ScrollView>

        {/* Register Button - Fixed at bottom */}
        <View className="px-6 pb-8 pt-4">
          <Button 
            onPress={handleSubmit(onSubmit)}
            size="lg"
            className="w-full rounded-2xl"
            disabled={loading}
          >
            <ButtonText>
              {loading ? 'Đang đăng ký...' : 'Đăng ký'}
            </ButtonText>
          </Button>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default RegisterScreen;