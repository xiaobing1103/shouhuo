/*
 * 全局颜色常量配置
 * 集中管理所有颜色，支持多主题切换
 */

// 颜色主题类型定义
export type ThemeMode = 'light' | 'dark' | 'white' | 'gray' | 'techBlue' | 'blue' | 'green' | 'purple' | 'glass' | 'custom';

// 颜色配置接口
export interface ColorScheme {
  // 品牌色
  primary: string;
  primaryLight: string;
  primaryDark: string;
  primaryHover: string;

  // 背景色
  background: string;
  backgroundSecondary: string;
  backgroundTertiary: string;
  backgroundCard: string;
  backgroundOverlay: string;

  // 文本色
  text: string;
  textSecondary: string;
  textTertiary: string;
  textPlaceholder: string;
  textDisabled: string;
  textInverse: string;

  // 边框色
  border: string;
  borderLight: string;
  borderDark: string;
  borderFocus: string;

  // 状态色
  success: string;
  successLight: string;
  warning: string;
  warningLight: string;
  error: string;
  errorLight: string;
  info: string;
  infoLight: string;

  // 图标色
  icon: string;
  iconSecondary: string;
  iconDisabled: string;

  // 阴影色
  shadow: string;
  shadowLight: string;

  // 分割线
  divider: string;
}

// 亮色主题（默认 - 白色主题）
export const lightColors: ColorScheme = {
  // 品牌色
  primary: '#1A7AE8',
  primaryLight: '#3B82F6',
  primaryDark: '#1890FF',
  primaryHover: '#60A5FA',

  // 背景色
  background: '#F4F4F6',         // 页面背景色
  backgroundSecondary: '#F9FAFB', // 输入框背景色
  backgroundTertiary: '#FFFFFF',  // 内容卡片背景
  backgroundCard: '#FFFFFF',      // 内容卡片背景
  backgroundOverlay: 'rgba(0, 0, 0, 0.5)',

  // 文本色
  text: '#0F263C',        // 一级文字大黑
  textSecondary: '#3F5163', // 二级文字中黑
  textTertiary: '#9EA5AF',  // 三级文字灰
  textPlaceholder: '#CACDD3', // 标注类文字
  textDisabled: '#CACDD3',
  textInverse: '#FFFFFF',

  // 边框色
  border: '#E0E0E0',
  borderLight: '#E5E7EB',
  borderDark: '#D5DBDB',
  borderFocus: '#1A7AE8',

  // 状态色
  success: '#4ECDC4',
  successLight: '#E8FDF4',
  warning: '#FFD93D',
  warningLight: '#FFF5E1',
  error: '#FF6B6B',
  errorLight: '#FDE8F4',
  info: '#1A7AE8',
  infoLight: '#E8F4FD',

  // 图标色
  icon: '#666666',
  iconSecondary: '#999999',
  iconDisabled: '#CCCCCC',

  // 阴影色
  shadow: 'rgba(15, 38, 60, 0.20)',
  shadowLight: 'rgba(15, 38, 60, 0.10)',

  // 分割线
  divider: '#E0E0E0',
};

// 暗色主题（灰色主题）
export const darkColors: ColorScheme = {
  // 品牌色
  primary: '#1A7AE8',
  primaryLight: '#3B82F6',
  primaryDark: '#1890FF',
  primaryHover: '#60A5FA',

  // 背景色
  background: '#1D1D1D',         // 页面背景色
  backgroundSecondary: '#666666', // 输入框背景色
  backgroundTertiary: '#454545',  // 内容卡片背景
  backgroundCard: '#454545',      // 内容卡片背景
  backgroundOverlay: 'rgba(0, 0, 0, 0.7)',

  // 文本色
  text: '#FFFFFF',        // 一级文字大黑
  textSecondary: '#8D8D8D', // 二级文字中黑
  textTertiary: '#969696',  // 三级文字灰
  textPlaceholder: '#8C8C8C', // 标注类文字
  textDisabled: '#8C8C8C',
  textInverse: '#1D1D1D',

  // 边框色
  border: '#454545',
  borderLight: '#666666',
  borderDark: '#1D1D1D',
  borderFocus: '#1A7AE8',

  // 状态色
  success: '#10B981',
  successLight: '#064E3B',
  warning: '#F59E0B',
  warningLight: '#78350F',
  error: '#EF4444',
  errorLight: '#7F1D1D',
  info: '#1A7AE8',
  infoLight: '#1E3A8A',

  // 图标色
  icon: '#8D8D8D',
  iconSecondary: '#969696',
  iconDisabled: '#8C8C8C',

  // 阴影色
  shadow: 'rgba(0, 0, 0, 0.5)',
  shadowLight: 'rgba(0, 0, 0, 0.3)',

  // 分割线
  divider: '#454545',
};

// 蓝色主题
export const blueColors: ColorScheme = {
  ...lightColors,
  primary: '#2E9AFE',
  primaryLight: '#60A5FA',
  primaryDark: '#1890FF',
  primaryHover: '#93C5FD',
  background: '#EFF6FF',
  backgroundSecondary: '#DBEAFE',
  backgroundTertiary: '#BFDBFE',
  backgroundCard: '#FFFFFF',
  borderFocus: '#2E9AFE',
  info: '#2E9AFE',
};

// 绿色主题
export const greenColors: ColorScheme = {
  ...lightColors,
  primary: '#10B981',
  primaryLight: '#34D399',
  primaryDark: '#059669',
  primaryHover: '#6EE7B7',
  background: '#F0FDF4',
  backgroundSecondary: '#DCFCE7',
  backgroundTertiary: '#BBF7D0',
  backgroundCard: '#FFFFFF',
  borderFocus: '#10B981',
  info: '#10B981',
  success: '#059669',
};

// 紫色主题
export const purpleColors: ColorScheme = {
  ...lightColors,
  primary: '#7C3AED',
  primaryLight: '#A78BFA',
  primaryDark: '#6D28D9',
  primaryHover: '#C4B5FD',
  background: '#FAF5FF',
  backgroundSecondary: '#F3E8FF',
  backgroundTertiary: '#E9D5FF',
  backgroundCard: '#FFFFFF',
  borderFocus: '#7C3AED',
  info: '#7C3AED',
};

// 白色主题（自定义）
export const whiteColors: ColorScheme = {
  // 品牌色
  primary: '#1A7AE8',
  primaryLight: '#3B82F6',
  primaryDark: '#1890FF',
  primaryHover: '#60A5FA',

  // 背景色
  background: '#F4F4F6',
  backgroundSecondary: '#F9FAFB',
  backgroundTertiary: '#FFFFFF',
  backgroundCard: '#FFFFFF',
  backgroundOverlay: 'rgba(0, 0, 0, 0.5)',

  // 文本色
  text: '#0F263C',
  textSecondary: '#3F5163',
  textTertiary: '#9EA5AF',
  textPlaceholder: '#CACDD3',
  textDisabled: '#CACDD3',
  textInverse: '#FFFFFF',

  // 边框色
  border: '#E0E0E0',
  borderLight: '#E5E7EB',
  borderDark: '#D5DBDB',
  borderFocus: '#1A7AE8',

  // 状态色
  success: '#4ECDC4',
  successLight: '#E8FDF4',
  warning: '#FFD93D',
  warningLight: '#FFF5E1',
  error: '#FF6B6B',
  errorLight: '#FDE8F4',
  info: '#1A7AE8',
  infoLight: '#E8F4FD',

  // 图标色
  icon: '#666666',
  iconSecondary: '#999999',
  iconDisabled: '#CCCCCC',

  // 阴影色
  shadow: 'rgba(15, 38, 60, 0.20)',
  shadowLight: 'rgba(15, 38, 60, 0.10)',

  // 分割线
  divider: '#E0E0E0',
};

// 灰色主题（自定义）
export const grayColors: ColorScheme = {
  // 品牌色
  primary: '#1A7AE8',
  primaryLight: '#3B82F6',
  primaryDark: '#1890FF',
  primaryHover: '#60A5FA',

  // 背景色
  background: '#606469',
  backgroundSecondary: '#FFFFFF',
  backgroundTertiary: '#F5F5F5',
  backgroundCard: '#FFFFFF',
  backgroundOverlay: 'rgba(0, 0, 0, 0.5)',

  // 文本色
  text: '#010E1A',
  textSecondary: '#4B637B',
  textTertiary: '#D0D6DC',
  textPlaceholder: '#CACDD3',
  textDisabled: '#CACDD3',
  textInverse: '#FFFFFF',

  // 边框色
  border: '#E0E0E0',
  borderLight: '#E5E7EB',
  borderDark: '#D5DBDB',
  borderFocus: '#1A7AE8',

  // 状态色
  success: '#4ECDC4',
  successLight: '#E8FDF4',
  warning: '#FFD93D',
  warningLight: '#FFF5E1',
  error: '#FF6B6B',
  errorLight: '#FDE8F4',
  info: '#1A7AE8',
  infoLight: '#E8F4FD',

  // 图标色
  icon: '#4B637B',
  iconSecondary: '#D0D6DC',
  iconDisabled: '#CACDD3',

  // 阴影色
  shadow: 'rgba(0, 0, 0, 0.30)',
  shadowLight: 'rgba(0, 0, 0, 0.15)',

  // 分割线
  divider: '#E0E0E0',
};

// 科技蓝主题（Midnight 蓝色主题）
export const techBlueColors: ColorScheme = {
  // 品牌色
  primary: '#1A7AE8',
  primaryLight: '#3B82F6',
  primaryDark: '#1890FF',
  primaryHover: '#60A5FA',

  // 背景色
  background: '#011635',         // 页面背景色
  backgroundSecondary: '#284C70', // 输入框背景色
  backgroundTertiary: '#013766',  // 内容卡片背景
  backgroundCard: '#013766',      // 内容卡片背景
  backgroundOverlay: 'rgba(0, 0, 0, 0.7)',

  // 文本色
  text: '#FFFFFF',        // 一级文字大黑
  textSecondary: '#B9C4CE', // 二级文字中黑
  textTertiary: '#627386',  // 三级文字灰
  textPlaceholder: '#5F7387', // 标注类文字
  textDisabled: '#5F7387',
  textInverse: '#011635',

  // 边框色
  border: '#284C70',
  borderLight: '#3A5D82',
  borderDark: '#013766',
  borderFocus: '#1A7AE8',

  // 状态色
  success: '#4ECDC4',
  successLight: '#013766',
  warning: '#FFD93D',
  warningLight: '#284C70',
  error: '#FF6B6B',
  errorLight: '#013766',
  info: '#1A7AE8',
  infoLight: '#013766',

  // 图标色
  icon: '#B9C4CE',
  iconSecondary: '#627386',
  iconDisabled: '#5F7387',

  // 阴影色
  shadow: 'rgba(0, 0, 0, 0.5)',
  shadowLight: 'rgba(0, 0, 0, 0.3)',

  // 分割线
  divider: '#284C70',
};

// 毛玻璃主题（自定义）
export const glassColors: ColorScheme = {
  // 品牌色（默认按钮色）
  primary: '#1A7AE8',
  primaryLight: '#3B82F6',
  primaryDark: '#1890FF',
  primaryHover: '#60A5FA',

  // 背景色
  background: '#ECEEF6',         // 页面背景色
  backgroundSecondary: '#F9FBFF', // 内容卡片背景
  backgroundTertiary: '#FFFFFF',  // 输入框背景色
  backgroundCard: '#F9FBFF',      // 内容卡片背景
  backgroundOverlay: 'rgba(236, 238, 246, 0.8)',

  // 文本色
  text: '#364F66',                // 一级文字大黑
  textSecondary: '#667E96',       // 二级文字中黑
  textTertiary: '#E3E7EB',        // 三级文字灰
  textPlaceholder: '#5F7387',     // 标注类文字
  textDisabled: '#E3E7EB',
  textInverse: '#FFFFFF',

  // 边框色
  border: '#E3E7EB',
  borderLight: '#E3E7EB',
  borderDark: '#667E96',
  borderFocus: '#1A7AE8',

  // 状态色
  success: '#4ECDC4',
  successLight: '#E8FDF4',
  warning: '#FFD93D',
  warningLight: '#FFF5E1',
  error: '#FF6B6B',
  errorLight: '#FDE8F4',
  info: '#1A7AE8',
  infoLight: '#E8F4FD',

  // 图标色
  icon: '#667E96',
  iconSecondary: '#5F7387',
  iconDisabled: '#E3E7EB',

  // 阴影色
  shadow: 'rgba(54, 79, 102, 0.15)',
  shadowLight: 'rgba(54, 79, 102, 0.08)',

  // 分割线
  divider: '#E3E7EB',
};

// 自定义主题（可动态修改的主题）
// 默认使用 light 主题的配置，但可以通过 pageConfig 覆盖关键颜色
export const customColors: ColorScheme = {
  ...lightColors,
  // 这些颜色将由用户自定义，从 pageConfig 中读取
  // background: 由 pageConfig.customBackgroundColor 控制
  // backgroundCard: 由 pageConfig.customComponentBackground 控制
  // text: 由 pageConfig.customTextColor 控制
};

// 主题映射
export const themeColors: Record<ThemeMode, ColorScheme> = {
  light: lightColors,
  dark: darkColors,
  white: whiteColors,
  gray: grayColors,
  techBlue: techBlueColors,
  blue: blueColors,
  green: greenColors,
  purple: purpleColors,
  glass: glassColors,
  custom: customColors,
};

// 预设背景颜色（用于样式配置）
export const presetBackgroundColors = [
  '#F5F5F5', // 浅灰
  '#FFFFFF', // 纯白
  '#FFF5E1', // 淡黄/奶油色
  '#E8F4FD', // 淡蓝
  '#FDE8F4', // 淡粉红
  '#E8FDF4', // 淡绿
  '#1A7AE8', // 蓝色
  '#FF6B6B', // 红色
  '#4ECDC4', // 青绿
  '#FFD93D', // 黄色
];

// 标签颜色（AboutMe 组件使用）
export const tagColors = {
  blue: {
    background: '#DBEAFE',
    text: '#1D4ED8',
  },
  pink: {
    background: '#FCE7F3',
    text: '#DB2777',
  },
  purple: {
    background: '#EDE9FE',
    text: '#7C3AED',
  },
  green: {
    background: '#D1FAE5',
    text: '#059669',
  },
  yellow: {
    background: '#FEF3C7',
    text: '#D97706',
  },
  red: {
    background: '#FEE2E2',
    text: '#DC2626',
  },
};

// 渐变色配置
export interface GradientConfig {
  colors: readonly [string, string, ...string[]];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  locations?: readonly [number, number, ...number[]];
}

// 按钮圆角配置
export type ButtonRadius = 'square' | 'rectangle' | 'round';

export const buttonRadiusValues: Record<ButtonRadius, number> = {
  square: 8,
  rectangle: 12,
  round: 24,
};

export const gradients = {
  primary: ['#93C5FD', '#60A5FA', '#3B82F6'],
  secondary: ['#EFF6FF', '#DBEAFE', '#BFDBFE'],
  success: ['#D1FAE5', '#A7F3D0', '#6EE7B7'],
  warning: ['#FEF3C7', '#FDE68A', '#FCD34D'],
  error: ['#FEE2E2', '#FECACA', '#FCA5A5'],
  login: {
    start: '#E8F4FF',
    middle: '#FCFDFF',
    end: '#FCFDFF',
  },
};

// 主题背景渐变配置
export const themeBackgroundGradients: Record<ThemeMode, GradientConfig> = {
  light: {
    colors: ['#E8F4FF', '#FCFDFF', '#FFFFFF'],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
    locations: [0, 0.5, 1] as const,
  },
  dark: {
    colors: ['#0F172A', '#1E293B', '#334155'],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
    locations: [0, 0.5, 1] as const,
  },
  white: {
    colors: ['#F4F4F6', '#F9FAFB', '#FFFFFF'],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
    locations: [0, 0.5, 1] as const,
  },
  gray: {
    colors: ['#606469', '#787C81', '#909499'],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
    locations: [0, 0.5, 1] as const,
  },
  techBlue: {
    colors: ['#011635', '#012A54', '#013766'],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
    locations: [0, 0.5, 1] as const,
  },
  blue: {
    colors: ['#EFF6FF', '#DBEAFE', '#BFDBFE'],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
    locations: [0, 0.5, 1] as const,
  },
  green: {
    colors: ['#F0FDF4', '#DCFCE7', '#BBF7D0'],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
    locations: [0, 0.5, 1] as const,
  },
  purple: {
    colors: ['#FAF5FF', '#F3E8FF', '#E9D5FF'],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
    locations: [0, 0.5, 1] as const,
  },
  glass: {
    colors: ['#ECEEF6', '#F9FBFF', '#FFFFFF'],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
    locations: [0, 0.5, 1] as const,
  },
  custom: {
    colors: ['#E8F4FF', '#FCFDFF', '#FFFFFF'],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
    locations: [0, 0.5, 1] as const,
  },
};

/**
 * 根据主题模式获取颜色方案
 * @param theme 主题模式
 * @returns 对应的颜色配置
 */
export const getThemeColors = (theme: ThemeMode = 'light'): ColorScheme => {
  return themeColors[theme];
};

/**
 * 根据主题模式获取背景渐变配置
 * @param theme 主题模式
 * @returns 对应的渐变配置
 */
export const getThemeGradient = (theme: ThemeMode = 'light'): GradientConfig => {
  return themeBackgroundGradients[theme];
};
