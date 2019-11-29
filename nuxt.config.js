import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    htmlAttrs: {
      lang: 'tr'
    },
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '/main.css' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#f1c40f', height: '6px' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/helpers'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    [
      'vue-sweetalert2/nuxt',
      {
        confirmButtonColor: '#4caf50',
        cancelButtonColor: '#ff5252',
        cancelButtonText: 'İptal',
        confirmButtonText: 'Onayla'
      }
    ]
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    [
      'vue-sweetalert2/nuxt',
      {
        confirmButtonColor: '#4caf50',
        cancelButtonColor: '#ff5252',
        cancelButtonText: 'İptal',
        confirmButtonText: 'Onayla'
      }
    ]
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    // baseURL: 'http://localhost:3000/api/'
    baseURL: 'https://harfnotu.uskudaruniversitesi.edu.tr/api/'
  },
  /*
** Server Middleware
 */
  serverMiddleware: [
    '~/api'
  ],
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    theme: {
      themes: {
        light: {
          primary: colors.teal.lighten1,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  auth: {
    strategies: {
      local: false,
      auth0: {
        domain: 'dev-5lyfu6du.auth0.com',
        client_id: 'J8n7FeOIckiVTuYxSSSyCiqQoHD6q3R1',
        audience: 'https://dev-5lyfu6du.auth0.com/api/v2/'
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
