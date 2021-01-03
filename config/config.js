// ref: https://umijs.org/config/
import path from 'path'

export default {
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: false,
        locale: {
          enable: true, // default false
          default: 'zh-CN', // default zh-CN
          baseNavigator: false, // qn is en-us so false. default true, when it is true, will use `navigator.language` overwrite default
        },
        dynamicImport: false,
      },
    ],
  ],
  publicPath: './',
  /**
   * webpack 相关配置
   */
  define: {
    APP_TYPE: process.env.APP_TYPE || '',
    IS_MOCK: process.env.MOCK !== 'none',
  },
  // Theme for antd
  // https://ant.design/docs/react/customize-theme-cn
  theme: {},
  alias: {
    '@': path.join(__dirname, '../src'),
  },
  externals: {},
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  hash: true,
}
