import BackgroundApp from '@components/BackgroundApp';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PolicyScreen: React.FC = () => {
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
          <Text className="text-lg font-bold text-[#252B5C]">Điều khoản và chính sách</Text>
          <View className="w-10 h-10" />
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <Text className="text-[14px] leading-6 text-[#234F68] text-justify">
            Dưới đây là mô tả tổng quan về điều khoản và chính sách cho ứng dụng đặt tour du lịch của chúng tôi. Nội dung chỉ mang tính minh họa và cần được điều chỉnh phù hợp với sản phẩm thực tế.
            {'\n'}{'\n'}1. Điều khoản sử dụng:{'\n'}- Quyền và trách nhiệm của người dùng khi sử dụng ứng dụng.{"\n"}
            - Quy định về độ tuổi tối thiểu (nếu có).{"\n"}
            - Quy định về truy cập và sử dụng nội dung trong ứng dụng.{"\n"}{"\n"}
            2. Điều khoản thanh toán:{"\n"}- Các phương thức thanh toán được chấp nhận.{"\n"}- Quy định về thanh toán, hủy và hoàn tiền.{"\n"}{"\n"}
            3. Chính sách bảo mật:{"\n"}- Cách thu thập, sử dụng và bảo vệ dữ liệu cá nhân.{"\n"}- Chia sẻ dữ liệu với bên thứ ba khi cần thiết.{"\n"}{"\n"}
            4. Chính sách hủy:{"\n"}- Quy định hủy đặt tour từ hai phía và hoàn tiền.{"\n"}{"\n"}
            5. Sở hữu trí tuệ:{"\n"}- Quyền sở hữu nội dung và cấp phép sử dụng.{"\n"}{"\n"}
            6. Quyền và trách nhiệm các bên:{"\n"}- Cách xử lý khiếu nại và tranh chấp.{"\n"}{"\n"}
            7. Thay đổi và chấm dứt:{"\n"}- Quyền thay đổi điều khoản và cách thông báo đến người dùng.
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

export default PolicyScreen;


