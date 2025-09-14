import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuth } from '../../hooks'

const SearchScreen = () => {
  const { isLoggedIn } = useAuth()

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 p-4">
        <View className="mb-6">
          <Text className="text-2xl font-bold text-gray-800 mb-2">
            Tìm kiếm tour
          </Text>
          <Text className="text-gray-600">
            Khám phá những chuyến du lịch tuyệt vời
          </Text>
        </View>

        {!isLoggedIn && (
          <View className="mb-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg shadow-sm border border-yellow-200">
            <Text className="text-lg font-semibold text-yellow-800 mb-2">
              💡 Mẹo hay!
            </Text>
            <Text className="text-yellow-600 mb-3">
              Đăng nhập để lưu lại các tour yêu thích, nhận thông báo về ưu đãi và quản lý đặt tour dễ dàng hơn
            </Text>
            <Text className="text-sm text-yellow-500">
              👆 Nhấn vào tab "Đăng nhập" ở dưới để bắt đầu
            </Text>
          </View>
        )}

        <View className="space-y-4">
          <View className="p-4 bg-white rounded-lg shadow-sm">
            <Text className="text-lg font-semibold text-gray-800 mb-2">
              🔍 Tìm kiếm theo địa điểm
            </Text>
            <Text className="text-gray-600">
              Hà Nội, TP.HCM, Đà Nẵng, Nha Trang...
            </Text>
          </View>

          <View className="p-4 bg-white rounded-lg shadow-sm">
            <Text className="text-lg font-semibold text-gray-800 mb-2">
              📅 Tìm kiếm theo thời gian
            </Text>
            <Text className="text-gray-600">
              Cuối tuần, 3 ngày 2 đêm, 1 tuần...
            </Text>
          </View>

          <View className="p-4 bg-white rounded-lg shadow-sm">
            <Text className="text-lg font-semibold text-gray-800 mb-2">
              💰 Tìm kiếm theo giá
            </Text>
            <Text className="text-gray-600">
              Dưới 1 triệu, 1-3 triệu, 3-5 triệu...
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SearchScreen