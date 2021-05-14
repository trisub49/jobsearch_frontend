<template>
	<v-container class="showregistries">
		<PageStructure title = "Jelentkezők">
			<Loading v-if="loadStatus == 0" />
			<v-container v-if="loadStatus == 1">
				<a v-for="registry in registries" :key="registry.id" @click="showEmployee(registry.employeeId, registry.id)">
					<v-card>
						<v-card-text>
							<v-row class="employees">
								<v-col class="profilepicwrapper">
									<v-img v-if="registry.employeePicture != 'null' && registry.employeePicture != null" class="profilepic" :src="registry.employeePicture" lazy-src alt="Saját kép" />
									<v-img v-else class="profilepic" src="img/empty_user.jpg" alt="Saját kép" />
								</v-col>
								<v-col class="employeeinfo">
									<h3>{{registry.employeeName}}</h3>
									Kor: {{calculateAge(registry.employeeBirthDate)}}<br> 
									Állapot: {{registry.status}}
								</v-col>
							</v-row>
						</v-card-text>
					</v-card>
				</a>
			</v-container>
		</PageStructure>
	</v-container>
</template>

<style scoped>
a {
	display: block;
}
a :focus {
	cursor: pointer;
}
.v-card {
	margin-bottom: 10px;
}
.profilepic {
	width: 110px;
	height: 110px;
}
.profilepicwrapper {
	float: left;
	width: 120px;
}
.employeeinfo {
	width: auto;
	font-weight: bold;
	float: left;
	margin-left: 10px;
}
</style>

<script>
import axios from 'axios';
import PageStructure from '@/components/main/PageStructure.vue';
import Loading from '@/components/main/Loading.vue';

export default {

	components: {
		PageStructure,
		Loading
	},

	data() {
		return {
			loadStatus: 0,
			registries: [],
		}
	},

	created() {
		this.loadRegistries();
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

		loadRegistries() {
			axios.get(`${this.$store.state.domain}/sign/job/${this.$route.params.jobid}`)
			.then(response => {
				this.registries = response.data
				setTimeout(() => this.loadStatus = 1, 250);
			});
		},

		showEmployee(employeeId, registryId) {
			this.$router.push(`/showemployee/${employeeId}/${registryId}`);
		}
	}
}
</script>