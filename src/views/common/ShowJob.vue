<template>
    
    <div class="showjob">
        <PageStructure title = "Álláshirdetés adatok">
            <JobView :showdesc="true" :job="job" />
            <v-container v-if="job.employerId == userId && loggedIn && userType">
                <v-btn class="mainbutton" depressed @click="$router.push({name: 'EditJob', params: {actualjob: job}})" width="50%">
                    <v-icon>mdi-pencil-outline</v-icon>
                    Szerkesztés
                </v-btn>
                <v-btn class="mainbutton" depressed @click="deleteJob(actualjobId)" width="50%">
                    <v-icon>mdi-delete-outline</v-icon>
                    Törlés
                </v-btn>
            </v-container>
            <v-container v-if="!userType && loggedIn" class="text-center">
                <v-btn class="mainbutton" depressed v-if="!registered" @click="addRegistry()" width="50%">
                    <v-icon>mdi-hand</v-icon>
                    Jelentkezés
                </v-btn>
                <v-btn class="mainbutton" depressed v-else @click="deleteRegistry()" width="50%">
                    <v-icon>mdi-backup-restore</v-icon>
                    Jelentkezés visszavonása
                </v-btn>
            </v-container>
        </PageStructure>
    </div>

</template>

<script>

import axios from 'axios';
import PageStructure from '@/components/main/PageStructure.vue'
import JobView from '@/components/common/JobView.vue'

export default {
    
    name: 'ShowJob',

    props: [
        'job'
    ],

    components: {
        PageStructure,
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
