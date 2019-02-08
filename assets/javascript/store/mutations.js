const mutations = {
  updateUnit(state, payload) {
    state.isMetric = payload;

    return state;
  },

  updateTime(state, payload) {
    state.seconds = payload;

    return state;
  }
};

export default mutations;
