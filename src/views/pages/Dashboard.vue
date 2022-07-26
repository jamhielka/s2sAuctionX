<template>
  <v-container fluid class="down-top-padding">
    <v-row>
      <v-col cols="12">
        <v-toolbar-title>Dashboard</v-toolbar-title>
      </v-col>
    </v-row>
    <SummaryReport></SummaryReport>
    <GrossRevenue></GrossRevenue>
    <!-- <RealtimeMessages></RealtimeMessages> -->
    <!-- <v-row>
      <AgeBracket></AgeBracket>
      <TelcoBreakdown></TelcoBreakdown>
    </v-row>
    <VaccineType  v-if="getPartner != 'GMA'"></VaccineType> -->
  </v-container>
</template>

<script>
import SummaryReport from "../page_components/summaryReport2.vue";
import GrossRevenue from "../page_components/GrossRevenue.vue";
// import RealtimeMessages from "../page_components/RealtimeMessages.vue";
// import AgeBracket from "../page_components/AgeBracket.vue";
// import TelcoBreakdown from "../page_components/TelcoBreakdown.vue";
// import VaccineType from "../page_components/VaccineType.vue";

export default {
  name: "Dashboard",
  components: {
    SummaryReport,
    GrossRevenue,
    // RealtimeMessages,
    // AgeBracket,
    // TelcoBreakdown,
    // VaccineType,
  },

  computed: {
    getPartner() {
      return this.$store.getters.getPartner;
    },
  },
};
</script>
