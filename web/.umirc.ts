import { defineConfig } from 'umi';

const BASE_URL = process.env.NODE_ENV === 'production' ? 'https://demo.msmao.com/' : `http://localhost:8000`;
const PUBLIC_PATH = process.env.NODE_ENV === 'production' ? 'https://demo.msmao.com/public/' : `http://localhost:8000/`;

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/users/index' },
    { path: '/users', component: '@/pages/users/index' },
    { path: '/friends', component: '@/pages/friends/index' },
  ],
  define: {
    BASE_URL,
  },
  hash: true,
  history: { type: 'hash' },
  publicPath: PUBLIC_PATH,
  outputPath: '../app/public',
  manifest: {
    fileName: '../../config/manifest.json',
    publicPath: '', // 为 ''，不然会有两个 /
  },

  // routes: [
  //   { path: '/login', component: 'login' },
  //   {
  //     path: '/',
  //     component: '@/layouts/index',
  //     wrappers: [
  //       '@/wrappers/auth',
  //     ],
  //     routes: [
  //       { path: '/', component: 'home', },
  //       { path: '/admin', component: '@/pages/admin/index' },
  //       { path: '/register', component: '@/pages/register/index' },
  //     ],
  //   },
  // ],

  fastRefresh: {},
  // mfsu: {},
  proxy: {
    '/api/': {
      target: 'http://localhost:7001',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api'
      },
    },
  }
});
