<template>

    <div class="employerprofile">
        <div id="profilemain">
            <div id="profilebody">
                <table>
                    <tr><td class="dataname">Cégnév:</td><td class="datavalue">{{employer.company}}</td></tr>
                    <tr><td class="dataname">Képviselő:</td><td class="datavalue">{{employer.name}}</td></tr>
                    <tr><td class="dataname">Telephely:</td><td class="datavalue">{{employer.settlement}}</td></tr>
                    <tr><td class="dataname">Telefonszám:</td><td class="datavalue">{{employer.phoneNumber}}</td></tr>
                </table>
            </div>
            <div id="profileactions">
                <button @click="$router.push('/profile/editemployer')">Szerkesztés</button>
                <button class="float-right">Kép feltöltés</button>
            </div>
        </div>
        <div id="profiledescriptionholder">
            <h5><b>A cégről:</b></h5>
            <div v-if="employer.description.length > 0" id="profiledescription">{{employer.description}}</div>
            <div v-else id="profiledescription">Nincs megadva</div>
        </div>
    </div>

</template>


<style scoped>

#profilemain {
    background-color: white;
    font-weight: bold;
    font-size: small;
    border: 0.5px solid rgba(0,0,0,0.3);
    padding: 10px;
    margin-bottom: 15px;
    line-height: 200%;
    border-radius: 2px 2px;
    clear: both;
}
#profilebody {
    float: left;
    padding-bottom: 15px;
}
#profiledescriptionholder {
    border: 0.5px solid rgba(0,0,0,0.3);
    border-radius: 2px 2px;
    padding: 10px;
    background: white;
    clear: both;
    margin-bottom: 20px;
}
#profiledescription {
    text-align: justify;
    padding-left: 20px;
    padding-right: 20px;
    color: black;
    font-weight: 500;
}
#profileactions {
    clear: both;
}
button {
    width: 110px;
    margin-top: 10px;
    padding: 0;
    padding-left: 3px;
    padding-right: 3px;
    font-size: small;
}
.dataname {
    padding-right: 15px;
    width: 50%;
}
.datavalue {
    color: rgb(51,102,187);
    font-weight: bold;
    width: 50%;
}

</style>

<script>

    export default {
        name: 'employerprofile',
        data() {
            return {
                employer: {
                    company: sessionStorage.getItem('company'),
                    name: sessionStorage.getItem('name'),
                    settlement: !sessionStorage.getItem('settlement') ? 'Nincs megadva' : sessionStorage.getItem('settlement'),
                    phoneNumber: sessionStorage.getItem('phoneNumber'),
                    description: sessionStorage.getItem('description')
                }
            }
        }
    }

</script>
