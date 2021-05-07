<template>
    
    <div class="showjob">
        <MainPageStructure title = "Álláshirdetés adatok">
            <JobView :showdesc="true" :job="job" />
            <div v-if="job.employerId == userId && loggedIn && userType">
                <button @click="$router.push({name: 'EditJob', params: {actualjob: job}})">Szerkesztés</button>
                <button @click="deleteJob(actualjobId)">Törlés</button>
            </div>
            <div v-if="!userType && loggedIn">
                <div class="buttonwrapper">
                    <button v-if="!registered" @click="addRegistry()">Jelentkezés</button>
                    <button v-else @click="deleteRegistry()">Jelentkezés visszavonása</button>
                </div>
            </div>
        </MainPageStructure>
    </div>

</template>

<script>

import axios from 'axios';
import MainPageStructure from '@/components/MainPageStructure.vue'
import JobView from '@/components/JobView.vue'

export default {
    
    name: 'ShowJob',

    props: [
        'job'
    ],

    components: {
        MainPageStructure,
        JobView
    },

    data() {
        return {
            userId: sessionStorage.getItem('id'),
            userType: (sessionStorage.getItem('type') == "false" || !sessionStorage.getItem('type').length) ? false : true,
            loggedIn: (sessionStorage.getItem('loggedIn') == "false" || !sessionStorage.getItem('loggedIn').length) ? false : true,
            actualJobId: this.job.id,
            registered: false
        }
    },

    created() {
        this.inspection();
    },

    methods: {
        deleteJob(id) {
            axios.delete(`http://localhost:8080/api/job/delete/${id}`)
            .then(response => {
                if(response.status == 200) {
                    this.$router.push('/myjobs');
                } else {
                    alert("Valami hiba történt!")
                }
            });
        },
        inspection() {
            axios.post('http://localhost:8080/api/sign/hasregistry', {
                jobId: this.job.id,
                employeeId: this.userId
            })
            .then(response => {
                if(response.status == 200) {
                    this.registered = false
                } else {
                    this.registered = false;
                }
            })
        },
        addRegistry() {
            axios.post('http://localhost:8080/api/sign/add', {
                jobId: this.actualJobId,
                employeeId: this.userId,
                status: 0
            })
            .then(response => {
                if(response.status == 201) {
                    this.registered = true;
                }
            })
            .catch(error => alert(error));
        },
        deleteRegistry() {
            axios.post('http://localhost:8080/api/sign/delete', {
                jobId: this.actualJobId,
                employeeId: this.userId,
                status: 0
            })
            .then(response => {
                if(response.status == 200) {
                    this.registered = false;
                }
            })
            .catch(error => alert(error));
        }
    }
}

</script>
