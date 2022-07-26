<template>
  <v-row>
    <v-col cols="12" lg="12">
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title class="page-title">
            Vaccine Types
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-divider></v-divider>
        <div class="pa-4">
          <apexchart
            width="100%"
            height="350"
            type="bar"
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
          title: {
            text: "No. of coronavirus (COVID-19) vaccines",
          },
        },
        noData: {
          text: "Loading...",
        },
        tooltip: {
          y: {
            formatter: function(value) {
              return value.toLocaleString();
            },
          },
        },
        plotOptions: {
          bar: {
            // horizontal: true,
            dataLabels: {
              position: "top",
            },
          },
        },

        dataLabels: {
          enabled: true,
          offsetY: -16,
          style: {
            fontSize: "12px",
            colors: ["#000"],
            border: ["#fff"],
          },
          formatter: function(val) {
            // console.log(opt.w.globals);
            // var Formatter = new Intl.NumberFormat("en-US", {
            //   style: "currency",
            //   currency: "USD",
            // });

            //return opt.w.globals.labels[opt.dataPointIndex] + ': ' + Formatter.format(val);
            //return opt.w.globals.seriesNames[opt.seriesIndex] + ': ' + Formatter.format(val);
            return val.toLocaleString();
          },
        },
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
        .post("WOW_PROFILEREG", { data: "VBRAND", uRole: this.getPartner })
        .then((response) => {
          const newArr = response.data.data.map((obj) => ({
            value: obj.TotalCount,
            label: obj.Type == null ? "No data" : obj.Type,
          }));

          newArr.map((val) => {
            this.options.xaxis.categories.push(val.label);
          });

          this.series = [
            {
              data: newArr.map((val) => val.value),
            },
          ];
          // console.log(response.data)
          // const newArr = response.data.data.map((obj) => ({
          //   label: this.formatDate(obj.date),
          //   value: obj.TTOTAL,
          // }));

          // newArr.map((val) => {
          //   this.options.xaxis.categories.push(val.label);
          // });

          // this.series = [
          //   {
          //     data: newArr.map((val) => val.value),
          //   },
          // ];
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
