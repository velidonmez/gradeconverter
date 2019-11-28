<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      width="300"
      permanent
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item class="mb-6">
          <img src="../assets/images/logo.png" alt="Üsküdar Üniversitesi Logo" class="logo">
        </v-list-item>
        <div v-if="$auth.loggedIn">
          <v-list-item
            v-for="(item, i) in adminItems"
            :key="i"
            color="teal lighten-1"
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
        </div>
        <div v-else>
          <v-list-item
            v-for="(item, i) in userItems"
            :key="i"
            color="teal lighten-1"
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
        </div>
      </v-list>
    </v-navigation-drawer>
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
      adminItems: [
        {
          icon: 'mdi-home',
          title: 'Not Dönüşümü',
          to: '/'
        },
        {
          icon: 'mdi-plus-box',
          title: 'Yeni Üniversite',
          to: '/yeni'
        },
        {
          icon: 'mdi-format-list-numbered',
          title: 'Tüm Üniversiteler',
          to: '/listele'
        },
        {
          icon: 'mdi-settings',
          title: 'Genel Ayarlar',
          to: '/ayarlar'
        },
        {
          icon: 'mdi-logout',
          title: 'Çıkış Yap',
          to: '/logout'
        }
      ],
      userItems: [
        {
          icon: 'mdi-home',
          title: 'Not Dönüşümü',
          to: '/'
        },
        {
          icon: 'mdi-login',
          title: 'Yönetici Girişi',
          to: '/login'
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
<style scoped>
  .logo {
    width: 200px;
    margin: 25px auto 0;
  }
</style>
