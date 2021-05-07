<template>

    <div class="myregistries">
        <MainPageStructure title="Jelentkezéseim">
            <div id="background">
                <span id="wait">Még visszaigazolásra vár:</span>
                <div v-if="!getWaitingJobs().length" class="joblister">Ez a lista üres.</div>
                <div v-else class="joblister">
                    <table class="jobtable">
                        <tr v-for="job in getWaitingJobs()" :key="job.id"><td class="jobcell"><a @click="showJob(job.jobId)" class="joblink">{{job.jobName}}</a></td><td class="jobcell">{{job.jobCompany}}</td><td class="jobcell">{{job.jobSettlement}}</td></tr>
                    </table>
                </div>
                <span id="interview">Interjúra hívtak/hívnak:</span>
                <div v-if="!getInterviewJobs().length" class="joblister">Ez a lista üres.</div>
                <div v-else class="joblister">
                    <table class="jobtable">
                        <tr v-for="job in getInterviewJobs()" :key="job.id"><td class="jobcell"><a @click="showJob(job.jobId)" class="joblink">{{job.jobName}}</a></td><td class="jobcell">{{job.jobCompany}}</td><td class="jobcell">{{job.jobSettlement}}</td></tr>
                    </table>
                </div>
                <span id="declined">Mást választottak, jelentkezésedet elutasították:</span>
                <div v-if="!getDeclinedJobs().length" class="joblister">Ez a lista üres.</div>
                <div v-else class="joblister">
                    <table class="jobtable">
                        <tr v-for="job in getDeclinedJobs()" :key="job.id"><td class="jobcell"><a @click="showJob(job.jobId)" class="joblink"> {{job.jobName}} </a></td><td class="jobcell">{{job.jobCompany}}</td><td class="jobcell">{{job.jobSettlement}}</td></tr>
                    </table>
                </div>
            </div>    
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
.joblister {
    width: 100%;
    padding: 20px;
    color: black;
}
.jobtable {
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
#wait {
    color: orangered;
    font-weight: bold;
}
#interview {
    color: green;
    font-weight: bold;
}
#declined {
    color: red;
    font-weight: bold;
}

</style>

<script>

import MainPageStructure from '@/components/MainPageStructure.vue'
import axios from 'axios';

export default {

    data() {
        return {
            userId: sessionStorage.getItem('id'),
            jobs: []
        }
    },

    created() {
        this.loadJobs();
    },

    components: {
        MainPageStructure
    },

    methods: {
        loadJobs() {
            axios.get(`http://localhost:8080/api/sign/${this.userId}`)
            .then(response => {
                if(response.status == 200) {
                    this.jobs = response.data;
                }
            })
        },
        getWaitingJobs() {
            var waitingJobs = [];
            this.jobs.forEach(job => {
                if(job.status == 0) waitingJobs.push(job);
            });
            return waitingJobs;
        },
        getInterviewJobs() {
            var interviewJobs = [];
            this.jobs.forEach(job => {
                if(job.status == 1) interviewJobs.push(job);
            });
            return interviewJobs;
        },
        getDeclinedJobs() {
            var declinedJobs = [];
            this.jobs.forEach(job => {
                if(job.status == 2) declinedJobs.push(job);
            });
            return declinedJobs;
        },
        showJob(id) {
            axios.get(`http://localhost:8080/api/job/${id}`)
            .then(response => {
                if(response.status == 200) {
                    this.$router.push({name: 'ShowJob', params: {job: response.data}});
                }
            })
        }
    }
}

</script>
