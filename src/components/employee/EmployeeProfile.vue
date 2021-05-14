<template>
	<v-container class="employeeprofile">
		<v-card>
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
						<span class="datavalue">{{employee.age}}</span><br>
						<v-icon>mdi-map-marker</v-icon><br>
						<span class="dataname">Lakhely</span><br>
						<span class="datavalue">{{employee.settlement}}</span><br>
						<v-icon>mdi-phone-outline</v-icon>
						<span class="dataname">Telefonszám</span><br>
						<span class="datavalue">{{employee.phoneNumber}}</span>
					</v-col>
					</v-row>
				</v-card-text>
				<v-card-actions>
					<v-container id="profileactions">
					<v-row>
						<v-col v-if="employee.picture != 'null' && employee.picture != null" id="pictureaction">
							<v-btn class="mainbutton" @click="deletePicture" small depressed>
							<v-icon>mdi-delete-outline</v-icon>
							Kép törlése
							</v-btn>
						</v-col>
						<v-col v-else id="pictureaction">
							<v-file-input
								prepend-icon="mdi-camera"
								accept="image/png, image/jpeg" 
								dense
								flat
								hide-input
								v-model="selectedFile"
							>
							</v-file-input>
						</v-col>
							<v-col>
								<v-btn v-if="selectedFile != null" class="mainbutton" @click="onFileUpload" small depressed>
									<v-icon>mdi-cloud-upload-outline</v-icon>
									Feltöltés
								</v-btn>
							</v-col>
						<v-col id="profileedit">
							<v-btn class="mainbutton" small depressed @click="$router.push('/profile/editemployee')">
								<v-icon>mdi-account-edit-outline</v-icon>
								Szerkesztés
							</v-btn>
						</v-col>
					</v-row>
					</v-container>
				</v-card-actions>
				<v-divider />
				<v-card-text>
					<v-container id="jobsandschools"><PastJobsAndSchools /></v-container>
				</v-card-text>
			</v-card>
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

</style>

<script>
import axios from 'axios'
import PastJobsAndSchools from '@/components/employee/PastJobsAndSchools.vue'

export default {
	components: {
			PastJobsAndSchools
	},

	data() {
		return {
			employee : {
				id: sessionStorage.getItem('id'),
				name: sessionStorage.getItem('name'),
				age: this.calculateAge(sessionStorage.getItem('birthDate')),
				settlement: !sessionStorage.getItem('settlement') ? "Nincs megadva" : sessionStorage.getItem('settlement'),
				phoneNumber: !sessionStorage.getItem('phoneNumber') ? "Nincs megadva" : sessionStorage.getItem('phoneNumber'), 
				picture: sessionStorage.getItem('picture'),
				pictureName: sessionStorage.getItem('pictureName')
			},
			selectedFile: null
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
		onFileUpload() {
			const formData = new FormData();
			var id = sessionStorage.getItem("id");
			formData.append("image", this.selectedFile, this.selectedFile.name);
			axios.post(`${this.$store.state.domain}/img/upload/employee/${id}`, formData)
			.then(response => {
				if(response.status == 201) {
					console.log(response.data.pictureCode);
					sessionStorage.setItem("pictureName", `${id}_${this.selectedFile.name}`);
					sessionStorage.setItem("picture", response.data.pictureCode);
					this.employee.picture = sessionStorage.getItem("picture");
					this.selectedFile = null;
				} else {
					alert("Valami hiba történt!");
				}
			});
		},
		deletePicture() {
			axios.delete(`${this.$store.state.domain}/img/delete/employee/${this.employee.pictureName}`)
			.then(response => {
				if(response.status == 200) {
					sessionStorage.setItem('picture', '');
					sessionStorage.setItem('pictureName', '')
					this.employee.picture = null;
					this.employee.pictureName = null;
				}
			})
		}
	}
}
</script>
