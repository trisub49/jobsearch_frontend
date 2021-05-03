<template>
    
    <div class="editemployee">
        <MainPageStructure title="Adatmódosítás">
            <form v-on:submit.prevent>
                <label for="name">Saját név:</label><br>
                <input v-model="name" name="name" type="text" required><br>
                <label for="settlement">Lakhely (város):</label><br>
                <input v-model="settlement" name="settlement" type="search" required><br>
                <label for="phoneNumber">Telefonszám:</label><br>
                <input v-model="phoneNumber" name="phoneNumber" type="tel" required><br>
                <br><br>
                <div class="buttonwrapper"><button @click="editProfile">Megváltoztat</button></div><br>
            </form>
        </MainPageStructure>
    </div>

</template>

<script>

import axios from 'axios';
import MainPageStructure from "@/components/MainPageStructure.vue"

export default {

    components: {
        MainPageStructure
    },

    data() {
        return {
            name: sessionStorage.getItem('name'),
            settlement: sessionStorage.getItem('settlement'),
            phoneNumber: sessionStorage.getItem('phoneNumber')
        }
    },

    methods: {
        editProfile() {
            axios.post('http://localhost:8080/api/auth/edit-employee', {
                id: sessionStorage.getItem('id'), 
                name: this.name, 
                settlement: this.settlement, 
                phoneNumber: this.phoneNumber
            })
            .then(response => { 
                if(response.status == status.ok) {
                    sessionStorage.setItem('name', this.name);
                    sessionStorage.setItem('settlement', this.settlement);
                    sessionStorage.setItem('phoneNumber', this.phoneNumber);
                    this.$router.push('/profile')
                }
            })
            .catch(error => console.log(error))
        }
    }
}

</script>
