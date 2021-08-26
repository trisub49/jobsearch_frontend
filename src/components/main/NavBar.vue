<template>
	<v-container fluid class="pa-0 ma-0 float-left">
		<v-app-bar id="nav" fixed dense dark color="rgba(0, 0, 0, 0.75)">
			<ul class="d-none d-sm-none d-md-block d-lg-block d-xl-block pa-0 ma-0">
				<li v-for="menu in menusx" :key="menu.name" class="d-inline-block px-2">
					<router-link class="menuelement" :to="menu.link">
						{{menu.name}}
					</router-link>
				</li>
			</ul>
			<ul class="d-block d-sm-block d-md-none d-lg-none d-xl-none pa-0 ma-0">
				<li v-for="menu in menusx" :key="menu.name" class="d-inline-block px-2">
					<router-link class="menuelement" :to="menu.link">
						<v-icon>{{menu.icon}}</v-icon>
					</router-link>
				</li>
			</ul>
		</v-app-bar>
		<Loading class="mt-12"/>
	</v-container>
</template>

<style scoped>
.v-app-bar {
  font-family: 'Quicksand', sans-serif;
  text-transform: uppercase;
}
.menuelement {
	text-decoration: none;
	color: white;
}
.router-link-exact-active {
	color: gold !important;
}
</style>

<script>
import Loading from '@/components/main/Loading.vue';

export default {
	components: {
		Loading,
	},
	data() {
		return {
			menus: [
				{name: 'Friss', link: '/', icon: 'mdi-newspaper-variant-outline', condition: true},
				{name: 'Keresés', link: '/search', icon: 'mdi-magnify', condition: true},
				{name: 'Profil', link: '/profile', icon: 'mdi-account-circle-outline', condition: true},
				{name: 'Hirdetéseim', link: '/myjobs', icon: 'mdi-newspaper-variant-outline', condition: this.isEmployerAndLoggedIn()},
				{name: 'Jelentkezéseim', link: '/myregistries', icon: 'mdi-newspaper-variant-outline', condition: this.isEmployeeAndLoggedIn()}
			]
		}
	},

	computed: {
		menusx() {
			return this.menus.filter(x => x.condition == true);
		}
	},
	methods: {
		isEmployerAndLoggedIn() {
			if(sessionStorage.getItem("loggedIn") == "true" && sessionStorage.getItem("type") == "true") {
				return true;
			}
			return false;
		},
		
		isEmployeeAndLoggedIn() {
			if(sessionStorage.getItem("loggedIn") == "true" && sessionStorage.getItem("type") == "false") {
				return true;
			}
			return false;
		}
	}
}

</script>