<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      permanent
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      elevation="0"
      height="75px"
      class="appBar"
      color="primary"
    >
      <v-toolbar-title>
        Yeni Üniversite Ekle
      </v-toolbar-title>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <!--    <v-footer-->
    <!--      :fixed="fixed"-->
    <!--      app-->
    <!--    >-->
    <!--      <span>&copy; 2019</span>-->
    <!--    </v-footer>-->
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'Giriş',
          to: '/'
        },
        {
          icon: 'mdi-plus-box',
          title: 'Yeni',
          to: '/yeni'
        },
        {
          icon: 'mdi-clipboard-list',
          title: 'Listele',
          to: '/listele'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>
