import BackgroundApp from '@components/BackgroundApp'
import { HStack, Text, VStack } from '@libs/ui'
import { StackProps } from '@navigations/MainNavigation'
import { useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { TourItem as Tour, TourService } from '@services/index'
import { useEffect, useMemo, useState } from 'react'
import { Dimensions, Image, Pressable, ScrollView } from 'react-native'

type RouteParams = {
  tour_id?: string;
}

const DetailTourScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackProps>>();
  const route = useRoute();
  const { tour_id } = (route.params as RouteParams) || {};

  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [imageDetail, setImageDetail] = useState<string>('');

  useEffect(() => {
    if (!tour_id) {
      setError('Thiếu mã tour');
      setLoading(false);
      return;
    }

    let isMounted = true;
    setLoading(true);
    TourService.getTourByIdAndLocations(tour_id)
      .then((res) => {
        if (!isMounted) return;
        setTour(res);
        setImageDetail(res.image);
      })
      .catch(() => {
        if (!isMounted) return;
        setError('Không thể tải thông tin tour');
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [tour_id]);

  const thumbnails = useMemo(() => {
    if (!tour) return [] as string[];
    const locImages = (tour.locations || []).map((l) => l.image).filter(Boolean);
    return imageDetail && !locImages.includes(imageDetail)
      ? [imageDetail, ...locImages]
      : locImages.length > 0
      ? locImages
      : imageDetail
      ? [imageDetail]
      : [];
  }, [tour, imageDetail]);

  const days = useMemo(() => {
    if (!tour) return 0;
    const start = new Date(tour.departure_date).getTime();
    const end = new Date(tour.end_date).getTime();
    const diff = Math.max(0, Math.round((end - start) / (24 * 60 * 60 * 1000)));
    return diff;
  }, [tour]);

  const isEnded = useMemo(() => {
    if (!tour) return false;
    return new Date().getTime() > new Date(tour.end_date).getTime();
  }, [tour]);

  const width = Dimensions.get('screen').width;

  return (
    <BackgroundApp source={require('@assets/images/bg-home.png')}>
      {loading ? (
        <VStack className="flex-1 items-center justify-center">
          <Text>Đang tải...</Text>
        </VStack>
      ) : error ? (
        <VStack className="flex-1 items-center justify-center px-5">
          <Text className="text-center text-base">{error}</Text>
        </VStack>
      ) : !tour ? (
        <VStack className="flex-1 items-center justify-center px-5">
          <Text className="text-center text-base">Không có dữ liệu</Text>
        </VStack>
      ) : (
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Hero Image */}
          <VStack className="w-full">
            <Image
              source={{ uri: imageDetail || tour.image }}
              className="w-full"
              style={{ resizeMode: 'cover', height: Dimensions.get('screen').height * 0.55 }}
            />

            {/* Thumbnails */}
            <VStack className="absolute right-5 bottom-5 w-[70px] h-[210px] rounded-xl overflow-hidden z-10">
              <ScrollView showsVerticalScrollIndicator={false}>
                {thumbnails.map((img, idx) => (
                  <Pressable key={idx} className="mb-2" onPress={() => setImageDetail(img)}>
                    <Image source={{ uri: img }} className="w-[70px] h-[70px] rounded-xl" style={{ resizeMode: 'cover' }} />
                  </Pressable>
                ))}
              </ScrollView>
            </VStack>
          </VStack>

          {/* Title + Price */}
          <VStack className="px-5 mt-3">
            <HStack className="items-center justify-between">
              <Text className="font-bold text-[23px]" style={{ color: '#252B5C', width: width * 0.5 }}>
                {tour.name}
              </Text>
              <Text className="font-bold text-[18px] text-red-500">
                {Number(tour.price).toLocaleString('vi-VN')} VNĐ
              </Text>
            </HStack>

            {/* Location */}
            <HStack className="items-center mt-2">
              <Text className="text-[14px]" style={{ color: '#234F68' }}>
                {tour?.province_id?.name}, Việt Nam
              </Text>
            </HStack>

            {/* Description */}
            <Text className="mt-6 font-bold text-[18px]">Mô tả</Text>
            <Text className="mt-1 text-[14px] leading-5" style={{ color: '#234F68' }}>
              {tour.description}
            </Text>

            {/* Price notes */}
            <Text className="mt-4 text-[14px]" style={{ color: '#234F68' }}>
              Trẻ em: {Math.round(Number(tour.price) * 0.6).toLocaleString('vi-VN')} VND
            </Text>
            <Text className="text-[14px] text-red-500" style={{ color: '#234F68' }}>
              Người lớn: {Number(tour.price).toLocaleString('vi-VN')} VND
            </Text>

            {/* Schedule */}
            <Text className="mt-6 mb-2 font-bold text-[18px]" style={{ color: '#252B5C' }}>Lịch trình</Text>
            <Text className="text-[14px]" style={{ color: '#234F68' }}>
              {days} ngày {Math.max(0, days - 1)} đêm
            </Text>
            <HStack className="items-center mt-1">
              <Text className="text-[14px] font-medium" style={{ color: '#234F68' }}>Ngày khởi hành: </Text>
              <Text className="text-[14px]" style={{ color: '#234F68' }}>
                {new Date(tour.departure_date).toLocaleDateString('vi-VN')}
              </Text>
            </HStack>

            <VStack className="mt-2">
              {tour.schedules?.map((s, idx) => (
                <HStack key={idx} className="items-center mb-1">
                  <Text className="text-[14px]" style={{ color: '#234F68' }}>Ngày {idx + 1}: {s}</Text>
                </HStack>
              ))}
            </VStack>

            {/* Locations */}
            <Text className="mt-6 mb-3 font-bold text-[18px]" style={{ color: '#252B5C' }}>Địa điểm tham quan</Text>

            <HStack className="justify-between">
              <VStack className="w-[48%]">
                {tour.locations?.filter((_, i) => i % 2 === 0).map((loc) => (
                  <VStack key={loc._id} className="bg-[#F5F4F8] rounded-[20px] p-2 mb-2">
                    <Image source={{ uri: loc.image }} className="w-full rounded-[20px]" style={{ resizeMode: 'cover', height: width * 0.44 }} />
                    <VStack className="px-2 mt-3">
                      <Text numberOfLines={1} className="font-bold text-[16px]" style={{ color: '#252B5C' }}>{loc.name}</Text>
                      <Text numberOfLines={1} className="text-[12px] mt-1" style={{ color: '#234F68' }}>{tour.province_id?.name}</Text>
                    </VStack>
                  </VStack>
                ))}
              </VStack>
              <VStack className="w-[48%]">
                {tour.locations?.filter((_, i) => i % 2 !== 0).map((loc) => (
                  <VStack key={loc._id} className="bg-[#F5F4F8] rounded-[20px] p-2 mb-2">
                    <Image source={{ uri: loc.image }} className="w-full rounded-[20px]" style={{ resizeMode: 'cover', height: width * 0.44 }} />
                    <VStack className="px-2 mt-3">
                      <Text numberOfLines={1} className="font-bold text-[16px]" style={{ color: '#252B5C' }}>{loc.name}</Text>
                      <Text numberOfLines={1} className="text-[12px] mt-1" style={{ color: '#234F68' }}>{tour.province_id?.name}</Text>
                    </VStack>
                  </VStack>
                ))}
              </VStack>
            </HStack>

            {/* CTA */}
            <Pressable
              onPress={() => {
                if (isEnded) return;
                navigation.navigate('Booking', { tour_id: tour._id });
              }}
              className={`self-center my-5 w-[70%] rounded-[10px] py-3 ${isEnded ? 'bg-gray-400' : 'bg-emerald-600'}`}
            >
              <HStack className="items-center justify-center">
                <Text className="text-white font-semibold">Đặt tour</Text>
              </HStack>
            </Pressable>
          </VStack>
        </ScrollView>
      )}
    </BackgroundApp>
  )
}

export default DetailTourScreen