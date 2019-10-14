<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex>
      <list-universities />
    </v-flex>
  </v-layout>
</template>

<script>
import listUniversities from '../components/listUniversities'
export default {
  components: {
    listUniversities
  }
}
</script>
