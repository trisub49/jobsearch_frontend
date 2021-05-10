<template>

    <div class="register">
        <MainPageStructure title="Regisztráció">
            <v-container>
                <button id="first" @click=clickedToType(false)>Álláskeresőként</button>
                <button id="second" @click=clickedToType(true)>Munkaadóként</button>
                <v-spacer />
            </v-container>
            <v-container v-if="!asEmployer"> <RegisterEmployee /> </v-container>
            <v-container v-else> <RegisterEmployer /> </v-container>
        </MainPageStructure>
    </div>

</template>

<style scoped>

button {
    margin-left: 5%;
    margin-right: 5%;
    padding: 7.5px;
    text-align: center;
    font-weight: bold;
    display: inline-block;
    background-color: white;
    width: 40%;
    border: 0.5px solid black;
    text-decoration: none;
    border-radius: 2.5px;
}
button:hover {
    cursor: pointer;
}
button:focus {
    outline: none;
}
#first {
    float: left;
}
#second{
    float: right;
}

</style>

<script>

import MainPageStructure from '@/components/MainPageStructure.vue'
import RegisterEmployee from '@/components/RegisterEmployee.vue'
import RegisterEmployer from '@/components/RegisterEmployer.vue'

export default {
    components: {
        MainPageStructure,
        RegisterEmployee,
        RegisterEmployer
    },
    data() {
        return {
            asEmployer: false
        }
    },
    created() {
        setTimeout(() => this.clickedToType(false), 1);
    },
    methods: {
        clickedToType: function(isEmployer) {
            if(!isEmployer) {
                document.querySelector("#first").style.backgroundColor = "lightblue";
                document.querySelector("#second").style.backgroundColor = "white";
                this.asEmployer = false;
            } 
            else {
                document.querySelector("#first").style.backgroundColor = "white";
                document.querySelector("#second").style.backgroundColor = "lightblue";
                this.asEmployer = true;
            }
        }
    }
}

</script>
