<template>

    <div class="jobview">
        <div v-if="!showdesc">
            <a @click="showJob(job)">
                <div class="jobhead">
                    <span class="jobname">{{job.scope}}</span>
                    <div class="jobregtime">{{job.adDate}}</div>
                </div>
                <div class="jobbody">
                    <table class="jobtable d-none d-sm-block">
                        <tr><td class="jobicon"><v-icon>mdi-account-tie</v-icon></td><td class="jobbla">Feladó:</td><td class="jobcompany">{{job.company}}</td></tr>
                        <tr><td class="jobicon"><v-icon>mdi-animation-outline</v-icon></td><td class="jobbla">Kategória:</td><td class="jobcategory">{{job.category}}</td></tr>
                        <tr><td class="jobicon"><v-icon>mdi-map-marker</v-icon></td><td class="jobbla">Munkavégzés helye:</td><td class="jobcategory">{{job.settlement}}</td></tr>
                        <tr><td class="jobicon"><v-icon>mdi-av-timer</v-icon></td><td class="jobbla">Jelentkezési határidő:</td><td class="jobdeadline">{{job.deadline}}</td></tr>
                    </table>
                    <table class="d-block d-sm-none">
                        <tr><td class="jobicon"><v-icon>mdi-account-tie</v-icon></td><td class="jobcompany">{{job.company}}</td></tr>
                        <tr><td class="jobicon"><v-icon>mdi-animation-outline</v-icon></td><td class="jobcategory">{{job.category}}</td></tr>
                        <tr><td class="jobicon"><v-icon>mdi-map-marker</v-icon></td><td class="jobcategory">{{job.settlement}}</td></tr>
                        <tr><td class="jobicon"><v-icon>mdi-av-timer</v-icon></td><td class="jobdeadline">{{job.deadline}}</td></tr>
                    </table>
                </div>
            </a>
        </div>
        <div v-else>
            <div class="jobhead">
                <span class="jobname">{{job.scope}}</span>
                <div class="jobregtime">{{job.adDate}}</div>
            </div>
            <div class="jobbody">
                <table class="jobtable d-none d-sm-block">
                    <tr><td class="jobicon"><v-icon>mdi-account-tie</v-icon></td><td class="jobbla">Feladó:</td><td class="jobcompany">{{job.company}}</td></tr>
                    <tr><td class="jobicon"><v-icon>mdi-animation-outline</v-icon></td><td class="jobbla">Kategória:</td><td class="jobcategory">{{job.category}}</td></tr>
                    <tr><td class="jobicon"><v-icon>mdi-map-marker</v-icon></td><td class="jobbla">Munkavégzés helye:</td><td class="jobcategory">{{job.settlement}}</td></tr>
                    <tr><td class="jobicon"><v-icon>mdi-av-timer</v-icon></td><td class="jobbla">Jelentkezési határidő:</td><td class="jobdeadline">{{job.deadline}}</td></tr>
                </table>
                <table class="d-block d-sm-none">
                    <tr><td class="jobicon"><v-icon>mdi-account-tie</v-icon></td><td class="jobcompany">{{job.company}}</td></tr>
                    <tr><td class="jobicon"><v-icon>mdi-animation-outline</v-icon></td><td class="jobcategory">{{job.category}}</td></tr>
                    <tr><td class="jobicon"><v-icon>mdi-map-marker</v-icon></td><td class="jobcategory">{{job.settlement}}</td></tr>
                    <tr><td class="jobicon"><v-icon>mdi-av-timer</v-icon></td><td class="jobdeadline">{{job.deadline}}</td></tr>
                </table>
            </div>
            <div v-if="job.adText" class="jobdescription">
                <h5><b>A munkáról:</b></h5>
                <div class="jobdescriptionbody">{{job.adText}}</div>
            </div>
        </div>
    </div>    
    
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
    font-size: large;
    padding: 10px;
    border-bottom: 0.5px solid rgba(0,0,0,0.6);
    color: black;
}
.jobregtime {
    float: right;
}
.jobname {
    text-transform: uppercase;
}
.jobbody {
    color: black;
    margin: 15px;
    border-left: rgba(0,0,0,0.3);
    clear: both;
    padding-left: 15px;
    padding-right: 15px;
    line-height: 120%;
}
.jobicon {
    padding: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
}
.jobbla {
    font-weight: normal;
    padding-right: 10px;
    text-align: left;
}
.jobcompany {
    color: rgb(51,102,187);
}
.jobdeadline {
    color: rgb(255, 51, 51);
}
.jobpicture {
    width: 100px;
    float: right;
}
.iex {
    padding-right: 10px;
}
.jobdescription {
    font-weight: 500;
    border-top: 0.5px solid rgba(0,0,0,0.6);
    padding: 10px;
    text-align: left;
    border-bottom: 0.5px solid rgba(0,0,0,0.6);
    background-color: rgba(234, 234, 250,0.9);
}
.jobdescriptionbody {
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
}

</style>

<script>

export default {

    name: 'jobview',

    props: [
        'showdesc',
        'job'
    ],

    methods: {
        showJob(jobToPage) {
            this.$router.push({name: 'ShowJob', params: {job: jobToPage}});
        }
    }
}

</script>
