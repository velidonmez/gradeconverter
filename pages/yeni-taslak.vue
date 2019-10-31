<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <title-bar title="Taslak Ekle" />
    <v-flex
      xs12
      sm8
      md6
    >
      <add-university :dataset="dataset" :options="{title:'Yeni Taslak Ekle',label:'Taslak Adı', type:'addTemplate'}" />
    </v-flex>
  </v-layout>
</template>

<script>
import TitleBar from '../components/base/TitleBar'
import addUniversity from '../components/AddUniversity'
export default {
  components: {
    addUniversity,
    TitleBar
  },
  data () {
    return {
      dataset: []
    }
  },
  async created () {
    await this.$axios.post('/university').then((res) => {
      this.dataset = res.data.response
    })
  }
}
</script>
