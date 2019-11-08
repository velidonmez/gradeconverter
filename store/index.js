export const state = () => ({
  templates: []
})

export const getters = {
  getTemplates: state => state.templates
}

export const mutations = {
  setTemplates (state, data) { state.templates = data }
}

export const actions = {
  async nuxtServerInit (vuexContext, context) {
    await context.$axios.post('/gradeTemplates').then((templates) => {
      if (templates.data.status) {
        vuexContext.commit('setTemplates', templates.data.response)
      }
    })
  },
  async refreshTemplates (context) {
    const response = await this.$axios.post('/gradeTemplates').then((dataset) => {
      context.commit('setTemplates', dataset.data.response)
    })
    return response
  }
}
