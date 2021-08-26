<template>
  <v-container id="container" class="justify-center col-xl-9 col-lg-9 col-md-9 col-sm-12 col-xs-12">
    <v-container v-if="title.length">
      <h2><b>{{title}}</b></h2>
      <v-divider />
      <v-spacer />
    </v-container>
    <slot></slot>
  </v-container>
</template>

<style scoped>
#container {
  font-family: "Inconsolata", monospace;
  padding-top: 70px;
  padding-bottom: 15px;
  border-collapse: collapse;
  min-height: 80%;
}
#page {
  background-color: rgba(234, 234, 250, 0.8);
  border: 0.5px solid rgba(234, 234, 250, 0.3);
  text-align: justify;
}

#ad {
  border-left: 0.5px solid black;
  float: left;
  padding: 15px;
  background-color: rgba(234, 234, 250, 0.9);
  border: 0.5px solid rgba(234, 234, 250, 0.3);
}
</style>

<script>
export default {
  props: ["title"]
}
</script>
