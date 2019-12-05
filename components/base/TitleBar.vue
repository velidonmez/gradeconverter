<template>
  <v-app-bar
    app
    elevation="0"
    height="75px"
    class="appBar"
    color="primary"
  >
    <div class="col-12">
      <v-toolbar-title class="text-center title">
        {{ title }}
      </v-toolbar-title>
    </div>
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
