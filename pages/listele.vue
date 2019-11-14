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
        { text: 'Güncellenme Tarihi', value: 'updatedAt' },
        { text: 'İşlemler', value: 'action', sortable: false },
        { text: 'Detay', value: 'data-table-expand' }
      ]
    }
  },
  async asyncData ({ $axios }) {
    const list = []
    await $axios.post('/university').then((res) => {
      const data = res.data
      data.forEach((el) => {
        const obj = JSON.parse(el.harfAraliklari)
        list.push({
          updatedAt: el.updatedAt,
          harfAraliklari: el.harfAraliklari,
          id: el.id,
          url: el.url,
          name: el.okulAdi,
          harfAraliklariParsed: obj
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
