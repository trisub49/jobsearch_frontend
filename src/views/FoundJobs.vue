<template>
    <div class="foundjobs">
        <MainPageStructure title="Találatok"> 
            <v-container v-if="foundJobs.length > 0">
                <JobView v-for="jobToComponent in foundJobs" :key="jobToComponent.id" :showdesc="false" :job="jobToComponent" />
            </v-container>
            <v-container v-else> A megadott keresési feltételek alapján nincs találat! </v-container>
        </MainPageStructure>
    </div>
</template>

<script>

import axios from 'axios';
import MainPageStructure from '@/components/MainPageStructure.vue';
import JobView from '@/components/JobView.vue';

export default {

    components: {
        MainPageStructure,
        JobView
    },

    data() {
        return {
            foundJobs: []
        }
    },

    created() {
        this.search();
    },

    methods: {
        search: function() {
            axios.get(`http://localhost:8080/api/job/${this.$route.params.postcode}/${this.$route.params.category}/${this.$route.params.scope}`)
            .then(response => response.data)
            .then(data => {
                data.forEach(job => {
                this.foundJobs.push(job);
                });
            })
            .catch(error => console.log(error));
        }
    }
}

</script>
