import BackgroundApp from '@components/BackgroundApp'
import { HStack, Input, InputField, Pressable, Text, VStack } from '@libs/ui'
import { StackProps } from '@navigations/MainNavigation'
import { useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { BookingService, TourItem as Tour, TourService } from '@services/index'
import { ChevronLeft } from 'lucide-react-native'
import { useEffect, useMemo, useState } from 'react'
import { Alert, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuth } from '../../hooks'


type RouteParams = { tour_id: string };

const BookingScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackProps>>();
  const route = useRoute();
  const { tour_id } = (route.params as RouteParams) || {};
  const { user } = useAuth();

  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const [adultCount, setAdultCount] = useState(0);
  const [childCount, setChildCount] = useState(0);
  const [note, setNote] = useState('');
  const [selectedLocations, setSelectedLocations] = useState<{ _id: string; name: string }[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (!tour_id) return;
    TourService.getTourByIdAndLocations(tour_id)
      .then(res => {
        if (!mounted) return;
        setTour(res);
        const defaults = (res.locations || []).map(l => ({ _id: l._id, name: l.name }));
        setSelectedLocations(defaults);
      })
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false };
  }, [tour_id]);

  const basePrice = Number(tour?.price || 0);
  const discount = useMemo(() => (adultCount > 20 ? (adultCount - 20) * basePrice * 0.1 : 0), [adultCount, basePrice]);
  const estimatedPrice = useMemo(() => {
    return adultCount * basePrice + childCount * basePrice * 0.6 - discount;
  }, [adultCount, childCount, basePrice, discount]);

  const onSubmit = async () => {
    if (!user?._id) {
      Alert.alert('Thông báo', 'Vui lòng đăng nhập');
      return;
    }
    if (!tour) return;
    if (adultCount === 0 && childCount === 0) {
      Alert.alert('Thông báo', 'Bạn phải chọn số lượng đặt');
      return;
    }

    try {
      setSubmitting(true);
      const res = await BookingService.addNewBookingTour({
        user_id: user._id,
        tour_id: tour._id,
        discount,
        adult_count: adultCount,
        child_count: childCount,
        price: estimatedPrice,
        note,
        role: false,
        location_custom: selectedLocations,
      });
      if (res.result) {
        Alert.alert('Thành công', 'Đặt tour thành công');
        navigation.navigate('Order');
      }
    } catch (e) {
      Alert.alert('Lỗi', 'Không thể đặt tour');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <BackgroundApp source={require('@assets/images/bg-home.png')}>
      <SafeAreaView className="flex-1">
        <HStack className="items-center px-5 py-3">
          <Pressable onPress={() => navigation.goBack()} className="w-10 h-10 rounded-full items-center justify-center bg-[rgba(0,0,0,0.05)]">
            <ChevronLeft size={20} color="#234F68" />
          </Pressable>
          <Text className="ml-3 text-[18px] font-bold" style={{ color: '#252B5C' }}>Đặt tour</Text>
        </HStack>
        {loading ? (
          <VStack className="flex-1 items-center justify-center">
            <Text>Đang tải...</Text>
          </VStack>
        ) : !tour ? (
          <VStack className="flex-1 items-center justify-center">
            <Text>Không có dữ liệu</Text>
          </VStack>
        ) : (
          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            <VStack className="px-5 py-4">
              <Text className="text-[20px] font-bold" style={{ color: '#252B5C' }}>{tour.name}</Text>
              <Text className="mt-1 text-[14px]" style={{ color: '#234F68' }}>{tour.departure_location}</Text>

              <VStack className="mt-5 bg-[#F5F4F8] rounded-2xl p-4">
                <HStack className="items-center justify-between">
                  <Text className="text-[16px] font-bold" style={{ color: '#252B5C' }}>Người lớn</Text>
                  <HStack className="items-center">
                    <Pressable className="w-8 h-8 rounded-lg items-center justify-center bg-gray-300" onPress={() => setAdultCount(Math.max(0, adultCount - 1))}>
                      <Text className="text-[18px]">-</Text>
                    </Pressable>
                    <Text className="mx-3 text-[16px]" style={{ color: '#234F68' }}>{adultCount}</Text>
                    <Pressable className="w-8 h-8 rounded-lg items-center justify-center bg-emerald-500" onPress={() => setAdultCount(adultCount + 1)}>
                      <Text className="text-white text-[18px]">+</Text>
                    </Pressable>
                  </HStack>
                </HStack>
                <HStack className="items-center justify-between mt-3">
                  <Text className="text-[16px] font-bold" style={{ color: '#252B5C' }}>Trẻ em</Text>
                  <HStack className="items-center">
                    <Pressable className="w-8 h-8 rounded-lg items-center justify-center bg-gray-300" onPress={() => setChildCount(Math.max(0, childCount - 1))}>
                      <Text className="text-[18px]">-</Text>
                    </Pressable>
                    <Text className="mx-3 text-[16px]" style={{ color: '#234F68' }}>{childCount}</Text>
                    <Pressable className="w-8 h-8 rounded-lg items-center justify-center bg-emerald-500" onPress={() => setChildCount(childCount + 1)}>
                      <Text className="text-white text-[18px]">+</Text>
                    </Pressable>
                  </HStack>
                </HStack>
              </VStack>

              <Text className="mt-5 text-[16px] font-bold" style={{ color: '#252B5C' }}>Ghi chú</Text>
              <Input className="mt-2">
                <InputField value={note} onChangeText={setNote} placeholder="Yêu cầu riêng..." />
              </Input>

              <HStack className="items-center justify-between mt-6">
                <Text className="text-[16px] font-bold" style={{ color: '#252B5C' }}>Giá dự kiến</Text>
                <Text className="text-[16px] font-bold text-red-500">{estimatedPrice.toLocaleString('vi-VN')} VNĐ</Text>
              </HStack>

              <Pressable disabled={submitting} onPress={onSubmit} className={`self-center my-6 w-[70%] rounded-[10px] py-3 ${submitting ? 'bg-gray-400' : 'bg-emerald-600'}`}>
                <HStack className="items-center justify-center">
                  <Text className="text-white font-semibold">{submitting ? 'Đang xử lý...' : 'Xác nhận đặt tour'}</Text>
                </HStack>
              </Pressable>
            </VStack>
          </ScrollView>
        )}
      </SafeAreaView>
    </BackgroundApp>
  );
}

export default BookingScreen
