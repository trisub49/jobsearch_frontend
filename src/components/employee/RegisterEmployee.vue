<template>
  <v-card color="blue-grey lighten-4 mx-auto" max-width="480px" elevation="12">
    <v-card-title>
      <h4>Regisztráció álláskeresőként</h4>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field prepend-icon="mdi-account-circle" label="Teljes név" v-model="name" required />
        <v-text-field
          prepend-icon="mdi-at"
          label="E-mail cím"
          v-model="email"
          :error-messages="emailError ? 'Ez az e-mail cím már regisztrálva van!' : ''"
          @click="emailError = false"
          required
        />
        <v-text-field
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          label="Jelszó"
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          @click:append="showPassword = !showPassword"
          required
          minlength="8"
          maxlength="16"
        />
        <v-text-field
          prepend-icon="mdi-lock"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          label="Jelszó megerősítése"
          v-model="password2"
          :type="showPassword ? 'text' : 'password'"
          :error-messages="passwordError ? 'A jelszavak nem egyeznek!' : ''"
          @click="passwordError = false"
          required
          minlength="8"
          maxlength="16"
        />
        <v-menu ref="menu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="birthdate"
              label="Születési dátum"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
              :error-messages="
                ageError ? '18 éven aluliak nem regisztrálhatnak!' : ''
              "
              @click="ageError = false"
            ></v-text-field>
          </template>
          <v-date-picker ref="picker" v-model="birthdate" :max="new Date().toISOString().substr(0, 10)" min="1950-01-01" />
        </v-menu>
      </v-form>
      <v-divider />
    </v-card-text>
    <v-card-actions class="justify-center">
      <v-btn width="50%" class="mainbutton" color="success" @click="inspection()">
        Regisztráció
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
#registeremployee {
  max-width: 640px;
}
.v-card {
  margin-top: 20px;
}
</style>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password2: "",
      birthdate: "",
      showPassword: false,

      passwordError: false,
      emailError: false,
      ageError: false,
    };
  },

  methods: {
    calculateAge(dateString) {
      var today = new Date();
      var birthDate = new Date(dateString);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    },

    inspection() {
      if (this.password !== this.password2) {
        this.passwordError = true;
      } else if (this.calculateAge(this.birthdate) < 18) {
        this.ageError = true;
      } else {
        axios.post(`${this.$store.state.domain}/auth/register-employee`, {
					name: this.name,
					email: this.email,
					password: this.password,
					birthDate: this.birthdate,
				})
				.then((response) => {
					if (response.status == 203) {
						if (response.data.message == "email") {
							this.emailError = true;
						} else if (response.data.message == "company") {
							this.companyError = true;
						}
					} else if (response.status == 201) {
						sessionStorage.clear();
						sessionStorage.setItem("loggedIn", true);
						sessionStorage.setItem("type", false);
						sessionStorage.setItem("id", response.data.id);
						sessionStorage.setItem("status", response.data.status);
						sessionStorage.setItem("name", response.data.name);
						sessionStorage.setItem("email", response.data.email);
						sessionStorage.setItem("phoneNumber", response.data.phoneNumber);
						sessionStorage.setItem("settlement", response.data.settlement);
						sessionStorage.setItem("birthDate", response.data.birthDate);
						this.$router.push("/profile");
					}
				});
      }
    },
  },
};
</script>
