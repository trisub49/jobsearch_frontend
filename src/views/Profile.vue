<template>

    <div class="profile">
        <div v-if='loggedIn == true && userType == true'>
            <MainPageStructure title="Álláshirdetői profil">
                <EmployerProfile></EmployerProfile>
                <div class="buttonwrapper"><button v-on:click="logout">Kijelentkezés</button></div>
            </MainPageStructure>
        </div>
        <div v-else-if='loggedIn == true && userType == false'>
            <MainPageStructure title="Álláskeresői profil">
                <EmployeeProfile></EmployeeProfile>
                <div class="buttonwrapper"><button v-on:click="logout">Kijelentkezés</button></div>
            </MainPageStructure>
        </div>
        <div v-else><Login /></div>
    </div>
    
</template>

<script>

    import Login from "@/components/Login.vue";
    import MainPageStructure from '@/components/MainPageStructure.vue'
    import EmployeeProfile from '@/components/EmployeeProfile.vue'
    import EmployerProfile from '@/components/EmployerProfile.vue'

    export default {
        name: 'profile',
        data() {
            return {
                loggedIn: false,
                userType: false
            }
        },
        created() {
            if(sessionStorage.getItem('id')) { 
                this.loggedIn = true;
                if(sessionStorage.getItem('type') == 'true') this.userType = true;
                else this.userType = false;
            }
        },
        components: {
            Login,
            MainPageStructure,
            EmployeeProfile,
            EmployerProfile
        },
        methods: {
            logout() {
                sessionStorage.clear();
                location.reload();
            }
        }
    };

</script>
