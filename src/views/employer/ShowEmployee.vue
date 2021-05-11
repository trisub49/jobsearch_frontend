<template>

    <div class="showemployee">
        <PageStructure title = "Jelentkező">
            <div id="profilemain">
                <div id="profilehead">
                    <img v-if="hasPicture" id="profilepic" src="img/jobseeker.jpg" alt="Saját kép">
                    <img v-else id="profilepic" src="img/empty_user.jpg" alt="Saját kép">
                </div>
                <div id="profilebody">
                    <table>
                        <tr><td class="dataname">Név:</td><td class="datavalue">{{actualEmployee.employeeName}}</td></tr>
                        <tr><td class="dataname">Életkor:</td><td class="datavalue">{{calculateAge(actualEmployee.employeeBirthDate)}}</td></tr>
                        <tr><td class="dataname">Lakhely:</td><td class="datavalue">{{actualEmployee.employeeSettlement}}</td></tr>
                        <tr><td class="dataname">Telefonszám:</td><td class="datavalue">{{actualEmployee.employeePhoneNumber}}</td></tr>
                    </table>
                </div>
                <div id="jobsandschools"><hr>
                    <h5><b>Tanulmányok:</b></h5>
                    <div class="lists" v-if="schools.length">
                        <table>
                            <tr v-for="school in schools" :key="school.id">
                                <td class="forschoolanddate">{{school.school}} ({{school.date}})</td><td class="foreducation">{{school.education}}</td>
                            </tr>
                        </table>
                    </div>
                    <div v-else>Nincs megadva</div>
                    <hr>
                    <h5><b>Volt munkahelyek:</b></h5>
                    <div class="lists" v-if="jobs.length">
                        <table>
                            <tr v-for="job in jobs" :key="job.id">
                                <td class="forschoolanddate">{{job.job}} ({{job.date}})</td><td class="foreducation">{{job.scope}}</td>
                            </tr>
                        </table>
                    </div>        
                    <div v-else>Nincs megadva</div>
                </div>
            </div>

            <button @click="setStatus(actualEmployee.id, 1)">Interjúra hív</button>
            <button @click="setStatus(actualEmployee.id, 2)">Elutasít</button>
        </PageStructure>
    </div>

</template>

<style scoped>

#profilemain {
    background-color: white;
    font-weight: bold;
    font-size: small;
    border: 0.5px solid rgba(0,0,0,0.3);
    padding: 10px;
    margin-bottom: 15px;
    line-height: 200%;
    border-radius: 2px 2px;
}
#profilehead {
    width: 125px;
    float: left;
    padding-right: 10px;
}
#profilepic {
    border: 0.75px solid rgba(0,0,0,0.3);
    height: auto;
    width: 110px;
}
#profilebody {
    float: left;
    padding-bottom: 15px;
}
.dataname {
    padding-right: 15px;
    width: 50%;
}
.datavalue {
    color: rgb(51,102,187);
    font-weight: bold;
    width: 50%;
}
#profileactions {
    clear: both;
}
#jobsandschools {
    clear: both;
}
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

</style>

<script>

import PageStructure from '@/components/main/PageStructure.vue'
import axios from 'axios';

export default {

    name: 'ShowEmployee',

    props: [
        'registry'
    ],

    components: {
        PageStructure
    },

    created() {
        this.getSchoolsAndJobs(this.actualEmployee.employeeId);
        if(!this.actualEmployee.employeePhoneNumber) {
            this.actualEmployee.employeePhoneNumber = 'Nincs megadva'
        }
        if(!this.actualEmployee.employeeSettlement) {
            this.actualEmployee.employeeSettlement = 'Nincs megadva'
        }
        console.log(this.actualEmployee.employeeSettlement);
    },

    data() {
        return {
            actualEmployee: this.registry,
            schools: [],
            jobs: []
        }
    },

    methods: {
        calculateAge(dateString) {
            var today = new Date();
            var birthDate = new Date(dateString);
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
            return age;
        },
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
        setStatus(registryId, stat) {
            axios.post(`http://localhost:8080/api/sign/status`, {
                id: registryId,
                status: stat
            });
            if(stat == 1) {
                alert("Jelentkező interjúra hívva!")
            } else {
                alert("Jelentkező elutasítva!");
            }
        }
    }
}

</script>
