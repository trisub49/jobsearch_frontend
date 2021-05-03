<template>

    <div class="employeeprofile">
        <div id="profilemain">
            <div id="profilehead">
                <img v-if="hasPicture" id="profilepic" src="img/jobseeker.jpg" alt="Saját kép">
                <img v-else id="profilepic" src="img/empty_user.jpg" alt="Saját kép">
            </div>
            <div id="profilebody">
                <table>
                    <tr><td class="dataname">Név:</td><td class="datavalue">{{employee.name}}</td></tr>
                    <tr><td class="dataname">Életkor:</td><td class="datavalue">{{employee.age}}</td></tr>
                    <tr><td class="dataname">Lakhely:</td><td class="datavalue">{{employee.settlement}}</td></tr>
                    <tr><td class="dataname">Telefonszám:</td><td class="datavalue">{{employee.phoneNumber}}</td></tr>
                </table>
            </div>
            <div id="profileactions">
                <button>Kép törlése</button>
                <button class="float-right" @click="$router.push('/profile/editemployee')">Szerkesztés</button>
            </div>
            <div id="jobsandschools"><PastJobsAndSchools /></div>
        </div>
    </div>

</template>

<style scoped>

button {
    width: 110px;
    margin-top: 10px;
    padding: 0;
    padding-left: 3px;
    padding-right: 3px;
    font-size: small;
}
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

</style>

<script>

import PastJobsAndSchools from '@/components/PastJobsAndSchools.vue'

export default {
    name: 'employeeprofile',
    components: {
        PastJobsAndSchools
    },
    data() {
        return {
            employee : {
                name: sessionStorage.getItem('name'),
                age: this.calculateAge(sessionStorage.getItem('birthDate')),
                settlement: !sessionStorage.getItem('settlement') ? "Nincs megadva" : sessionStorage.getItem('settlement'),
                phoneNumber: !sessionStorage.getItem('phoneNumber') ? "Nincs megadva" : sessionStorage.getItem('phoneNumber') 
            }
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
        }
    }
}

</script>
