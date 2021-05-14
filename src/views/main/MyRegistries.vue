<template>
	<v-container class="myregistries">
		<PageStructure title="Jelentkezéseim">
			<Loading v-if="loadStatus == 0" />
			<v-card v-if="loadStatus == 1" id="background">
				<v-card-text>
					<v-container  v-if="getWaitingJobs().length" class="joblister">
						<v-row>Még visszaigazolásra vár:</v-row>
						<v-row v-for="job in getWaitingJobs()" :key="job.id">
							<v-col><a @click="showJob(job.jobId)" class="joblink">{{job.jobName}}</a></v-col>
							<v-col>{{job.jobCompany}}</v-col>
							<v-col>{{job.jobSettlement}}</v-col>
						</v-row>
					</v-container>
					<v-container v-if="getInterviewJobs().length" class="joblister">
						<v-row>Interjúra hívtak/hívnak:</v-row>
						<v-row v-for="job in getInterviewJobs()" :key="job.id">
							<v-col><a @click="showJob(job.jobId)" class="joblink">{{job.jobName}}</a></v-col>
							<v-col>{{job.jobCompany}}</v-col>
							<v-col>{{job.jobSettlement}}</v-col>
						</v-row>
					</v-container>
					<v-container v-if="getDeclinedJobs().length" class="joblister">
						<v-row>Mást választottak, jelentkezésedet elutasították:</v-row>
						<v-row v-for="job in getDeclinedJobs()" :key="job.id">
							<v-col><a @click="showJob(job.jobId)" class="joblink"> {{job.jobName}}</a></v-col>
							<v-col>{{job.jobCompany}}</v-col>
							<v-col>{{job.jobSettlement}}</v-col>
						</v-row>
					</v-container>
				</v-card-text>
			</v-card>    
		</PageStructure>
	</v-container>
</template>

<style scoped>
#background {
	border: 0.5px solid rgba(0,0,0,0.3);
	border-radius: 2px 2px;
	background-color: white;
	padding: 10px;
}
.joblister {
	width: 100%;
	padding: 20px;
}
.joblink, .joblink:hover {
	text-decoration: none;
	color:  rgb(51,102,187);
	font-weight: bold;
}


</style>

<script>

import PageStructure from '@/components/main/PageStructure.vue'
import axios from 'axios';

export default {
    data() {
			return {
				loadStatus: 0,
				userId: sessionStorage.getItem('id'),
				jobs: []
			}
    },

    created() {
			this.loadJobs();
    },

    components: {
			PageStructure
    },

    methods: {
			loadJobs() {
				axios.get(`${this.$store.state.domain}/sign/${this.userId}`)
				.then(response => {
					if(response.status == 200) {
						this.jobs = response.data;
						setTimeout(this.loadStatus = 1, 250);
					}
				})
			},

			getWaitingJobs() {
				var waitingJobs = [];
				this.jobs.forEach(job => {
					if(job.status == 0) waitingJobs.push(job);
				});
				return waitingJobs;
			},

			getInterviewJobs() {
				var interviewJobs = [];
				this.jobs.forEach(job => {
					if(job.status == 1) interviewJobs.push(job);
				});
				return interviewJobs;
			},

			getDeclinedJobs() {
				var declinedJobs = [];
				this.jobs.forEach(job => {
					if(job.status == 2) declinedJobs.push(job);
				});
				return declinedJobs;
			},

			showJob(id) {
				axios.get(`${this.$store.state.domain}/job/${id}`)
				.then(response => {
					if(response.status == 200) {
						this.$router.push({name: 'ShowJob', params: {job: response.data}});
					}
				})
			}
    }
}

</script>
