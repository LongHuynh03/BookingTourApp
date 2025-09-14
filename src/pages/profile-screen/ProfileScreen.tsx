import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserProfile } from '../../components';
import { useAuth } from '../../hooks';

const ProfileScreen: React.FC = () => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <ScrollView className="flex-1 p-4">
          <View className="mb-6">
            <Text className="text-2xl font-bold text-gray-800 mb-2">
              Hồ sơ cá nhân
            </Text>
            <Text className="text-gray-600">
              Quản lý thông tin tài khoản của bạn
            </Text>
          </View>

          <View className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-sm text-center border border-blue-200">
            <Text className="text-4xl mb-4">👤</Text>
            <Text className="text-lg font-semibold text-gray-800 mb-2">
              Chưa đăng nhập
            </Text>
            <Text className="text-gray-600 mb-4">
              Đăng nhập để xem và quản lý thông tin cá nhân của bạn
            </Text>
            <Text className="text-sm text-blue-500">
              👆 Nhấn vào tab "Đăng nhập" ở dưới để bắt đầu
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 p-4">
        <View className="mb-6">
          <Text className="text-2xl font-bold text-gray-800 mb-2">
            Hồ sơ cá nhân
          </Text>
          <Text className="text-gray-600">
            Quản lý thông tin tài khoản của bạn
          </Text>
        </View>

        <UserProfile />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;