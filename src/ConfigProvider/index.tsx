import React, {createContext} from "react";

interface Config {
  prefix?: string;
}

const defaultConfig:Config = {
  prefix: 'IceCream-UI',
}
export const ConfigContext = createContext(defaultConfig)

function ConfigProvider({ children }: Config) {
  return (
    <div>
      ConfigProvider
    </div>
  )
}
export default ConfigProvider
