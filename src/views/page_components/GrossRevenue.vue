<template>
  <v-row>
    <v-col cols="12" lg="12">
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title class="page-title" v-if="getPartner == 'RESBAKUNA'">
            No. of Transactions
          </v-toolbar-title>

          <v-toolbar-title class="page-title" v-else>
            Gross Revenue past 30 days
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-divider></v-divider>
        <div class="pa-4">
          <apexchart
            width="100%"
            height="350"
            type="line"
            :options="options"
            :series="series"
          ></apexchart>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import moment from "moment";
export default {
  name: "GrossRevenue",
  data() {
    return {
      options: {
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          categories: [],
          tickPlacement: "between",
        },
        yaxis: {
          labels: {
            formatter: function(val) {
              return parseInt(val).toLocaleString();
            },
          },
        },
        noData: {
          text: "Loading...",
        },

        tooltip: {
          y: {
            formatter: function(value){
            return value.toLocaleString();
            }
          }
        }
      },

      series: [
        {
          data: [],
          name: "Count",
        },
      ],
    };
  },
  methods: {
    async getGrossRevenue() {
      await this.$api
        .post("WOW_DAILYREV", { uRole: this.getPartner })
        .then((response) => {
          // console.log(response.data)
          const newArr = response.data.data.map((obj) => ({
            label: this.formatDate(obj.date),
            value: obj.TTOTAL,
          }));

          newArr.map((val) => {
            this.options.xaxis.categories.push(val.label);
          });

          this.series = [
            {
              data: newArr.map((val) => val.value),
            },
          ];
        })
        .catch((e) => {
          console.log(e);
        });
    },

    formatDate(date) {
      return moment(date).format("MMM-DD");
    },
  },
  created() {
    this.getGrossRevenue();
  },

  computed: {
    getPartner() {
      return this.$store.getters.getPartner;
    },
  },
};
</script>
