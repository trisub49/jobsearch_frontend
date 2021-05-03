<template>
    <div class="editemployer">
        <MainPageStructure title="Adatmódosítás">
            <form v-on:submit.prevent>
                <label for="company">Cégnév:</label><br>
                <input v-model="company" name="company" type="text" required><br>
                <label for="name">Saját név:</label><br>
                <input v-model="name" name="name" type="text" required><br>
                <label for="settlement">Telephely:</label><br>
                <input v-model="settlement" name="settlement" type="search" required><br>
                <label for="phoneNumber">Telefonszám:</label><br>
                <input v-model="phoneNumber" name="phoneNumber" type="tel" required><br>
                <label for="description">Leírás a cégről:</label>
                <textarea v-model="description" id="description" name="description" maxlength="1024"></textarea>
                <br><br>
                <div class="buttonwrapper"><button @click="editProfile">Megváltoztat</button></div><br>
            </form>
        </MainPageStructure>
    </div>
</template>

<style scoped>

textarea {
    width: 100%;
    height: 200px;
    border: 0.5px solid  rgba(0,0,0,0.3);
    border-radius: 3px 3px;
    padding: 5px;
}

</style>

<script>

import axios from 'axios';
import MainPageStructure from "@/components/MainPageStructure.vue";

export default {

    components: {
        MainPageStructure
    },

    data() {
        return {
            company: sessionStorage.getItem('company'),
            name: sessionStorage.getItem('name'),
            settlement: sessionStorage.getItem('settlement'),
            phoneNumber: sessionStorage.getItem('phoneNumber'),
            description: sessionStorage.getItem('description')
        }
    },

    methods: {
        editProfile() {
            axios.post('http://localhost:8080/api/auth/edit-employer', {
                id: sessionStorage.getItem('id'), 
                company: this.company, 
                name: this.name, 
                settlement: this.settlement, 
                phoneNumber: this.phoneNumber, 
                description: this.description
            })
            .then(response => { 
                if(response.status == 200) {
                    sessionStorage.setItem('company', this.company);
                    sessionStorage.setItem('name', this.name);
                    sessionStorage.setItem('settlement', this.settlement);
                    sessionStorage.setItem('phoneNumber', this.phoneNumber);
                    sessionStorage.setItem('description', this.description);
                    this.$router.push('/profile')
                }
            })
            .catch(error => console.log(error))
        }
    }
}

</script>