const actions = {
  updateUnit(context, payload) {
    const isMetric = payload === 'Kilometers';
    context.commit('updateUnit', isMetric);
  }
};

export default actions;
