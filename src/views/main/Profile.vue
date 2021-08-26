<template>
	<v-container v-if="!$store.state.pageLoaderStatus" class="col-12 col-sm-10 col-md-8 col-lg-8 col-xl-8" >
		<v-container v-if="loggedIn == true && userType == true" fluid>
				<EmployerProfile />
				<v-container class="text-center">
					<v-btn class="mainbutton" depressed @click="logout()">
						Kijelentkezés
						<v-icon>mdi-logout</v-icon>
					</v-btn>
				</v-container>
		</v-container>
	<v-container v-else-if="loggedIn == true && userType == false">
			<EmployeeProfile />
			<v-container class="text-center">
				<v-btn class="mainbutton" depressed @click="logout()">
						Kijelentkezés
						<v-icon>mdi-logout</v-icon>
				</v-btn>
			</v-container>
	</v-container>
</v-container>
    
</template>

<script>

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
		this.$store.state.pageLoaderStatus = 1;
		setTimeout(() => {
			this.$store.state.pageLoaderStatus = 0;
			if(sessionStorage.getItem('id')) { 
				this.loggedIn = true;
				if(sessionStorage.getItem('type') == 'true') this.userType = true;
				else this.userType = false;
			}
			if(this.loggedIn == false) { 
				this.$router.push('/profile/login');
			}
		}, 500);
	},
	components: {
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
