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
					<v-btn class="mainbutton" depressed v-else @click="deleteRegistry()" width="33%">
						<v-icon>mdi-backup-restore</v-icon>
						Jelentkezés visszavonása
					</v-btn>
				</v-container>
			</v-container>
		</PageStructure>
	</v-container>
</template>

<style scoped>
.loading {
	float: center;
	width: 100%;
	height: 640px;
	vertical-align: middle;
}
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
        this.inspection();
    },

    methods: {
        loadJobData() {
            axios.get(`${this.$store.state.domain}/job/${this.$route.params.jobid}`)
						.then(response => {
							this.job = response.data;
						});
						setTimeout(() => this.loadStatus = 1, 500);
        },
        deleteJob(id) {
            axios.delete(`http://localhost:8080/api/job/delete/${id}`)
            .then(response => {
                if(response.status == 200) {
                    this.$router.push('/myjobs');
                } else {
                    alert("Valami hiba történt!")
                }
            });
        },
        inspection() {
            axios.post('http://localhost:8080/api/sign/hasregistry', {
                jobId: this.job.id,
                employeeId: this.userId
            })
            .then(response => {
                if(response.status == 200) {
                    this.registered = false
                } else {
                    this.registered = false;
                }
            })
        },
        addRegistry() {
            axios.post('http://localhost:8080/api/sign/add', {
                jobId: this.actualJobId,
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
            axios.post('http://localhost:8080/api/sign/delete', {
                jobId: this.actualJobId,
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
