<template>

    <v-container class="addpastjob">
        <MainPageStructure title="Munkatapasztalat hozzáadása">
            <v-card>
                <v-card-text>
                    <v-form>
                        <v-text-field
                            prepend-icon="mdi-account-tie"
                            label="Munkahely/cég neve"
                            v-model="company" 
                            placeholder="pl.: Türr István Gazdasági Szakgimnázium" 
                            required
                        />
                        <v-text-field 
                            prepend-icon="mdi-calendar-range"
                            label="Meddig dolgoztál itt?" 
                            v-model="date" 
                            placeholder="pl.: 2016-2020" 
                            required
                        />
                        <v-text-field 
                            prepend-icon="mdi-account-hard-hat"
                            label="Betöltött munkakör"
                            v-model="scope" 
                            placeholder="pl.: Rendszergazda" 
                            required
                        />
                    </v-form>
                </v-card-text>
                <v-card-actions class="justify-center">
                    <v-btn class="mainbutton" depressed width="50%" @click="saveJob()">
                        Hozzáadás
                    </v-btn>
                </v-card-actions>
            </v-card>
        </MainPageStructure>    
    </v-container>

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
            })
            .then(response => {
                if(response.status == 201) {
                    this.$router.push('/profile');
                    this.$forceUpdate();
                }
            });
        }
    }
}

</script>
