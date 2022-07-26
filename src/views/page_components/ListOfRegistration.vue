<template>
  <div>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

    <!-- <div class="mb-2 mt-2">
      <v-btn color="primary" :disabled="table.data <= 0">
        <JsonCSV :data="table.data" name="WINNERS_FOR_VALIDATION.csv">
          Export to CSV
          <v-icon dense>mdi-file-delimited-outline</v-icon>
        </JsonCSV>
      </v-btn>
    </div> -->

    <v-data-table
      :headers="table.headers"
      :items="table.data"
      :items-per-page="10"
      :loading="table.loading"
      item-key="id"
      :search="search"
      loading-text="Loading... Please wait"
      class="elevation-1"
    >
     <template v-slot:[`item.avatar`]="{ item }">
      <img :src="item.avatar" style="width: 50px; height: 50px" />
    </template>
      <template
        v-for="header in table.headers.filter((header) =>
          header.hasOwnProperty('formatter')
        )"
        v-slot:[`item.${header.value}`]="{ value }"
      >
        {{ header.formatter(value) }}
      </template>

      <template v-slot:[`item.Prize`]="{ item }">
        {{ parseInt(item.Prize).toLocaleString() }}
      </template>
<!-- 
      <template v-slot:[`item.actions`]="{ item }">
        

        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              x-small
              color="warning"
              @click="showSendSMS(item)"
            >
              <v-icon x-small>mdi-email-fast</v-icon>
            </v-btn>
          </template>
          <span>Send Message</span>
        </v-tooltip>
      </template> -->
    </v-data-table>

    <!-- <div class="images" v-viewer>
      <img v-for="src in images" :key="src" :src="src" />
    </div> -->
    <!-- component -->
    <!-- <viewer :images="images">
      <img v-for="src in images" :key="src" :src="src" />
    </viewer> -->
    <!-- <ApproveDialog
      :dialog="approveDialog"
      :data="approveData"
      @close="closeApproveDialog"
      @refeshData="refeshData"
    ></ApproveDialog>

    <ShowImages
      :dialog="showImage.dialog"
      :msisdn="showImage.msisdn"
      @close="showImage.dialog = false"
    ></ShowImages> -->

    <ReplyDialog
      :dialog="sendMessage.dialog"
      :data="sendMessage.data"
      apiUrl="ZEDSMS"
      title="Send Message"
      @close="sendMessage.dialog = false"
    ></ReplyDialog>

    <Snackbar :responseMessage="snackbarMessage"></Snackbar>
  </div>
</template>

<script>
//import moment from "moment";
//import ApproveDialog from "../dialogs/ApproveDialog.vue";
// import ShowImages from "../dialogs/ShowImages.vue";
 import ReplyDialog from "../dialogs/ReplyDialog.vue";
import Snackbar from "../dialogs/Snackbar.vue";
// import "viewerjs/dist/viewer.css";
// import VueViewer from "v-viewer";
// import JsonCSV from "vue-json-csv";
// Vue.component('downloadCsv', JsonCSV)
export default {
  components: {
    // ApproveDialog,
    // ShowImages,
    // JsonCSV,
    ReplyDialog,
    Snackbar,
    // VueViewer,
  },
  data() {
    return {
      images: [],
      sendMessage: {
        dialog: false,
        data: null,
      },
      snackbarMessage: "",
      approveDialog: false,
      approveData: {},
      search: "",
      paths: {
        viewInfo: "/draw/view",
      },
      table: {
        sortBy: "dtCreated",
        sortDesc: true,
        loading: false,
        headers: [
          // {
          //   text: "Draw Date",
          //   align: "start",
          //   sortable: false,
          //   value: "DTDraw",
          //   formatter: (x) => (x ? moment(x).format("MMMM DD, YYYY") : null),
          // },
           {
        text: "Image",
        align: "start",
        sortable: false,
        value: "avatar",
      },
          {
            text: "Nickname",
            align: "start",
            value: "nickname",
          },
          {
            text: "emailAddress",
            align: "start",
            value: "emailAddress",
          },
          {
            text: "mobileNumber",
            align: "center",
            value: "mobileNumber",
          },
          {
            text: "credit",
            align: "center",
            value: "credit",
          },
          {
            text: "accumulatedCredit",
            align: "start",
            value: "accumulatedCredit",
          },
          {
            text: "spendCredit",
            value: "Date_Vaccination",
            align: "spendCredit",
          },
         
        //   {
        //     text: "Actions",
        //     value: "actions",
        //     align: "center",
        //     width: "20%",
        //     sortable: false,
        //   },
        ],
        data: [],
      },

      showImage: {
        dialog: false,
        msisdn: "",
      },
    };
  },
  methods: {
    async getForValidationList() {
      this.table.loading = true;
      await this.$api
        .get("reports?name=listOfRegistrations")
        .then((response) => {

          const newArr = response.data.data.registrations;
          // var gfg = JSON.stringify(newArr);
        
          this.table.data = newArr;
          this.table.loading = false;
        })
        .catch((e) => {
          this.table.loading = false;
          console.log(e);
        });
    },

    approve(data) {
      this.approveData = data;
      this.approveDialog = true;
    },

    closeApproveDialog() {
      this.approveDialog = false;
    },

    refeshData() {
      this.getForValidationList();
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

          if (response.data.data.length <= 0) {
            this.snackbarMessage = "No uploaded files.";
            this.$store.dispatch("addSnackbar", true);
            return;
          }

          const images = response.data.data.map((image) => {
            return `https://gma.zed.ph/${image.Filepath}`;
          });
          this.images = images;
          this.$viewerApi({
            options: {
              movable: false,
            },
            images: this.images,
          });
          // console.log(response)
        })
        .catch((e) => {
          console.log(e);
          this.loadingBtn = false;
        });
    },

    showImageDialog(data) {
      // console.log()
      // this.showImage.msisdn = data.MSISDN;
      // this.showImage.dialog = true;
      this.getFiles(data.MSISDN);
    },

    showSendSMS(data) {
      this.sendMessage.dialog = true;
      this.sendMessage.data = data;
    },
  },
  created() {
    this.getForValidationList();
  },

  computed: {
    getPartner() {
      return this.$store.getters.getPartner;
    },
  },
};
</script>
