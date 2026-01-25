import React, { useRef, useCallback } from 'react';
import { TouchableOpacity, BackHandler, StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface InvisibleDebugButtonProps {
  /**
   * 触发退出所需的连续点击次数
   * @default 20
   */
  clickCountToExit?: number;
  /**
   * 连续点击的有效时间间隔（毫秒）
   * 超过此时间间隔，计数器将重置
   * @default 500
   */
  clickTimeoutMs?: number;
  /**
   * 按钮尺寸（宽高）
   * @default 40
   */
  size?: number;
  /**
   * 是否显示按钮（调试模式）
   * 设为 true 时按钮会显示半透明红色背景和点击计数
   * @default false
   */
  debugVisible?: boolean;
}

/**
 * 隐形调试按钮组件
 * 
 * 功能：
 * - 完全透明，不可见但可点击
 * - 连续点击指定次数后退出应用
 * - 退出时不清理任何 token 或内存缓存
 * 
 * 使用方式：
 * 将此组件放置在页面左上角，作为绝对定位元素
 */
export const InvisibleDebugButton: React.FC<InvisibleDebugButtonProps> = ({
  clickCountToExit = 20,
  clickTimeoutMs = 500,
  size = 40, // 与设置按钮一样大小 (w-10 h-10 = 40px)
  debugVisible = false, // 调试模式开关
}) => {
  const insets = useSafeAreaInsets();
  // 使用 useRef 存储点击计数，避免 React 闭包问题
  const clickCountRef = useRef(0);
  // 用于调试模式下显示点击次数
  const [displayCount, setDisplayCount] = React.useState(0);
  const lastClickTimeRef = useRef<number>(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handlePress = useCallback(() => {
    const now = Date.now();
    const timeSinceLastClick = now - lastClickTimeRef.current;

    // 清除之前的超时计时器
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // 判断是否在有效时间间隔内
    if (lastClickTimeRef.current !== 0 && timeSinceLastClick <= clickTimeoutMs) {
      // 在有效间隔内，增加计数
      clickCountRef.current += 1;
      if (debugVisible) setDisplayCount(clickCountRef.current);

      // 检查是否达到退出条件
      if (clickCountRef.current >= clickCountToExit) {
        // 达到指定点击次数，退出应用
        // 注意：不清理任何 token 或缓存，直接退出
        console.log('[DebugButton] 达到点击次数，退出应用');
        BackHandler.exitApp();
        return;
      }
    } else {
      // 超过有效间隔或第一次点击，重置计数为1（当前这次点击）
      clickCountRef.current = 1;
      if (debugVisible) setDisplayCount(1);
    }

    // 更新最后点击时间
    lastClickTimeRef.current = now;

    // 设置超时计时器，在超时后重置计数
    timeoutRef.current = setTimeout(() => {
      clickCountRef.current = 0;
      lastClickTimeRef.current = 0;
      if (debugVisible) setDisplayCount(0);
    }, clickTimeoutMs);
  }, [clickCountToExit, clickTimeoutMs, debugVisible]);

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          top: insets.top + 4, // 考虑 SafeArea 顶部偏移
          left: 4,
          width: size,
          height: size,
          backgroundColor: debugVisible ? 'rgba(255, 0, 0, 0.3)' : 'transparent',
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}
      onPress={handlePress}
      activeOpacity={debugVisible ? 0.7 : 1}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      {debugVisible && (
        <Text style={styles.debugText}>{displayCount}/{clickCountToExit}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    backgroundColor: 'transparent',
    zIndex: 9999,
  },
  debugText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
});
