<template>
  <v-container fluid>
    <v-row>
      <title-bar title="Giriş Yap" />
    </v-row>
    <v-row justify="center">
      <v-card width="750" class="pa-4">
        <div class="row pa-2">
          Çıkış Yapılıyor Lütfen Bekleyiniz...
        </div>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import TitleBar from '../components/base/TitleBar'

export default {
  components: {
    TitleBar
  },
  head () {
    return {
      title: 'Üsküdar Üniversitesi - Çıkış'
    }
  },
  async created () {
    await this.$auth.logout()
  }
}
</script>
