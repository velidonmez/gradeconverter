<template>
  <v-container fluid>
    <v-row>
      <title-bar title="Ayarlar" />
    </v-row>
    <v-row justify="center">
      <v-card width="750">
        <v-tabs
          background-color="white accent-4"
          grow
        >
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
            <add-university :dataset="editUU" :options="{title:'Harf Notlarını Düzenle',type:'settings'}" />
          </v-tab-item>
          <v-tab-item>
            <list-universities :dataset="editDrafts" :options="{title:'Taslaklar',tableHeaders:headers,type:'template'}" />
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import addUniversity from '../components/AddUniversity'
import listUniversities from '../components/ListUniversities'
import TitleBar from '../components/base/TitleBar'
export default {
  components: {
    addUniversity,
    listUniversities,
    TitleBar
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
        { text: 'Güncellenme Tarihi', value: 'dateTime' },
        { text: '', value: 'data-table-expand' },
        { text: 'İşlemler', value: 'action', sortable: false }
      ],
      tab: null
    }
  },
  async asyncData ({ $axios }) {
    const uuGrades = await $axios.post('/uuGradeSystem')
    const gradeTemplates = []
    await $axios.post('/gradeTemplates').then((res) => {
      res.data.forEach((el) => {
        const obj = JSON.parse(el.harfAraliklari)
        gradeTemplates.push({
          dateTime: el.updatedAt,
          harfAraliklari: el.harfAraliklari,
          id: el.id,
          name: el.name,
          harfAraliklariParsed: obj
        })
      })
    }).catch((err) => {
      console.log(err)
    })
    return {
      editUU: uuGrades.data,
      editDrafts: gradeTemplates
    }
  }
}
</script>
