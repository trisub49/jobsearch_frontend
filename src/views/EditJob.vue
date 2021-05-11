<template>
  <v-container class="editjob">
    <MainPageStructure title="Hirdetés szerkesztése">
      <v-container id="card" class="justify-center">
        <v-card>
          <v-card-text>
            <v-form>
              <v-text-field 
                prepend-icon="mdi-account-hard-hat"
                label="Munkakör" 
                v-model="job.scope" 
                required 
              />
              <CategoryList />
              <v-text-field
                prepend-icon="mdi-animation-outline"
                label="Kategória"
                v-model="job.category"
                list="categorylist"
                required
              />
              <v-textarea
                prepend-icon="mdi-information-outline"
                label="Információ a munkáról"
                v-model="job.adText"
                maxlength="1024"
                counter
                required
              />
              <SettlementList />
              <v-text-field
                prepend-icon="mdi-map-marker"
                label="Munkavégzés helye"
                v-model="job.settlement"
                list="settlementlist"
                required
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
                    v-model="job.deadline"
                    label="Jelentkezési határidő"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  ref="picker"
                  v-model="job.deadline"
                  :min="new Date().toISOString().substr(0, 10)"
                />
              </v-menu>
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn class="mainbutton" depressed @click="editJob()" width="50%"> Kész </v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </MainPageStructure>
  </v-container>
</template>

<style scoped>
#card {
  max-width: 640px;
}
</style>

<script>
import MainPageStructure from "@/components/MainPageStructure.vue";
import CategoryList from "@/components/CategoryList.vue";
import SettlementList from "@/components/SettlementList.vue";
import axios from "axios";

export default {
  components: {
    MainPageStructure,
    CategoryList,
    SettlementList,
  },

  props: ["actualjob"],

  data() {
    return {
      job: this.actualjob,
    };
  },

  methods: {
    editJob() {
      axios
        .post("http://localhost:8080/api/job/edit", {
          adText: this.job.adText,
          category: this.job.category,
          deadline: this.job.deadline,
          scope: this.job.scope,
          settlement: this.job.settlement,
          employerId: sessionStorage.getItem("id"),
          id: this.job.id,
        })
        .then((response) => {
          if (response.status == 200) {
            this.$router.push("/myjobs");
          }
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
