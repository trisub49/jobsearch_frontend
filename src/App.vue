<template>
  <v-app>
    <NavBar />
    <v-main>
      <router-view class="animate__animated animate__fadeIn animate__slower" />
    </v-main>
    <v-container class="footer" fluid>
      <h3><b>Álláskereső portál projektmunka</b></h3>
      <h4>Copyright © 2021</h4>
      <h4>Farkas András</h4>
    </v-container>
  </v-app>
</template>

<style>

div[data-app='true'] {
  background: no-repeat center center fixed !important;
  background-size: cover;
}

.mainbutton {
  font-weight: bold;
  padding: 5px;
  border: 0.5px solid  rgba(0,0,0,0.3);
  border-radius: 5px 5px;
  margin-bottom: 7.5px;
  text-transform: unset;
}

.footer {
  font-family: "Inconsolata", monospace;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  text-align: center;
}

</style>

<script>

import NavBar from '@/components/main/NavBar.vue'

export default {
  components: {
    NavBar
  }
}

</script>
