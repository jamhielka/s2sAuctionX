<template>
  <v-row>
    <v-col cols="12">
      <v-dialog v-model="dialog" persistent max-width="480px">
        <v-card>
          <v-form ref="form" lazy-validation>
            <v-card-title>
              <span>{{ title }}</span>

              <!-- <v-spacer></v-spacer>
              <v-btn fab x-small @click="closeDialog">
                <v-icon>mdi-close</v-icon>
              </v-btn> -->
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" class="mt-0 pt-0">
                    <v-text-field
                      :rules="rules.required"
                      outlined
                      label="To"
                      v-model="form.to"
                      readonly
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" class="mt-0 pt-0">
                    <v-textarea
                      outlined
                      name="input-7-4"
                      label="Message"
                      v-model="form.text"
                      :rules="rules.required"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions class="pb-5">
              <v-spacer></v-spacer>
              <v-btn @click.prevent="sendReply" color="primary"> Send </v-btn>
              <v-btn @click="closeDialog"> Cancel </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </v-col>

    <v-snackbar v-model="snackbar">
      {{ responseMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      snackbar: false,
      responseMessage: "",
      rules: {
        required: [(value) => !!value || "Required."],
      },
      form: {
        to: "",
        text: "",
        id: 0,
        UserId: this.$store.getters.getUsername,
      },
    };
  },
  props: ["data", "dialog", "apiUrl", "title"],

  methods: {
    closeDialog() {
      this.$emit("close", false);
    },

    async sendReply() {
      if (!this.$refs.form.validate()) {
        return false;
      }

      await this.$api
        // .post("ZEDSMS", this.form)
        .post(this.$props.apiUrl, this.form)
        .then((response) => {
          if (response.data.statusCode === 0) {
            this.$emit("refeshData");
            this.responseMessage = "Message successfully sent";
            this.snackbar = true;
            this.closeDialog();
          } else {
            this.responseMessage = "Message not sent";
            this.snackbar = true;
            this.closeDialog();
          }
        })
        .catch((e) => {
          console.log(e);
          this.loadingBtn = false;
        });
    },
  },

  watch: {
    dialog: function() {
      // watch it
      this.form.to = this.data.MSISDN;
      if(this.data.id){
        this.form.id = this.data.id;
      }
     
      this.form.text = "";
      if(!this.dialog){
        this.$refs.form.resetValidation();
      }
    },
  },
};
</script>
