<template>
  <v-container class="employerprofile">
    <v-container id="employerprofile">
        <v-card height>
          <v-card-text>
            <v-row>
              <v-col id="image">
                <v-img
                  class="mx-auto"
                  v-if="employer.picture != null"
                  id="picture"
                  :src="loadedPicture"
                  alt="Saját kép"
                  lazy-src
                />
                <v-img v-else id="picture" src="img/empty_user.jpg" alt="Saját kép" />
              </v-col>
              <v-col id="info">
                <v-icon>mdi-briefcase-outline</v-icon><br>
                <span class="dataname">Cégnév</span><br>
                {{ employer.company }}<br>
                <v-spacer />
                <v-icon>mdi-account-tie</v-icon><br>
                <span class="dataname">Képviselő</span><br>
                {{ employer.name }}<br>
                <v-spacer />
                <v-icon>mdi-map-marker</v-icon><br>
                <span class="dataname">Telephely</span><br>
                {{ employer.settlement }}<br>
                <v-spacer />
                <v-icon>mdi-phone-outline</v-icon><br>
                <span class="dataname">Telefonszám</span><br>
                {{ employer.phoneNumber }}<br>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-container id="profileactions">
              <v-row>
                  <v-col id="pictureaction" v-if="employer.picture != null">
                    <v-btn class="mainbutton" @click="deletePicture" small depressed>
                      <v-icon>mdi-delete-outline</v-icon>
                      Kép törlése
                    </v-btn>
                </v-col>
                <v-col id="pictureaction" v-else>
                  <v-file-input
                    prepend-icon="mdi-camera"
                    accept="image/png, image/jpeg" 
                    hide-details
                    dense
                    flat
                    show-size
                    v-model="selectedFile"
                    hide-input
                  />
                </v-col>
                <v-col id="pictureupload">
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
            </v-container>
          </v-card-actions>
        </v-card>
      </v-container>
      <v-container id="profiledescriptionholder">
        <h3><b>A cégről:</b></h3>
        <v-container v-if="employer.description.length > 0" id="profiledescription">
          {{ employer.description }}
        </v-container>
        <v-container v-else id="profiledescription">Nincs megadva</v-container>
      </v-container>
    </v-container>
</template>


<style scoped>

#profilemain {
  clear: both;
}
#profileactions {
  clear: both;
  width: 100%;
}
#pictureaction {
	float: left;
	width: 33%;
}
#pictureupload {
	float: left;
	text-align: left;
	width: 33%;
}
#profileedit {
  float: right;
	text-align: right;
	width: 34%;
}
#info {
  float: right;
  text-align: right;
  width: 40%;
}
#image {
  float: left;
  width: 60%;
  border: 0.5px solid black;
  display: table-cell;
  text-align: center;
}
#picture {
  width: 100%;
  vertical-align: middle;
}
.dataname {
	font-weight: bold;
  font-size: small;
	color: blue;
}
#profileactions {
  float: left;
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
