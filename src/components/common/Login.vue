<template>
  <v-container class="login mt-15 col-12 col-sm-10 col-md-6 col-lg-5 col-xl-5 text-center">
    <v-card class="mx-auto" max-width="480px" color="blue-grey lighten-4" elevation="12">
      <v-card-title>
        Bejelentkezés
      </v-card-title>
      <v-card-text>
        <v-divider />
        <br>
        <v-form>
          <v-text-field
            prepend-icon="mdi-at"
            label="Email cím"
            v-model="email"
            placeholder="valami@valami.com"
            :error-messages="emailError ? 'Ez az e-mail cím nem szerepel az adatbázisban!' : ''"
            @click="emailError = false"
          />
          <v-text-field
            prepend-icon="mdi-lock"
            append-icon="mdi-eye-off"
            label="Jelszó"
            v-model="password"
            placeholder="********"
            :type="showPassword ? 'text' : 'password'"
            :error-messages="passwordError ? 'A megadott jelszó hamis!' : ''"
            @click="passwordError = false"
            @click:append="showPassword = !showPassword"
          />
          <v-checkbox label="Bejelentkezés mint munkaadó" v-model="type" />
          <v-divider />
        </v-form>
      </v-card-text>
      <v-card-actions class="px-6">
        <v-btn width="40%" dark rounded color="info" @click="authenticate()">
          Bejelentkezés
        </v-btn>
        <v-spacer />
        <v-btn width="40%" rounded color="success" @click="$router.push('/profile/register')">
          Regisztráció
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<style scoped>

.v-btn {
  text-transform: unset;
}

</style>


<script>
import axios from 'axios';

export default {

  data() {
    return {
      email: "",
      password: "",
      type: false,
      showPassword: false,

      emailError: false,
      passwordError: false
    }
  },

  methods: {
    fillStorage(datas) {
      sessionStorage.clear();
      for (const prop in datas) {
        sessionStorage.setItem(prop, datas[prop]);
      }
      sessionStorage.setItem("loggedIn", true);
      sessionStorage.setItem("type", this.type);
      location.reload();
    },
    
    authenticate() {
      axios.post(`${this.$store.state.domain}/auth/login`, {
          email: this.email,
          password: this.password,
          type: this.type,
      })
      .then(response => {
        if (response.status == 200) {
          this.fillStorage(response.data);
        } else if(response.status == 203) {
          if (response.data.message == "!registered") {
            this.emailError = true;
          } else if (response.data.message == "password") {
            this.passwordError = true;
          }
        }
      });
    }
  }
}
</script>
