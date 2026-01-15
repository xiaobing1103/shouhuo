import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { z } from 'zod';
import { setCredentials } from '../../store/slices/authSlice';
import { loginApi } from '../../api/endpoints/auth';
import { getDynamicBaseURL } from '../../config/api.config';
import { useTheme } from '../../hooks/useTheme';

// 登录表单 Zod Schema
const loginSchema = z.object({
  storeId: z.string({
    required_error: '请输入店铺ID',
  }).min(1, '店铺ID不能为空').trim(),

  employeeId: z.string({
    required_error: '请输入员工ID',
  }).min(1, '员工ID不能为空').trim(),
  
  password: z.string({
    required_error: '请输入密码',
  }).min(1, '密码不能为空'),
});

export const LoginScreen: React.FC<{ navigation?: any }> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [storeId, setStoreId] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // 使用 Zod 进行表单验证
    try {
      const formData = loginSchema.parse({
        storeId: storeId.trim(),
        employeeId: employeeId.trim(),
        password: password.trim(),
      });
  
      setLoading(true);
      
      // 获取动态配置的服务器地址
      const serverUrl = await getDynamicBaseURL();
        
      const response = await loginApi({
        serverUrl,
        storeId: formData.storeId,
        employeeId: formData.employeeId,
        password: formData.password,
      });
  
      // 后端返回格式: { token, storeId, employeeId }
      const { token, storeId: returnedStoreId, employeeId: returnedEmployeeId } = response.data;
  
      if (!token) {
        Alert.alert('登录失败', '服务器未返回有效的认证令牌');
        return;
      }
  
      dispatch(
        setCredentials({
          token,
          storeId: returnedStoreId || formData.storeId,
          employeeId: returnedEmployeeId || formData.employeeId,
        })
      );
  
      Alert.alert('登录成功', '欢迎使用自动售卖机系统！');
    } catch (error: any) {
      // 处理 Zod 验证错误
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        Alert.alert('提示', firstError.message);
        return;
      }
        
      // 处理 API 错误
      console.error('登录失败:', error);
      const errorMessage = error?.response?.data?.message || error?.message || '登录失败,请检查账号密码';
      Alert.alert('登录失败', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const { colors, textStyles } = useTheme();

  const handleNavigateToSettings = () => {
    if (navigation) {
      navigation.navigate('Settings');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 16 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* 右上角设置按钮 */}
        <View className="items-end mt-4">
          <TouchableOpacity
            className="w-10 h-10 rounded-full justify-center items-center"
            style={{ backgroundColor: colors.backgroundCard }}
            onPress={handleNavigateToSettings}
            activeOpacity={0.7}
          >
            <Text className="text-xl" style={{ color: colors.text }}>⚙️</Text>
          </TouchableOpacity>
        </View>

        {/* 顶部装饰图片区域 - 紧凑版 */}
        <View className="items-center mt-2 mb-3">
          <View 
            className="w-[100px] h-[100px] rounded-full justify-center items-center"
            style={{ backgroundColor: colors.primary + '99' }}
          >
            <Text 
              className="text-lg font-bold"
              style={{ color: colors.textInverse }}
            >
              售货机
            </Text>
          </View>
        </View>

        {/* 欢迎标题 - 紧凑版 */}
        <View className="mb-4">
          <Text 
            className="text-4xl font-bold mb-1"
            style={{ color: colors.text }}
          >
            Hello!
          </Text>
          <View className="flex-row items-center">
            <Text 
              className="text-xl"
              style={{ color: colors.text }}
            >
              Welcome to{' '}
            </Text>
            <Text 
              className="text-xl font-bold"
              style={{ color: colors.primary }}
            >
              售货机
            </Text>
          </View>
        </View>

        {/* 输入表单 - 紧凑版 */}
        <View className="mb-3">
          {/* 店铺ID */}
          <View 
            className="rounded-lg mb-2 shadow-sm"
            style={{ backgroundColor: colors.backgroundCard }}
          >
            <TextInput
              className="h-10 px-3 text-sm"
              style={{ 
                color: colors.text,
                letterSpacing: textStyles.letterSpacing,
              }}
              placeholder="店铺ID"
              placeholderTextColor={colors.textPlaceholder}
              value={storeId}
              onChangeText={setStoreId}
              autoCapitalize="none"
              editable={!loading}
            />
          </View>

          {/* 员工ID */}
          <View 
            className="rounded-lg mb-2 shadow-sm"
            style={{ backgroundColor: colors.backgroundCard }}
          >
            <TextInput
              className="h-10 px-3 text-sm"
              style={{ 
                color: colors.text,
                letterSpacing: textStyles.letterSpacing,
              }}
              placeholder="员工ID"
              placeholderTextColor={colors.textPlaceholder}
              value={employeeId}
              onChangeText={setEmployeeId}
              autoCapitalize="none"
              editable={!loading}
            />
          </View>

          {/* 密码 */}
          <View 
            className="rounded-lg mb-2 shadow-sm"
            style={{ backgroundColor: colors.backgroundCard }}
          >
            <TextInput
              className="h-10 px-3 text-sm"
              style={{ 
                color: colors.text,
                letterSpacing: textStyles.letterSpacing,
              }}
              placeholder="密码"
              placeholderTextColor={colors.textPlaceholder}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              editable={!loading}
            />
          </View>
        </View>

        {/* 登录按钮 - 紧凑版 */}
        <TouchableOpacity
          className="h-10 rounded-lg justify-center items-center mt-2 shadow-md"
          style={{ 
            backgroundColor: loading ? colors.primaryLight : colors.primary,
            opacity: loading ? 0.7 : 1,
          }}
          onPress={handleLogin}
          disabled={loading}
          activeOpacity={0.8}
        >
          <Text 
            className="text-base font-semibold"
            style={{ color: colors.textInverse }}
          >
            {loading ? '登录中...' : '登录'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};



