<template>
  <v-container class="search">
    <MainPageStructure title="Keresés">
      <v-container id="exp" class="justify-center">
        <v-expansion-panels v-model="panel" multiple>
          <v-expansion-panel expand :readonly="searchState != 2">
            <v-expansion-panel-header> 
              <h3>Keresési feltételek</h3>
            </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-form id="searchform">
                  <v-text-field
                    prepend-icon="mdi-magnify"
                    label="Kulcsszó"
                    v-model="scope"
                    placeholder="kőműves, java programozó, stb..."
                    autofocus
                    @mouseover="resetAlerts()"
                  />
                  <CategoryList />
                  <v-text-field
                    prepend-icon="mdi-animation-outline"
                    label="Kategória"
                    v-model="category"
                    list="categorylist"
                    placeholder="IT, könyvelés, stb..."
                    @mousever="resetAlerts()"
                  />
                  <SettlementList />
                  <v-text-field
                    prepend-icon="mdi-map-marker"
                    label="Hely"
                    v-model="postcode"
                    list="settlementlist"
                    placeholder="pl.: Budapest"
                    @mouseover="resetAlerts()"
                  />
                </v-form>
                <v-container id="alerts" class="justify-center">
                  <v-alert v-if="noCondition" type="error" dense outlined class="text-center">
                    Nem adtál meg keresési feltételt!
                  </v-alert>
                  <v-alert v-if="searchState == 1" type="info" dense outlined class="text-center">
                    A feltételek alapján nincs találat!
                  </v-alert>
                </v-container>
                <v-container class="text-center">
                    <v-btn class="mainbutton" width="50%" @click="search()">
                      <v-icon>mdi-magnify</v-icon>Keresés
                    </v-btn>
                  </v-container>
              </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-container>
      <v-container v-if="searchState == 2">
        <v-spacer />
        <span id="foundcounter"><h3>{{foundJobs.length}} találat</h3></span>
        <v-spacer />
        <JobView v-for="jobToComponent in foundJobs" :key="jobToComponent.id" :showdesc="false" :job="jobToComponent" />
      </v-container>
    </MainPageStructure>
  </v-container>
</template>

<style scoped>
#exp {
  max-width: 640px;
}
#foundcounter {
  color: green;
}
#alerts {
  width: 50%;
}
</style>

<script>
import axios from 'axios';
import MainPageStructure from '@/components/MainPageStructure.vue';
import JobView from '@/components/JobView.vue';
import CategoryList from '@/components/CategoryList.vue';
import SettlementList from '@/components/SettlementList.vue';

export default {
  components: {
    MainPageStructure,
    JobView,
    CategoryList,
    SettlementList
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
