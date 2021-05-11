<template>
  <div class="categorylist">
    <datalist id="categorylist">
      <option v-for="category in categories" :key="category.id">
        {{ category.name }}
      </option>
    </datalist>
  </div>
</template>

<script>

import axios from "axios";

export default {
  data() {
    return {
      categories: [],
    };
  },

  created() {
    this.loadCategories();
  },

  methods: {
    loadCategories() {
      axios
        .get("http://localhost:8080/api/data/categories")
        .then((response) => response.data)
        .then((data) => {
          data.forEach((category) => {
            this.categories.push(category);
          });
        });
    },
  },
};
</script>
