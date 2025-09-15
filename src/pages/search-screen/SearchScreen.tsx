import BackgroundApp from '@components/BackgroundApp'
import { HStack, Image, Input, InputField, InputIcon, InputSlot, Text, VStack } from '@libs/ui'
import { StackProps } from '@navigations/MainNavigation'
import { useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { TourItem as Tour, TourService } from '@services/index'
import { Search } from 'lucide-react-native'
import { useCallback, useEffect, useState } from 'react'
import { Dimensions, FlatList, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuth } from '../../hooks'

const ItemTour = ({ item, index, onPress }: { item: Tour; index: number; onPress: () => void }) => {
  return (
    <Pressable
      onPress={onPress}
      className="rounded-2xl p-2.5 mb-2.5"
      style={{
        backgroundColor: '#F5F4F8',
        width: Dimensions.get('screen').width * 0.44,
        marginRight: index % 2 === 0 ? 10 : 0,
      }}
    >
      <VStack>
        <VStack className="relative">
          <Image
            source={{ uri: item.image }}
            className="w-full h-[180px] self-center rounded-2xl"
            style={{ resizeMode: 'cover' }}
            alt={item.name}
          />
          <VStack className="absolute right-2.5 bottom-2.5 rounded-xl px-2.5 py-2" style={{ backgroundColor: 'rgba(163, 204, 227, 0.85)' }}>
            <Text className="text-xs font-bold">
              {item.price.toLocaleString('vi-VN')} VNĐ
            </Text>
          </VStack>
        </VStack>

        <VStack>
          <Text numberOfLines={2} className="mt-2.5 text-base leading-[18px] font-bold" style={{ color: '#252B5C' }}>
            {item.name}
          </Text>
          <HStack className="items-center mt-1.5">
            <Text numberOfLines={1} className="text-[10px] font-medium">
              {item.departure_location}
            </Text>
          </HStack>
        </VStack>
      </VStack>
    </Pressable>
  );
};

type SearchRouteParams = { keyword?: string };

const SearchScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackProps>>();
  const route = useRoute();
  const { user } = useAuth();
  const params = (route.params as SearchRouteParams) || {};
  const [keyword, setKeyword] = useState(params.keyword || '');
  const [dataTour, setDataTour] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(false);

  const onSearch = useCallback(() => {
    setLoading(true);
    TourService.getToursByFilter(keyword.trim() || 'Châu Đốc')
      .then(setDataTour)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [keyword]);

  useEffect(() => {
    if (params.keyword && params.keyword.trim().length > 0) {
      setKeyword(params.keyword);
      onSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.keyword]);

  return (
    <BackgroundApp source={require('@assets/images/bg-home.png')}>
      <SafeAreaView className="flex-1 px-[20px]">
        <VStack className="mt-[35px]">
          <Text className=' w-full text-[#4a4a4a] text-[25px]'>
            Tìm kiếm tour
          </Text>
          <Input className="my-4 p-4" style={{ height: 50, backgroundColor: '#F5F4F8', borderRadius: 20 }}>
            <InputField value={keyword} onChangeText={setKeyword} placeholder="Tìm kiếm địa điểm, tour du lịch" />
            <InputSlot className='boder-l-2 border-gray-300'>
              <Pressable onPress={onSearch}>
                <InputIcon as={Search} size={16} color="gray" />
              </Pressable>
            </InputSlot>
          </Input>
        </VStack>

        <FlatList
          data={dataTour}
          numColumns={2}
          keyExtractor={(item) => item._id}
          renderItem={({ item, index }) => (
            <ItemTour
              item={item}
              index={index}
              onPress={() => navigation.navigate('Main', { screen: 'Detail', params: { tour_id: item._id } })}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListHeaderComponent={() => (
            <>
              <VStack className="w-full flex-row items-baseline justify-between mb-[20px]">
                <Text className="text-[20px] font-bold" style={{ color: '#252B5C' }}>
                  Kết quả tìm kiếm
                </Text>
                {loading && (
                  <Text className="text-[14px]" style={{ color: '#234F68' }}>Đang tải...</Text>
                )}
              </VStack>
            </>
          )}
          ListEmptyComponent={!loading ? (
            <VStack className="items-center mt-10">
              <Text style={{ color: '#234F68' }}>Không có kết quả</Text>
            </VStack>
          ) : null}
        />
      </SafeAreaView>
    </BackgroundApp>
  )
}

export default SearchScreen