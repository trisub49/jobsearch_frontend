<template>
  <div class="search">
    <MainPageStructure title="Keresés">
      <v-card>
        <v-card-text>
          <v-form id="searchform" v-on:submit.prevent>
            <v-text-field
              prepend-icon="mdi-magnify"
              label="Kulcsszó"
              v-model="scope"
              placeholder="kőműves, java programozó, stb..."
              autofocus
            />
            <v-text-field
              prepend-icon="mdi-animation-outline"
              label="Kategória"
              v-model="category"
              list="categories"
              placeholder="IT, könyvelés, stb..."
            />
            <v-text-field
              prepend-icon="mdi-map-marker"
              label="Hely"
              v-model="postcode"
              list="cities"
              placeholder="pl.: Budapest"
            />
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn class="mainbutton" width="50%" @click="search()">
            <v-icon>mdi-magnify</v-icon>Keresés
          </v-btn>
        </v-card-actions>
      </v-card>
    </MainPageStructure>
  </div>
</template>

<style scoped></style>

<script>
import MainPageStructure from "@/components/MainPageStructure.vue";

export default {
  components: {
    MainPageStructure,
  },

  data() {
    return {
      postcode: "",
      category: "",
      scope: "",
      foundJobs: [],
    };
  },

  created() {
    return {
      postcode: "",
      category: "",
      scope: "",
    };
  },

  methods: {
    search() {
      var postcodeGet = !this.postcode ? 0 : this.postcode;
      var categoryGet = !this.category ? 0 : this.category;
      var scopeGet = !this.scope ? "empty" : this.scope;
      this.$router.push({
        name: "FoundJobs",
        params: {
          postcode: postcodeGet,
          category: categoryGet,
          scope: scopeGet,
        },
      });
    },
  },
};
</script>
