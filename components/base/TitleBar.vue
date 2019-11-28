<template>
  <v-app-bar
    app
    elevation="0"
    height="75px"
    class="appBar"
    color="primary"
  >
    <v-toolbar-title class="title">
      {{ title }}
    </v-toolbar-title>
  </v-app-bar>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  }
}

</script>
<style scoped>
  .title{
    color: white!important;
  }
</style>
