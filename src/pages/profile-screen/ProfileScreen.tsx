import { useNavigation } from '@react-navigation/native';
import { History, Info, LogOut, Pencil, Shield } from 'lucide-react-native';
import React from 'react';
import { Alert, Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../hooks';

const ProfileScreen: React.FC = () => {
  const { user, isLoggedIn, logout } = useAuth();
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert(
      'Đăng xuất',
      'Bạn có chắc chắn muốn đăng xuất?',
      [
        { text: 'Hủy', style: 'cancel' },
        { text: 'Đăng xuất', style: 'destructive', onPress: () => logout() },
      ]
    );
  };

  if (!isLoggedIn || !user) {
    return null;
  }

  const avatarUri = 'https://i.pravatar.cc/200';

  return (
    <SafeAreaView className="flex-1 bg-[#F5F4F8]">
      <ScrollView className="flex-1 px-6">
        <View className="mt-4 mb-2">
          <Text className="text-xl font-bold text-[#252B5C] text-center">Thông tin cá nhân</Text>
        </View>

        <View className="items-center mt-5 mb-3">
          <View className="w-24 h-24 rounded-full overflow-hidden">
            <Image source={{ uri: avatarUri }} className="w-full h-full" resizeMode="cover" />
          </View>
        </View>

        <View className="items-center">
          <Text className="text-base font-bold text-[#234F68]">{user?.name || 'Người dùng'}</Text>
          {!!user?.email && (
            <Text className="text-xs text-[#234F68] opacity-80 mt-1">{user.email}</Text>
          )}
          <Pressable className="mx-auto mt-5" onPress={() => (navigation as any).navigate('EditProfile')}>
            <View className="w-7 h-7 rounded-full items-center justify-center" style={{ backgroundColor: '#E3EEF6' }}>
              <Pencil size={18} color="#234F68" />
            </View>
          </Pressable>
        </View>

        <View className="flex-row justify-between mt-5">
          {[
            // { key: 'favorite', label: 'Yêu thích', Icon: Heart, onPress: () => (navigation as any).navigate('Favorite') },
            { key: 'history', label: 'Lịch sử', Icon: History, onPress: () => (navigation as any).navigate('History') },
            // { key: 'posts', label: 'Bài viết', Icon: FileText, onPress: () => (navigation as any).navigate('Posts') },
          ].map(({ key, label, Icon, onPress }) => (
            <Pressable
              key={key}
              onPress={onPress}
              className="flex-1 mx-1 rounded-2xl items-center justify-center border"
              style={{ height: 100, borderColor: '#E6E6E6', backgroundColor: '#FFFFFF' }}
            >
              <Icon size={22} color="#234F68" />
              <Text className="mt-2 text-xs font-medium" style={{ color: '#234F68' }}>{label}</Text>
            </Pressable>
          ))}
        </View>

        <View className="mt-5 space-y-5">
          <Pressable onPress={() => navigation.navigate('Policy' as never)} className="w-full rounded-2xl flex-row items-center px-6 py-4 border mb-2"
            style={{ borderColor: '#E6E6E6', backgroundColor: '#FFFFFF' }}>
            <Shield size={22} color="#234F68" />
            <Text className="ml-3 text-[16px] font-medium" style={{ color: '#234F68' }}>Điều khoản và chính sách</Text>
          </Pressable>

          <Pressable onPress={() => navigation.navigate('Version' as never)} className="w-full rounded-2xl flex-row items-center px-6 py-4 border"
            style={{ borderColor: '#E6E6E6', backgroundColor: '#FFFFFF' }}>
            <Info size={22} color="#234F68" />
            <Text className="ml-3 text-[16px] font-medium" style={{ color: '#234F68' }}>Phiên bản hiện tại</Text>
          </Pressable>
        </View>

        <View className="mt-3">
          <Pressable onPress={handleLogout} className="w-full rounded-2xl flex-row items-center px-6 py-4 border"
            style={{ borderColor: '#E6E6E6', backgroundColor: '#FFFFFF' }}>
            <LogOut size={22} color="#234F68" />
            <Text className="ml-3 text-[16px] font-medium" style={{ color: '#234F68' }}>Đăng xuất</Text>
          </Pressable>
        </View>

        <View className="items-center mt-10 mb-10">
          <Image source={require('@assets/images/tour-logo.png')} className="w-10 h-11" resizeMode="stretch" />
          <Text className="w-52 text-center text-[10px] mt-3 font-bold" style={{ color: '#000' }}>
            KHÁM PHÁ THẾ GIỚI{"\n"}MỌI CHUYẾN ĐI TẠI ĐẦU NGÓN TAY
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;