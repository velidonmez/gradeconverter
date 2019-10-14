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
      <add-university />
    </v-flex>
  </v-layout>
</template>

<script>
import addUniversity from '../components/addUniversity'
export default {
  components: {
    addUniversity
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
