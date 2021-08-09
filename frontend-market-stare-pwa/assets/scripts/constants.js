gs_news = {
  //host: "http://localhost:8082/backend-news-api",
  host: "https://gateway-marketstare-lnh3luj.uc.gateway.dev/backend-news-api",
  apiKey: "AIzaSyDqyDp6sFeU2PTN8RrT6ZTRUQB-s06tgmU",
  newsList: {
    path: "/api/v1/list/news/countryCode/{countryCode}/ticker/{ticker}/totalItems/{totalItems}",
    totalItemsSingleRTT: 100,
  },
  newsDetails: {
    path: "/api/v1/news/details",
    totalItemsSingleRTT: 100,
  },
  defaultThubnailImg: "assets/images/missing-thumbnail.jpg",
  tabs: {
    finance: "finance",
    news: "news",
  },
};
