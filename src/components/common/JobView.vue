<template>
	<v-card class="blue-grey lighten-4 jobview" elevation="12" v-if="!showdesc">
		<a @click="showJob(job)" class="pa-0 ma-0">
			<v-card-title class="titlebg black--text">
				{{job.scope}}
			</v-card-title>
			<v-card-text>
				<v-row class="jobbody" align="center" justify="space-around">
					<v-col class="image text-left">
						<v-img v-if="job.picture != null" :src="job.picture" />
						<v-img v-else src="/img/empty_company.png" />
					</v-col>
					<v-col class="details text-right">
						<v-icon>mdi-account-tie</v-icon><br>
						<span class="jobbla d-none d-sm-block">Feladó<br></span>
						<span class="jobcompany">{{job.company}}</span><br>
						<v-icon>mdi-animation-outline</v-icon><br>
						<span class="jobbla d-none d-sm-block">Kategória<br></span>
						<span class="jobcategory">{{job.category}}</span><br>
						<v-icon>mdi-map-marker</v-icon><br>
						<span class="jobbla d-none d-sm-block">Munkavégzés helye<br></span>
						<span class="jobcategory">{{job.settlement}}</span><br>
						<v-icon>mdi-av-timer</v-icon><br>
						<span class="jobbla d-none d-sm-block">Jelentkezési határidő<br></span>
						<span class="jobdeadline">{{job.deadline}}</span>
					</v-col>
				</v-row>
			</v-card-text>
		</a>
	</v-card>
	<v-card class="jobview" v-else>
		<v-card-title>
			{{job.scope}}
		</v-card-title>
		<v-divider />
		<v-card-text>
			<v-row class="jobbody" align="center" justify="space-around">
				<v-col class="details text-left">
					<v-icon>mdi-account-tie</v-icon><br>
					<span class="jobbla d-none d-sm-block">Feladó<br></span>
					<span class="jobcompany">{{job.company}}</span><br>
					<v-icon>mdi-animation-outline</v-icon><br>
					<span class="jobbla d-none d-sm-block">Kategória<br></span>
					<span class="jobcategory">{{job.category}}</span><br>
					<v-icon>mdi-map-marker</v-icon><br>
					<span class="jobbla d-none d-sm-block">Munkavégzés helye<br></span>
					<span class="jobcategory">{{job.settlement}}</span><br>
					<v-icon>mdi-av-timer</v-icon><br>
					<span class="jobbla d-none d-sm-block">Jelentkezési határidő<br></span>
					<span class="jobdeadline">{{job.deadline}}</span>
				</v-col>
				<v-col class="image text-right">
					<v-img v-if="job.picture != null" :src="job.picture" />
					<v-img v-else src="/img/empty_company.png" />
				</v-col>
			</v-row>
		</v-card-text>
		<v-container v-if="job.adText" class="jobdescription">
			<h4><b>A munkáról:</b></h4>
			<v-container class="jobdescriptionbody">{{job.adText}}</v-container>
		</v-container>
	</v-card>
</template>

<style scoped>
.jobview {
	color: black;
	font-family: 'Quicksand', sans-serif;
	font-weight: bold;
}
.jobscope {
	width: 80%;
}
.jobdate {
	width: 20%;
}
.image {
	float: left;
	width: 45%;
}
.details {
	width: 55%;
}
.jobbody {
  color: black;
  clear: both;
}
.jobbla {
  font-weight: bold;
	font-size: small;
	color: rgb(51,102,187);
}
.jobdeadline {
  color: rgb(255, 51, 51);
}
.jobpicture {
  width: 100px;
  float: right;
}
.jobdescription {
  padding: 10px;
  text-align: left;
  background-color: rgba(234, 234, 250,0.9);
	font-weight: normal;
}
.jobdescriptionbody {
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
}
</style>

<script>
export default {
	props: [
		'showdesc',
		'job'
	],
	methods: {
		showJob(jobToPage) {
			this.$router.push(`/showjob/${jobToPage.id}`);
		}
	}
}
</script>
