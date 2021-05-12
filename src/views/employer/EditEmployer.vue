<template>
	<v-container class="editemployer">
		<PageStructure title="Adatmódosítás">
			<v-card>
				<v-card-text>
					<v-form>
						<v-text-field 
							prepend-icon="mdi-briefcase-outline"
							label="Cégnév"
							v-model="company" 
							:error-messages="companyError ? 'Ez a cég már regisztrálva van!' : ''"
							@click="companyError = false"
							required 
						/>
						<v-text-field
							prepend-icon="mdi-account-circle"
							label="Teljes név" 
							v-model="name" 
							required
						/>
						<SettlementList />
						<v-text-field 
							prepend-icon="mdi-map-marker"
							label="Telephely"
							v-model="settlement" 
							list="settlementlist" 
							required
						/>
						<v-text-field 
							prepend-icon="mdi-phone"
							label="Telefonszám"
							v-model="phoneNumber" 
							required
						/>
						<v-textarea 
							prepend-icon="mdi-information-outline"
							label="Leírás a cégről"
							v-model="description"
							maxlength="1024"
							counter
						/>
					</v-form>
				</v-card-text>
				<v-card-actions class="justify-center">
					<v-btn class="mainbutton" depressed width="50%" @click="editProfile()">
						Megváltoztat
					</v-btn>
				</v-card-actions>
			</v-card>
		</PageStructure>
	</v-container>
</template>

<script>

import axios from 'axios';
import PageStructure from '@/components/main/PageStructure.vue';
import SettlementList from '@/components/common/SettlementList.vue';

export default {

	components: {
		PageStructure,
		SettlementList
	},

	data() {
		return {
			company: sessionStorage.getItem('company'),
			name: sessionStorage.getItem('name'),
			settlement: sessionStorage.getItem('settlement'),
			phoneNumber: sessionStorage.getItem('phoneNumber'),
			description: sessionStorage.getItem('description'),

			companyError: false
		}
	},

	methods: {
		editProfile() {
			axios.post(`${this.$store.state.domain}/auth/edit-employer`, {
					id: sessionStorage.getItem('id'), 
					company: this.company, 
					name: this.name, 
					settlement: this.settlement, 
					phoneNumber: this.phoneNumber, 
					description: this.description
			})
			.then(response => { 
				if(response.status == 200) {
					sessionStorage.setItem('company', this.company);
					sessionStorage.setItem('name', this.name);
					sessionStorage.setItem('settlement', this.settlement);
					sessionStorage.setItem('phoneNumber', this.phoneNumber);
					sessionStorage.setItem('description', this.description);
					this.$router.push('/profile')
				} else if(response.status == 203) {
					if(response.data.message == "company") {
						this.companyError = true;
					}
				}
			});
		}
	}
}

</script>