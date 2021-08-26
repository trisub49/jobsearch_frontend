<template>
	<v-container class="employeeprofile">
    <PageStructure title="Jelentkező">
			<Loading v-if="loadStatus == 0" />
			<v-card v-if="loadStatus == 1">
				<v-card-text>
					<v-row id="profilemain" align="center" justify="space-around">
						<v-col id="profilehead">
							<v-img v-if="employee.picture != 'null' && employee.picture != null" id="profilepic" :src="employee.picture" lazy-src alt="Saját kép" />
							<v-img v-else id="profilepic" src="img/empty_user.jpg" alt="Saját kép" />
						</v-col>
						<v-col id="profilebody" >
							<v-icon>mdi-account-circle</v-icon><br>
							<span class="dataname">Név</span><br>
							<span class="datavalue">{{employee.name}}</span><br>
							<v-icon>mdi-arrow-up</v-icon><br>
							<span class="dataname">Életkor</span><br>
							<span class="datavalue">{{calculateAge(employee.birthDate)}}</span><br>
							<v-icon>mdi-map-marker</v-icon><br>
							<span class="dataname">Lakhely</span><br>
							<span class="datavalue">{{employee.settlement}}</span><br>
							<v-icon>mdi-phone-outline</v-icon><br>
							<span class="dataname">Telefonszám</span><br>
							<span class="datavalue">{{employee.phoneNumber}}</span>
						</v-col>
					</v-row>
					<v-divider />
					<v-container id="jobsandschools">
						<h3 class="titles"><v-icon>mdi-school-outline</v-icon> Tanulmányok:</h3>
						<v-spacer />
						<v-container class="lists" v-if="employee.pastSchools.length">
							<table>
								<tr v-for="school in employee.pastSchools" :key="school.id">
									<td class="forschoolanddate">{{school.school}} ({{school.date}})</td><td class="foreducation"><b>{{school.education}}</b></td>
								</tr>
							</table>
						</v-container>
						<v-container v-else class="lists">Nincs megadva</v-container>
						<br>
						<v-divider />
						<br>
						<h3 class="titles"><v-icon>mdi-briefcase-outline</v-icon> Volt munkahelyek:</h3>
						<v-spacer />
						<v-container class="lists" v-if="employee.pastJobs.length">
							<table>
								<tr v-for="job in employee.pastJobs" :key="job.id">
									<td class="forschoolanddate">{{job.job}} ({{job.date}})</td><td class="foreducation"><b>{{job.scope}}</b></td>
								</tr>
							</table>
						</v-container>        
						<v-container v-else class="lists">Nincs megadva</v-container>
					</v-container>
				</v-card-text>
				<v-divider />
				<v-card-actions>
					<v-btn class="mainbutton" depressed width="33%" @click="setStatus(employee.id, 1)">Interjúra hív</v-btn>
					<v-spacer />
          			<v-btn class="mainbutton" depressed width="33%" @click="setStatus(employee.id, 2)">Elutasít</v-btn>
				</v-card-actions>
			</v-card>
		</PageStructure>
	</v-container>
</template>

<style scoped>
#profilehead {
	width: 40%;
	float: left;
}
#profilepic {
	border: 0.75px solid rgba(0,0,0,0.3);
	max-height: 360px;
	width: auto;
}
#profilebody {
	float: right;
	text-align: right;
	width: 60%;
}
.dataname {
	color: rgb(51,102,187);
	font-size: small;
	font-weight: bold;
}
#profileactions {
	clear: both;
	padding: 0;
  width: 100%;
}
#pictureaction {
	float: left;
	width: 33%;
}
#pictureupload {
	float: center;
	text-align: center;
	width: 33%;
}
#profileedit {
  float: right;
	text-align: right;
	width: 34%;
}
.pastjobsandschools {
	font-size: small;
	line-height: unset;
}
span {
	width: 100%;
}
.lists {
	text-align: left;
	padding-left: 10px;
	padding-right: 10px;
}
.titles {
	color: rgb(51,102,187);
}
table {
	width: 100%;
}
.forschoolanddate {
	width: 57%;
	text-align: left;
	color: black;
}
.foreducation {
	width: 40%;
	text-align: left;
}
</style>

<script>

import PageStructure from '@/components/main/PageStructure.vue';
import axios from 'axios';
import Loading from '@/components/main/Loading.vue';

export default {

	components: {
			PageStructure,
			Loading
	},

	created() {
		this.getEmployee();
	},

	data() {
		return {
			loadStatus: 0,
			employee: {}
		}
	},

	methods: {
		calculateAge(dateString) {
				var today = new Date();
				var birthDate = new Date(dateString);
				var age = today.getFullYear() - birthDate.getFullYear();
				var m = today.getMonth() - birthDate.getMonth();
				if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
				return age;
		},

		getEmployee() {
			axios.get(`${this.$store.state.domain}/auth/employee/${this.$route.params.employeeid}/${this.$route.params.registryid}`)
			.then(response => {
				this.employee = response.data;
				if(this.employee.phoneNumber == '' || this.employee.phoneNumber == null) {
					this.employee.phoneNumber = 'Nincs megadva'
				}
				if(this.employee.settlement == '' || this.employee.settlement == null) {
						this.employee.settlement = 'Nincs megadva'
				}
				setTimeout(() => this.loadStatus = 1, 250);
				this.getStatus();
			})
		},

		getStatus() {
			axios.get('')
		},

		setStatus(registryId, stat) {
			axios.post(`${this.$store.state.domain}/sign/status`, {
				id: registryId,
				status: stat
			})
			.then(response => {
				if(response.status == 200) {
					this.$router.go(-1);
				}
			});
		}
	}
}

</script>
