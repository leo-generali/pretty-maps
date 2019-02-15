const mutations = {
  updateUnit(state, payload) {
    state.isMetric = payload;

    return state;
  },

  updateDistance(state, payload) {
    state.distance = payload;

    return state;
  },

  updateTime(state, payload) {
    state.seconds = payload;

    return state;
  },

  updatePace(state, payload) {
    state.meterPerSecond = payload;

    return state;
  },

  updateIsShowingOnMap(state, payload) {
    state.isShowingOnMap[payload.name] = payload.checked;

    return state;
  },

  updateActivityName(state, payload) {
    state.activityName = payload;

    return state;
  }
};

export default mutations;
