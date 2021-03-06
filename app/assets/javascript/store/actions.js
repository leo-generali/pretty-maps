const actions = {
  updateUnit(context, payload) {
    const isMetric = payload === 'Kilometers';
    context.commit('updateUnit', isMetric);
  },

  updateDistance(context, payload) {
    context.commit('updateDistance', payload);
  },

  updateTime(context, payload) {
    context.commit('updateTime', payload);
  },

  updatePace(context, payload) {
    context.commit('updatePace', payload);
  },

  updateIsShowingOnMap(context, payload) {
    context.commit('updateIsShowingOnMap', payload);
  },

  updateActivityName(context, payload) {
    context.commit('updateActivityName', payload);
  }
};

export default actions;
