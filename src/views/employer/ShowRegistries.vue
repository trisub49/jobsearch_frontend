<template>

   <div class="showregistries">
       <PageStructure title = "Jelentkezők">
            <a v-for="registry in registries" :key="registry.id" @click="showEmployee(registry)">
                <div class="employees">
                    <div class="profilepicwrapper">
                        <img class="profilepic" src="img/empty_user.jpg" alt="Saját kép">
                    </div>
                    <div class="employeeinfo">
                        <h5>{{registry.employeeName}}</h5>
                        Kor: {{calculateAge(registry.employeeBirthDate)}}<br> 
                        Állapot: {{registry.status}}
                    </div>
                </div>
            </a>
        </PageStructure>
    </div>

</template>



<style scoped>

a {
    display: block;
}
a :focus {
    cursor: pointer;
}

.employees {
    clear: both;
}
.profilepic {
    width: 110px;
    height: 110px;
    margin-bottom: 10px;
}
.profilepicwrapper {
    float: left;
}
.employeeinfo {
    font-weight: bold;
    float: left;
    margin-left: 10px;
}

</style>

<script>

import PageStructure from '@/components/main/PageStructure.vue'

export default {

    components: {
        PageStructure
    },

    props: [ 
        'registryList'
    ],

    data() {
        return {
            registries: this.registryList,
        }
    },

    created() {
        console.log(this.registryList);
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
        showEmployee(reg) {
            this.$router.push({name: "ShowEmployee", params: {registry: reg}});
        }
    }
}

</script>