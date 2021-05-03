<template>

    <div class="settlementlist">
        <datalist id="settlementlist">
            <option v-for="settlement in settlements" :key="settlement.id">{{settlement.name}}</option>
        </datalist>
    </div>

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
            axios.get('http://localhost:8080/api/data/settlements')
            .then(response => response.data)
            .then(data => {
                data.forEach(settlement => {
                    this.settlements.push(settlement);
                });
            });
        }
    }
}

</script>
