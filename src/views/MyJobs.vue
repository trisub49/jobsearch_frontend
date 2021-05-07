<template>

    <div class="myjobs">
        <MainPageStructure title="Hirdetéseid">
            <div id="background">
                <div v-if="!jobs.length" id="joblister">Nincs feladott hirdetésed.</div>
                <div v-else id="joblister">
                    <table id="jobtable">
                        <tr><th class="jobcell">Munkakör</th><th class="jobcell">Határidő</th><th class="jobcell">Jelentkezők</th></tr>
                        <tr v-for="job in jobs" :key="job.id"><td class="jobcell"><a @click="showJob(job)" class="joblink">{{job.scope}}</a></td><td class="jobcell">{{job.deadline}}</td><td class="jobcell"><a @click="showRegistries(job.registries)" class="joblink">{{job.registries.length}} fő</a></td></tr>
                    </table>
                </div>
            </div>
            <hr>
            <div class="buttonwrapper"><button @click="$router.push('/myjobs/add')">Hirdetésfeladás</button></div><br><br> 
        </MainPageStructure>
    </div>     

</template>

<style scoped>

#background {
    border: 0.5px solid rgba(0,0,0,0.3);
    border-radius: 2px 2px;
    background-color: white;
    padding: 10px;
}
#joblister {
    width: 100%;
    padding: 20px;
    color: black;
}
#jobtable {
    width: 100%;
    border: 0.5px solid rgba(0,0,0,0.3);
    border-radius: 2px 2px;
    background-color: rgba(234, 234, 250,0.9);
    font-weight: 500;
}
.jobcell {
    padding-left: 10px;
    padding-right: 10px;
    text-align: left;
    width: 33.3%;
    border-collapse: collapse;
    border-bottom: 0.5px solid rgba(0,0,0,0.3);
}
.joblink, .joblink:hover {
    text-decoration: none;
    color:  rgb(51,102,187);
    font-weight: bold;
}
button {
    padding: 5px;
    border: 0.5px solid  rgba(0,0,0,0.3);
    border-radius: 5px 5px;
    font-weight: bold;
    width: 50%;
    float: center;
}
button:hover {
    transition: background-color 1.0s;
    background-color: rgba(0,0,0,0.3);
}

</style>

<script>

import MainPageStructure from '@/components/MainPageStructure.vue'
import axios from 'axios';

export default {

    components: {
        MainPageStructure
    },

    data() {
        return {
            jobs: []
        }
    },

    created() {
        this.findMyJobs();
    },

    methods: {
        findMyJobs() {
            axios.get(`http://localhost:8080/api/job/emp/${sessionStorage.getItem('id')}`)
            .then(response => response.data)
            .then(data => this.jobs = data)
            .catch(error => alert(error));
        },
        showJob(jobToPage) {
            this.$router.push({name: 'ShowJob', params: {job: jobToPage}});
        },
        showRegistries(registries) {
            if(registries.length > 0) {
                console.log(registries);
                this.$router.push({name: 'ShowRegistries', params: {registryList: registries}});
            }
        }
    }
}

</script>
