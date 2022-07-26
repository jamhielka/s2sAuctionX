<template>
  <v-container fluid class="down-top-padding">
    <v-row>
      <v-col cols="12" lg="12">
        <v-card>
          <v-toolbar flat>
            <v-col cols="12" class="px-0">
              <div class="d-flex align-center">
                <div class="text-left">
                  <v-toolbar-title class="page-title">
                    List of Registration
                  </v-toolbar-title>
                </div>
              </div>
            </v-col>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-divider></v-divider>
           <listOfRegistrations></listOfRegistrations>
          <!-- <div class="pa-4">
            <v-tabs v-model="tab" background-color="transparent" grow>
              <v-tab href="#for_validation"> Winners for Validation </v-tab>
              <v-tab href="#validated_winners"> Validated Winners  </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <v-tab-item :key="0" value="for_validation">
                <v-card flat>
                 
                </v-card>
              </v-tab-item>
              <v-tab-item :key="1" value="validated_winners">
                <ValidatedWinners></ValidatedWinners>
              </v-tab-item>
            </v-tabs-items>
          </div> -->
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import listOfRegistrations from "../page_components/ListOfRegistration.vue";
//import ValidatedWinners from "../page_components/ValidatedWinners.vue";
import moment from "moment";

export default {
  name: "Draw",
  components: {
    listOfRegistrations,
   // ValidatedWinners
  },
  data() {
    return {
      reload: "",
      tab: "new_draws",
      finishedDrawsHeaders: [
        {
          text: "Draw Title",
          align: "start",
          value: "name",
        },
        { text: "Description", value: "description" },
        {
          text: "Start Date",
          value: "promo_startdate",
          formatter: (x) =>
            x ? moment(x).format("MMM DD, YYYY h:mm A") : null,
        },
        {
          text: "End Date",
          value: "promo_enddate",
          formatter: (x) =>
            x ? moment(x).format("MMM DD, YYYY h:mm A") : null,
        },
        { text: "No. of Winners", align: "center", value: "no_winners" },
        {
          text: "Draw Date",
          value: "DrawDate",
          formatter: (x) =>
            x ? moment(x).format("MMM DD, YYYY h:mm A") : null,
        },
        // { text: "Actions", value: "actions", sortable: false },
      ],
      newDrawsHeader: [
        {
          text: "Draw Title",
          align: "start",
          value: "name",
        },
        { text: "Description", value: "description" },
        {
          text: "Start Date",
          value: "promo_startdate",
          formatter: (x) =>
            x ? moment(x).format("MMM DD, YYYY h:mm A") : null,
        },
        {
          text: "End Date",
          value: "promo_enddate",
          formatter: (x) =>
            x ? moment(x).format("MMM DD, YYYY h:mm A") : null,
        },
        { text: "No. of Winners", align: "center", value: "no_winners" },
        {
          text: "Date Created",
          value: "datecreated",
          formatter: (x) => (x ? moment(x).format("MMM DD, YYYY") : null),
        },
        // { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },

  methods: {
    dataAddRaffleDialog(val) {
      if (val) {
        this.reload = "WOW_RAFFLELIST";
      }
    },
  },
};
</script>
