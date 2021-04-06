const Model = {
  namespace: 'formAndstepForm',
  state: {
    current: 'info',
    step: {},
    mid: {
      id: 0,
    },
  },
  effects: {
    *submitStepForm({ payload }, { put }) {
      yield put({
        type: 'saveStepFormData',
        payload,
      });
      yield put({
        type: 'saveCurrentStep',
        payload: 'result',
      });
    },
  },
  reducers: {
    saveCurrentStep(state, { payload }) {
      return { ...state, current: payload };
    },

    saveStepFormData(state, { payload }) {
      return { ...state, step: { ...state.step, ...payload } };
    },

    saveMid(state, { payload }) {
      return { ...state, mid: { ...state.mid, ...payload } };
    },
  },
};
export default Model;
