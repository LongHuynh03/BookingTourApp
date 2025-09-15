import BackgroundApp from '@components/BackgroundApp';
import { Button, Text as GSText, Input, InputField, InputIcon, InputSlot, VStack } from '@libs/ui';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../hooks';
import { useAppDispatch } from '../../store/hooks';
import { updateUserProfile } from '../../store/slices/authThunks';

const EditProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { user, token } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone_number || '');

  const onSave = async () => {
    const phoneRegex = /^[0-9\b]+$/;
    if (!phoneRegex.test(phone)) {
      Alert.alert('Thông báo', 'Số điện thoại không hợp lệ');
      return;
    }
    if (!token) {
      Alert.alert('Lỗi', 'Thiếu thông tin xác thực');
      return;
    }
    try {
      await dispatch(updateUserProfile({ token, payload: { name, phone_number: phone } })).unwrap();
      Alert.alert('Thành công', 'Cập nhật thông tin thành công', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert('Lỗi', error instanceof Error ? error.message : 'Cập nhật thất bại');
    }
  };

  return (
    <BackgroundApp source={require('@assets/images/bg-home.png')}>
      <SafeAreaView className="flex-1 px-6">
        <View className="w-full flex-row items-center justify-between mt-4 mb-6">
          <Pressable
            onPress={() => {
              // @ts-ignore
              if (navigation && typeof navigation.canGoBack === 'function' && navigation.canGoBack()) {
                // @ts-ignore
                navigation.goBack();
              } else {
                // @ts-ignore
                navigation.navigate('Profile');
              }
            }}
            className="w-10 h-10 rounded-full items-center justify-center border border-gray-300"
          >
            <ArrowLeft size={20} color="#234F68" />
          </Pressable>
          <Text className="text-lg font-bold text-[#252B5C]">Chỉnh sửa thông tin</Text>
          <View className="w-10 h-10" />
        </View>

        <VStack className="gap-4">
          <VStack>
            <GSText className="mb-1 text-xs text-[#234F68]">Họ và tên</GSText>
            <Input variant="rounded">
              <InputSlot>
                <InputIcon>
                  {/* left icon placeholder */}
                </InputIcon>
              </InputSlot>
              <InputField placeholder="Nhập họ tên" value={name} onChangeText={setName} />
            </Input>
          </VStack>

          <VStack>
            <GSText className="mb-1 text-xs text-[#234F68]">Số điện thoại</GSText>
            <Input variant="rounded">
              <InputSlot>
                <InputIcon>
                  {/* left icon placeholder */}
                </InputIcon>
              </InputSlot>
              <InputField placeholder="Nhập số điện thoại" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
            </Input>
          </VStack>
        </VStack>

        <Button className="mt-10" onPress={onSave}>
          <GSText className="text-white font-semibold">Cập nhật</GSText>
        </Button>
      </SafeAreaView>
    </BackgroundApp>
  );
};

export default EditProfileScreen;


