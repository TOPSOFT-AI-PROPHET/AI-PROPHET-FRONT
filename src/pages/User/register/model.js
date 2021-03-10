import { fakeRegister } from './service';

const Model = {
  namespace: 'userAndregister',
  state: {
    code: undefined,
  },
  effects: {
    *submit({ payload }, { call, put }) {
      const response = yield call(fakeRegister, payload);
      yield put({
        type: 'registerHandle',
        payload: response,
      });
    },
  },
  reducers: {
    registerHandle(state, { payload }) {
      return { ...state, code: payload.code };
    },
  },
};
export default Model;
