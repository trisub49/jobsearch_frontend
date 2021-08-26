<template>
  <v-container v-if="!$store.state.pageLoaderStatus" fluid>
    <PageStructure title="Legújabb állások">
      <JobView v-for="jobToComponent in newJobs" :key="jobToComponent.id" :showdesc="false" :job="jobToComponent" />
    </PageStructure>
  </v-container>
</template>

<script>
import axios from 'axios';

import JobView from '@/components/common/JobView.vue';
import PageStructure from '@/components/main/PageStructure.vue';

export default {
  components: {
    JobView,
    PageStructure
  },
  data() {
    return {
      loadStatus: 0,
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
      .then(setTimeout(() => this.$store.state.pageLoaderStatus = 0, 1500));
    }
  }
}
</script>

