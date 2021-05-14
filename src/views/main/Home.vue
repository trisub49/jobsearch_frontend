<template>

  <v-container>
    <PageStructure title="Legújabb állások">
      <Loading v-if="loadStatus == 0" />
      <v-container v-if="loadStatus == 1">
        <JobView v-for="jobToComponent in newJobs" :key="jobToComponent.id" :showdesc="false" :job="jobToComponent" />
      </v-container>
    </PageStructure>
  </v-container>

</template>

<script>

import JobView from '@/components/common/JobView.vue';
import PageStructure from '@/components/main/PageStructure.vue';
import axios from 'axios';
import Loading from '@/components/main/Loading.vue';

export default {

  components: {
    JobView,
    PageStructure,
    Loading
  },

  data() {
    return {
      loadStatus: 0,
      newJobs: []
    }
  },

  created() {
    this.loadNewJobs();
  },

  methods: {
    loadNewJobs() {
      axios.get(`${this.$store.state.domain}/job`)
      .then(response => this.newJobs = response.data);
      setTimeout(() => this.loadStatus = 1, 500);
    }
  }
}

</script>

