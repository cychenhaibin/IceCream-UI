import React, { createContext, PropsWithChildren, useState, useCallback } from 'react';

export type ThemeType = 'light' | 'dark';

interface ThemeConfig {
  primaryColor?: string;
  backgroundColor?: string;
  textColor?: string;
}

interface Config {
  prefix?: string;
  theme?: ThemeType;
  themeConfig?: ThemeConfig;
}

const defaultThemeConfig: Record<ThemeType, ThemeConfig> = {
  light: {
    primaryColor: '#1890ff',
    backgroundColor: '#ffffff',
    textColor: '#000000',
  },
  dark: {
    primaryColor: '#177ddc',
    backgroundColor: '#141414',
    textColor: '#ffffff',
  },
};

const defaultConfig: Config = {
  prefix: 'IceCream-UI',
  theme: 'light',
  themeConfig: defaultThemeConfig.light,
};

export const ConfigContext = createContext<{
  config: Config;
  setTheme: (theme: ThemeType) => void;
  setThemeConfig: (config: ThemeConfig) => void;
}>({
  config: defaultConfig,
  setTheme: () => {},
  setThemeConfig: () => {},
});

interface ConfigProviderProps extends Omit<Config, 'themeConfig'> {
  children: React.ReactNode;
  initialTheme?: ThemeType;
}

function ConfigProvider({ children, initialTheme = 'light', ...config }: ConfigProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>(initialTheme);
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>(defaultThemeConfig[initialTheme]);

  const handleSetTheme = useCallback((theme: ThemeType) => {
    setCurrentTheme(theme);
    setThemeConfig(defaultThemeConfig[theme]);
  }, []);

  const handleSetThemeConfig = useCallback((newConfig: ThemeConfig) => {
    setThemeConfig(newConfig);
  }, []);

  const value = {
    config: {
      ...config,
      theme: currentTheme,
      themeConfig,
    },
    setTheme: handleSetTheme,
    setThemeConfig: handleSetThemeConfig,
  };

  return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>;
}

export default ConfigProvider;
