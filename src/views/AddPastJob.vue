<template>

    <div class="addpastjob">
        <MainPageStructure title="Munkatapasztalat hozzáadása">
            <form v-on:submit.prevent @submit="saveJob">
                <label for="company">Munkahely/cég neve:</label><br>
                <input v-model="company" name="company" type="text" placeholder="pl.: Türr István Gazdasági Szakgimnázium" required><br>
                <label for="date">Mettől, meddig dolgoztál itt?:</label><br>
                <input v-model="date" name="date" type="text" placeholder="pl.: 2016-2020" required><br>
                <label for="scope">Betöltött munkakör:</label><br>
                <input v-model="scope" name="scope" type="text" placeholder="pl.: Rendszergazda" required>
                <br><br>
                <div class="buttonwrapper"><button type="submit">Hozzáadás</button></div>
            </form>
        </MainPageStructure>    
    </div>

</template>

<script>

import axios from 'axios';
import MainPageStructure from '@/components/MainPageStructure.vue';

export default {

    components: {
        MainPageStructure
    },

    data() {
        return {
            company: '',
            date: '',
            scope: ''
        }
    },

    methods: {
        saveJob() {
            axios.post('http://localhost:8080/api/info/add/job', {
                employeeId: sessionStorage.getItem('id'), 
                job: this.company, 
                date: this.date, 
                scope: this.scope
            });
            this.$router.push('/profile');
        }
    }
}

</script>
