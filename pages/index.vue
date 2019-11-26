<template>
  <v-container fluid>
    <v-row>
      <title-bar title="Ana Sayfa" />
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
  }
}
</script>
