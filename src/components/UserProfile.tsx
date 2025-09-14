import { Button, ButtonText } from '@libs/ui';
import React from 'react';
import { Alert, Text, View } from 'react-native';
import { useAuth } from '../hooks';

const UserProfile: React.FC = () => {
  const { user, isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Đăng xuất',
      'Bạn có chắc chắn muốn đăng xuất?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Đăng xuất',
          style: 'destructive',
          onPress: () => {
            logout();
          },
        },
      ]
    );
  };

  if (!isLoggedIn || !user) {
    return null;
  }

  return (
    <View className="p-4 bg-white rounded-lg shadow-sm">
      <Text className="text-lg font-semibold text-gray-800 mb-2">
        Thông tin người dùng
      </Text>
      
      <View className="space-y-2 mb-4">
        <View>
          <Text className="text-sm text-gray-600">Tên:</Text>
          <Text className="text-base text-gray-800">{user.name}</Text>
        </View>
        
        <View>
          <Text className="text-sm text-gray-600">Tên đăng nhập:</Text>
          <Text className="text-base text-gray-800">{user.username}</Text>
        </View>
        
        <View>
          <Text className="text-sm text-gray-600">Email:</Text>
          <Text className="text-base text-gray-800">{user.email}</Text>
        </View>
        
        <View>
          <Text className="text-sm text-gray-600">Số điện thoại:</Text>
          <Text className="text-base text-gray-800">{user.phone_number}</Text>
        </View>
      </View>

      <Button onPress={handleLogout} size="sm" className="bg-red-500">
        <ButtonText>Đăng xuất</ButtonText>
      </Button>
    </View>
  );
};

export default UserProfile;
