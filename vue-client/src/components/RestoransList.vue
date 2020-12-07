<template>
  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="12" md="8">
      <v-text-field v-model="title" label="Search by Title"></v-text-field>
    </v-col>

    <v-col cols="12" md="4">
      <v-btn small @click="searchTitle">
        Search
      </v-btn>
    </v-col>

    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>Restorans</v-card-title>

        <v-data-table
          :headers="headers"
          :items="restorans"
          disable-pagination
          :hide-default-footer="true"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editRestoran(item.id)">mdi-pencil</v-icon>
            <v-icon small @click="deleteRestoran(item.id)">mdi-delete</v-icon>
          </template>
        </v-data-table>

        <v-card-actions v-if="restorans.length > 0">
          <v-btn small color="error" @click="removeAllRestorans">
            Remove All
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import RestoranDataService from "../services/RestoranDataService";
const APIKEY = "6de94afbcc878ce044e4cd39d13a36e2";
export default {
  name: "restorans-list",
  data() {
    return {
      restorans: [],
      title: "",
      headers: [
        { text: "Title", align: "start", sortable: true, value: "title" },
        { text: "Type", value: "restoranType", sortable: true },
        { text: "Phone", value: "phone", sortable: false },
        { text: "Location", value: "location", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    retrieveRestorans() {
      RestoranDataService.getAll()
        .then((response) => {
            this.restorans = response.data.map(this.getDisplayRestoran);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveRestorans();
    },

    removeAllRestorans() {
      RestoranDataService.deleteAll()
        .then((response) => {
            if (response)
                this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    searchTitle() {
      RestoranDataService.findByTitle(this.title)
        .then((response) => {
          this.restorans = response.data.map(this.getDisplayRestoran);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    editRestoran(id) {
      this.$router.push({ name: "restoran-details", params: { id: id } });
    },

    deleteRestoran(id) {
      RestoranDataService.delete(id)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getDisplayRestoran(restoran) {
        return {
                id: restoran.id,
                title: restoran.title.length > 30 ? restoran.title.substr(0, 30) + "..." : restoran.title,
                restoranType: restoran.restoranType.length > 30 ? restoran.restoranType.substr(0, 30) + "..." : restoran.restoranType,
                phone: restoran.phone.length > 30 ? restoran.phone.substr(0, 30) + "..." : restoran.phone,
                location: restoran.location
            };
    },

    async getLocation(location) {
        const cords = location.split('/');
        const response = await fetch(`http://api.positionstack.com/v1/reverse?access_key=${APIKEY}&query=${cords[0]},${cords[1]}`);
        const loc = await response.json();
        console.log(loc.data[0].label);
        return loc.data[0].label;
    }
  },
  mounted() {
    this.retrieveRestorans();
  },
};
</script>

<style>
.list {
  max-width: 750px;
}
</style>