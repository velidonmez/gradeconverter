export const state = () => ({
  clubs: [],
  list: [],
  settings: []
})

export const getters = {
  getClubs: state => state.clubs,
  getList: state => state.list,
  getSettings: state => state.settings
}

export const mutations = {
  setClubs: function (state, data) { state.clubs = data },
  setList: function (state, data) { state.list = data },
  setSettings: function (state, data) { state.settings = data },
  setSetting: function (state, io) { state.settings[io.input] = io.output }
}

export const actions = {
  async nuxtServerInit(vuexContext, context) {
    let _userToken
    let _activeClub
    if (context.req) {
      if (context.req.headers.cookie) {
        const cookie = context.req.headers.cookie
        if (cookie) {
          _userToken = cookie.split(';').find(c => c.trim().startsWith('token='))
          if (_userToken) {
            _userToken = _userToken.split('=')[1]
            await vuexContext.dispatch('auth/userFromToken', { token: _userToken }) // store update
          }
          _activeClub = cookie.split(';').find(c => c.trim().startsWith('activeClub='))
          if (_activeClub) {
            _activeClub = _activeClub.split('=')[1]
            await vuexContext.commit('auth/setActiveClubOrder', parseInt(_activeClub)) // set active club order update with Cookie
          }
        }
      }
    }
    await context.$axios.post('/clubs').then((clubs) => {
      if (clubs.data.status) {
        vuexContext.commit('setClubs', clubs.data.response)
      }
    })
    await context.$axios.post('/settings').then((settings) => {
      const settingObj = {}
      settings.data.response.forEach((data) => {
        settingObj[data.input] = data.output
      })
      vuexContext.commit('setSettings', settingObj)
    })
    await vuexContext.dispatch('allLists')
  },

  async token(context) {
    let token = await this.$axios.post('/uskudar/token', {
      email: 'sksadmin@uskudar.edu.tr',
      password: 'DRunn24'
    }).then((res) => { return res }).catch((error) => { return error })
    if (({}).hasOwnProperty.call(token.data, 'results')) {
      token = token.data.results.access_token
      context.commit('setToken', token)
      await this.$axios.post('/update', {
        table: 'settings',
        where: 'input = "token"',
        insertTable: true,
        data: { output: token }
      })
      return true
    }
    return false
  },

  async refreshClubs(context) {
    const response = await this.$axios.post('/clubs').then((dataset) => {
      context.commit('setClubs', dataset.data.response)
    })
    return response
  },

  async allLists(context) {
    const list = {
      type: [],
      notification: [],
      participant_extra: [],
      refreshment: [],
      technical_support: [],
      permission: []
    }
    await this.$axios.post('/list_type').then((types) => {
      list.type = types.data.response.data
    })
    await this.$axios.post('/list_notification').then((notifications) => {
      list.notification = notifications.data.response.data
    })
    await this.$axios.post('/list_participant_extra').then((participantExtras) => {
      list.participant_extra = participantExtras.data.response.data
    })
    await this.$axios.post('/list_refreshment').then((refreshments) => {
      list.refreshment = refreshments.data.response.data
    })
    await this.$axios.post('/list_technical_support').then((technicalSupports) => {
      list.technical_support = technicalSupports.data.response.data
    })
    await this.$axios.post('/list_permission').then((permissions) => {
      list.permission = permissions.data.response.data
    })
    context.commit('setList', list)
  },
  getListNotification(context) {
    return context.getters.getList.notification
  },
  getListParticipantExtra(context) {
    return context.getters.getList.participant_extra
  },
  getListPermission(context) {
    return context.getters.getList.permission
  },
  getListRefreshment(context) {
    return context.getters.getList.refreshment
  },
  getListTechnicalSupport(context) {
    return context.getters.getList.technical_support
  },
  getListType(context) {
    return context.getters.getList.getListType
  },

  async updateSettings(context, { input, output }) {
    const response = await this.$axios.post('/updateSettings', {
      key: input,
      dataset: { output: output }
    }).then((updateDataset) => {
      if (updateDataset.data.status) {
        context.commit('setSetting', {
          input: input,
          output: output
        })
        return { status: true, response: updateDataset }
      } else {
        return { status: false, response: null }
      }
    })
    return response
  }
}
