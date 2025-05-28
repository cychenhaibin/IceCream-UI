import { useContext } from 'react';
import { ConfigContext, ThemeType } from './index';

export function useTheme() {
  const { config, setTheme, setThemeConfig } = useContext(ConfigContext);

  return {
    theme: config.theme,
    themeConfig: config.themeConfig,
    setTheme,
    setThemeConfig,
  };
}
