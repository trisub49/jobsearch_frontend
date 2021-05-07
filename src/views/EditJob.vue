<template>
    
    <div class="editjob">
        <MainPageStructure title="Hirdetés szerkesztése:">
            <form @submit.prevent>
                <label for="scope">Munkakör megnevezése:</label>
                <input v-model="job.scope" name="scope" type="text" required><br>
                <CategoryList />
                <label for="category">Kategória:</label>
                <input v-model="job.category" list="categorylist" name="category" required><br>
                <label for="adtext">Információ a munkáról, feltételek, juttatások:</label>
                <textarea v-model="job.adText" name="adtext" maxlength="1024" required></textarea><br>
                <SettlementList />
                <label for="settlement">Munkavégzés helye:</label>
                <input v-model="job.settlement" list="settlementlist" name="settlement" required><br>
                <label for="deadline">Jelentkezési határidő:</label><br>
                <input v-model="job.deadline" type="date" name="deadline" min='.$now.' required><br><br>
                <div class="buttonwrapper"><button @click="editJob()">Kész</button></div>
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

    props: [
        'actualjob'
    ],

    data() {
        return {
            job: this.actualjob
        }
    },
    
    methods: {
        editJob() {
            axios.post("http://localhost:8080/api/job/edit", {
                adText: this.job.adText,
                category: this.job.category,
                deadline: this.job.deadline,
                scope: this.job.scope,
                settlement: this.job.settlement,
                employerId: sessionStorage.getItem('id'),
                id: this.job.id
            })
            .then(response => {
                if(response.status == 200) {
                    this.$router.push('/myjobs');
                }
            })
            .catch(error => console.log(error));
        }
    }
}
</script>
