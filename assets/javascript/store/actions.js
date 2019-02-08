const actions = {
  updateUnit(context, payload) {
    const isMetric = payload === 'Kilometers';
    context.commit('updateUnit', isMetric);
  },

  updateTime(context, payload) {
    context.commit('updateTime', payload);
  }
};

export default actions;
