// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  mfsu: {},
  history: {
    type: 'hash',
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/',
      component: '../layouts/BlankLayout',
      routes: [
        {
          path: '/user',
          component: '../layouts/UserLayout',
          routes: [
            {
              path: '/user/login',
              name: 'Login',
              component: './User/login',
            },
            {
              path: '/user',
              redirect: '/user/login',
            },
            {
              name: 'register-result',
              icon: 'smile',
              path: '/user/register-result',
              component: './User/register-result',
            },
            {
              name: 'register',
              icon: 'smile',
              path: '/user/register',
              component: './User/register',
            },
            {
              name: 'resetpasswd',
              icon: 'smile',
              path: '/user/resetpasswd',
              component: './User/resetpasswd',
            },
            {
              component: '404',
            },
          ],
        },
        {
          path: '/',
          name: 'home',
          component: './Index/Welcome',
        },
        {
          path: '/products',
          name: 'products',
          component: './Index/Products',
        },
        {
          path: '/team',
          name: 'team',
          component: './Index/Team',
        },
        {
          path: '/dash',
          component: '../layouts/BasicLayout',
          Routes: ['src/pages/Authorized'],
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/dash',
              redirect: '/dash/dashboard/workplace',
            },
            {
              path: '/dash/dashboard',
              name: 'dashboard',
              icon: 'dashboard',
              routes: [
                {
                  path: '/dash/dashboard',
                  redirect: '/dash/dashboard/workplace',
                },
                {
                  name: 'workplace',
                  icon: 'smile',
                  path: '/dash/dashboard/workplace',
                  component: './dashboard/workplace',
                },
              ],
            },
            {
              path: '/dash/prediction',
              name: 'prediction',
              icon: 'dashboard',
              routes: [
                {
                  name: 'aimodels',
                  path: '/dash/prediction/aimodels',
                  component: './dashboard/aimodels',
                },
                {
                  name: 'modelinfo',
                  hideInMenu: true,
                  path: '/dash/prediction/modelinfo/:id',
                  component: './dashboard/selectedModelPage',
                },
                {
                  name: 'predictions',
                  icon: 'smile',
                  path: '/dash/prediction/predictions',
                  component: './dashboard/predictions',
                },
                {
                  name: 'newprediction',
                  hideInMenu: true,
                  path: '/dash/prediction/newprediction/:id/:notes',
                  component: './dashboard/newprediction',
                },
                {
                  name: 'details',
                  hideInMenu: true,
                  path: '/dash/prediction/details/:id',
                  component: './dashboard/predictiondetails',
                },
              ],
            },
            {
              path: '/dash/model',
              name: 'model',
              icon: 'dashboard',
              routes: [
                {
                  name: 'model',
                  path: '/dash/model/model',
                  component: './dashboard/modellist',
                },
                {
                  name: 'creator',
                  path: '/dash/model/creator',
                  component: './dashboard/modelCreator',
                },
                {
                  name: 'editor',
                  hideInMenu: true,
                  path: '/dash/model/editor/:id',
                  component: './dashboard/editor',
                },
              ],
            },
            {
              name: 'account',
              icon: 'user',
              path: '/dash/account',
              routes: [
                {
                  name: 'settings',
                  icon: 'smile',
                  path: '/dash/account/settings',
                  component: './account/settings',
                },
                {
                  name: 'topup',
                  icon: 'smile',
                  path: '/dash/account/topup',
                  component: './account/topup',
                },
                {
                  name: 'myBill',
                  icon: 'smile',
                  path: '/dash/account/myBill',
                  component: './account/myBill',
                },
              ],
            },
            {
              component: '404',
            },
          ],
        },
        {
          component: '404',
        },
      ],
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  title: false,
  ignoreMomentLocale: true,
  manifest: {
    basePath: '/',
  },
});
