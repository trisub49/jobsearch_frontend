<template>

    <div class="registeremployer">
       <form name="registerform" @submit="inspection()" v-on:submit.prevent>
            <label for="company">Cégnév:</label><br>
            <input v-model="company" name="company" type="text" required><br>
            <label for="name">Saját név:</label><br>
            <input v-model="name" name="name" type="text" required><br>
            <label for="email">E-Mail:</label><br>
            <input v-model="email" name="email" type="email" required><br>
            <label for="password">Jelszó:</label><br>
            <input v-model="password" name="password" type="password" required minlength="8" maxlength="16"><br>
            <label for="password2">Jelszó megerősítése:</label><br>
            <input v-model="password2" name="password2" type="password" required minlength="8" maxlength="16"><br>
            <label for="settlement">Telephely (város):</label><br>
            <input v-model="settlement" name="settlement" type="search" required><br>
            <label for="phonenumber">Telefonszám:</label><br>
            <input v-model="phoneNumber" name="phonenumber" type="tel" required><br><br>
            <div class="buttonwrapper"><button type="submit">Regisztráció</button></div><br>
        </form>
    </div>

</template>


<script>

import axios from 'axios';

export default {

     data() {
        return {
            company: '',
            name: '',
            email: '',
            password: '',
            password2: '',
            settlement: '',
            phoneNumber: ''
        }
    },

    methods: {
        inspection() {
            if(this.password != this.password2) {
                alert("Nem egyeznek a jelszavak!");
            } else {
                axios.post("http://localhost:8080/api/auth/register-employer", {
                    company: this.company, 
                    name: this.name, 
                    email: this.email, 
                    password: this.password, 
                    settlement: this.settlement, 
                    phoneNumber: this.phoneNumber
                })
                .then(response => response.data)
                .then(data => {
                    if(!data) {
                        alert("Sikertelen regisztráció!");
                    } else {
                        sessionStorage.clear();
                        sessionStorage.setItem("loggedIn", true);
                        sessionStorage.setItem("type", true);
                        sessionStorage.setItem("id", data.id);
                        sessionStorage.setItem("name", data.name);
                        sessionStorage.setItem("email", data.email);
                        sessionStorage.setItem("phoneNumber", data.phoneNumber);
                        sessionStorage.setItem("settlement", data.settlement);
                        sessionStorage.setItem("company", data.company);
                        sessionStorage.setItem("description", data.description);
                        this.$router.push("/profile");
                    }
                });
            }
        }
    }
}

</script>
