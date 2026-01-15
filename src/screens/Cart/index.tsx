import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../navigation/MainNavigator';
import { useTheme } from '../../hooks/useTheme';

type NavigationProp = NativeStackNavigationProp<MainStackParamList, 'Cart'>;

export const CartScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { colors, textStyles } = useTheme();

  return (
    <View 
      className="flex-1"
      style={{ backgroundColor: colors.background }}
    >
      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {/* 头部 */}
        <View className="flex-row justify-between items-center pt-5 mb-5">
          <Text 
            className="text-2xl font-bold"
            style={{ 
              color: colors.text,
              letterSpacing: textStyles.letterSpacing,
            }}
          >
            购物车
          </Text>
          <TouchableOpacity 
            className="px-4 py-2 rounded"
            style={{ backgroundColor: colors.textSecondary }}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Text 
              className="text-sm"
              style={{ color: colors.textInverse }}
            >
              返回
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* 购物车内容区域 */}
        <View 
          className="rounded-lg p-4 mb-4 shadow-sm"
          style={{ backgroundColor: colors.backgroundCard }}
        >
          <Text 
            className="text-sm mb-4"
            style={{ 
              color: colors.textSecondary,
              letterSpacing: textStyles.letterSpacing,
            }}
          >
            这里是购物车页面骨架（购物车明细、数量增减、清空购物车等）。
          </Text>

          {/* 示例：空购物车提示 */}
          <View className="items-center py-8">
            <View 
              className="w-20 h-20 rounded-full justify-center items-center mb-3"
              style={{ backgroundColor: colors.primary + '20' }}
            >
              <Text 
                className="text-3xl"
                style={{ color: colors.primary }}
              >
                🛒
              </Text>
            </View>
            <Text 
              className="text-base"
              style={{ 
                color: colors.textSecondary,
                letterSpacing: textStyles.letterSpacing,
              }}
            >
              购物车为空
            </Text>
          </View>
        </View>

        {/* 购物车统计信息 */}
        <View 
          className="rounded-lg p-4 mb-4 shadow-sm"
          style={{ backgroundColor: colors.backgroundCard }}
        >
          <View className="flex-row justify-between items-center mb-2">
            <Text 
              className="text-sm"
              style={{ 
                color: colors.textSecondary,
                letterSpacing: textStyles.letterSpacing,
              }}
            >
              商品数量
            </Text>
            <Text 
              className="text-base font-semibold"
              style={{ color: colors.text }}
            >
              0 件
            </Text>
          </View>
          <View className="flex-row justify-between items-center">
            <Text 
              className="text-sm"
              style={{ 
                color: colors.textSecondary,
                letterSpacing: textStyles.letterSpacing,
              }}
            >
              合计金额
            </Text>
            <Text 
              className="text-xl font-bold"
              style={{ color: colors.primary }}
            >
              ¥0.00
            </Text>
          </View>
        </View>

        {/* 底部按钮 */}
        <TouchableOpacity 
          className="h-12 rounded-lg justify-center items-center shadow-md"
          style={{ backgroundColor: colors.primary }}
          onPress={() => navigation.navigate('Payment')}
          activeOpacity={0.8}
        >
          <Text 
            className="text-lg font-semibold"
            style={{ color: colors.textInverse }}
          >
            去结算
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
