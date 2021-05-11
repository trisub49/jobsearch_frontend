<template>

    <div class="editemployer">
        <PageStructure title="Adatmódosítás">
            <v-card>
                <v-card-text>
                    <v-form>
                        <v-text-field 
                            label="Cégnév"
                            v-model="company" 
                            required 
                        />
                        <v-text-field
                            label="Teljes név" 
                            v-model="name" 
                            required
                        />
                        <v-text-field 
                            label="Telephely"
                            v-model="settlement" 
                            type="search" 
                            required
                        />
                        <v-text-field 
                            label="Telefonszám"
                            v-model="phoneNumber" 
                            required
                        />
                        <v-textarea 
                            label="Leírás a cégről"
                            v-model="description"
                            maxlength="1024"
                            counter
                        />
                    </v-form>
                </v-card-text>
                <v-card-actions class="justify-center">
                    <v-btn class="mainbutton" depressed width="50%" @click="editProfile()">
                        Megváltoztat
                    </v-btn>
                </v-card-actions>
            </v-card>
        </PageStructure>
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
import PageStructure from "@/components/main/PageStructure.vue";

export default {

    components: {
        PageStructure
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