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
          value: 'name'
        },
        { text: 'Güncellenme Tarihi', value: 'date_time' },
        { text: 'İşlemler', value: 'action', sortable: false },
        { text: 'Detay', value: 'data-table-expand' }
      ]
    }
  },
  async asyncData ({ $axios }) {
    const list = []
    await $axios.post('/university').then((res) => {
      res.data.response.forEach((el) => {
        const obj = JSON.parse(el.harf_araliklari)
        list.push({
          date_time: el.date_time,
          harf_araliklari: el.harf_araliklari,
          id: el.id,
          url: el.url,
          name: el.okul_adi,
          harf_araliklari_parsed: obj
        })
      })
    }).catch((err) => {
      console.log(err)
    })
    return {
      dataset: list
    }
  }
}
</script>
