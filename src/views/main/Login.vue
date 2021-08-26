<template>
  <v-container class="col-12 col-sm-10 col-md-6 col-lg-5 col-xl-5 mt-15" fluid>
    <v-card class="mx-auto" max-width="480px" color="blue-grey lighten-4" elevation="12">
      <v-card-title class="titlebg text-right">
        Bejelentkezés
      </v-card-title>
      <v-card-text class="pb-0">
        <v-form>
          <v-text-field
            solo dense
            prepend-icon="mdi-at"
            label="Email cím"
            v-model="email"
            placeholder="valami@valami.com"
            :error-messages="emailError ? 'Ez az e-mail cím nem szerepel az adatbázisban!' : ''"
            @click="emailError = false"
          />
          <v-text-field
            solo dense
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
          <v-checkbox class="mx-auto" label="Bejelentkezés mint munkaadó" v-model="type" />
        </v-form>
      </v-card-text>
      <v-card-actions class="px-6 pb-5 pt-0 actionsbg">
        <v-btn width="40%" rounded elevation="12" color="info" @click="authenticate()">
          Bejelentkezés
        </v-btn>
        <v-spacer />
        <v-btn width="40%" rounded elevation="12" color="success" @click="$router.push('/profile/register')">
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

.titlebg {
  background-image: linear-gradient(to top, #CFD8DC, #78909C);
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
      this.$router.push('/profile');
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
