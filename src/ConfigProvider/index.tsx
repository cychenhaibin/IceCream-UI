import React, { createContext, PropsWithChildren } from 'react';

interface Config {
  prefix?: string;
}

const defaultConfig: Config = {
  prefix: 'IceCream-UI',
};

export const ConfigContext = createContext(defaultConfig);

interface ConfigProviderProps extends Config {
  children: React.ReactNode;
}

function ConfigProvider({ children, ...config }: ConfigProviderProps) {
  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>;
}

export default ConfigProvider;
