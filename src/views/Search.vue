<template>

  <div class="search">
      <MainPageStructure title="Keresés">
        <div class="content">
          <form id="searchform" action="" @submit="search()" v-on:submit.prevent>
              <label for="searchedscope">Kulcsszó:</label><br>
              <input v-model="scope" name="searchedscope" type="text" placeholder="kőműves, java programozó, stb..."><br>
              <label for="searchedcategory">Kategória:</label><br>
              <input v-model="category" list="categories" name="searchedcategory" placeholder="IT, könyvelés, stb..."><br>
              <label for="searchedpostcode">Hely:</label><br>
              <input v-model="postcode" list="cities" name="searchedpostcode" placeholder="pl.: Budapest"><br><br>
              <div class="buttonwrapper"><button type="submit">Keresés</button></div>
              <br>
          </form>
      </div>
    </MainPageStructure>
  </div>

</template>

<script>

import MainPageStructure from '@/components/MainPageStructure.vue'

export default {
    components: {
    MainPageStructure
  },
  data() {
    return {
      postcode: '',
      category: '',
      scope: '',
      foundJobs: []
    }
  },
  created() {
    return {
      postcode: '',
      category: '',
      scope: ''
    }
  },
  methods: {
    search: function() {
      var postcodeGet = (!this.postcode ? 0 : this.postcode);
      var categoryGet = (!this.category ? 0 : this.category);
      var scopeGet = (!this.scope ? "empty": this.scope);
      this.$router.push({
        name: "FoundJobs",
        params: {
          postcode: postcodeGet,
          category: categoryGet,
          scope: scopeGet
        }
      });
    }
  }
}
</script>

