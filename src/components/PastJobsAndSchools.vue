<template>

    <div class="pastjobsandschools">
        <hr>
        <h5><b>Tanulmányok:</b></h5>
        <div class="lists" v-if="schools.length">
            <table>
                <tr v-for="school in schools" :key="school.id">
                    <td class="forschoolanddate">{{school.school}} ({{school.date}})</td><td class="foreducation">{{school.education}}</td>
                    <td class="fordeletebutton"><button @click="deleteSchool(school.id)" class="deletebutton">X</button></td>
                </tr>
            </table>
        </div>
        <div v-else>Nincs megadva</div>
        <button @click="$router.push('/profile/addschool')" class="addto">+ Hozzáadás</button>
        <hr>
        <h5><b>Volt munkahelyek:</b></h5>
        <div class="lists" v-if="jobs.length">
            <table>
                <tr v-for="job in jobs" :key="job.id">
                    <td class="forschoolanddate">{{job.job}} ({{job.date}})</td><td class="foreducation">{{job.scope}}</td>
                    <td class="fordeletebutton"><button @click="deleteJob(job.id)" class="deletebutton">X</button></td>
                </tr>
            </table>
        </div>        
        <div v-else>Nincs megadva</div>
        <button @click="$router.push('/profile/addjob')" class="addto">+ Hozzáadás</button>
    </div>

</template>

<style scoped>

span {
    width: 100%;
}
.lists {
    text-align: left;
    padding-left: 2.5%;
    padding-right: 2.5%;
    color: rgb(51,102,187);
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
.deletebutton {
    font-size: medium;
    font-weight: bold;
    border: none;
    background: none;
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
