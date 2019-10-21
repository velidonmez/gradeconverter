<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex>
      <v-tabs>
        <v-tabs-slider />
        <v-tab
          v-model="tab"
          background-color="deep-purple accent-4"
          class="elevation-2"
          dark
        >
          Üsküdar Üniversitesi Not Sistemi
        </v-tab>
        <v-tab
          v-model="tab"
          background-color="deep-purple accent-4"
          class="elevation-2"
          dark
        >
          Taslak Ekle veya Düzenle
        </v-tab>
        <v-tab-item>
          <add-university :dataset="editUU" />
        </v-tab-item>
        <v-tab-item>
          <list-universities :dataset="editDrafts" :options="{title:'Taslaklar',tableHeaders:headers,type:'template'}" />
        </v-tab-item>
      </v-tabs>
    </v-flex>
  </v-layout>
</template>

<script>
import addUniversity from '../components/addUniversity'
import listUniversities from '../components/listUniversities'
export default {
  components: {
    addUniversity,
    listUniversities
  },
  data () {
    return {
      editUU: [],
      editDrafts: [],
      dateTime: '',
      grades: [],
      headers: [
        { text: 'Id', value: 'id' },
        {
          text: 'Taslak Adı',
          align: 'left',
          value: 'name'
        },
        { text: 'Güncellenme Tarihi', value: 'date_time' },
        { text: '', value: 'data-table-expand' },
        { text: 'İşlemler', value: 'action', sortable: false }
      ],
      tab: null,
      editedItem: {
        harf_araliklari: [],
        date_time: {},
        id: 0,
        okul_adi: ''
      }
    }
  },
  async asyncData ({ $axios }) {
    const uuGrades = await $axios.post('/uuGradeSystem')
    const gradeTemplates = await $axios.post('/gradeTemplates')
    console.log({ 'template': gradeTemplates.data.response })
    return {
      editUU: uuGrades.data.response,
      editDrafts: gradeTemplates.data.response
    }
  },
  methods: {
    async update () {
      await this.$axios.post('/uuGradeSystem').then((res) => {
        this.dataset = res.data.response
        this.editedItem = this.dataset[0]
        this.editedItem.harf_araliklari = JSON.parse(this.dataset[0].harf_araliklari)
      })
    },
    async save () {
      this.editedItem.date_time = new Date().toISOString()
      this.editedItem.harf_araliklari = JSON.stringify(this.editedItem.harf_araliklari)
      await this.$axios.post('/updateUUGradeSystem', {
        dataset: this.editedItem
      })
      await this.update()
    }
  }
}
</script>
