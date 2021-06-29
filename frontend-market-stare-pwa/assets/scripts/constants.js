gs_news = {
  //host: "http://localhost:8082",
  host: "https://backend-news-api-co4tcjxfmq-uc.a.run.app",
  newsList: {
    path: "/api/v1/list/news",
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
