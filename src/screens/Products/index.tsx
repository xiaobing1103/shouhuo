import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../navigation/MainNavigator';
import { useDispatch } from 'react-redux';
import { clearCredentials } from '../../store/slices/authSlice';

type NavigationProp = NativeStackNavigationProp<MainStackParamList, 'Products'>;

export const ProductsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearCredentials());
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>商品列表</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>退出登录</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.description}>
        这里是商品展示页面骨架（分类、商品列表、售罄水印等）。
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.navButton} 
          onPress={() => navigation.navigate('Cart')}
        >
          <Text style={styles.navButtonText}>去购物车</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navButton} 
          onPress={() => navigation.navigate('Payment')}
        >
          <Text style={styles.navButtonText}>去支付</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  logoutButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f44336',
    borderRadius: 4,
  },
  logoutText: {
    color: '#fff',
    fontSize: 14,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 32,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  navButton: {
    flex: 1,
    backgroundColor: '#2196F3',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
