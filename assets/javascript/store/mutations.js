const mutations = {
  updateUnit(state, payload) {
    state.isMetric = payload;

    return state;
  }
};

export default mutations;
