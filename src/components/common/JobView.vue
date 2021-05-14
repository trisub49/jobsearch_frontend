<template>
	<v-container>
		<v-card class="jobview" v-if="!showdesc">
			<a @click="showJob(job)">
				<v-card-title>
					<v-row class="jobhead">
						<v-col class="text-left jobscope">{{job.scope}}</v-col>
						<v-col class="text-right jobdate">{{job.adDate}}</v-col>
					</v-row>
				</v-card-title>
				<v-divider />
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
				<v-row class="jobhead">
					<v-col class="text-left jobscope">{{job.scope}}</v-col>
					<v-col class="text-right jobdate">{{job.adDate}}</v-col>
				</v-row>
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
	</v-container>       
</template>

<style scoped>
.jobview {
	padding: 5px;
	padding-bottom: 5px;
	clear: both;
	color: black;
	text-decoration: none;
	font-weight: bold;
	background-color: white;
	margin-bottom: 10px;
	border: 0.5px solid rgba(0,0,0,0.3);
}
#jobview:hover {
	transition: 0.75;
	background-color: rgba(179, 217, 255,0.3);
}
.jobhead {
	color: black;
	font-weight: bold;
	font-size: large;
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
