import { useAppDispatch, useAppSelector } from '@store/hooks';
import {
    addToCart,
    clearCart,
    fetchFeaturedTours,
    fetchTours,
    loginUser,
    logout
} from '@store/slices';
import { useEffect } from 'react';
import { Alert, Button, Text, View } from 'react-native';

/**
 * Example component demonstrating Redux Toolkit usage
 * This is just for demonstration - you can delete this file
 */
const ReduxExample = () => {
  const dispatch = useAppDispatch();
  
  // Select state from different slices
  const { isAuthenticated, user, loading: authLoading } = useAppSelector(state => state.auth);
  const { tours, featuredTours, loading: tourLoading } = useAppSelector(state => state.tour);
  const { cart, bookings } = useAppSelector(state => state.booking);

  // Load data on component mount
  useEffect(() => {
    dispatch(fetchTours());
    dispatch(fetchFeaturedTours());
  }, [dispatch]);

  const handleLogin = async () => {
    try {
      await dispatch(loginUser({
        email: 'test@example.com',
        password: 'password'
      })).unwrap();
      Alert.alert('Success', 'Login successful!');
    } catch (error) {
      Alert.alert('Error', 'Login failed');
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    Alert.alert('Info', 'Logged out');
  };

  const handleAddToCart = () => {
    if (tours.length > 0) {
      const tour = tours[0];
      dispatch(addToCart({
        tourId: tour.id,
        tourName: tour.name,
        tourImage: tour.images[0],
        price: tour.price,
        quantity: 1,
        selectedDate: '2024-01-15',
        participants: [{ name: 'Test User', email: 'test@example.com', phone: '+1234567890' }]
      }));
      Alert.alert('Success', 'Added to cart!');
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    Alert.alert('Info', 'Cart cleared');
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        Redux Toolkit Example
      </Text>
      
      {/* Auth Section */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
          Authentication
        </Text>
        <Text>Status: {isAuthenticated ? 'Logged In' : 'Not Logged In'}</Text>
        {user && <Text>User: {user.name} ({user.email})</Text>}
        <Text>Loading: {authLoading ? 'Yes' : 'No'}</Text>
        
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <Button title="Login" onPress={handleLogin} />
          <Button title="Logout" onPress={handleLogout} />
        </View>
      </View>

      {/* Tours Section */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
          Tours
        </Text>
        <Text>Total Tours: {tours.length}</Text>
        <Text>Featured Tours: {featuredTours.length}</Text>
        <Text>Loading: {tourLoading ? 'Yes' : 'No'}</Text>
      </View>

      {/* Booking Section */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
          Booking
        </Text>
        <Text>Cart Items: {cart.length}</Text>
        <Text>Total Bookings: {bookings.length}</Text>
        
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <Button title="Add to Cart" onPress={handleAddToCart} />
          <Button title="Clear Cart" onPress={handleClearCart} />
        </View>
      </View>
    </View>
  );
};

export default ReduxExample;
