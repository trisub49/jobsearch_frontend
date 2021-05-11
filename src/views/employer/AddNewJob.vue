<template>
  <v-container class="addjob">
    <PageStructure title="Hirdetés feladása">
      <v-container id="card" class="justify-center">
        <v-card>
          <v-card-text>
            <v-form>
              <v-text-field
                prepend-icon="mdi-account-hard-hat"
                label="Munkakör"
                v-model="scope"
                required
              />
              <CategoryList />
              <v-text-field
                prepend-icon="mdi-animation-outline"
                label="Kategória"
                v-model="category"
                list="categorylist"
                required
              />
              <v-textarea
                prepend-icon="mdi-information-outline"
                label="Információ a munkáról"
                v-model="adText"
                maxlength="1024"
                counter
                required
              />
              <SettlementList />
              <v-text-field
                prepend-icon="mdi-map-marker"
                label="Munkavégzés helye"
                v-model="settlement"
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
                    v-model="deadline"
                    label="Jelentkezési határidő"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  ref="picker"
                  v-model="deadline"
                  :min="new Date().toISOString().substr(0, 10)"
                />
              </v-menu>
            </v-form>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn class="mainbutton" depressed @click="addJob()" width="50%">
              Kész
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </PageStructure>
  </v-container>
</template>

<style scoped>
#card {
  max-width: 640px;
}

</style>

<script>
import PageStructure from "@/components/main/PageStructure.vue";
import CategoryList from "@/components/common/CategoryList.vue";
import SettlementList from "@/components/common/SettlementList.vue";
import axios from "axios";

export default {
  components: {
    PageStructure,
    CategoryList,
    SettlementList,
  },

  data() {
    return {
      scope: "",
      category: "",
      adText: "",
      settlement: "",
      deadline: "",
    };
  },

  methods: {
    addJob() {
      axios
        .post("http://localhost:8080/api/job/save", {
          adText: this.adText,
          category: this.category,
          deadline: this.deadline,
          scope: this.scope,
          settlement: this.settlement,
          employerId: sessionStorage.getItem("id"),
        })
        .then((response) => {
          if (response.status == 201) {
            this.$router.push("/myjobs");
          }
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
