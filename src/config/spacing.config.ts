/*
 * 全局间距配置
 * 定义统一的间距规范，确保整个应用的一致性
 */

/**
 * 基础间距单位（4px）
 * 所有间距都是基于这个基础单位的倍数
 */
export const SPACING_UNIT = 4;

/**
 * 间距配置
 * 使用数字作为键，值为实际的像素值
 */
export const spacing = {
  0: 0,
  1: SPACING_UNIT * 1,      // 4px
  2: SPACING_UNIT * 2,      // 8px
  3: SPACING_UNIT * 3,      // 12px
  4: SPACING_UNIT * 4,      // 16px
  5: SPACING_UNIT * 5,      // 20px
  6: SPACING_UNIT * 6,      // 24px
  7: SPACING_UNIT * 7,      // 28px
  8: SPACING_UNIT * 8,      // 32px
  9: SPACING_UNIT * 9,      // 36px
  10: SPACING_UNIT * 10,    // 40px
  11: SPACING_UNIT * 11,    // 44px
  12: SPACING_UNIT * 12,    // 48px
  14: SPACING_UNIT * 14,    // 56px
  16: SPACING_UNIT * 16,    // 64px
  20: SPACING_UNIT * 20,    // 80px
  24: SPACING_UNIT * 24,    // 96px
  28: SPACING_UNIT * 28,    // 112px
  32: SPACING_UNIT * 32,    // 128px
  36: SPACING_UNIT * 36,    // 144px
  40: SPACING_UNIT * 40,    // 160px
  44: SPACING_UNIT * 44,    // 176px
  48: SPACING_UNIT * 48,    // 192px
  52: SPACING_UNIT * 52,    // 208px
  56: SPACING_UNIT * 56,    // 224px
  60: SPACING_UNIT * 60,    // 240px
  64: SPACING_UNIT * 64,    // 256px
  72: SPACING_UNIT * 72,    // 288px
  80: SPACING_UNIT * 80,    // 320px
  96: SPACING_UNIT * 96,    // 384px
} as const;

/**
 * 语义化间距
 * 为常用的间距场景提供语义化的命名
 */
export const semanticSpacing = {
  // 组件内部间距
  xxs: spacing[1],    // 4px - 极小间距
  xs: spacing[2],     // 8px - 超小间距
  sm: spacing[3],     // 12px - 小间距
  md: spacing[4],     // 16px - 中等间距
  lg: spacing[6],     // 24px - 大间距
  xl: spacing[8],     // 32px - 超大间距
  xxl: spacing[12],   // 48px - 极大间距

  // 页面布局间距
  pagePadding: spacing[4],        // 16px - 页面内边距
  pagePaddingLarge: spacing[6],   // 24px - 大屏页面内边距
  sectionGap: spacing[8],         // 32px - 区块间距
  
  // 卡片间距
  cardPadding: spacing[4],        // 16px - 卡片内边距
  cardGap: spacing[4],            // 16px - 卡片间距
  
  // 列表间距
  listItemGap: spacing[3],        // 12px - 列表项间距
  listGap: spacing[2],            // 8px - 列表内容间距
  
  // 表单间距
  formItemGap: spacing[4],        // 16px - 表单项间距
  formLabelGap: spacing[2],       // 8px - 表单标签间距
  
  // 按钮间距
  buttonPaddingX: spacing[4],     // 16px - 按钮水平内边距
  buttonPaddingY: spacing[2],     // 8px - 按钮垂直内边距
  buttonGap: spacing[3],          // 12px - 按钮组间距
} as const;

/**
 * 文字间距配置
 */
export const textSpacing = {
  // 字间距（letter-spacing）
  letterSpacing: {
    tighter: -0.05,    // -0.05em - 更紧
    tight: -0.025,     // -0.025em - 紧
    normal: 0,         // 0 - 正常
    wide: 0.025,       // 0.025em - 宽
    wider: 0.05,       // 0.05em - 更宽
    widest: 0.1,       // 0.1em - 最宽
  },
  
  // 行高（line-height）
  lineHeight: {
    none: 1,           // 1 - 无行高
    tight: 1.25,       // 1.25 - 紧凑
    snug: 1.375,       // 1.375 - 略紧
    normal: 1.5,       // 1.5 - 正常
    relaxed: 1.625,    // 1.625 - 宽松
    loose: 2,          // 2 - 很宽松
  },
  
  // 段落间距
  paragraphSpacing: {
    tight: spacing[2],     // 8px
    normal: spacing[4],    // 16px
    relaxed: spacing[6],   // 24px
  },
} as const;

/**
 * 圆角配置
 */
export const borderRadius = {
  none: 0,
  xs: 2,
  sm: 4,
  md: 6,
  lg: 8,
  xl: 12,
  '2xl': 16,
  '3xl': 24,
  full: 9999,
} as const;

/**
 * 边框宽度配置
 */
export const borderWidth = {
  0: 0,
  1: 1,
  2: 2,
  4: 4,
  8: 8,
} as const;

/**
 * 阴影配置
 */
export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  '2xl': {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 12,
  },
} as const;

/**
 * 字体大小配置
 */
export const fontSize = {
  xs: 10,
  sm: 12,
  base: 14,
  lg: 16,
  xl: 18,
  '2xl': 20,
  '3xl': 24,
  '4xl': 28,
  '5xl': 32,
  '6xl': 36,
  '7xl': 48,
  '8xl': 64,
  '9xl': 80,
} as const;

/**
 * 字体粗细配置
 */
export const fontWeight = {
  thin: '100',
  extralight: '200',
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
} as const;

/**
 * 获取间距值
 * @param key 间距键
 * @returns 对应的像素值
 */
export const getSpacing = (key: keyof typeof spacing): number => {
  return spacing[key];
};

/**
 * 获取语义化间距值
 * @param key 语义化间距键
 * @returns 对应的像素值
 */
export const getSemanticSpacing = (key: keyof typeof semanticSpacing): number => {
  return semanticSpacing[key];
};
