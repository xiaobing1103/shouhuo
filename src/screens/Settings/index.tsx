import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { storage } from '../../utils/storage';
import { useTheme } from '../../hooks/useTheme';
import { setRobotBaseUrl } from '../../store/slices/configSlice';
import { STORAGE_KEYS } from '../../config/constants';
import type { RootState } from '../../store';

const LOCAL_STORAGE_KEYS = {
  SERVER_BASE_URL: 'server_base_url',
};

export const SettingsScreen: React.FC = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const dispatch = useDispatch();
  
  // 从 Redux 获取当前的 robotBaseUrl
  const currentRobotBaseUrl = useSelector((state: RootState) => state.config.robotBaseUrl);
  
  const [serverBaseUrl, setServerBaseUrl] = useState('');
  const [robotBaseUrl, setRobotBaseUrlState] = useState('');
  const [loading, setLoading] = useState(false);

  // 加载已保存的配置
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedServerUrl = await storage.get<string>(LOCAL_STORAGE_KEYS.SERVER_BASE_URL);
      const savedRobotUrl = await storage.get<string>(STORAGE_KEYS.ROBOT_BASE_URL);
      
      if (savedServerUrl) setServerBaseUrl(savedServerUrl);
      if (savedRobotUrl) {
        setRobotBaseUrlState(savedRobotUrl);
      } else if (currentRobotBaseUrl) {
        setRobotBaseUrlState(currentRobotBaseUrl);
      }
    } catch (error) {
      console.error('加载设置失败:', error);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      
      // 验证URL格式
      if (serverBaseUrl && !isValidUrl(serverBaseUrl)) {
        Alert.alert('提示', '服务器地址格式不正确');
        return;
      }
      
      if (robotBaseUrl && !isValidUrl(robotBaseUrl)) {
        Alert.alert('提示', '机器人服务器地址格式不正确');
        return;
      }

      // 保存配置
      await storage.set(LOCAL_STORAGE_KEYS.SERVER_BASE_URL, serverBaseUrl);
      await storage.set(STORAGE_KEYS.ROBOT_BASE_URL, robotBaseUrl);
      
      // 更新 Redux 状态
      dispatch(setRobotBaseUrl(robotBaseUrl));
      
      Alert.alert('成功', '设置已保存', [
        {
          text: '确定',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      console.error('保存设置失败:', error);
      Alert.alert('错误', '保存设置失败');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    Alert.alert(
      '确认重置',
      '确定要恢复默认设置吗？',
      [
        { text: '取消', style: 'cancel' },
        {
          text: '确定',
          style: 'destructive',
          onPress: async () => {
            await storage.remove(LOCAL_STORAGE_KEYS.SERVER_BASE_URL);
            await storage.remove(STORAGE_KEYS.ROBOT_BASE_URL);
            setServerBaseUrl('');
            setRobotBaseUrlState('');
            dispatch(setRobotBaseUrl(''));
            Alert.alert('成功', '已恢复默认设置');
          },
        },
      ]
    );
  };

  const isValidUrl = (url: string): boolean => {
    try {
      const urlPattern = /^https?:\/\/.+/i;
      return urlPattern.test(url);
    } catch {
      return false;
    }
  };

  return (
    <View style={{ 
      flex: 1, 
      backgroundColor: colors.background,
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
    }}>
      {/* 顶部导航栏 */}
      <View 
        className="h-14 flex-row items-center justify-between px-4 border-b"
        style={{ 
          backgroundColor: colors.backgroundCard,
          borderBottomColor: colors.border,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="py-2 px-2"
        >
          <Text style={{ color: colors.primary, fontSize: 16 }}>返回</Text>
        </TouchableOpacity>
        
        <Text 
          className="text-lg font-semibold"
          style={{ color: colors.text }}
        >
          系统设置
        </Text>
        
        <View style={{ width: 50 }} />
      </View>

      <ScrollView 
        className="flex-1 px-4 pt-4"
        keyboardShouldPersistTaps="handled"
      >
        {/* 配置说明 */}
        <View 
          className="rounded-lg p-3 mb-4"
          style={{ backgroundColor: colors.backgroundCard + '80' }}
        >
          <Text 
            className="text-xs"
            style={{ color: colors.textSecondary, lineHeight: 18 }}
          >
            配置全局接口地址，留空则使用默认配置。
            {'\n'}修改后需重新登录才能生效。
          </Text>
        </View>

        {/* Server Base URL */}
        <View className="mb-4">
          <Text 
            className="text-sm font-medium mb-2"
            style={{ color: colors.text }}
          >
            服务器地址 (Server Base URL)
          </Text>
          <View 
            className="rounded-lg shadow-sm"
            style={{ backgroundColor: colors.backgroundCard }}
          >
            <TextInput
              className="h-11 px-3 text-sm"
              style={{ color: colors.text }}
              placeholder="例如: https://api.example.com"
              placeholderTextColor={colors.textPlaceholder}
              value={serverBaseUrl}
              onChangeText={setServerBaseUrl}
              autoCapitalize="none"
              autoCorrect={false}
              editable={!loading}
            />
          </View>
        </View>

        {/* Robot Base URL */}
        <View className="mb-4">
          <Text 
            className="text-sm font-medium mb-2"
            style={{ color: colors.text }}
          >
            机器人服务器地址 (Robot Base URL)
          </Text>
          <View 
            className="rounded-lg shadow-sm"
            style={{ backgroundColor: colors.backgroundCard }}
          >
            <TextInput
              className="h-11 px-3 text-sm"
              style={{ color: colors.text }}
              placeholder="默认: http://8.166.128.232:5000/api"
              placeholderTextColor={colors.textPlaceholder}
              value={robotBaseUrl}
              onChangeText={setRobotBaseUrlState}
              autoCapitalize="none"
              autoCorrect={false}
              editable={!loading}
            />
          </View>
          <Text 
            className="text-xs mt-1"
            style={{ color: colors.textSecondary }}
          >
            用于接收轮询任务中的机器人请求转发
          </Text>
        </View>

        {/* 操作按钮 */}
        <TouchableOpacity
          className="h-11 rounded-lg justify-center items-center mb-3 shadow-md"
          style={{ 
            backgroundColor: loading ? colors.primaryLight : colors.primary,
            opacity: loading ? 0.7 : 1,
          }}
          onPress={handleSave}
          disabled={loading}
          activeOpacity={0.8}
        >
          <Text 
            className="text-base font-semibold"
            style={{ color: colors.textInverse }}
          >
            {loading ? '保存中...' : '保存设置'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="h-11 rounded-lg justify-center items-center border"
          style={{ 
            borderColor: colors.border,
            backgroundColor: colors.background,
          }}
          onPress={handleReset}
          disabled={loading}
          activeOpacity={0.8}
        >
          <Text 
            className="text-base font-medium"
            style={{ color: colors.error }}
          >
            恢复默认
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
