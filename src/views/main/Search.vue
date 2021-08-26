<template>
  <v-container v-if="$store.state.pageLoaderStatus == 0" class="search col-12 col-sm-10 col-md-8 col-lg-6 col-xl-6 mt-15 mx-auto" fluid>
    <v-expansion-panels v-model="panel" multiple>
      <v-expansion-panel expand :readonly="searchState != 2">
        <v-expansion-panel-header class="titlebg text-h6"> 
          Keresési feltételek
        </v-expansion-panel-header>
        <v-expansion-panel-content class="blue-grey lighten-4">
          <v-form>
            <SettlementList />
            <CategoryList />
            <br>
            <v-text-field
              solo dense 
              prepend-icon="mdi-magnify"
              label="Kulcsszó"
              v-model="scope"
              placeholder="kőműves, java programozó, stb..."
              autofocus
              @mouseover="resetAlerts()"
            />
            <v-row>
              <v-col>
                <v-text-field class="halfsize float-left"
                  solo dense
                  prepend-icon="mdi-animation-outline"
                  label="Kategória"
                  v-model="category"
                  list="categorylist"
                  placeholder="IT, könyvelés, stb..."
                  @mousever="resetAlerts()"
                />
              </v-col>
              <v-col>
                <v-text-field class="halfsize float-right"
                  solo dense
                  prepend-icon="mdi-map-marker"
                  label="Hely"
                  v-model="postcode"
                  list="settlementlist"
                  placeholder="pl.: Budapest"
                  @mouseover="resetAlerts()"
                />
              </v-col>
            </v-row>
            <v-container class="text-center font-weight-bold">
              <v-btn color="red darken-4" plain>Több részlet megjelenítése</v-btn>
            </v-container>
          </v-form>
          <v-container class="justify-center text-center ma-0 pa-0">
            <v-alert v-if="noCondition" type="error" dense class="mx-auto">
              Nem adtál meg keresési feltételt!
            </v-alert>
            <v-alert v-if="searchState == 1" type="info" dense class="mx-auto">
              A feltételek alapján nincs találat!
            </v-alert>
          </v-container>
          <v-container class="text-center">
            <v-btn rounded color="success" width="50%" @click="search()">
              <v-icon>mdi-magnify</v-icon>Keresés
            </v-btn>
          </v-container>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-container v-if="searchState == 2" class="pa-0 ma-0 pt-5 text-right" fluid>
      <v-spacer />
      <span class="text-h6">{{foundJobs.length}} találat</span>
      <v-spacer />
      <JobView class="mt-5" v-for="jobToComponent in foundJobs" :key="jobToComponent.id" :showdesc="false" :job="jobToComponent" />
    </v-container>
  </v-container>
</template>

<style scoped>
.search {
  font-family: 'Quicksand', sans-serif;
}
.v-btn {
  text-transform: unset;
}
.halfsize {
  width: 95%;
}
</style>

<script>
import axios from 'axios';
import JobView from '@/components/common/JobView.vue';
import CategoryList from '@/components/common/CategoryList.vue';
import SettlementList from '@/components/common/SettlementList.vue';

export default {
  components: {
    JobView,
    CategoryList,
    SettlementList
  },

  created() {
    this.$store.state.pageLoaderStatus = 1;
    setTimeout(() => this.$store.state.pageLoaderStatus = 0, 500);
  },

  data() {
    return {
      postcode: "",
      category: "",
      scope: "",
      foundJobs: [],
      noCondition: false,
      searchState: 0,
      panel: [0]
    };
  },

  methods: {
    resetAlerts() {
      if(this.searchState != 2) {
        this.noCondition = false;
        this.searchState = 0;
      }
    },
    search() {
      if(!this.scope.length && !this.postcode.length && !this.category.length) {
        this.noCondition = true;
        return 1;
      }

      var postcodeGet = !this.postcode ? 0 : this.postcode;
      var categoryGet = !this.category ? 0 : this.category;
      var scopeGet = !this.scope ? "empty" : this.scope;

      axios.get(`http://localhost:8080/api/job/${postcodeGet}/${categoryGet}/${scopeGet}`)
      .then(response => { 
          if(response.status == 200) {
            this.foundJobs = [];
            this.foundJobs = response.data;
            this.searchState = 2;
            this.panel = null;
          } else if(response.status == 204) {
            this.searchState = 1;
          }
      })
    },
  },
};
</script>
