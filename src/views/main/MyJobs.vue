<template>
	<v-container class="myjobs">
		<PageStructure title="Hirdetéseid">
			<v-card>
				<v-card-text>
					<v-container v-if="!jobs.length" id="joblister">
						Nincs feladott hirdetésed.
					</v-container>
					<v-container v-else id="joblister">
						<v-row class="titles">
							<v-col class="jobname"><v-icon>mdi-briefcase-outline</v-icon> Munkakör</v-col>
							<v-col class="jobdeadline"><v-icon>mdi-clock-outline</v-icon> Határidő</v-col>
							<v-col class="jobregistries"><v-icon>mdi-hand</v-icon> Jelentkezők</v-col>
						</v-row>
						<v-row v-for="job in jobs" :key="job.id">
							<v-col class="jobname">
								<a @click="showJob(job)" class="joblink">{{job.scope}}</a>
							</v-col>
							<v-col class="jobdeadline">
								{{job.deadline}}
							</v-col>
							<v-col class="jobregistries">
								<a @click="showRegistries(job.registries)">{{job.registries.length}} fő</a>
							</v-col>
						</v-row>
					</v-container>
					<v-divider />
				</v-card-text>
				<v-card-actions class="justify-center">
					<v-btn class="mainbutton" width="50%" depressed @click="$router.push('/myjobs/add')">
						Hirdetésfeladás
					</v-btn>
				</v-card-actions>
			</v-card>
		</PageStructure>
	</v-container>     
</template>

<style scoped>

#joblister {
	width: 100%;
	padding: 20px;
	color: black;
}
.titles {
	font-weight: bold;
	border-bottom: 0.5px solid black;
	text-transform: uppercase;
}
.jobname {
	font-weight: bold;
	width: 70%;
}
.jobdeadline {
	width: 20%;
	float: right;
	text-align: right;
}
.jobregistries {
	width: 10%;
	float: right;
	text-align: right;
}
.joblink, .joblink:hover {
	text-decoration: none;
	color: black;
	font-weight: bold;
}
</style>

<script>

import PageStructure from '@/components/main/PageStructure.vue'
import axios from 'axios';

export default {

	components: {
		PageStructure
	},

	data() {
			return {
					jobs: []
			}
	},

	created() {
			this.findMyJobs();
	},

	methods: {
		findMyJobs() {
				axios.get(`${this.$store.state.domain}/job/emp/${sessionStorage.getItem('id')}`)
				.then(response => this.jobs = response.data)
				.catch(error => alert(error));
		},

		showJob(jobToPage) {
				this.$router.push(`/showjob/${jobToPage.id}`);
		},

		showRegistries(registries) {
			if(registries.length > 0) {
				this.$router.push({name: 'ShowRegistries', params: {registryList: registries}});
			}
		}
	}
}

</script>
