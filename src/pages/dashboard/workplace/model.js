import { queryCurrent } from './service';

const Model = {
  namespace: 'dashboardAndworkplace',
  state: {
    currentUser: undefined,
  },
  effects: {
    *init(_, { put }) {
      yield put({
        type: 'fetchUserCurrent',
      });
    },

    *fetchUserCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'save',
        payload: {
          currentUser: response.data,
        },
      });
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },

    clear() {
      return {
        currentUser: undefined,
      };
    },
  },
};
export default Model;
