<template>
  <div v-if="currentRestoran" class="edit-form py-3">
    <p class="headline">Edit Restoran</p>

    <v-form ref="form" lazy-validation>
      <v-text-field
        v-model="currentRestoran.title"
        :rules="[(v) => !!v || 'Title is required']"
        label="Title"
        required
      ></v-text-field>

      <v-text-field
        v-model="currentRestoran.restoranType"
        :rules="[(v) => !!v || 'Type is required']"
        label="Type"
        required
      ></v-text-field>

      <v-text-field
        v-model="currentRestoran.phone"
        :rules="[(v) => !!v || 'Phone is required']"
        label="Phone"
        required
      ></v-text-field>

      <v-text-field
        v-model="currentRestoran.location"
        :rules="[(v) => !!v || 'Location is required']"
        label="Location"
        required
      ></v-text-field>

      <v-divider class="my-5"></v-divider>

      <v-btn color="error" small class="mr-2" @click="deleteRestoran">
        Delete
      </v-btn>

      <v-btn color="success" small @click="updateRestoran">
        Update
      </v-btn>
    </v-form>

    <p class="mt-3">{{ message }}</p>
  </div>

  <div v-else>
    <p>Please click on a Restoran...</p>
  </div>
</template>

<script>
import RestoranDataService from "../services/RestoranDataService";

export default {
  name: "restoran",
  data() {
    return {
      currentRestoran: null,
      message: "",
    };
  },
  methods: {
    getRestoran(id) {
      RestoranDataService.get(id)
        .then((response) => {
          this.currentRestoran = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateRestoran() {
      RestoranDataService.update(this.currentRestoran.id, this.currentRestoran)
        .then((response) => {
          console.log(response.data);
          this.message = "The restoran was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteRestoran() {
      RestoranDataService.delete(this.currentRestoran.id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "restorans" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getRestoran(this.$route.params.id);
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>