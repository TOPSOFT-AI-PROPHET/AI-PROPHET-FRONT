import { stringify } from 'querystring';
import { history, formatMessage } from 'umi';
import { AccountLogin } from '@/services/login';
import { setAuthority, setRefreshCode, setAccessCode, setAccessTime } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(AccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      }); // Login successfully

      if (response.access) {
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        message.success(
          formatMessage({
            id: 'pages.login.successMessage',
          }),
        );
        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/dash';
            return;
          }
        }

        history.replace(redirect || '/dash');
      }
    },

    logout() {
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note

      localStorage.clear();
      if (window.location.hash.indexOf('/user/login') === -1 && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      if (payload.access) {
        setAuthority('user');
        setRefreshCode(payload.refresh);
        setAccessCode(payload.access);
        setAccessTime(Date.now());
      }
      return { ...state };
    },
  },
};
export default Model;
