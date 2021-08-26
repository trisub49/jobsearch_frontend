<template>

	<div class="profile">
		<div v-if='loggedIn == true && userType == true'>
			<PageStructure title="Álláshirdetői profil">
				<EmployerProfile></EmployerProfile>
				<v-container class="text-center">
						<v-btn class="mainbutton" depressed v-on:click="logout">
							Kijelentkezés
							<v-icon>mdi-logout</v-icon>
						</v-btn>
					</v-container>
				</PageStructure>
			</div>
		<div v-else-if='loggedIn == true && userType == false'>
			<PageStructure title="Álláskeresői profil">
				<EmployeeProfile></EmployeeProfile>
				<v-container class="text-center">
						<v-btn class="mainbutton" depressed v-on:click="logout">
								Kijelentkezés
								<v-icon>mdi-logout</v-icon>
						</v-btn>
				</v-container>
			</PageStructure>
		</div>
		<div v-else><Login /></div>
	</div>
    
</template>

<script>

    import Login from '@/components/common/Login.vue';
    import PageStructure from '@/components/main/PageStructure.vue';
    import EmployeeProfile from '@/components/employee/EmployeeProfile.vue';
    import EmployerProfile from '@/components/employer/EmployerProfile.vue';

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
            PageStructure,
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
