module.exports = {
    chainWebpack: (config) => {
        config.plugin("html").tap((args) => {
          args[0].title = "Auction X";
          return args;
        });
      },
    "transpileDependencies": [
        "vuetify"
    ],
    publicPath: '/'
}