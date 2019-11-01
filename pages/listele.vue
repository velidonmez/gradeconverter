<template pageTitle="Tüm Üniversiteler">
  <v-container fluid>
    <v-row>
      <title-bar title="Tüm Üniversiteler" />
    </v-row>
    <v-row justify="center">
      <list-universities :dataset="dataset" :options="{title:'Üniversiteler',tableHeaders:headers,type:'uniList'}" />
    </v-row>
  </v-container>
</template>

<script>
import TitleBar from '../components/base/TitleBar'
import listUniversities from '../components/ListUniversities'
export default {
  components: {
    listUniversities,
    TitleBar
  },
  data () {
    return {
      dataset: [],
      headers: [
        {
          text: 'Okul Adı',
          align: 'left',
          value: 'okul_adi'
        },
        { text: 'Güncellenme Tarihi', value: 'date_time' },
        { text: 'İşlemler', value: 'action', sortable: false },
        { text: 'Detay', value: 'data-table-expand' }
      ]
    }
  },
  async created () {
    await this.$axios.post('/university').then((res) => {
      this.dataset = res.data.response
    })
  }
}
</script>
