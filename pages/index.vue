<template>
  <v-container fluid>
    <v-row>
      <title-bar title="Harf Notu Dönüşüm Sistemi" />
    </v-row>
    <v-row justify="center">
      <convert-grade />
    </v-row>
  </v-container>
</template>

<script>
import TitleBar from '../components/base/TitleBar'
import ConvertGrade from '../components/ConvertGrade'
export default {
  components: {
    TitleBar,
    ConvertGrade
  },
  head () {
    return {
      title: 'Üsküdar Üniversitesi - Harf Notu Dönüşümü'
    }
  }
}
</script>
