<template>

    <div class="registeremployee">
        <form name="registerform" @submit="inspection" v-on:submit.prevent>
            <label for="name">Saját neved:</label><br>
            <input v-model="name" name="name" type="text" required><br>
            <label for="email">E-Mail:</label><br>
            <input v-model="email" name="email" type="email" required><br>
            <label for="password">Jelszó:</label><br>
            <input v-model="password" name="password" type="password" required minlength="8" maxlength="16"><br>
            <label for="password2">Jelszó megerősítése:</label><br>
            <input v-model="password2" name="password2" type="password" required minlength="8" maxlength="16"><br>
            <label for="birtdate">Születési dátum:</label><br>
            <input v-model="birthdate" name="birthdate" type="date" required><br><br>
            <div class="buttonwrapper"><button type="submit">Regisztráció</button></div><br>
        </form>
    </div>    

</template>

<script>

import axios from 'axios';

export default {

    data() {
        return {
            name: '',
            email: '',
            password: '123',
            password2: '355',
            birthdate: ''
        }
    },

    methods: {
        calculateAge(dateString) {
            var today = new Date();
            var birthDate = new Date(dateString);
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
        },
        inspection() {
            if(this.password !== this.password2) {
                alert("Nem egyeznek a jelszavak!");
            } else if(this.calculateAge(this.birthdate) < 18) {
                alert("Fiatalkorúak nem regisztrálhatnak!");
            } else {
                axios.post("http://localhost:8080/api/auth/register-employee", {
                    name: this.name, 
                    email: this.email, 
                    password: this.password, 
                    birthDate: this.birthdate
                })
                .then(response => response.data)
                .then(data => {
                    console.log(data);
                    if(!data) {
                        alert("Sikertelen regisztráció!");
                    } else {
                        sessionStorage.clear();
                        sessionStorage.setItem("loggedIn", true);
                        sessionStorage.setItem("id", data.id);
                        sessionStorage.setItem("status", data.status);
                        sessionStorage.setItem("name", data.name);
                        sessionStorage.setItem("type", false);
                        sessionStorage.setItem("email", data.email);
                        sessionStorage.setItem("phoneNumber", data.phoneNumber)
                        sessionStorage.setItem("settlement", data.settlement);
                        sessionStorage.setItem("birthdate", data.birthDate);
                        this.$router.push("/profile");
                    }
                })
                .catch(error => console.log(error));
            }
        }
    }
}

</script>
