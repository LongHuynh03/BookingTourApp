import BackgroundApp from '@components/BackgroundApp';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const VersionScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleBack = () => {
    // @ts-ignore
    if (navigation && typeof navigation.canGoBack === 'function' && navigation.canGoBack()) {
      // @ts-ignore
      navigation.goBack();
    } else {
      // @ts-ignore
      navigation.navigate('Profile');
    }
  };

  return (
    <BackgroundApp source={require('@assets/images/bg-home.png')}>
      <SafeAreaView className="flex-1 px-6">
        <View className="w-full flex-row items-center justify-between mt-4 mb-4">
          <Pressable onPress={handleBack} className="w-10 h-10 rounded-full items-center justify-center border border-gray-300">
            <ArrowLeft size={20} color="#234F68" />
          </Pressable>
          <Text className="text-lg font-bold text-[#252B5C]">Phiên bản hiện tại</Text>
          <View className="w-10 h-10" />
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <Text className="text-[14px] leading-6 text-[#234F68] text-justify">
            Xin chào! Đây là ghi chú phát hành cho phiên bản v1.0 của ứng dụng đặt tour du lịch. Chúng tôi đã cải thiện hiệu năng, tối ưu giao diện và bổ sung các tính năng giúp việc tìm kiếm và đặt tour dễ dàng hơn. Hãy khám phá và cho chúng tôi biết cảm nhận của bạn!
          </Text>
          <View className="items-center mt-10 mb-10">
            <Text className="w-52 text-center text-[10px] mt-3 font-bold" style={{ color: '#000' }}>
              KHÁM PHÁ THẾ GIỚI{"\n"}MỌI CHUYẾN ĐI TẠI ĐẦU NGÓN TAY
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </BackgroundApp>
  );
};

export default VersionScreen;


