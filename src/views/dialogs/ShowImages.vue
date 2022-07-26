<template>
  <v-row>
    <v-col cols="12">
      <v-dialog v-model="dialog" persistent max-width="480px">
        <v-card>
          <v-card-title>
            <span>Uploaded files</span>

            <!-- <v-spacer></v-spacer>
              <v-btn fab x-small @click="closeDialog">
                <v-icon>mdi-close</v-icon>
              </v-btn> -->
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text v-if="images.length <= 0">No uploaded files.</v-card-text>
          <v-card-text d-flex v-for="(image, i) in images" :key="i">
            <v-img
              :src="`https://gma.zed.ph/${image.Filepath}`"
              aspect-ratio="1"
              max-height="200"
              contain
              elevation-1
            ></v-img>
            <small><strong>Filename:</strong> {{ image.Filename }}</small>
          </v-card-text>
          <v-card-actions class="pb-5">
            <v-spacer></v-spacer>
            <!-- <v-btn @click.prevent="sendReply" color="primary"> Send </v-btn> -->
            <v-btn @click="closeDialog"> Close </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      images: [],
      //   snackbar: false,
      //   responseMessage: "",
      //   rules: {
      //     required: [(value) => !!value || "Required."],
      //   },
      //   form: {
      //     to: "",
      //     text: "",
      //     id: 0,
      //     UserId: this.$store.getters.getUsername,
      //   },
    };
  },
  props: ["msisdn", "dialog"],

  methods: {
    closeDialog() {
      this.$emit("close", false);
    },

    async getFiles(msisdn) {
      await this.$api
        .post("MICRO_FILES", { Msisdn: msisdn })
        .then((response) => {
          console.log(response.data);
          if (response.data.statusCode === 1) {
            this.images = [];
            return;
          }

          this.images = response.data.data;
          // console.log(response)
        })
        .catch((e) => {
          console.log(e);
          this.loadingBtn = false;
        });
    },
  },

  created() {
    // this.getFiles();
  },

  watch: {
    dialog: function() {
      this.getFiles(this.$props.msisdn);
    },
  },
};
</script>
