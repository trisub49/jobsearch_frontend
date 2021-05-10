<template>

    <v-container class="addpastschool">
        <MainPageStructure title="Tanulmány hozzáadása">
            <v-card>
                <v-card-text>
                    <v-form>
                        <v-text-field
                            prepend-icon="mdi-domain"
                            label="Iskola neve"
                            v-model="school" 
                            placeholder="pl.: Türr István Gazdasági Szakgimnázium" 
                            required
                        />
                        <v-text-field 
                            prepend-icon="mdi-calendar-range"
                            label="Meddig tanultál itt?" 
                            v-model="date" 
                            placeholder="pl.: 2016-2020" 
                            required
                        />
                        <v-text-field 
                            prepend-icon="mdi-school-outline"
                            label="Megszerzett képesítés"
                            v-model="education" 
                            placeholder="pl.: Rendszergazda" 
                            required
                        />
                    </v-form>
                </v-card-text>
                <v-card-actions class="justify-center">
                    <v-btn class="mainbutton" depressed width="50%" @click="saveSchool()">
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
