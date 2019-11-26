<template>
  <v-card width="750" class="pa-4">
    <div class="title pa-2">
      <h2 class="title">Not Dönüşümü</h2>
    </div>
    <div class="pa-2">
      <v-autocomplete
        v-model="selected_uni"
        item-text="okulAdi"
        label="Üniversite Seçin"
        :filter="(item, queryText, itemText) => {
          return itemText.toLocaleUpperCase().indexOf(queryText.toLocaleUpperCase()) > -1
        }"
        :items="dataset"
        outlined
      />
    </div>
    <div class="pa-2">
      <v-select
        v-model="selected_letter"
        outlined
        :items="harfList"
        item-text="harf"
        label="Harf Notu Seçin"
      />
    </div>
    <div class="pa-2" v-if="selected_letter!==null">
      <p>Katsayı karşılığı:</p>
      <p>{{ selected_letter }}</p>
      <p>ÜÜ'de Harf Notu:</p>
      <p>{{ result.harf }}</p>
    </div>
  </v-card>
</template>
<script>
export default {
  data () {
    return {
      dataset: [],
      selected_uni: null,
      selected_letter: null,
      harfList: [],
      uu: [
        { harf: 'AA', value: 4 },
        { harf: 'BA', value: 3.5 },
        { harf: 'BB', value: 3 },
        { harf: 'CB', value: 2.5 },
        { harf: 'CC', value: 2 },
        { harf: 'DC', value: 1.5 },
        { harf: 'DD', value: 1 },
        { harf: 'FD', value: 0.5 },
        { harf: 'FF', value: 0 }
      ],
      result: { harf: 'Hesaplanmadı', value: 0 }
    }
  },
  watch: {
    selected_uni () {
      const item = this.dataset.find((el) => {
        return this.selected_uni === el.okulAdi
      })
      this.harfList = JSON.parse(item.harfAraliklari)
    },
    selected_letter () {
      console.log(this.selected_letter)
      this.result = this.calculateEquivalent(this.selected_letter, this.uu)
    }
  },
  async created () {
    await this.$axios.post('/university').then((res) => {
      this.dataset = res.data
    })
  },
  methods: {
    calculateEquivalent: (coefficient, defaultTable) => {
      const converted = parseFloat(coefficient)
      let res = {}
      defaultTable.forEach((el, index) => {
        if (
          converted === el.value ||
            (converted < defaultTable[index].value &&
              converted > defaultTable[index + 1].value)
        ) {
          res = el
        }
      })
      return res
    }
  }
}
</script>
<style>

</style>
