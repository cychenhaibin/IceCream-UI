import { defineConfig } from 'father';

export default defineConfig({
  // more father 4 config: https://github.com/umijs/father-next/blob/master/docs/config.md
  esm: {
    output: 'dist/esm',
    ignores: ['**/demos/**', '**/__tests__/**'],
  },
  cjs: {
    output: 'dist/cjs',
    ignores: ['**/demos/**', '**/__tests__/**'],
  },
  umd: {
    name: 'IceCreamUI',
    output: 'dist/umd',
  },
  extraBabelPlugins: [['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]],
  lessInBabelMode: true,
});
