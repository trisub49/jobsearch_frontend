<template>
  <div class="login">
    <MainPageStructure title="Bejelentkezés">
      <v-container class="justify-center" id="card">
        <v-card>
          <v-card-text>
            <v-form id="loginform" v-on:submit.prevent>
              <v-text-field
                prepend-icon="mdi-at"
                label="Email cím"
                v-model="email"
                placeholder="valami@valami.com"
              />
              <v-text-field
                prepend-icon="mdi-lock"
                append-icon="mdi-eye-off"
                label="Jelszó"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
                v-model="password"
                placeholder="********"
              />
              <v-checkbox 
                  label="Bejelentkezés mint munkaadó"
                  v-model="type"
              />
              <v-divider />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn width="40%" class="mainbutton" color="info" @click="authenticate()">Bejelentkezés</v-btn>
            <v-spacer />
            <v-btn width="40%" class="mainbutton" color="success" @click="$router.push('/profile/register')">Regisztráció</v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </MainPageStructure>
  </div>
</template>

<style scoped>
#card {
  max-width: 640px;
}
</style>

<script>
import axios from "axios";
import MainPageStructure from "@/components/MainPageStructure.vue";

export default {
  name: "login",

  components: {
    MainPageStructure,
  },

  data() {
    return {
      email: "",
      password: "",
      type: false,
      showPassword: false
    };
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
      axios
        .post("http://localhost:8080/api/auth/login", {
          email: this.email,
          password: this.password,
          type: this.type,
        })
        .then((response) => response.data)
        .then((data) => {
          console.log(data);
          if (data.id) {
            this.fillStorage(data);
          } else {
            if (data.message == "not in database") {
              alert("A megadott e-mail nincs az adatbázisban!");
            } else if (data.message == "password not correct") {
              alert("A megadott jelszó helytelen!");
            }
          }
        })
        .catch((error) => alert(error));
    },
  },
};
</script>
