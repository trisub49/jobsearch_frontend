<template>
  <div class="registeremployee">
		<v-card color="whitesmoke">
			<v-card-title>
				<h4>Regisztráció álláskeresőként</h4>
			</v-card-title>
			<v-card-text>
				<v-form>
					<v-text-field
						prepend-icon="mdi-account-circle"
						label="Teljes név"
						v-model="name" 
						required 
					/>
					<v-text-field
						prepend-icon="mdi-at"
						label="E-mail cím"
						v-model="email" 
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
						required
						minlength="8"
						maxlength="16"
					/>
					<v-menu
						ref="menu"
						:close-on-content-click="false"
						transition="scale-transition"
						offset-y
						min-width="auto"
					>
						<template v-slot:activator="{ on, attrs }">
							<v-text-field
								v-model="birthdate"
								label="Születési dátum"
								prepend-icon="mdi-calendar"
								readonly
								v-bind="attrs"
								v-on="on"
							></v-text-field>
						</template>
						<v-date-picker
							ref="picker"
							v-model="birthdate"
							:max="new Date().toISOString().substr(0, 10)"
							min="1950-01-01"
						></v-date-picker>
					</v-menu>
				</v-form>
				<v-divider />
			</v-card-text>
			<v-card-actions class="justify-center">
				<v-btn width="50%" class="mainbutton" color="success" @click="inspection()">Regisztráció</v-btn>
			</v-card-actions>
		</v-card>
  </div>
</template>

<style scoped>

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
			showPassword: false
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
        alert("Nem egyeznek a jelszavak!");
      } else if (this.calculateAge(this.birthdate) < 18) {
        alert("Fiatalkorúak nem regisztrálhatnak!");
      } else {
        axios
          .post("http://localhost:8080/api/auth/register-employee", {
            name: this.name,
            email: this.email,
            password: this.password,
            birthDate: this.birthdate,
          })
          .then((response) => response.data)
          .then((data) => {
            console.log(data);
            if (!data) {
              alert("Sikertelen regisztráció!");
            } else {
              sessionStorage.clear();
              sessionStorage.setItem("loggedIn", true);
              sessionStorage.setItem("id", data.id);
              sessionStorage.setItem("status", data.status);
              sessionStorage.setItem("name", data.name);
              sessionStorage.setItem("type", false);
              sessionStorage.setItem("email", data.email);
              sessionStorage.setItem("phoneNumber", data.phoneNumber);
              sessionStorage.setItem("settlement", data.settlement);
              sessionStorage.setItem("birthdate", data.birthDate);
              this.$router.push("/profile");
            }
          })
          .catch((error) => console.log(error));
      }
    },
  },
};
</script>
