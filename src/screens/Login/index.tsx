import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/slices/authSlice';

export const LoginScreen: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogin = () => {
    // 模拟登录，生产环境应调用真实的 API
    const mockToken = 'mock-token-' + Date.now();
    const mockStoreId = 'store-001';
    const mockEmployeeId = 'emp-001';

    dispatch(setCredentials({
      token: mockToken,
      storeId: mockStoreId,
      employeeId: mockEmployeeId,
    }));

    Alert.alert('登录成功', '欢迎使用自动售卖机系统！');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>登录 - 自动售卖机</Text>
      <Text style={styles.description}>
        这里是登录页面骨架（店铺ID、员工ID、密码、服务器地址等）。
      </Text>
      
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>点击登录（模拟）</Text>
      </TouchableOpacity>
      
      <Text style={styles.hint}>
        点击后将跳转到商品列表页面
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  hint: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
});
