/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      // 颜色配置
      colors: {
        // 品牌色
        primary: {
          DEFAULT: '#1A7AE8',
          light: '#3B82F6',
          dark: '#1890FF',
          hover: '#60A5FA',
        },
        // 背景色
        bg: {
          DEFAULT: '#F4F4F6',
          secondary: '#F9FAFB',
          tertiary: '#FFFFFF',
          card: '#FFFFFF',
          overlay: 'rgba(0, 0, 0, 0.5)',
        },
        // 文本色
        text: {
          DEFAULT: '#0F263C',
          secondary: '#3F5163',
          tertiary: '#9EA5AF',
          placeholder: '#CACDD3',
          disabled: '#CACDD3',
          inverse: '#FFFFFF',
        },
        // 边框色
        border: {
          DEFAULT: '#E0E0E0',
          light: '#E5E7EB',
          dark: '#D5DBDB',
          focus: '#1A7AE8',
        },
        // 状态色
        success: {
          DEFAULT: '#4ECDC4',
          light: '#E8FDF4',
        },
        warning: {
          DEFAULT: '#FFD93D',
          light: '#FFF5E1',
        },
        error: {
          DEFAULT: '#FF6B6B',
          light: '#FDE8F4',
        },
        info: {
          DEFAULT: '#1A7AE8',
          light: '#E8F4FD',
        },
        // 图标色
        icon: {
          DEFAULT: '#666666',
          secondary: '#999999',
          disabled: '#CCCCCC',
        },
      },
      // 间距配置
      spacing: {
        0: '0px',
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        7: '28px',
        8: '32px',
        9: '36px',
        10: '40px',
        11: '44px',
        12: '48px',
        14: '56px',
        16: '64px',
        20: '80px',
        24: '96px',
        28: '112px',
        32: '128px',
        36: '144px',
        40: '160px',
        44: '176px',
        48: '192px',
        52: '208px',
        56: '224px',
        60: '240px',
        64: '256px',
        72: '288px',
        80: '320px',
        96: '384px',
      },
      // 字体大小
      fontSize: {
        xs: '10px',
        sm: '12px',
        base: '14px',
        lg: '16px',
        xl: '18px',
        '2xl': '20px',
        '3xl': '24px',
        '4xl': '28px',
        '5xl': '32px',
        '6xl': '36px',
        '7xl': '48px',
        '8xl': '64px',
        '9xl': '80px',
      },
      // 字体粗细
      fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
      },
      // 行高
      lineHeight: {
        none: '1',
        tight: '1.25',
        snug: '1.375',
        normal: '1.5',
        relaxed: '1.625',
        loose: '2',
      },
      // 字间距
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
      },
      // 圆角
      borderRadius: {
        none: '0',
        xs: '2px',
        sm: '4px',
        md: '6px',
        lg: '8px',
        xl: '12px',
        '2xl': '16px',
        '3xl': '24px',
        full: '9999px',
      },
      // 边框宽度
      borderWidth: {
        0: '0',
        1: '1px',
        2: '2px',
        4: '4px',
        8: '8px',
      },
      // 注意: React Native 中的阴影需要使用 shadowColor、shadowOffset、shadowOpacity、shadowRadius 和 elevation
      // 不能直接使用 Web 的 boxShadow 语法，请在组件中使用 spacing.config.ts 中的 shadows 配置
    },
  },
  plugins: [],
};
