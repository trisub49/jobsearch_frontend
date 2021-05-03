<template>

    <div class="addpastschool">
        <MainPageStructure title="Tanulmány hozzáadása">
            <form v-on:submit.prevent @submit="saveSchool">
                <label for="school">Iskola neve:</label><br>
                <input v-model="school" name="school" type="text" placeholder="pl.: Türr István Gazdasági Szakgimnázium" required><br>
                <label for="date">Mettől, meddig tanultál itt?:</label><br>
                <input v-model="date" name="date" type="text" placeholder="pl.: 2016-2020" required><br>
                <label for="education">Megszerzett képesítés:</label><br>
                <input v-model="education" name="education" type="text" placeholder="pl.: Rendszergazda" required>
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
            school: '',
            date: '',
            education: ''
        }
    },

    methods: {
        saveSchool() {
            axios.post('http://localhost:8080/api/info/add/school', {
                employeeId: sessionStorage.getItem('id'), 
                school: this.school, 
                date: this.date, 
                education: this.education
            });
            this.$router.push('/profile');
            this.$forceUpdate();
        }
    }
}

</script>
