<template>

    <div class="employeeprofile">
        <div id="profilemain">
            <div id="profilehead">
                <img v-if="employee.picture != null" id="profilepic" :src="loadedPicture" alt="Saját kép">
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
                <div v-if="employee.picture != null" id="pictureaction">
                    <button @click="deletePicture">Kép törlése</button>
                </div>
                <div v-else id="pictureaction">
                    <input type="file" accept="image/png, image/jpeg" @change="onFileSelected" />
                    <button v-if="selectedFile != null" @click="onFileUpload">Feltöltés</button>
                </div>
                <div id="profileedit">
                    <button class @click="$router.push('/profile/editemployee')">Szerkesztés</button>
                </div>
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
input {
    border: none;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 0;
    font-size: small;
    font-weight: bold;
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
table {
    width: 100%;
}
.dataname {
    padding-right: 15px;
    width: 50%;
}
.datavalue {
    color: rgb(51,102,187);
    font-weight: bold;
    width: 100%;
}
#profileactions {
    clear: both;
}
#jobsandschools {
    clear: both;
}
#profileedit {
    float: right;
    width: 30%;
}
#pictureaction {
    float: left;
    width: 70%;
}

</style>

<script>

import axios from 'axios'
import PastJobsAndSchools from '@/components/PastJobsAndSchools.vue'

export default {

    name: 'employeeprofile',

    components: {
        PastJobsAndSchools
    },

    data() {
        return {
            employee : {
                id: sessionStorage.getItem('id'),
                name: sessionStorage.getItem('name'),
                age: this.calculateAge(sessionStorage.getItem('birthDate')),
                settlement: !sessionStorage.getItem('settlement') ? "Nincs megadva" : sessionStorage.getItem('settlement'),
                phoneNumber: !sessionStorage.getItem('phoneNumber') ? "Nincs megadva" : sessionStorage.getItem('phoneNumber'), 
                picture: !sessionStorage.getItem('picture') ? null : sessionStorage.getItem('picture')
            },
            selectedFile: null,
            loadedPicture: null
        }
    },

    created() {
        if(this.employee.picture != null) {
            this.getEmployeePicture();
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
        onFileSelected(event) {
            this.selectedFile = event.target.files[0];
        },
        onFileUpload() {
            const formData = new FormData();
            var id = sessionStorage.getItem('id')
            formData.append('image', this.selectedFile, this.selectedFile.name);
            axios.post(`http://localhost:8080/api/img/upload/employee/${id}`, formData)
            .then(response => {
                if(response.status == 201) {
                    sessionStorage.setItem('picture', id.concat("_").concat(this.selectedFile.name));
                    this.employee.picture = sessionStorage.getItem('picture');
                    this.getEmployeePicture();
                    this.selectedFile = null;
                } else {
                    alert("Valami hiba történt!");
                }
            })
        },
        getEmployeePicture() {
            axios.get(`http://localhost:8080/api/img/get/employee/${this.employee.picture}`, {responseType: 'arraybuffer'})
            .then(response => {
                if(response.status == 200) {
                    this.loadedPicture = "data:image/jpg;base64, ".concat(Buffer.from(response.data, 'binary').toString('base64'));
                }
            });
        },
        deletePicture() {
            axios.delete(`http://localhost:8080/api/img/delete/employee/${this.employee.picture}`)
            .then(response => {
                if(response.status == 200) {
                    sessionStorage.setItem('picture', '');
                    this.employee.picture = null;
                    this.loadedPicture = null;
                }
            })
        }
    }
}

</script>
