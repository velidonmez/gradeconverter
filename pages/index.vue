<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <v-select
        v-model="selected_uni"
        :items="dataset"
        item-text="okul_adi"
        label="Üniversite Seçin"
      />
      <v-select
        v-model="selected_letter"
        :items="harfList"
        item-text="harf"
        label="Harf Notu Seçin"
      />
      <div v-if="selected_letter!==null">
        <p>Katsayı karşılığı:</p>
        <p>{{ selected_letter }}</p>
        <p>ÜÜ'de Harf Notu:</p>
        <p>{{ result.harf }}</p>
      </div>
    </v-flex>
  </v-layout>
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
        return this.selected_uni === el.okul_adi
      })
      this.harfList = JSON.parse(item.harf_araliklari)
    },
    selected_letter () {
      console.log(this.selected_letter)
      this.result = this.calculateEquivalent(this.selected_letter, this.uu)
    }
  },
  async created () {
    await this.$axios.post('/university').then((res) => {
      this.dataset = res.data.response
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
