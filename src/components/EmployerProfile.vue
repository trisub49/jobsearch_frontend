<template>

    <div class="employerprofile">
        <v-container>
            <v-btn>Hello</v-btn>
        </v-container>
        <div id="profilemain">
            <div id="profilehead">
                <img v-if="employer.picture != null" id="profilepic" :src="loadedPicture" alt="Saját kép">
                <img v-else id="profilepic" src="img/empty_user.jpg" alt="Saját kép">
            </div>
            <div id="profilebody">
                <table>
                    <tr><td class="dataname">Cégnév:</td><td class="datavalue">{{employer.company}}</td></tr>
                    <tr><td class="dataname">Képviselő:</td><td class="datavalue">{{employer.name}}</td></tr>
                    <tr><td class="dataname">Telephely:</td><td class="datavalue">{{employer.settlement}}</td></tr>
                    <tr><td class="dataname">Telefonszám:</td><td class="datavalue">{{employer.phoneNumber}}</td></tr>
                </table>
            </div>
            <div id="profileactions">
                <div v-if="employer.picture != null" id="pictureaction">
                    <button @click="deletePicture">Kép törlése</button>
                </div>
                <div v-else id="pictureaction">
                    <input type="file" accept="image/png, image/jpeg" @change="onFileSelected" />
                    <button v-if="selectedFile != null" @click="onFileUpload">Feltöltés</button>
                </div>  
                <div id="profileedit">
                    <button @click="$router.push('/profile/editemployer')">Szerkesztés</button>
                </div>
            </div>
            <div id="profiledescriptionholder">
                <h5><b>A cégről:</b></h5>
                <div v-if="employer.description.length > 0" id="profiledescription">{{employer.description}}</div>
                <div v-else id="profiledescription">Nincs megadva</div>
            </div>
        </div>
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
    clear: both;
    width: 100%;
}
#profilebody {
    float: right;
    padding-bottom: 15px;
    width: 70%;
}
#profilehead {
    float: left;
    padding-left: 10px;
    width: 30%;
}
#profiledescriptionholder {
    border: 0.5px solid rgba(0,0,0,0.3);
    border-radius: 2px 2px;
    padding: 10px;
    background: white;
    clear: both;
    margin-top: 30px;
    margin-bottom: 20px;
}
#profiledescription {
    text-align: justify;
    padding-left: 20px;
    padding-right: 20px;
    color: black;
    font-weight: 500;
}
#profileactions {
    clear: both;
    width: 100%;
    padding-bottom: 20px;
}
#profilepic {
    border: 0.75px solid rgba(0,0,0,0.3);
    height: 110px;
    width: auto;
}
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
table {
    width: 100%;
}
.dataname {
    padding-right: 15px;
    width: 20%;
}
.datavalue {
    color: rgb(51,102,187);
    font-weight: bold;
    width: 70%;
}
#profileedit {
    float: right;
}
#pictureaction {
    float: left;
}

</style>

<script>

import axios from 'axios';

export default {

    name: 'employerprofile',

    data() {
        return {
            employer: {
                company: sessionStorage.getItem('company'),
                name: sessionStorage.getItem('name'),
                settlement: !sessionStorage.getItem('settlement') ? 'Nincs megadva' : sessionStorage.getItem('settlement'),
                phoneNumber: sessionStorage.getItem('phoneNumber'),
                description: sessionStorage.getItem('description'),
                picture: !sessionStorage.getItem('picture') ? null : sessionStorage.getItem('picture')
            },
            selectedFile: null,
            loadedPicture: null
        }
    },

    created() {
        if(this.employer.picture != null && this.employer.picture != 'null') {
            this.getEmployerPicture();
        }
    },

    methods: {
        onFileSelected(event) {
            this.selectedFile = event.target.files[0];
        },
        onFileUpload() {
            const formData = new FormData();
            var id = sessionStorage.getItem('id')
            formData.append('image', this.selectedFile, this.selectedFile.name);
            axios.post(`http://localhost:8080/api/img/upload/employer/${id}`, formData)
            .then(response => {
                if(response.status == 201) {
                    sessionStorage.setItem('picture', id.concat("_").concat(this.selectedFile.name));
                    this.employer.picture = sessionStorage.getItem('picture');
                    this.getEmployerPicture();
                    this.selectedFile = null;
                } else {
                    alert("Valami hiba történt!");
                }
            });
        },
        getEmployerPicture() {
            axios.get(`http://localhost:8080/api/img/get/employer/${this.employer.picture}`, {responseType: 'arraybuffer'})
            .then(response => {
                if(response.status == 200) {
                    this.loadedPicture = "data:image/jpg;base64, ".concat(Buffer.from(response.data, 'binary').toString('base64'));
                }
            });
        },
        deletePicture() {
            axios.delete(`http://localhost:8080/api/img/delete/employer/${this.employer.picture}`)
            .then(response => {
                if(response.status == 200) {
                    sessionStorage.setItem('picture', '');
                    this.employer.picture = null;
                    this.loadedPicture = null;
                }
            });
        }
    }
}

</script>
