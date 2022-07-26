<template>
  <v-row>
    <v-col cols="12">
      <v-dialog v-model="dialog" persistent max-width="480px">
        <v-card>
          <v-form ref="form" lazy-validation>
            <v-card-title>
              <span>Approve Dialog</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" class="mt-0 pt-0">
                    <v-text-field
                      :rules="rules.required"
                      outlined
                      label="Name"
                      v-model="name"
                      readonly
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" class="mt-0 pt-0">
                    <v-textarea
                      outlined
                      name="input-7-4"
                      label="Remarks"
                      v-model="form.Remarks"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions class="pb-5">
              <v-spacer></v-spacer>
              <v-btn @click.prevent="sendApprove" color="primary"> Submit </v-btn>
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
      name: "",
      rules: {
        required: [(value) => !!value || "Required."],
      },
      form: {
        RaffleID: null,
        ID: null,
        Remarks: "",
        ApprovedBy: this.$store.getters.getUsername,
        isApproved: "TRUE",
      },
    };
  },
  props: ["data", "dialog"],

  methods: {
    closeDialog() {
      this.$emit("close", false);
    },

    async sendApprove() {
      await this.$api
        .post('WOW_VALIDATE', this.form)
        .then((response) => {
          console.log(response);
          if (response.data.statusCode === 2) {
            this.$emit("refeshData");
            this.responseMessage = "Approved.";
            this.snackbar = true;
            this.closeDialog();
          } else {
            this.responseMessage = "Not Approved.";
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
      this.name = this.data.name;
      this.form.RaffleID = this.data.RAFFLEID;
      this.form.ID  = this.data.ID;

      this.form.Remarks = ""; // clear remarks on close

    },
  },
};
</script>
