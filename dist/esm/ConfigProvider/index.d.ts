import React from 'react';
interface Config {
  prefix?: string;
}
export declare const ConfigContext: React.Context<Config>;
interface ConfigProviderProps extends Config {
  children: React.ReactNode;
}
declare function ConfigProvider({
  children,
  ...config
}: ConfigProviderProps): import('react/jsx-runtime').JSX.Element;
export default ConfigProvider;
