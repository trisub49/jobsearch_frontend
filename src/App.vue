<template>

  <div id="app">
    <div id="nav">
      <router-link to="/">Friss</router-link> |
      <router-link to="/search">Keresés</router-link>
      <router-link to="/profile">Profil</router-link>
      <router-link to="/myjobs" v-if="isEmployerAndLoggedIn() == true">Hirdetéseim</router-link>
      <router-link to="/myregistries" v-if="isEmployeeAndLoggedIn() == true">Jelentkezéseim</router-link>
    </div>
    <router-view />
  </div>

</template>

<style>

@font-face {
    font-family: "Inconsolata";
    src: url(/fonts/Inconsolata.ttf) format("truetype");
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
button {
    float: center;
    padding: 5px;
    border: 0.5px solid  rgba(0,0,0,0.3);
    border-radius: 5px 5px;
    font-weight: bold;
    width: 50%;
    float: center;
}
button:hover {
    transition: background-color 1.0s;
    background-color: rgba(0,0,0,0.3);
}
.buttonwrapper {
    text-align: center;
}
#nav {
    font-family: "Inconsolata", monospace;
    position: fixed;
    z-index: 99;
    background-color: rgba(0, 0, 0,0.75);
    width: 100%;
    text-transform: uppercase;
    margin-bottom: 50px;
}
#nav a:hover {
    transition: border-bottom 1.5s;
    border-bottom: 2.5px solid rgba(234, 234, 250,0.9);
}
#nav a {
    display: inline-block;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 10px;
    padding-top: 10px;
    text-decoration: none;
    color: white;
    text-shadow: 1px 1px darkslategray;
    border-bottom: 2.5px solid rgba(0, 0, 0,0.0);
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

