<template>
	<v-container class="employeeprofile">
    <PageStructure title="Jelentkező">
			<v-card>
				<v-card-text>
					<v-row id="profilemain" align="center" justify="space-around">
						<v-col id="profilehead">
							<v-img v-if="actualemployee.employeePicture != 'null' && actualEmployee.employeePicture != null" id="profilepic" :src="actualEmployee.employeePicture" lazy-src alt="Saját kép" />
							<v-img v-else id="profilepic" src="img/empty_user.jpg" alt="Saját kép" />
						</v-col>
						<v-col id="profilebody" >
							<v-icon>mdi-account-circle</v-icon><br>
							<span class="dataname">Név</span><br>
							<span class="datavalue">{{actualEmployee.employeeName}}</span><br>
							<v-icon>mdi-arrow-up</v-icon><br>
							<span class="dataname">Életkor</span><br>
							<span class="datavalue">{{calculateAge(actualEmployee.employeeBirthDate)}}</span><br>
							<v-icon>mdi-map-marker</v-icon><br>
							<span class="dataname">Lakhely</span><br>
							<span class="datavalue">{{actualEmployee.employeeSettlement}}</span><br>
							<v-icon>mdi-phone-outline</v-icon>
							<span class="dataname">Telefonszám</span><br>
							<span class="datavalue">{{actualEmployee.employeePhoneNumber}}</span>
						</v-col>
					</v-row>
					<v-divider />
					<v-container id="jobsandschools">
						<h3 class="titles"><v-icon>mdi-school-outline</v-icon> Tanulmányok:</h3>
						<v-spacer />
						<v-container class="lists" v-if="schools.length">
							<table>
								<tr v-for="school in schools" :key="school.id">
									<td class="forschoolanddate">{{school.school}} ({{school.date}})</td><td class="foreducation"><b>{{school.education}}</b></td>
								</tr>
							</table>
						</v-container>
						<v-container v-else class="lists">Nincs megadva</v-container>
						<br><br>
						<v-divider />
						<br>
						<h3 class="titles"><v-icon>mdi-briefcase-outline</v-icon> Volt munkahelyek:</h3>
						<v-spacer />
						<v-container class="lists" v-if="jobs.length">
							<table>
								<tr v-for="job in jobs" :key="job.id">
									<td class="forschoolanddate">{{job.job}} ({{job.date}})</td><td class="foreducation"><b>{{job.scope}}</b></td>
								</tr>
							</table>
						</v-container>        
						<v-container v-else class="lists">Nincs megadva</v-container>
					</v-container>
				</v-card-text>
				<v-card-actions>
					<button @click="setStatus(actualEmployee.id, 1)">Interjúra hív</button>
          <button @click="setStatus(actualEmployee.id, 2)">Elutasít</button>
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

export default {

  props: [
		'registry'
	],

	components: {
			PageStructure
	},

	created() {
			this.getSchoolsAndJobs(this.actualEmployee.employeeId);
			if(!this.actualEmployee.employeePhoneNumber) {
					this.actualEmployee.employeePhoneNumber = 'Nincs megadva'
			}
			if(!this.actualEmployee.employeeSettlement) {
					this.actualEmployee.employeeSettlement = 'Nincs megadva'
			}
	},

	data() {
			return {
					actualEmployee: this.registry,
					schools: [],
					jobs: []
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

		getSchoolsAndJobs(id) {
				axios.get(`http://localhost:8080/api/info/${id}`)
				.then(response => response.data)
				.then(data => {
						if(data.schoolList) {
								this.schools = data.schoolList;
						}
						if(data.jobList) {
								this.jobs = data.jobList;
						}
				})
				.catch(error => console.log(error));
		},

		setStatus(registryId, stat) {
			axios.post(`http://localhost:8080/api/sign/status`, {
					id: registryId,
					status: stat
			});
			if(stat == 1) {
					alert("Jelentkező interjúra hívva!")
			} else {
					alert("Jelentkező elutasítva!");
			}
		}
	}
}

</script>
