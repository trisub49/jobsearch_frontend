<template>
	<v-container class="settlementlist">
		<datalist id="settlementlist">
			<option v-for="settlement in settlements" :key="settlement.id">{{settlement.name}}</option>
		</datalist>
	</v-container>
</template>

<script>
import axios from 'axios';

export default {
	data() {
		return {
			settlements: []
		}
	},

	created() {
		this.loadSettlements();
	},

	methods: {
		loadSettlements() {
			axios.get(`${this.$store.state.domain}/data/settlements`)
			.then(response => this.settlements = response.data);
		}
	}
}
</script>
