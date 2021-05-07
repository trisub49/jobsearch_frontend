<template>
  <v-app>
      <v-app-bar id="nav"
        fixed 
        dense
        light
        :hide-on-scroll='true'
        color='rgba(0, 0, 0,0.75)'
      >
        <router-link to="/"><v-icon>mdi-newspaper-variant-outline</v-icon>Friss</router-link>
        <router-link to="/search"><v-icon>mdi-magnify</v-icon>Keresés</router-link>
        <router-link to="/profile"><v-icon>mdi-account-circle-outline</v-icon>Profil</router-link>
        <router-link to="/myjobs" v-if="isEmployerAndLoggedIn() == true"><v-icon>mdi-account-circle-outline</v-icon>Hirdetéseim</router-link>
        <router-link to="/myregistries" v-if="isEmployeeAndLoggedIn() == true">Jelentkezéseim</router-link>
      </v-app-bar>
      <v-main>
        <router-view />
      </v-main>
      <v-footer id="footer"
        :fluid='true'
      >
        <h4><b>Álláskereső portál projektmunka</b></h4><br>
        <h5>Copyright © 2021</h5><br>
        <h5>Farkas András</h5>
      </v-footer>
  </v-app>

</template>

<style>

@font-face {
    font-family: "Inconsolata";
    src: url(/fonts/Inconsolata.ttf) format("truetype");
}
div[data-app='true'] {
  background: no-repeat center center fixed !important;
  background-size: cover;
  font-family: "Inconsolata", monospace;
}
.v-app {
    background: rgba(0,0,0,0);
}
.v-app-bar {
    font-family: "Inconsolata", monospace;
    text-transform: uppercase;
}
.v-app-bar a:hover {
    transition: border-bottom 1.5s;
    border-bottom: 2.5px solid rgba(234, 234, 250,0.9);
}
.v-app-bar a {
    display: inline-block;
    padding: 10px;
    text-decoration: none;
    color: white;
    text-shadow: 1px 1px darkslategray;
    border-bottom: 2.5px solid rgba(0, 0, 0,0.0);
}
.v-icon {
  padding-right: 10px;
  padding-left: 10px;
}
#container {
    padding-top: 70px;
    padding-bottom: 15px;
    border-collapse: collapse;
    min-height: 80%;
}
#page {
    float: left;
    padding: 15px;
    margin-left: 10px;
    margin-right: 10px;
    background-color: rgba(234, 234, 250,0.8);
    border: 0.5px solid rgba(234, 234, 250,0.3);
    text-align: justify;
    border-radius: 3px 3px;
}
#makemoney {
    float: left;
    padding: 15px;
    background-color: rgba(234, 234, 250,0.9);
    border: 0.5px solid rgba(234, 234, 250,0.3);
    border-radius: 3px 3px;
}
#footer {
    padding: 10px; 
    background-color: rgba(0,0,0,0.3); 
    color: white; 
    text-align: center;
}
.content {
    width: 75%;
    margin: auto;
}
label {
    text-transform: uppercase;
    font-size: small;
    font-weight: bold;
}
input[type=email],input[type=password],input[type=text],input[type=date],input[type=search],input[type=tel],input[list] {
    width: 100%;
    padding: 5px;
    border: 0.5px solid  rgba(0,0,0,0.3);
    border-radius: 3px 3px;
    margin-bottom: 7.5px;
}
input:focus {
    outline: none;
    border: 0.5px solid black;
}

</style>

<script>

export default {

  methods: {
    isEmployerAndLoggedIn: function() {
      if(sessionStorage.getItem('loggedIn') == 'true' && sessionStorage.getItem('type') == 'true') return true;
      return false;
    },
    isEmployeeAndLoggedIn: function() {
      if(sessionStorage.getItem('loggedIn') == 'true' && sessionStorage.getItem('type') == 'false') return true;
      return false;
    }
  }
}

</script>

