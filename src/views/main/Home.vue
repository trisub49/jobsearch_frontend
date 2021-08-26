<template>
  <v-container class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-6 pa-0 mt-15" v-if="!$store.state.pageLoaderStatus" fluid>
    <v-container v-for="jobToComponent in newJobs" :key="jobToComponent.id" class="pa-0 ma-0 pb-8">
      <JobView :showdesc="false" :job="jobToComponent" />
    </v-container>
  </v-container>
</template>

<script>
import axios from 'axios';

import JobView from '@/components/common/JobView.vue';

export default {
  components: {
    JobView
  },
  data() {
    return {
      newJobs: []
    }
  },
  created() {
    this.$store.state.pageLoaderStatus = 1;
    this.loadNewJobs();
  },
  methods: {
    loadNewJobs() {
      axios.get(`${this.$store.state.domain}/job`)
      .then(response => this.newJobs = response.data)
      .then(setTimeout(() => this.$store.state.pageLoaderStatus = 0, 1000));
    }
  }
}
</script>

