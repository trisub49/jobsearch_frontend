<template>
	<v-container class="editemployee">
		<PageStructure title="Adatmódosítás">
			<v-container class="justify-center" id="card">
				<v-card>
					<v-card-text>
						<v-form>
							<v-text-field label="Teljes név" v-model="name" prepend-icon="mdi-account-circle" required />
							<SettlementList />
							<v-text-field label="Lakhely" v-model="settlement" prepend-icon="mdi-map-marker" list="settlementlist" required />
							<v-text-field label="Telefonszám" v-model="phoneNumber" prepend-icon="mdi-phone-outline" required />
						</v-form>
					</v-card-text>
					<v-card-actions class="justify-center">
						<v-btn class="mainbutton" depressed width="50%" @click="editProfile()">
							Megváltoztat
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-container>
		</PageStructure>
	</v-container>
</template>

<style scoped>

#card {
    max-width: 640px;
}

</style>

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
            name: sessionStorage.getItem('name'),
            settlement: sessionStorage.getItem('settlement'),
            phoneNumber: sessionStorage.getItem('phoneNumber')
        }
    },

    methods: {
        editProfile() {
            axios.post(`${this.$store.state.domain}/auth/edit-employee`, {
                id: sessionStorage.getItem('id'), 
                name: this.name, 
                settlement: this.settlement, 
                phoneNumber: this.phoneNumber
            });
            sessionStorage.setItem('name', this.name);
            sessionStorage.setItem('settlement', this.settlement);
            sessionStorage.setItem('phoneNumber', this.phoneNumber);
            this.$router.push('/profile');
        }
    }
}

</script>
