import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../navigation/MainNavigator';

type NavigationProp = NativeStackNavigationProp<MainStackParamList, 'Payment'>;

export const PaymentScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>支付</Text>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>返回</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.description}>
        这里是支付页面骨架（二维码展示、倒计时、支付结果等）。
      </Text>

      <View style={styles.qrPlaceholder}>
        <Text style={styles.qrText}>二维码占位</Text>
      </View>

      <TouchableOpacity 
        style={styles.completeButton} 
        onPress={() => navigation.navigate('Products')}
      >
        <Text style={styles.completeButtonText}>完成支付（模拟）</Text>
      </TouchableOpacity>
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
  backButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#757575',
    borderRadius: 4,
  },
  backText: {
    color: '#fff',
    fontSize: 14,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 32,
  },
  qrPlaceholder: {
    width: 200,
    height: 200,
    backgroundColor: '#e0e0e0',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    borderRadius: 8,
  },
  qrText: {
    color: '#999',
    fontSize: 16,
  },
  completeButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
