<template>
	<v-container class="register mt-15 col-12 col-sm-10 col-md-6 col-lg-5 col-xl-5 text-center">
		<v-card color="blue-grey lighten-4 mx-auto" max-width="480px" elevation="12">
			<v-card-title>
				<h4>Regisztráció {{asEmployer ? "munkaadóként" : "álláskeresőként"}}</h4>
			</v-card-title>
			<v-card-text>
				<v-divider />
				<v-checkbox v-model="asEmployer" label="Munkaadóként" />
				<v-form v-if="!asEmployer">
					<v-text-field 
						solo dense
						prepend-icon="mdi-account-circle" 
						label="Teljes név" 
						v-model="employee.name" 
						required 
					/>
					<v-text-field
						solo dense
						prepend-icon="mdi-at"
						label="E-mail cím"
						v-model="employee.email"
						:error-messages="employee.emailError ? 'Ez az e-mail cím már regisztrálva van!' : ''"
						@click="employee.emailError = false"
						required
					/>
					<v-text-field
						solo dense
						prepend-icon="mdi-lock"
						:append-icon="employee.showPassword ? 'mdi-eye' : 'mdi-eye-off'"
						label="Jelszó"
						v-model="employee.password"
						:type="employee.showPassword ? 'text' : 'password'"
						@click:append="employee.showPassword = !employee.showPassword"
						required
						minlength="8"
						maxlength="16"
					/>
					<v-text-field
						solo dense
						prepend-icon="mdi-lock"
						:append-icon="employee.showPassword ? 'mdi-eye' : 'mdi-eye-off'"
						label="Jelszó megerősítése"
						v-model="employee.password2"
						:type="employee.showPassword ? 'text' : 'password'"
						:error-messages="employee.passwordError ? 'A jelszavak nem egyeznek!' : ''"
						@click="employee.passwordError = false"
						required
						minlength="8"
						maxlength="16"
					/>
					<v-menu ref="menu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
						<template v-slot:activator="{ on, attrs }">
							<v-text-field
								class="halfsize"
								solo dense
								v-model="employee.birthdate"
								label="Születési dátum"
								prepend-icon="mdi-calendar"
								readonly
								v-bind="attrs"
								v-on="on"
								:error-messages="employee.ageError ? '18 éven aluliak nem regisztrálhatnak!' : ''"
								@click="employee.ageError = false"
							></v-text-field>
						</template>
						<v-date-picker ref="picker" v-model="employee.birthdate" :max="new Date().toISOString().substr(0, 10)" min="1950-01-01" />
					</v-menu>
				</v-form>
				<v-form v-if="asEmployer">
          <v-text-field
						solo dense
            label="Cégnév"
            prepend-icon="mdi-briefcase-outline"
            v-model="employer.company"
            :error-messages="employer.companyError ? 'Ez a cég már regisztrálva van!' : ''"
            @click="employer.companyError = false"
            required
          />
          <v-text-field
						solo dense
            label="Saját név"
            prepend-icon="mdi-account-circle"
            v-model="employer.name"
            required
          />
          <v-text-field
						solo dense
            label="E-mail cím"
            prepend-icon="mdi-at"
            v-model="employer.email"
            :error-messages="employer.emailError ? 'Ez az e-mail cím már regisztrálva van!' : ''"
            @click="employer.emailError = false"
            required
          />
          <v-text-field
						solo dense
            label="Jelszó"
            prepend-icon="mdi-lock"
            :append-icon="employer.showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="employer.showPassword ? 'text' : 'password'"
            @click:append="employer.showPassword = !employer.showPassword"
            v-model="employer.password"
            required
            minlength="8"
            maxlength="16"
          />
          <v-text-field
						solo dense
            label="Jelszó megerősítése"
            prepend-icon="mdi-lock"
            :append-icon="employer.showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="employer.showPassword ? 'text' : 'password'"
            @click:append="employer.showPassword = !employer.showPassword"
            v-model="employer.password2"
            required
            minlength="8"
            maxlength="16"
            :error-messages="employer.passwordError ? 'A jelszavak nem egyeznek!' : ''"
            @click="employer.passwordError = false"
          />
          <SettlementList />
          <v-text-field
						solo dense
            label="Telephely"
            prepend-icon="mdi-map-marker"
            v-model="employer.settlement"
            list="settlementlist"
            type="search"
            required
          />
          <v-text-field
						class="halfsize"
						solo dense
            label="Telefonszám"
            prepend-icon="mdi-phone"
            v-model="employer.phoneNumber"
            required
          />
        </v-form>
				<v-divider />
			</v-card-text>
			<v-card-actions class="justify-center">
				<v-btn width="50%" rounded color="success" @click="inspection()">
					Regisztráció
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-container>
</template>

<style scoped>
.v-text-field {
	padding-top: 0;
	padding-bottom: 0;
}
.halfsize {
	width: 50%;
}
.v-btn {
	text-transform: unset;
}
</style>

<script>
import axios from 'axios';

export default {
  data() {
    return {
			asEmployer: false,
			employee: {
				name: "",
				email: "",
				password: "",
				password2: "",
				birthdate: "",
				showPassword: false,

				passwordError: false,
				emailError: false,
				ageError: false
			},
			employer: {
				company: "",
				name: "",
				email: "",
				password: "",
				password2: "",
				settlement: "",
				phoneNumber: "",
				showPassword: false,

				passwordError: false,
				companyError: false,
				emailError: false,
			}
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
			if(this.asEmployer) {
				if (this.employer.password != this.employer.password2) {
					this.employer.passwordError = true;
				} else {
					axios.post(`${this.$store.state.domain}/auth/register-employer`, {
						company: this.employer.company,
						name: this.employer.name,
						email: this.employer.email,
						password: this.employer.password,
						settlement: this.employer.settlement,
						phoneNumber: this.employer.phoneNumber,
					})
					.then((response) => {
						if (response.status == 203) {
							if (response.data.message == "email") {
								this.employer.emailError = true;
							} else if (response.data.message == "company") {
								this.employer.companyError = true;
							}
						} else if (response.status == 201) {
							sessionStorage.clear();
							sessionStorage.setItem("loggedIn", true);
							sessionStorage.setItem("type", true);
							sessionStorage.setItem("id", response.data.id);
							sessionStorage.setItem("name", response.data.name);
							sessionStorage.setItem("email", response.data.email);
							sessionStorage.setItem("phoneNumber", response.data.phoneNumber);
							sessionStorage.setItem("settlement", response.data.settlement);
							sessionStorage.setItem("company", response.data.company);
							sessionStorage.setItem("description", response.data.description);
							this.$router.push("/profile");
						}
					});
				}
			} else {
				if (this.employee.password !== this.employee.password2) {
					this.employee.passwordError = true;
				} else if (this.calculateAge(this.employee.birthdate) < 18) {
					this.employee.ageError = true;
				} else {
					axios.post(`${this.$store.state.domain}/auth/register-employee`, {
						name: this.employee.name,
						email: this.employee.email,
						password: this.employee.password,
						birthDate: this.employee.birthdate,
					})
					.then((response) => {
						if (response.status == 203) {
							if (response.data.message == "email") {
								this.employee.emailError = true;
							} else if (response.data.message == "company") {
								this.employee.companyError = true;
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
      }
    },
  },
};

</script>
