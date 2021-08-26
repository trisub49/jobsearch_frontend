<template>
  <v-app>
    <NavBar />
    <v-main>
      <router-view class="animate__animated animate__fadeIn" />
    </v-main>
    <!-- <v-container class="footer" fluid>
      <h3><b>Álláskereső portál projektmunka</b></h3>
      <h4>Copyright © 2021</h4>
      <h4>Farkas András</h4>
    </v-container> -->
  </v-app>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400&display=swap');

#app {
  background-color: lightgrey;
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
.titlebg {
  background-image: linear-gradient(to top, #CFD8DC, #78909C);
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
