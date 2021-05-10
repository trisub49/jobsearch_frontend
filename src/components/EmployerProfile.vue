<template>
  <div class="employerprofile">
    <v-container id="profilemain">
        <v-container id="profilehead">
          <v-col class="picture">
            <v-img
              v-if="employer.picture != null"
              id="profilepic"
              :src="loadedPicture"
              alt="Saját kép"
            />
            <v-img v-else id="profilepic" src="img/empty_user.jpg" alt="Saját kép" />
          </v-col>
        </v-container>
        <v-container id="profilebody">
          <v-row>
            <v-col class="icontd"><v-icon>mdi-briefcase-outline</v-icon></v-col>
            <v-col class="dataname d-none d-sm-none d-md-block d-lg-block d-xl-block">Cégnév:</v-col>
            <v-col class="datavalue">{{ employer.company }}</v-col>
          </v-row>
          <v-row>
            <v-col class="icontd"><v-icon>mdi-account-tie</v-icon></v-col>
            <v-col class="dataname d-none d-sm-none d-md-block d-lg-block d-xl-block">Képviselő:</v-col>
            <v-col class="datavalue">{{ employer.name }}</v-col>
          </v-row>
          <v-row>
            <v-col class="icontd"><v-icon>mdi-map-marker</v-icon></v-col>
            <v-col class="dataname d-none d-sm-none d-md-block d-lg-block d-xl-block">Telephely:</v-col>
            <v-col class="datavalue">{{ employer.settlement }}</v-col>
          </v-row>
          <v-row>
            <v-col class="icontd"><v-icon>mdi-phone-outline</v-icon></v-col>
            <v-col class="dataname d-none d-sm-none d-md-block d-lg-block d-xl-block">Telefonszám:</v-col>
            <v-col class="datavalue">{{ employer.phoneNumber }}</v-col>
          </v-row>
        </v-container>
      </v-container>
      <v-row id="profileactions">
        <v-col v-if="employer.picture != null" id="pictureaction">
          <v-btn class="mainbutton" @click="deletePicture" small depressed>
						<v-icon>mdi-delete-outline</v-icon>
            Kép törlése
          </v-btn>
        </v-col>
        <v-col v-else id="pictureaction">
          <v-file-input
						prepend-icon="mdi-camera"
						accept="image/png, image/jpeg" 
						dense
						flat
            show-size
						v-model="selectedFile"
					>
					</v-file-input>
        </v-col>
				<v-col>
					<v-btn v-if="selectedFile != null" class="mainbutton" @click="onFileUpload" small depressed>
						<v-icon>mdi-cloud-upload-outline</v-icon>
            Feltöltés
          </v-btn>
				</v-col>
        <v-col id="profileedit">
						<v-btn class="mainbutton" small depressed @click="$router.push('/profile/editemployer')">
							<v-icon>mdi-account-edit-outline</v-icon>
							Szerkesztés
						</v-btn>
        </v-col>
      </v-row>
      <div id="profiledescriptionholder">
        <h3><b>A cégről:</b></h3>
        <div v-if="employer.description.length > 0" id="profiledescription">
          {{ employer.description }}
        </div>
        <div v-else id="profiledescription">Nincs megadva</div>
      </div>
    </div>
</template>


<style scoped>
.employerprofile {
	width: 100%;
}
#profilemain {
  background-color: white;
  border: 0.5px solid rgba(0, 0, 0, 0.3);
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 2px 2px;
  clear: both;
  width: 100%;
}
#profiledescriptionholder {
  border: 0.5px solid rgba(0, 0, 0, 0.3);
  border-radius: 2px 2px;
  padding: 10px;
  background: white;
  clear: both;
  margin-top: 30px;
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
	padding-left: 10px;
  padding-right: 10px;
  width: 100%;
}
#pictureaction {
	float: left;
	width: 33%;
}
#pictureupload {
	float: center;
	text-align: center;
	width: 33%;
}
#profileedit {
  float: right;
	text-align: right;
	width: 34%;
}
#profilepic {
  border: 0.75px solid rgba(0, 0, 0, 0.3);
  width: 100%;
}
.v-btn {
  width: 110px;
  margin-top: 10px;
  padding: 0;
  padding-left: 3px;
  padding-right: 3px;
}
table {
  width: 100%;
}
.picture {
  float: left;
  width: 25%;
}
.icontd {
  width: 5%;
}
.dataname {
  padding-right: 15px;
  width: 20%;
	font-weight: bold;
	color: blue;
}
.datavalue {
  font-weight: bold;
  width: auto;
}
.v-icon {
	padding: 2px;
}
</style>

<script>
import axios from "axios";

export default {
  name: "employerprofile",

  data() {
    return {
      employer: {
        company: sessionStorage.getItem("company"),
        name: sessionStorage.getItem("name"),
        settlement: !sessionStorage.getItem("settlement")
          ? "Nincs megadva"
          : sessionStorage.getItem("settlement"),
        phoneNumber: sessionStorage.getItem("phoneNumber"),
        description: sessionStorage.getItem("description"),
        picture: !sessionStorage.getItem("picture")
          ? null
          : sessionStorage.getItem("picture"),
      },
      selectedFile: null,
      loadedPicture: null,
    };
  },

  created() {
    if (this.employer.picture != null && this.employer.picture != "null") {
      this.getEmployerPicture();
    }
  },

  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },
    onFileUpload() {
      const formData = new FormData();
      var id = sessionStorage.getItem("id");
      formData.append("image", this.selectedFile, this.selectedFile.name);
      axios
        .post(`http://localhost:8080/api/img/upload/employer/${id}`, formData)
        .then((response) => {
          if (response.status == 201) {
            sessionStorage.setItem(
              "picture",
              id.concat("_").concat(this.selectedFile.name)
            );
            this.employer.picture = sessionStorage.getItem("picture");
            this.getEmployerPicture();
            this.selectedFile = null;
          } else {
            alert("Valami hiba történt!");
          }
        });
    },
    getEmployerPicture() {
      axios
        .get(
          `http://localhost:8080/api/img/get/employer/${this.employer.picture}`,
          { responseType: "arraybuffer" }
        )
        .then((response) => {
          if (response.status == 200) {
            this.loadedPicture = "data:image/jpg;base64, ".concat(
              Buffer.from(response.data, "binary").toString("base64")
            );
          }
        });
    },
    deletePicture() {
      axios
        .delete(
          `http://localhost:8080/api/img/delete/employer/${this.employer.picture}`
        )
        .then((response) => {
          if (response.status == 200) {
            sessionStorage.setItem("picture", "");
            this.employer.picture = null;
            this.loadedPicture = null;
          }
        });
    },
  },
};
</script>
