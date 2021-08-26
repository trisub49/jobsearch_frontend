<template>
	<v-container class="showjob">
		<PageStructure title = "Álláshirdetés adatok">
			<Loading v-if="loadStatus == 0" />
			<v-container v-if="loadStatus == 1">
				<JobView :showdesc="true" :job="job" />
				<v-container v-if="job.employerId == userId && loggedIn && userType" class="text-center">
						<v-btn class="mainbutton" depressed @click="$router.push({name: 'EditJob', params: {actualjob: job}})" width="33%">
							<v-icon>mdi-pencil-outline</v-icon>
							Szerkesztés
						</v-btn>
						<v-spacer />
						<v-btn class="mainbutton" depressed @click="deleteJob(job.id)" width="33%">
							<v-icon>mdi-delete-outline</v-icon>
							Törlés
						</v-btn>
				</v-container>
				<v-container v-if="!userType && loggedIn" class="text-center">
					<v-btn class="mainbutton" depressed v-if="!registered" @click="addRegistry()" width="33%">
						<v-icon>mdi-hand</v-icon>
						Jelentkezés
					</v-btn>
					<v-btn class="mainbutton" depressed v-else @click="deleteRegistry()">
						<v-icon>mdi-backup-restore</v-icon>
						Jelentkezés visszavonása
					</v-btn>
				</v-container>
			</v-container>
		</PageStructure>
	</v-container>
</template>

<style scoped>

</style>

<script>
import axios from 'axios';
import PageStructure from '@/components/main/PageStructure.vue'
import JobView from '@/components/common/JobView.vue'
import Loading from '@/components/main/Loading.vue'

export default {
	components: {
		PageStructure,
		JobView,
		Loading
	},

	data() {
		return {
			loadStatus: 0,
			job: {},
			userId: sessionStorage.getItem('id'),
			userType: (sessionStorage.getItem('type') == "false" || !sessionStorage.getItem('type').length) ? false : true,
			loggedIn: (sessionStorage.getItem('loggedIn') == "false" || !sessionStorage.getItem('loggedIn').length) ? false : true,
			registered: false
		}
	},

	created() {
			this.loadJobData()
	},

	methods: {
		loadJobData() {
			axios.get(`${this.$store.state.domain}/job/${this.$route.params.jobid}`)
			.then(response => {
				this.job = response.data;
				this.inspection();
				setTimeout(() => this.loadStatus = 1, 250);
			});
		},

		deleteJob(id) {
			axios.delete(`${this.$store.state.domain}/job/delete/${id}`)
			.then(response => {
				if(response.status == 200) {
					this.$router.push('/myjobs');
				} else {
					alert("Valami hiba történt!")
				}
			});
		},

		inspection() {
			axios.post(`${this.$store.state.domain}/sign/hasregistry`, {
				jobId: this.job.id,
				employeeId: this.userId
			})
			.then(response => {
				if(response.status == 200) {
					this.registered = false
				} else {
					this.registered = true;
				}
			})
		},

		addRegistry() {
			axios.post(`${this.$store.state.domain}/sign/add`, {
				jobId: this.job.id,
				employeeId: this.userId,
				status: 0
			})
			.then(response => {
				if(response.status == 201) {
					this.registered = true;
				}
			})
			.catch(error => alert(error));
		},

		deleteRegistry() {
			axios.post(`${this.$store.state.domain}/sign/delete`, {
				jobId: this.job.id,
				employeeId: this.userId,
				status: 0
			})
			.then(response => {
				if(response.status == 200) {
					this.registered = false;
				}
			})
			.catch(error => alert(error));
		}
	}
}
</script>
