import { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setThemeMode, setCustomColors, setTextSpacing } from '../store/slices/configSlice';
import { 
  ThemeMode, 
  ColorScheme, 
  getThemeColors, 
  getThemeGradient,
  GradientConfig 
} from '../config/colors.config';
import { textSpacing as defaultTextSpacing } from '../config/spacing.config';

/**
 * 主题 Hook
 * 提供主题相关的状态和操作方法
 */
export const useTheme = () => {
  const dispatch = useDispatch();
  
  // 从 Redux 获取主题配置
  const config = useSelector((state: RootState) => state.config);
  const {
    themeMode,
    customTextColor,
    customBackgroundColor,
    customComponentBackground,
    textLetterSpacing,
    textLineHeight,
  } = config;

  // 获取当前主题的颜色方案
  const colors: ColorScheme = useMemo(() => {
    const baseColors = getThemeColors(themeMode);
    
    // 如果是自定义主题，应用自定义颜色
    if (themeMode === 'custom') {
      return {
        ...baseColors,
        text: customTextColor || baseColors.text,
        background: customBackgroundColor || baseColors.background,
        backgroundCard: customComponentBackground || baseColors.backgroundCard,
      };
    }
    
    return baseColors;
  }, [themeMode, customTextColor, customBackgroundColor, customComponentBackground]);

  // 获取当前主题的背景渐变配置
  const gradient: GradientConfig = useMemo(() => {
    return getThemeGradient(themeMode);
  }, [themeMode]);

  // 获取文字间距配置
  const textStyles = useMemo(() => ({
    letterSpacing: textLetterSpacing ?? defaultTextSpacing.letterSpacing.normal,
    lineHeight: textLineHeight ?? defaultTextSpacing.lineHeight.normal,
  }), [textLetterSpacing, textLineHeight]);

  // 切换主题
  const changeTheme = useCallback((theme: ThemeMode) => {
    dispatch(setThemeMode(theme));
  }, [dispatch]);

  // 设置自定义颜色
  const updateCustomColors = useCallback((colorConfig: {
    textColor?: string;
    backgroundColor?: string;
    componentBackground?: string;
  }) => {
    dispatch(setCustomColors(colorConfig));
  }, [dispatch]);

  // 设置文字间距
  const updateTextSpacing = useCallback((spacingConfig: {
    letterSpacing?: number;
    lineHeight?: number;
  }) => {
    dispatch(setTextSpacing(spacingConfig));
  }, [dispatch]);

  return {
    // 状态
    themeMode,
    colors,
    gradient,
    textStyles,
    customColors: {
      textColor: customTextColor,
      backgroundColor: customBackgroundColor,
      componentBackground: customComponentBackground,
    },
    
    // 方法
    changeTheme,
    updateCustomColors,
    updateTextSpacing,
  };
};
