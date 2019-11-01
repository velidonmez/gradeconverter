<template>
  <v-container fluid>
    <v-row>
      <title-bar title="Yeni Üniversite Ekle" />
    </v-row>
    <v-row justify="center">
      <add-university :dataset="dataset" :options="{title:'Yeni Üniversite Ekle',label:'Üniversite Adı',type:'addNewUni'}" />
    </v-row>
  </v-container>
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
