<template>

    <div class="jobview">
        <div class="jobhead">
            <span class="jobname">{{job.scope}}</span>
            <div class="jobregtime">{{job.adDate}}</div>
        </div>
        <div class="jobbody">
            <table class="jobtable d-none d-sm-block">
                <tr><td class="icono-folder iex"></td><td class="jobbla">Feladó:</td><td class="jobcompany">{{job.company}}</td></tr>
                <tr><td class="icono-list iex"></td><td class="jobbla">Kategória:</td><td class="jobcategory">{{job.category}}</td></tr>
                <tr><td class="icono-locationArrow iex"></td><td class="jobbla">Munkavégzés helye:</td><td class="jobcategory">{{job.settlement}}</td></tr>
                <tr><td class="icono-exclamationCircle iex"></td><td class="jobbla">Jelentkezési határidő:</td><td class="jobdeadline">{{job.deadline}}</td></tr>
            </table>
            <table class="d-block d-sm-none">
                <tr><td class="icono-folder iex"></td><td class="jobcompany">{{job.company}}</td></tr>
                <tr><td class="icono-list iex"></td><td class="jobcategory">{{job.category}}</td></tr>
                <tr><td class="icono-locationArrow iex"></td><td class="jobcategory">{{job.settlement}}</td></tr>
                <tr><td class="icono-exclamationCircle iex"></td><td class="jobdeadline">{{job.deadline}}</td></tr>
            </table>
        </div>
        <div v-if="job.adText && showdesc" class="jobdescription">
            <h5><b>A munkáról:</b></h5>
            <div class="jobdescriptionbody">{{job.adText}}</div>
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
.jobview:hover {
    transition: 0.75;
    background-color: rgba(179, 217, 255,0.3);
}
.jobhead {
    font-size: large;
    padding: 10px;
    border-bottom: 0.5px solid rgba(0,0,0,0.6);
}
.jobregtime {
    float: right;
}
.jobname {
    color: rgb(51,102,187);
    text-transform: uppercase;
}
.jobbody {
    margin: 15px;
    border-left: rgba(0,0,0,0.3);
    clear: both;
    padding-left: 20px;
    padding-right: 20px;
    line-height: 150%;
}
.jobbla {
    padding-right: 10px;
    text-align: right;
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
    ]
}

</script>
