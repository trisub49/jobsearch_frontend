<template>

    <v-container class="pastjobsandschools">
        <h3>Tanulmányok:</h3>
        <v-spacer />
        <v-container class="lists" v-if="schools.length">
            <table>
                <tr v-for="school in schools" :key="school.id">
                    <td class="forschoolanddate">{{school.school}} ({{school.date}})</td><td class="foreducation"><b>{{school.education}}</b></td>
                    <td class="fordeletebutton"><v-btn icon @click="deleteSchool(school.id)"><v-icon>mdi-delete-outline</v-icon></v-btn></td>
                </tr>
            </table>
        </v-container>
        <v-container v-else class="lists">Nincs megadva</v-container>
        <v-btn @click="$router.push('/profile/addschool')" icon small>
            <v-icon>mdi-plus-thick</v-icon>
        </v-btn>
        <v-divider />
        <h3>Volt munkahelyek:</h3>
        <v-spacer />
        <v-container class="lists" v-if="jobs.length">
            <table>
                <tr v-for="job in jobs" :key="job.id">
                    <td class="forschoolanddate">{{job.job}} ({{job.date}})</td><td class="foreducation"><b>{{job.scope}}</b></td>
                    <td class="fordeletebutton"><v-btn icon @click="deleteJob(job.id)"><v-icon>mdi-delete-outline</v-icon></v-btn></td>
                </tr>
            </table>
        </v-container>        
        <v-container v-else class="lists">Nincs megadva</v-container>
        <v-btn @click="$router.push('/profile/addjob')" icon small>
            <v-icon>mdi-plus-thick</v-icon>
        </v-btn>
    </v-container>

</template>

<style scoped>

.pastjobsandschools {
    font-size: small;
    line-height: unset;
}

span {
    width: 100%;
}
.lists {
    text-align: left;
    padding-left: 2.5%;
    padding-right: 2.5%;
}
.addto {
    margin-top: 10px;
    padding: 0;
    padding-left: 3px;
    padding-right: 3px;
    width: 110px;
    font-size: small;
}
.del {
    float: right;
}
table {
    width: 100%;
}
.forschoolanddate {
    width: 57%;
    text-align: left;
    color: black;
}
.foreducation {
    width: 40%;
    text-align: left;
}
.fordeletebutton {
    text-align: right;
    width: 3%;
}

</style>

<script>

import axios from 'axios';

export default {

    name: 'pastschoolsandjobs',

    data() {
        return {
            schools: [],
            jobs: []
        }
    },

    created() {
        this.getSchoolsAndJobs(sessionStorage.getItem('id'));
    },

    methods: {
        getSchoolsAndJobs(id) {
            axios.get(`http://localhost:8080/api/info/${id}`)
            .then(response => response.data)
            .then(data => {
                if(data.schoolList) {
                    this.schools = data.schoolList;
                }
                if(data.jobList) {
                    this.jobs = data.jobList;
                }
            })
            .catch(error => console.log(error));
        },
        deleteSchool(id) {
            this.schools = this.schools.filter(school => school.id != id);
            axios.delete(`http://localhost:8080/api/info/delete/school/${id}`);
        },
        deleteJob(id) {
            this.jobs = this.jobs.filter(job => job.id != id);
            axios.delete(`http://localhost:8080/api/info/delete/job/${id}`);
        }
    }
}

</script>
