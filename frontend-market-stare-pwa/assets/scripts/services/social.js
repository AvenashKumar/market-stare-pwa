function callTickerSentimentAPI(apiEndpoint) {
    // Set up the request
    const xhr = new XMLHttpRequest();
  
    // Open the connection
    xhr.open("GET", apiEndpoint, true);
  
    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/json");
  
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


function createGraph(data){
    google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {

        var data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day'],
          ['Work',     11],
          ['Eat',      2],
          ['Commute',  2],
          ['Watch TV', 2],
          ['Sleep',    7]
        ]);

        var options = {
          title: 'My Daily Activities'
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
      }
}

$('a[data-toggle="tab"]').on("shown.bs.tab", function (e) {
    const tabName = $(e.target).attr("tab-purpose"); // activated tab
    if (tabName === gs_social.tabs.social && $(".social-card").length <= 1) {
      alert("Hello");
        //fetchNews($("#data-country").html(), $("#search-ticker").val());
    }
  });