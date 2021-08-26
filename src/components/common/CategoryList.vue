<template>
  <v-container class="categorylist pa-0 ma-0">
    <datalist id="categorylist">
      <option v-for="category in categories" :key="category.id">
        {{category.name}}
      </option>
    </datalist>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      categories: []
    }
  },

  created() {
    this.loadCategories();
  },

  methods: {
    loadCategories() {
      axios.get(`${this.$store.state.domain}/data/categories`)
      .then(response => this.categories = response.data);
    }
  }
}
</script>
