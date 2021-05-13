<template>

  <v-container>
    <PageStructure title="Legújabb állások">
      <JobView v-for="jobToComponent in newJobs" :key="jobToComponent.id" :showdesc="false" :job="jobToComponent" />
    </PageStructure>
  </v-container>

</template>

<script>

import JobView from '@/components/common/JobView.vue';
import PageStructure from '@/components/main/PageStructure.vue';
import axios from 'axios'

export default {

  components: {
    JobView,
    PageStructure
  },

  data() {
    return {
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
    }
  }
}

</script>

