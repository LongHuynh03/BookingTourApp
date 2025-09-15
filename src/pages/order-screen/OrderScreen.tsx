import BackgroundApp from '@components/BackgroundApp';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../hooks/useAuth';
import { BookingService, BookingTourItem } from '../../services';

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('vi-VN').format(value);

const daysBetween = (endDate: string, startDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diff = Number(end) - Number(start);
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.round(diff / oneDay);
};

const isAfter = (date1: Date, date2: Date) => date1.getTime() > date2.getTime();

const OrderScreen = () => {
  const { user, token } = useAuth();
  const userId = user?._id;
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookings, setBookings] = useState<BookingTourItem[]>([]);

  const loadData = useCallback(async () => {
    if (!userId) return;
    try {
      setLoading(true);
      setError(null);
      const data = await BookingService.getAllByUser(userId, token || undefined);
      setBookings(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Không thể tải dữ liệu');
    } finally {
      setLoading(false);
    }
  }, [userId, token]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const renderItem = ({ item }: { item: BookingTourItem }) => {
    const compareDate = new Date(item.tour_id?.end_date);
    const canReview = isAfter(new Date(), compareDate);
    const nightCount = Math.max(0, daysBetween(item.tour_id?.end_date, item.tour_id?.departure_date) - 1);
    const dayCount = Math.max(0, nightCount + 1);

    return (
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <Text numberOfLines={3} style={styles.tourName}>
              {item.tour_id?.name}
            </Text>

            <View style={styles.metaRow}>
              <Text style={styles.metaText}>{item.tour_id?.province_id?.name}</Text>
            </View>

            <View style={styles.metaRow}>
              <Text style={styles.metaText}>{item.adult_count + item.child_count} người</Text>
            </View>

            <View style={styles.metaRow}>
              <Text style={styles.metaText}>{dayCount} ngày {nightCount} đêm</Text>
            </View>

            <View style={styles.metaRow}>
              <Text style={styles.metaText}>
                {new Date(item.tour_id?.departure_date).toLocaleDateString('vi-VN')} - {new Date(item.tour_id?.end_date).toLocaleDateString('vi-VN')}
              </Text>
            </View>
          </View>

          <Image source={{ uri: item.tour_id?.image }} style={styles.thumbnail} />
        </View>

        <View style={styles.footerRow}>
          <View style={styles.totalWrap}>
            <Text style={styles.totalLabel}>Thành tiền: </Text>
            <Text style={styles.totalValue}>{formatCurrency(item.price)} VNĐ</Text>
          </View>
        </View>
      </View>
    );
  };

  const keyExtractor = useCallback((item: BookingTourItem) => item._id, []);

  if (!userId) {
    return (
      <View style={styles.center}>
        <Text>Vui lòng đăng nhập để xem đơn đặt tour</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
        <TouchableOpacity onPress={loadData} style={[styles.reviewBtn, { marginTop: 12 }]}>
          <Text style={styles.reviewText}>Thử lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

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
          <Text className="text-lg font-bold text-[#252B5C]">Chi tiết đơn đặt</Text>
          <View className="w-10 h-10" />
        </View>

        <FlatList
          data={bookings}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={bookings.length === 0 ? styles.emptyContainer : styles.listContainer}
          ListEmptyComponent={() => (
            <View style={styles.center}>
              <Text>Chưa có đơn đặt tour nào</Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </BackgroundApp>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#d1d5db',
    paddingBottom: 12,
  },
  headerLeft: {
    width: '56%',
  },
  tourName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0ea5e9',
  },
  metaRow: {
    marginTop: 8,
  },
  metaText: {
    fontSize: 13,
    color: '#111827',
  },
  thumbnail: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  totalWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0ea5e9',
  },
  totalValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ef4444',
  },
  reviewBtn: {
    height: 40,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
});

export default OrderScreen;