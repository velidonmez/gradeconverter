<!--<template>-->
<!--  <v-app dark>-->
<!--    <h1 v-if="error.statusCode === 404">-->
<!--      {{ pageNotFound }}-->
<!--    </h1>-->
<!--    <h1 v-else>-->
<!--      {{ otherError }}-->
<!--    </h1>-->
<!--    <NuxtLink to="/">-->
<!--      Ana Sayfaya Dön-->
<!--    </NuxtLink>-->
<!--  </v-app>-->
<!--</template>-->

<template>
  <v-container fluid>
    <v-row>
      <title-bar title="Sayfa Bulunamadı" />
    </v-row>
    <v-row justify="center">
      <v-card width="750" class="pa-4">
        <div class="row pa-2">
          <div class="col-12 text-centered">
            <h1 v-if="error.statusCode === 404">
              {{ pageNotFound }}
            </h1>
            <h1 v-else>
              {{ otherError }}
            </h1>
            <v-btn
              color="primary"
              class="mr-4 mt-4"
              @click="redirect"
            >
              Ana Sayfaya Dön
            </v-btn>
          </div>
        </div>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import TitleBar from '../components/base/TitleBar'

export default {
  layout: 'empty',
  components: {
    TitleBar
  },
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head () {
    const title =
        this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  },
  data () {
    return {
      pageNotFound: '404 Sayfa Bulunamadı',
      otherError: 'Bir Hata Oluştu.'
    }
  },
  methods: {
    redirect () {
      this.$router.push('/')
    }
  }
}
</script>
