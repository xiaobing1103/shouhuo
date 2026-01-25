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
  Image,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { z } from 'zod';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { setCredentials } from '../../store/slices/authSlice';
import { loginApi } from '../../api/endpoints/auth';
import { apiClient } from '../../api/request';
import { useTheme } from '../../hooks/useTheme';
import { InvisibleDebugButton } from '../../components/common/InvisibleDebugButton';
import { saveCredentials } from '../../hooks/useAutoLogin';

// 登录表单 Zod Schema
const loginSchema = z.object({
  warehouse_id: z.string({
    required_error: '请输入仓库ID',
  }).min(1, '仓库ID不能为空').trim(),

  employee_id: z.string({
    required_error: '请输入员工ID',
  }).min(1, '员工ID不能为空').trim(),
  
  password: z.string({
    required_error: '请输入密码',
  }).min(1, '密码不能为空'),
});

export const LoginScreen: React.FC<{ navigation?: any }> = ({ navigation }) => {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const [warehouse_id, setWarehouseId] = useState('');
  const [employee_id, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // 使用 Zod 进行表单验证
    try {
      const formData = loginSchema.parse({
        warehouse_id: warehouse_id.trim(),
        employee_id: employee_id.trim(),
        password: password.trim(),
      });
  
      setLoading(true);
      
      const response = await loginApi({
        warehouse_id: formData.warehouse_id,
        employee_id: formData.employee_id,
        password: formData.password,
      });
  
      // 后端返回格式: { code: 200, data: { employee_id, ... }, message: "..." }
      const responseData = response.data;
      const userData = responseData.data;
  
      if (responseData.code !== 200 || !userData) {
        Alert.alert('登录失败', responseData.message || '服务器返回数据异常');
        return;
      }

      // 保存登录凭据到本地存储（用于自动登录）
      await saveCredentials({
        token: userData.token || null,
        warehouse_id: userData.warehouse_id || formData.warehouse_id,
        employee_id: userData.employee_id || formData.employee_id,
        employee_name: userData.employee_name,
        employee_role: userData.employee_role,
        phone: userData.phone,
      });
  
      // 将 token 存储到请求头中
      if (userData.token) {
        apiClient.defaults.headers.common['Authorization'] = userData.token;
      }

      dispatch(
        setCredentials({
          token: userData.token || null,
          warehouse_id: userData.warehouse_id || formData.warehouse_id,
          employee_id: userData.employee_id || formData.employee_id,
          employee_name: userData.employee_name,
          employee_role: userData.employee_role,
          phone: userData.phone,
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
      style={{ 
        flex: 1, 
        backgroundColor: colors.background,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* 左上角隐形调试按钮 - 连续点击20次退出应用 */}
      <InvisibleDebugButton debugVisible={true} />
      
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
          <Image 
            source={require('../../../assets/jinma.png')}
            className=" h-[100px] "
            resizeMode="contain"
          />
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
              金马游乐
            </Text>
          </View>
        </View>

        {/* 输入表单 - 紧凑版 */}
        <View className="mb-3">
          {/* 门店ID */}
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
              placeholder="门店ID"
              placeholderTextColor={colors.textPlaceholder}
              value={warehouse_id}
              onChangeText={setWarehouseId}
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
              value={employee_id}
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



