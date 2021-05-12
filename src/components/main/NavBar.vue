<template>
	<v-app-bar id="nav" fixed dense dark color="rgba(0, 0, 0, 0.75)">
		<ul class="d-none d-sm-none d-md-block d-lg-block d-xl-block">
			<li v-for="menu in menus" :key="menu.name">
				<a v-if="menu.condition" @click="$router.push(menu.link)"> <v-icon>{{menu.icon}}</v-icon>{{menu.name}}</a>
			</li>
		</ul>
		<ul class="d-block d-sm-block d-md-none d-lg-none d-xl-none">
			<li v-for="menu in menus" :key="menu.name">
				<a v-if="menu.condition" @click="$router.push(menu.link)"> <v-icon>{{menu.icon}}</v-icon></a>
			</li>
		</ul>
	</v-app-bar>
</template>

<style scoped>
.v-app-bar {
  font-family: "Inconsolata", monospace;
  text-transform: uppercase;
}
li {
	display: inline-block;
	padding-right: 10px;
}
li a {
  padding: 10px;
  text-decoration: none;
	color: white;
  text-shadow: 1px 1px darkslategray;
}
li :hover {
	transition: ease;
	border-bottom: 2px 2px darkslategray;
}
.v-icon {
	padding: 5px;
}
</style>

<script>
export default {
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