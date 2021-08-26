<template>
	<v-progress-linear v-if="$store.state.pageLoaderStatus == 1"
		indeterminate
		color="cyan"
  ></v-progress-linear>
</template>

