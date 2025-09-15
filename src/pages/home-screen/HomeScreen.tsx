import BackgroundApp from '@components/BackgroundApp';
import { HStack, Image, Input, InputField, InputIcon, InputSlot, Text, VStack } from '@libs/ui';
import { StackProps } from '@navigations/MainNavigation';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TourItem as Tour, TourService } from '@services/index';
import { PinIcon, Search, User } from 'lucide-react-native';
import React, { useCallback, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../hooks';
import { dataEventLocal } from './data';

export type Event = {
  id: string;
  image: string;
  title: string;
  province_id: {
    _id: string;
  };
}

type User = {
  _id: string;
  phone_number: string;
  name: string;
  email: string;
  avatar: string;
  created_at: Date;
  __v: number;
}

// Using Tour type from services

type HeaderHomeProps = {
  avatar: string;
  onPressAvatar?: () => void;
  checkNotify: boolean;
}

type TextPlusProps = {
  textBolds: string[];
  text: string;
  boldClassName?: string;   // thay cho boldStyle
  viewClassName?: string;   // thay cho viewStyle
  textClassName?: string;   // thay cho textStyle
  numberOfLines?: number;
};

const ItemBanner = ({ item, onPress }: { item: Event; onPress: () => void }) => {
  return (
    <Pressable onPress={onPress} className="relative">
      <Image
        source={{ uri: item.image }}
        className={`w-[${Dimensions.get('screen').width * 0.7}px] h-[${Dimensions.get('screen').width * 0.5}px] rounded-[25px] me-[15px]`}
        alt={item.title}
        resizeMode="stretch"
      />
      <VStack
        className="absolute right-[25px] top-[10px] bg-[rgba(163,204,227,0.85)] p-[10px] rounded-[10px]">
        <Text
          className="text-[14px] font-bold"
          style={{ color: "#234F68" }}>
          {item.title}
        </Text>
      </VStack>
    </Pressable>
  );
};

const ItemTour = ({
  item,
  index,
  onPress,
}: { item: Tour; index: number; onPress: () => void }) => {
  return (
    <Pressable
      onPress={onPress}
      className="rounded-2xl p-2.5 mb-2.5"
      style={{
        backgroundColor: "#F5F4F8",
        width: Dimensions.get('screen').width * 0.44,
        marginRight: index % 2 === 0 ? 10 : 0,
      }}
    >
      <VStack>
        <VStack className="relative">
          <Image
            source={{ uri: item.image }}
            className="w-full h-[180px] self-center rounded-2xl"
            style={{ resizeMode: "stretch" }}
            alt={item.name}
          />

          <VStack
            className="absolute right-2.5 bottom-2.5 rounded-xl px-2.5 py-2"
            style={{ backgroundColor: `rgba(163, 204, 227, 0.85)` }}
          >
            <Text
              className="text-xs font-bold"
            >
              {item.price.toLocaleString("vi-VN")} VNĐ
            </Text>
          </VStack>
        </VStack>

        <VStack>
          <Text
            numberOfLines={2}
            className="mt-2.5 text-base leading-[18px] font-bold "
            style={{
              color: "#252B5C",
            }}
          >
            {item.name}
          </Text>

          <HStack className="items-center mt-1.5">
            <PinIcon size={24} color={"gray"} />
            <Text
              numberOfLines={1}
              className="text-[10px] font-medium"
            >
              {item.departure_location}
            </Text>
          </HStack>
        </VStack>
      </VStack>
    </Pressable>
  );
};

const HeaderHome2 = (props: HeaderHomeProps) => {
  const { avatar, onPressAvatar, checkNotify } = props;

  return (
    <SafeAreaView className="w-full h-[50px] px-5 flex-row items-center justify-between mt-[35px]">
      {/* Logo */}
      <VStack>
        <Image source={require('@assets/images/tour-logo.png')} className="w-10 h-[45px]" resizeMode="stretch" />
      </VStack>

      {/* Avatar + Notification */}
      <VStack className="flex-row items-center justify-between h-full">
        <Pressable
          className={`w-[50px] h-[50px] flex-row items-center justify-center ml-[10px] rounded-full border border-gray-400 ${checkNotify ? 'flex' : 'hidden'
            }`}
          onPress={onPressAvatar}>
          <User size={24} color="#234F68" />
        </Pressable>
      </VStack>
    </SafeAreaView>
  );
};

const TextPlus: React.FC<TextPlusProps> = ({
  textBolds,
  text,
  boldClassName = 'font-bold text-[20px] text-blue-500',
  viewClassName = 'flex-row items-center w-full',
  textClassName = 'text-[20px] font-medium text-black',
  numberOfLines,
}) => {
  const getTextWithBold = (input: string, boldTexts: string[]) => {
    const regex = new RegExp(`(${boldTexts.join('|')})`, 'gi');
    const parts = input.split(regex);
    return parts.map((part, index) => {
      const isBold = boldTexts.some(
        b => b.toLowerCase() === part.toLowerCase(),
      );
      return isBold ? (
        <Text key={index} className={boldClassName}>
          {part}
        </Text>
      ) : (
        <Text key={index}>{part}</Text>
      );
    });
  };

  return (
    <VStack className={viewClassName}>
      <Text numberOfLines={numberOfLines} className={textClassName}>
        {getTextWithBold(text, textBolds)}
      </Text>
    </VStack>
  );
};

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackProps>>();
  const { user } = useAuth();
  const [text, setText] = React.useState('');
  const [dataUser, setDataUser] = useState<User>();
  const [imageAvatar, setImageAvatar] = useState('');
  const [dataEvent, setDataEvent] = useState<Event[]>([]);
  const [dataTour, setDataTour] = useState<Tour[]>([]);

  useFocusEffect(
    useCallback(() => {
      // khi screen focus thì chạy code này
      setDataEvent(dataEventLocal);

      TourService.getAllTours()
        .then((res: Tour[]) => {
          setDataTour(res);
        })
        .catch((err: unknown) => {
          console.log('Error get list tour', err);
        });

      // có thể return cleanup nếu cần
      return () => {
        // cleanup khi screen unfocus
      };
    }, []) // deps
  );

  const renderItemBanner = (item: Event) => {
    return (
      <ItemBanner
        onPress={
          () => console.log("Banner")
        }
        item={item}
        key={item.id}
      />
    );
  };

  const handleSearch = () => {
    setText('');
  };

  return (
    <BackgroundApp source={require('@assets/images/bg-home.png')}>
      {user && (
        <HeaderHome2
          avatar={imageAvatar}
          checkNotify={true}
          onPressAvatar={() => {
            navigation.navigate('Profile');
          }}
        />
      )}
      <SafeAreaView className="flex-1 px-[20px]">
        <VStack>
          <Text className=' w-full text-[#4a4a4a] text-[25px]'>
            {
              user?.name === undefined
                ? `Xin chào! \nHãy bắt đầu khám phá`
                : `Xin chào, ${user?.name}! \nHãy bắt đầu khám phá`
            }
          </Text>
          <Input
            className="my-4 p-4"
            style={{
              height: 50,                // chiều cao 400
              backgroundColor: '#F5F4F8', // màu nền
              borderRadius: 20,           // bo tròn 20
            }}
          >

            <InputField placeholder="Tìm kiếm địa điểm, tour du lịch" returnKeyType="search" onSubmitEditing={() => navigation.navigate('Search', { keyword: text })} onChangeText={setText} value={text} />
            <InputSlot className='boder-l-2 border-gray-300'>
              <Pressable onPress={() => navigation.navigate('Search', { keyword: text })}>
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
            <ItemTour item={item} index={index} onPress={() => navigation.navigate('Detail', { tour_id: item._id })} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListHeaderComponent={() => (
            <>
              <VStack
                className="flex-1 overflow-hidden rounded-tl-[20px] rounded-bl-[20px]">
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  pagingEnabled
                  onMomentumScrollEnd={event => {
                  }}>
                  <VStack className="flex-row">
                    {dataEvent.map((item) => renderItemBanner(item))}
                  </VStack>
                </ScrollView>
              </VStack>

              <VStack
                className="w-full flex-row items-baseline justify-between mb-[20px]">
                <Text
                  className="text-[20px] font-bold"
                  style={{ color: "#252B5C" }}>
                  Tour nổi bật
                </Text>
              </VStack>
            </>
          )}
        />
      </SafeAreaView>
    </BackgroundApp>
  );
};

export default HomeScreen;