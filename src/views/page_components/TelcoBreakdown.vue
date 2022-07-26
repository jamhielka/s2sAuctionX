<template>
  <v-col cols="12" md="6" lg="6">
    <v-card>
      <v-toolbar flat>
        <v-toolbar-title class="page-title"> Events Breakdown </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-divider></v-divider>
      <div class="pa-4 d-flex justify-center">
        <apexchart
          width="480"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: "TelcoBreakdown",
  data() {
    return {
      series: [],
      chartOptions: {
        chart: {
          width: 380,
          type: "donut"
        },
        labels: [],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 300,
              },
              legend: {
                position: "top",
              },
            },
          },
        ],
        noData: {
          text: 'Loading...'
        },
        tooltip: {
          y: {
            formatter: function(value){
            return value.toLocaleString();
            }
          }
        }
      },
    };
  },

  methods: {
    async getTelcoBreakdown() {
      await this.$api
        .post("WOW_PROFILEREG", { data: "TELCO", uRole: this.getPartner })
        .then((response) => {
          // console.log(response)
          const newArr = response.data.data.map((obj) => ({
            value: obj.TotalCount,
            label: (obj.Type == null) ? 'N/A' : obj.Type,
          }));

          newArr.map((val) => {
            this.series.push(val.value);
            this.chartOptions.labels.push(val.label);
          });

        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  created() {
    this.getTelcoBreakdown();
  },
  computed: {
    getPartner() {
      return this.$store.getters.getPartner;
    },
  },
};
</script>