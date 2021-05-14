<template>
    <v-container class="loading">
        <v-layout align-center justify-center column fill-height>
            <v-flex row align-center>
                <v-progress-circular indeterminate :size="50" color="primary" class=""></v-progress-circular>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<style scoped>
.loading {
    width: 100%;
    height: 240px;
}
</style>