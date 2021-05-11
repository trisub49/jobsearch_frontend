<template>
  <v-container id="registeremployer" class="justify-center">
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
            :error-messages="
              companyError ? 'Ez a cég már regisztrálva van!' : ''
            "
            @click="companyError = false"
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
            :error-messages="
              emailError ? 'Ez az e-mail cím már regisztrálva van!' : ''
            "
            @click="emailError = false"
            required
          />
          <v-text-field
            label="Jelszó"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
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
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
            v-model="password2"
            required
            minlength="8"
            maxlength="16"
            :error-messages="passwordError ? 'A jelszavak nem egyeznek!' : ''"
            @click="passwordError = false"
          />
          <SettlementList />
          <v-text-field
            label="Telephely"
            prepend-icon="mdi-map-marker"
            v-model="settlement"
            list="settlementlist"
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
        >
          Regisztráció
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<style scoped>
#registeremployer {
  max-width: 640px;
}
.v-card {
  margin-top: 20px;
}
</style>

<script>
import axios from "axios";
import SettlementList from "@/components/common/SettlementList.vue";

export default {
  components: {
    SettlementList,
  },

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

      passwordError: false,
      companyError: false,
      emailError: false,
    };
  },

  methods: {
    inspection() {
      if (this.password != this.password2) {
        this.passwordError = true;
      } else {
        axios.post(`${this.$store.state.domain}/auth/register-employer`, {
          company: this.company,
          name: this.name,
          email: this.email,
          password: this.password,
          settlement: this.settlement,
          phoneNumber: this.phoneNumber,
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
    },
  },
};
</script>
