
<template>
  <v-row>
    <v-col cols="12" lg="12">
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title class="page-title">
            Realtime Messages
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-divider></v-divider>
        <div class="pa-4">
          <v-data-table
            :headers="table.headers"
            :items="table.data"
            hide-default-footer
            class="elevation-1"
          ></v-data-table>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import moment from 'moment';
export default {
  name: "RealtimeMessages",
  data() {
    return {
      table: {
        headers: [
          { text: "Mobile Number", value: "MSISDN" },
          {
            text: "Fullname",
            align: "start",
            sortable: false,
            value: "NAME",
          },
          { text: "Age", align: "center", value: "AGE" },
          { text: "Message", value: "MESSAGE" },
          {
            text: "Date/Time",
            value: "Datetime",
            formatter: (x) =>
              x ? moment(x).format("MMM DD, YYYY h:mm A") : null,
          },
        ],
        data: [],
      },
    };
  },
  methods: {
    async getRealtimeMessages() {
      await this.$api
        .post("WOW_ENTRIES_TODAY", { uRole: this.getPartner })
        .then((response) => {
          const newArr = response.data.data;
          console.log(newArr)
          this.table.data = newArr;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  created() {
    this.getRealtimeMessages();

    setInterval(() => {
      this.getRealtimeMessages();
    }, 3000);

    // setInterval(() => {
    //   this.table.data = []
    // }, 2000);
  },

  computed: {
    getPartner() {
      return this.$store.getters.getPartner;
    },
  },
};
</script>