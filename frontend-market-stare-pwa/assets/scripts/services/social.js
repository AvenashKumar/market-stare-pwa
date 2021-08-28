google.charts.load("current", { packages: ["corechart", "bar"] });

function fetchMarketTrend(region, ticker) {
  // API endpoint
  const apiEndpoint = gs_news.host + gs_news.analysis.path.replace("{ticker}", ticker).replace("{region}", region) + "?key=" + gs_news.apiKey;

  // Set up the request
  const xhr = new XMLHttpRequest();

  // Open the connection
  xhr.open("GET", apiEndpoint, true);

  xhr.onerror = function () {};

  // Set up a handler for when the task for the request is complete
  xhr.onload = function () {
    if (xhr.status == 200) {
      const trend = JSON.parse(xhr.responseText);
      drawMarketTrend(trend);
    }
  };

  // Send the data.
  xhr.send();
}

function drawMarketTrend(trend) {
  google.charts.setOnLoadCallback(function(){
    var data = google.visualization.arrayToDataTable([
        ["Recommendation", "Sentiments", { role: "style" }],
        ["Strong Buy", trend["strongBuy"], "#4C9A2A"],
        ["Buy", trend["buy"], "#A4DE02"],
        ["Hold", trend["hold"], "gold"],
        ["Sell", trend["sell"], "#FA6F01"],
        ["Strong Sell", trend["strongSell"], "#F03801"],
      ]);
    
      var options = {
        title: "Reddit Sentiment Analysis",
        legend: 'none',
        chartArea: { width: "50%" },
        hAxis: {
          title: "Sentiments",
          minValue: 0,
          textStyle: {
            bold: true,
          },
          titleTextStyle: {
            bold: true,
          }
        },
        vAxis: {
            textStyle: {
              bold: true,
            }
          }
      };
    
      var chart = new google.visualization.BarChart(
        document.getElementById("market-trend-chart")
      );
    
      chart.draw(data, options);
  });
}

$('a[data-toggle="tab"]').on("shown.bs.tab", function (e) {
    const tabName = $(e.target).attr("tab-purpose"); // activated tab
    if (tabName === gs_news.tabs.social && $(".social-card").length <= 1) {
        fetchMarketTrend($("#data-country").html(), $("#search-ticker").val());
    }
  });