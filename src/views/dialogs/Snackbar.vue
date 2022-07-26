<template>
  <div>
    <v-snackbar
      v-model="snackbar"
      :value="responseMessage"
      timeout="4000"
    >
      {{ responseMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="closeSnackbar">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  props: ["responseMessage"],
  methods: {
    closeSnackbar() {
      this.$store.dispatch("addSnackbar", false);
    },
  },
  computed: {
    snackbar() {
      return this.$store.getters.getSnackbar;
    },
  },

  watch: {
    responseMessage() {
      setTimeout(() => {
        // this.clearErrorMessage();
        // console.log("dasdasd")
        this.$store.dispatch("addSnackbar", false);
      }, 4000);
    },
  },
};
</script>
