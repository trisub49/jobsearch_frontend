<template>

    <div id="main">
        <MainPageStructure title="Bejelentkezés">
            <div class="content">
                <form id="loginform" @submit="authenticate" v-on:submit.prevent>
                    <label for="email">E-Mail:</label><br>
                    <input v-model="email" name="email" type="email" placeholder="valami@valami.com" required><br>
                    <label for="password">Jelszó:</label><br>
                    <input v-model="password" name="password" type="password" placeholder="********" required minlength="8"><br>
                    <label for="isemployer">Bejelentkezés mint munkaadó</label>
                    <input v-model="type" name="isemployer" type="checkbox" ><br>
                    <div class="buttonwrapper"><button type="submit">Bejelentkezés</button></div><br>
                </form>
                <router-link to="/profile/register">Még nem regisztráltál?</router-link>
            </div>
        </MainPageStructure>  
    </div>   

</template>

<style scoped>

input[type=checkbox] {
    border: 0.5px solid  rgba(0,0,0,0.3);
    border-radius: 3px 3px;
    margin-left: 20px;
}

</style>

<script>

import axios from 'axios';
import MainPageStructure from '@/components/MainPageStructure.vue'

export default {

    name: 'login',

    components: {
        MainPageStructure
    },

    data() {
        return {
            email: '',
            password: '',
            type: false,
        }
    },

    methods: {
        fillStorage(datas) {
            sessionStorage.clear();
            for(const prop in datas) {
                sessionStorage.setItem(prop,datas[prop]);
            }
            sessionStorage.setItem('loggedIn', true);
            sessionStorage.setItem('type', this.type);
            location.reload();
        },

        authenticate() {
            axios.post("http://localhost:8080/api/auth/login", {
                email: this.email, 
                password: this.password, 
                type: this.type
            })
            .then(response => response.data)
            .then(data => {
                console.log(data);
                if(data.id) { 
                    this.fillStorage(data);
                } else {
                    if(data.message == "not in database") {
                        alert("A megadott e-mail nincs az adatbázisban!");
                    } else if(data.message == "password not correct") {
                        alert("A megadott jelszó helytelen!");
                    }
                }
            })
            .catch(error => alert(error));
        }
    }
}

</script>
