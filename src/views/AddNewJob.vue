<template>
    
    <div class="addjob">
        <MainPageStructure title="Hirdetés feladása:">
            <form @submit.prevent>
                <label for="scope">Munkakör megnevezése:</label>
                <input v-model="scope" name="scope" type="text" placeholder="Kőműves, java programozó, stb..." required><br>
                <CategoryList />
                <label for="category">Kategória:</label>
                <input v-model="category" list="categorylist" name="category" required><br>
                <label for="adtext">Információ a munkáról, feltételek, juttatások:</label>
                <textarea v-model="adText" name="adtext" maxlength="1024" placeholder="Az itt megadott leírás fog megjelenni a hirdetésben" required></textarea><br>
                <SettlementList />
                <label for="settlement">Munkavégzés helye:</label>
                <input v-model="settlement" list="settlementlist" name="settlement" required><br>
                <label for="deadline">Jelentkezési határidő:</label><br>
                <input v-model="deadline" type="date" name="deadline" min='.$now.' required><br><br>
                <div class="buttonwrapper"><button @click="addJob()">Kész</button></div>
            </form>
        </MainPageStructure>
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

textarea :focus {
    outline: none;
}

</style>

<script>

import MainPageStructure from '@/components/MainPageStructure.vue'
import CategoryList from '@/components/CategoryList.vue'
import SettlementList from '@/components/SettlementList.vue'
import axios from 'axios';

export default {

    components: {
        MainPageStructure,
        CategoryList,
        SettlementList
    },

    data() {
        return {
            scope: '',
            category: '',
            adText: '',
            settlement: '',
            deadline: ''
        }
    },

    methods: {
        addJob() {
            axios.post("http://localhost:8080/api/job/save", {
                adText: this.adText,
                category: this.category,
                deadline: this.deadline,
                scope: this.scope,
                settlement: this.settlement,
                employerId: sessionStorage.getItem('id')
            })
            .then(response => {
                if(response.status == 201) {
                    this.$router.push('/myjobs');
                }
            })
            .catch(error => console.log(error));
        }
    }
}
</script>
