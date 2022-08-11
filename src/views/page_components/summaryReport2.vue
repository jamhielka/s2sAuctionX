<template>
  <v-row>
    <v-col cols="12" lg="6" v-if="getPartner != 'RESBAKUNA'">
      <v-card>
        <v-card-text class="text-center">
          <v-row>
            <v-col cols="12">
              <div class="d-sm-flex align-center">
                <div class="text-left">
                  <h3
                    class="title blue-grey--text text--darken-2 font-weight-regular"
                  >
                    Today's Revenue
                  </h3>
                  <h6 class="subtitle-2 font-weight-light">
                    Php {{  summaryReport.data.TM.toLocaleString() }}
                  </h6>
                </div>
                <div class="ml-auto">
                  <div class="d-flex align-center">
                    <div class="d-flex align-center px-2">
                      <v-icon size="50">mdi-chart-bar</v-icon>
                    </div>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" lg="6" v-if="getPartner != 'RESBAKUNA'">
      <v-card>
        <v-card-text class="text-center">
          <v-row>
            <v-col cols="12">
              <div class="d-sm-flex align-center">
                <div class="text-left">
                  <h3
                    class="title blue-grey--text text--darken-2 font-weight-regular"
                  >
                    This Month Revenue
                  </h3>
                  <h6 class="subtitle-2 font-weight-light">
                    Php {{ summaryReport.data.LM.toLocaleString() }}
                  </h6>
                </div>
                <div class="ml-auto">
                  <div class="d-flex align-center">
                    <div class="d-flex align-center px-2">
                      <v-icon size="50">mdi-chart-bar-stacked</v-icon>
                    </div>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" lg="3">
      <v-card>
        <v-card-text class="text-center">
          <v-row>
            <v-col cols="4">
              <v-btn
                class="mx-2"
                fab
                dark
                color="cyan"
                :to="`${this.$route.matched[0].path}/dashboard/todays-registration`"
              >
                <v-icon dark> mdi-newspaper-variant-multiple-outline </v-icon>
              </v-btn>
            </v-col>
            <v-col cols="8 text-left px-0">
              <h4
                class="mt-2 title blue-grey--text text--darken-2 font-weight-regular"
              >
                {{ summaryReport.data.TR.toLocaleString() }}
                <h6 class="subtitle-2 font-weight-light">
                  Today’s Registration
                </h6>
              </h4>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" lg="3">
      <v-card>
        <v-card-text class="text-center">
          <v-row>
            <v-col cols="4">
              <!-- <v-btn class="mx-2" fab dark color="blue-grey"> -->
              <!-- <v-icon dark> mdi-account-group </v-icon> -->
              <div class="my-2">
                <v-icon large color="blue darken-2"> mdi-account-group </v-icon>
              </div>
              <!-- </v-btn> -->
            </v-col>
            <v-col cols="8 text-left px-0">
              <h4
                class="mt-2 title blue-grey--text text--darken-2 font-weight-regular"
              >
                {{ summaryReport.data.UR.toLocaleString() }}
                <h6 class="subtitle-2 font-weight-light">
                  Today's Event
                </h6>
              </h4>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" lg="3">
      <v-card>
        <v-card-text class="text-center">
          <v-row>
            <v-col cols="4">
              <v-btn
                class="mx-2"
                fab
                dark
                color="success"
                :to="`${this.$route.matched[0].path}/dashboard/total-registration`"
              >
                <v-icon dark> mdi-account-check </v-icon>
              </v-btn>
            </v-col>
            <v-col cols="8 text-left px-0">
              <h4
                class="mt-2 title blue-grey--text text--darken-2 font-weight-regular"
              >
                {{ summaryReport.data.TTLR.toLocaleString() }}
                <h6 class="subtitle-2 font-weight-light">Total Registration</h6>
              </h4>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" lg="3">
      <v-card>
        <v-card-text class="text-center">
          <v-row>
            <v-col cols="4">
              <!-- <v-btn class="mx-2" fab dark color="warning">
                <v-icon dark> mdi-account-supervisor-outline </v-icon>
              </v-btn> -->
              <div class="my-2">
                <v-icon large color="blue darken-2">
                  mdi-account-supervisor-outline
                </v-icon>
              </div>
            </v-col>
            <v-col cols="8 text-left px-0">
              <h4
                class="mt-2 title blue-grey--text text--darken-2 font-weight-regular"
              >
                {{ summaryReport.data.TTLU.toLocaleString() }}
                <h6 class="subtitle-2 font-weight-light">Total Events</h6>
              </h4>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "SummaryReport",
  data() {
    return {
      summaryReport: {
        data: {
          LM: "0",
          TM: "0",
          TR: "0",
          TTLR: "0",
          TTLU: "0",
          UR: "0",
        },
        statusCode: "",
      },
    };
  },

  methods: {
    async getSummaryReport() {
      // await this.$api
      //   .post("WOW_RPT", { uRole: this.getPartner })
      //   .then((response) => {
      //     this.summaryReport = response.data;
      //   })
      //   .catch((e) => {
      //     console.log(e);
      //   });
    },
  },

  created() {
    this.getSummaryReport();
  },

  computed: {
    userRole() {
      return this.$store.getters.userRole;
    },

    getPartner() {
      return this.$store.getters.getPartner;
    },
  },
};
</script>
