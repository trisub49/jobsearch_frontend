<template>

    <div class="myregistries">
        <MainPageStructure title="Jelentkezéseim">
            <div id="background">
                <span id="wait">Még visszaigazolásra vár:</span>
                <div v-if="!getWaitingJobs().length" class="joblister">Ez a lista üres.</div>
                <div v-else class="joblister">
                    <table class="jobtable">
                        <tr v-for="job in getWaitingJobs()" :key="job.id"><td class="jobcell"><a class="joblink" href="index.php?pg=showjobid='.$data['hirdetesID'].'">{{job.scope}}</a></td><td class="jobcell">{{job.company}}</td><td class="jobcell">{{job.place}}</td></tr>
                    </table>
                </div>
                <span id="interview">Interjúra hívtak/hívnak:</span>
                <div v-if="!getInterviewJobs().length" class="joblister">Ez a lista üres.</div>
                <div v-else class="joblister">
                    <table class="jobtable">
                        <tr v-for="job in getInterviewJobs()" :key="job.id"><td class="jobcell"><a class="joblink" href="index.php?pg=showjobid='.$data['hirdetesID'].'">{{job.scope}}</a></td><td class="jobcell">{{job.company}}</td><td class="jobcell">{{job.place}}</td></tr>
                    </table>
                </div>
                <span id="declined">Mást választottak, jelentkezésedet elutasították:</span>
                <div v-if="!getDeclinedJobs().length" class="joblister">Ez a lista üres.</div>
                <div v-else class="joblister">
                    <table class="jobtable">
                        <tr v-for="job in getDeclinedJobs()" :key="job.id"><td class="jobcell"><a class="joblink" href="index.php?pg=showjobid='.$data['hirdetesID'].'">{{job.scope}}</a></td><td class="jobcell">{{job.company}}</td><td class="jobcell">{{job.place}}</td></tr>
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

export default {
    data() {
        return {
            jobs: [
                {id: 0, scope: 'Takarító', status: 0, company: 'Rapsic', place: 'Baja'},
                {id: 1, scope: 'Takarító2', status: 1, company: 'Rapsic2', place: 'Baja'},
                {id: 2, scope: 'Takarító3', status: 2, company: 'Rapsic3', place: 'Baja'}
            ]
        }
    },
    components: {
        MainPageStructure
    },
    methods: {
        getWaitingJobs: function() {
            var waitingJobs = [];
            this.jobs.forEach(job => {
                if(job.status == 0) waitingJobs.push(job);
            });
            return waitingJobs;
        },
        getInterviewJobs: function() {
            var interviewJobs = [];
            this.jobs.forEach(job => {
                if(job.status == 1) interviewJobs.push(job);
            });
            return interviewJobs;
        },
        getDeclinedJobs: function() {
            var declinedJobs = [];
            this.jobs.forEach(job => {
                if(job.status == 2) declinedJobs.push(job);
            });
            return declinedJobs;
        }
    }
}

</script>
