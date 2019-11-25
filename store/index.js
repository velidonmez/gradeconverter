export const state = () => ({
  templates: [],
  universityTypes: []
})

export const getters = {
  getTemplates: state => state.templates,
  getUniversityTypes: state => state.universityTypes
}

export const mutations = {
  setTemplates (state, data) { state.templates = data },
  setUniversityTypes (state, data) { state.universityTypes = data }
}

export const actions = {
  async nuxtServerInit (vuexContext, context) {
    await context.$axios.post('/gradeTemplates').then((templates) => {
      if (templates.status === 200) {
        vuexContext.commit('setTemplates', templates.data)
      }
    })
    await context.$axios.post('/universityTypes').then((universityTypes) => {
      if (universityTypes.status === 200) {
        vuexContext.commit('setUniversityTypes', universityTypes.data)
      }
    })
  },
  async refreshTemplates (context) {
    const response = await this.$axios.post('/gradeTemplates').then((dataset) => {
      context.commit('setTemplates', dataset.data)
    })
    return response
  }
}
