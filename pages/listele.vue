<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex>
      <list-universities :dataset="dataset" :headers="headers" />
    </v-flex>
  </v-layout>
</template>

<script>
import listUniversities from '../components/listUniversities'
export default {
  components: {
    listUniversities
  },
  data () {
    return {
      dataset: [],
      headers: [
        { text: 'Id', value: 'id' },
        {
          text: 'Okul Adı',
          align: 'left',
          value: 'okul_adi'
        },
        { text: 'Güncellenme Tarihi', value: 'date_time' },
        { text: '', value: 'data-table-expand' },
        { text: 'İşlemler', value: 'action', sortable: false }
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
