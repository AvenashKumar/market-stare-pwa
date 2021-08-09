function isEmptyString(inputString) {
  return !inputString || inputString.length === 0;
}

function fetchNews(countryCode, ticker) {
  var reqBody = new Object();
  reqBody.countryCode = countryCode;
  reqBody.totalItems = gs_news.newsList.totalItemsSingleRTT;
  reqBody.ticker = ticker;

  const newsEndpoint = gs_news.host + 
                      gs_news.newsList.path.replace("{countryCode}", reqBody.countryCode).replace("{ticker}", reqBody.ticker).replace("{totalItems}", reqBody.totalItems) + 
                      "?key=" + gs_news.apiKey;
  callNewsAPI(newsEndpoint, JSON.stringify(reqBody));

  return false;
}

function callNewsAPI(apiEndpoint) {
  // Set up the request
  const xhr = new XMLHttpRequest();

  // Open the connection
  xhr.open("GET", apiEndpoint, true);

  xhr.onerror = function () {};

  // Set up a handler for when the task for the request is complete
  xhr.onload = function () {
    if (xhr.status == 200) {
      const jsonResponse = JSON.parse(xhr.responseText);
      populateNews(jsonResponse);
    }
  };

  // Send the data.
  xhr.send();
}

function populateNews(news) {
  const newsContainerHtml = $(".news-container").html();
  for (i = 0; i < news.length; ++i) {
    $(".news-card").last().after(newsContainerHtml);

    $(".news-title").last().html(news[i].title);

    $(".news-provider")
      .last()
      .html(news[i].pubDate + " - " + news[i].provider);

    $(".news-thumbnail")
      .last()
      .attr(
        "src",
        news[i].thumbnail === null
          ? gs_news.defaultThubnailImg
          : news[i].thumbnail
      );

    const newsDetailsLink =
      gs_news.host +
      gs_news.newsDetails.path +
      "/" +
      news[i].region +
      "/" +
      news[i].newsUuid + "?key=" + gs_news.apiKey;

    $(".news-title-url").last().attr("href", newsDetailsLink);
    $(".news-thumbnail-url").last().attr("href", newsDetailsLink);
  }
  $(".news-card").first().remove();
}

$('a[data-toggle="tab"]').on("shown.bs.tab", function (e) {
  const tabName = $(e.target).attr("tab-purpose"); // activated tab
  if (tabName === gs_news.tabs.news && $(".news-card").length <= 1) {
    fetchNews($("#data-country").html(), $("#search-ticker").val());
  }
});
