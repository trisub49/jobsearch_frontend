<template>
  <div class="registeremployer">
    <v-card>
      <v-card-title>
        <h4>Regisztráció munkaadóként</h4>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            label="Cégnév"
            prepend-icon="mdi-briefcase-outline"
            v-model="company"
            required
          />
          <v-text-field
            label="Saját név"
            prepend-icon="mdi-account-circle"
            v-model="name"
            required
          />
          <v-text-field
            label="E-mail cím"
            prepend-icon="mdi-at"
            v-model="email"
            required
          />
          <v-text-field
            label="Jelszó"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            v-model="password"
            required
            minlength="8"
            maxlength="16"
          />
          <v-text-field
            label="Jelszó megerősítése"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            v-model="password2"
            required
            minlength="8"
            maxlength="16"
          />
          <v-text-field
            label="Telephely"
            prepend-icon="mdi-map-marker"
            v-model="settlement"
            type="search"
            required
          />
          <v-text-field
            label="Telefonszám"
            prepend-icon="mdi-phone"
            v-model="phoneNumber"
            required
          />
        </v-form>
        <v-divider />
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn
          width="50%"
          class="mainbutton"
          color="success"
          @click="inspection()"
          >Regisztráció</v-btn
        >
      </v-card-actions>
    </v-card>
  </div>
</template>

<style scoped>
.v-card {
  margin-top: 40px;
}
</style>

<script>
import axios from "axios";

export default {
  data() {
    return {
      company: "",
      name: "",
      email: "",
      password: "",
      password2: "",
      settlement: "",
      phoneNumber: "",
      showPassword: false,
    };
  },

  methods: {
    inspection() {
      if (this.password != this.password2) {
        alert("Nem egyeznek a jelszavak!");
      } else {
        axios
          .post("http://localhost:8080/api/auth/register-employer", {
            company: this.company,
            name: this.name,
            email: this.email,
            password: this.password,
            settlement: this.settlement,
            phoneNumber: this.phoneNumber,
          })
          .then((response) => response.data)
          .then((data) => {
            if (!data) {
              alert("Sikertelen regisztráció!");
            } else {
              sessionStorage.clear();
              sessionStorage.setItem("loggedIn", true);
              sessionStorage.setItem("type", true);
              sessionStorage.setItem("id", data.id);
              sessionStorage.setItem("name", data.name);
              sessionStorage.setItem("email", data.email);
              sessionStorage.setItem("phoneNumber", data.phoneNumber);
              sessionStorage.setItem("settlement", data.settlement);
              sessionStorage.setItem("company", data.company);
              sessionStorage.setItem("description", data.description);
              this.$router.push("/profile");
            }
          });
      }
    },
  },
};
</script>
