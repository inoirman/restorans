<template>
  <div class="submit-form mt-3 mx-auto">
    <p class="headline">Add Restoran</p>

    <div v-if="!submitted">
      <v-form ref="form" lazy-validation>
        <v-text-field
          v-model="restoran.title"
          :rules="[(v) => !!v || 'Title is required']"
          label="Title"
          required
        ></v-text-field>

        <v-text-field
          v-model="restoran.restoranType"
          :rules="[(v) => !!v || 'Type is required']"
          label="Type"
          required
        ></v-text-field>

        <v-text-field
          v-model="restoran.phone"
          :rules="[(v) => !!v || 'Phone is required']"
          label="Phone"
          required
        ></v-text-field>

        <v-text-field
          v-model="restoran.location"
          :rules="[(v) => !!v || 'Location is required']"
          label="Location"
          required
        ></v-text-field>

      </v-form>

      <v-btn color="primary" class="mt-3" @click="saveRestoran">Submit</v-btn>
    </div>

    <div v-else>
      <v-card class="mx-auto">
        <v-card-title>
          Submitted successfully!
        </v-card-title>

        <v-card-subtitle>
          Click the button to add new Restoran.
        </v-card-subtitle>

        <v-card-actions>
          <v-btn color="success" @click="newRestoran">Add</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import RestoranDataService from "../services/RestoranDataService";

export default {
  name: "add-restoran",
  data() {
    return {
      restoran: {
        id: null,
        title: "",
        restoranType: "",
        phone: "",
        location: "",
      },
      submitted: false,
    };
  },
  methods: {
    saveRestoran() {
      const data = {
        title: this.restoran.title,
        restoranType: this.restoran.restoranType,
        phone: this.restoran.phone,
        location: this.restoran.location,
      };

      RestoranDataService.create(data)
        .then((response) => {
          this.restoran.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newRestoran() {
      this.submitted = false;
      this.restoran = {};
    },
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
}
</style>