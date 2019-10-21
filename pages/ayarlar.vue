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
        <!--        <v-tab-->
        <!--          v-model="tab"-->
        <!--          background-color="deep-purple accent-4"-->
        <!--          class="elevation-2"-->
        <!--          dark-->
        <!--        >-->
        <!--          Taslak Ekle veya Düzenle-->
        <!--        </v-tab>-->
        <v-tab-item>
          <add-university :dataset="dataset" />
        </v-tab-item>
        <!--        <v-tab-item>-->
        <!--          <list-universities :dataset="dataset" />-->
        <!--        </v-tab-item>-->
      </v-tabs>
    </v-flex>
  </v-layout>
</template>

<script>
import addUniversity from '../components/addUniversity'
// import listUniversities from '../components/listUniversities'
export default {
  components: {
    addUniversity
    // listUniversities
  },
  data () {
    return {
      dataset: [],
      dateTime: '',
      grades: [],
      tab: null,
      editedItem: {
        harf_araliklari: [],
        date_time: {},
        id: 0,
        okul_adi: ''
      }
    }
  },
  async created () {
    await this.update()
    console.log(this.dataset)
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
