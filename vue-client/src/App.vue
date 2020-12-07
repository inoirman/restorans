<template>
  <v-app>
    <v-app-bar app dark>
      <div class="d-flex align-center mr-2">
        RestoranS
      </div>

      <v-btn to="/restorans" text>
        Restorans List
      </v-btn>

      <v-btn to="/add" text>
        Add
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
