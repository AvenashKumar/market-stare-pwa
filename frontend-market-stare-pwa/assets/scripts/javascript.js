//const g_host = "http://localhost:8081";
const g_host = "https://gateway-marketstare-lnh3luj.uc.gateway.dev/backend-marketstare-search";

const g_apiOverview = "/api/v1/overview/find/symbol/";

const g_apiLatestUpdate = "/api/v1/latestupdate/find/symbol/";

const g_apiAllTickers = "/api/v1/all/tickers";

const g_apiKey = "AIzaSyDqyDp6sFeU2PTN8RrT6ZTRUQB-s06tgmU";

let g_allTickers = [];

const g_pathDict = { root: "/", search: "/search" };

function generateEndpoint(path) {
  return g_host + path + "?key=" + g_apiKey;
}

function isEmptyString(inputString) {
  return !inputString || inputString.trim().length === 0;
}

function setSearchTickerValue(value) {
  if (isEmptyString(value)) {
    return;
  }

  document.getElementById("search-ticker").value = value;
}

function onSearch() {
  const searchSymbol = document.getElementById("search-ticker").value.trim();
  if (isEmptyString(searchSymbol)) {
    return false;
  }

  const requestLatestUpdate = generateEndpoint(
    g_apiLatestUpdate + searchSymbol
  );
  callSearchStockAPI(requestLatestUpdate, true);

  const requestOverview = generateEndpoint(g_apiOverview + searchSymbol);
  callSearchStockAPI(requestOverview, false);

  return false;
}

function showError(strError) {
  const statusP = document.getElementsByClassName("alert-danger");
  for (let i = 0; i < statusP.length; i++) {
    statusP[i].innerHTML = strError;
    if (isEmptyString(strError)) {
      statusP[i].setAttribute("hidden", "hidden");
    } else {
      statusP[i].removeAttribute("hidden");
    }
  }
}
function isFloat(text) {
  if (Number.isNaN(text)) {
    return false;
  }

  if (typeof text === "number") {
    return !Number.isInteger(text);
  }
  return false;
}

function setInnerHtmlById(id, text) {
  const element = document.getElementById(id);
  if (element) {
    if (isFloat(+text)) {
      element.innerHTML = parseFloat(text).toFixed(2);
    } else {
      if (isEmptyString(text)) {
        element.innerHTML = "-";
      } else {
        element.innerHTML = text;
      }
    }
  }
}

function populateLatestUpdateData(latestUpdateData) {
  setInnerHtmlById("data-marketprice", latestUpdateData["MarketPrice"]);
  setInnerHtmlById("data-open", latestUpdateData["Open"]);
  setInnerHtmlById("data-previousclose", latestUpdateData["PreviousClose"]);
  setInnerHtmlById("data-low", latestUpdateData["Low"]);
  setInnerHtmlById("data-high", latestUpdateData["High"]);
}

function populateOverviewData(overviewData) {
  setInnerHtmlById("data-symbol", overviewData["Symbol"]);

  setInnerHtmlById("data-name", overviewData["Name"]);

  setInnerHtmlById("data-eps", overviewData["EPS"]);

  setInnerHtmlById("data-pegratio", overviewData["PEGRatio"]);

  setInnerHtmlById("data-fiftytwoweekhigh", overviewData["52WeekHigh"]);

  setInnerHtmlById("data-fiftytwoweeklow", overviewData["52WeekLow"]);

  setInnerHtmlById(
    "data-marketcapitalization",
    overviewData["MarketCapitalization"]
  );

  setInnerHtmlById("data-dividendyield", overviewData["DividendYield"]);

  setInnerHtmlById("data-dividendpershare", overviewData["DividendPerShare"]);

  setInnerHtmlById("data-dividenddate", overviewData["DividendDate"]);

  setInnerHtmlById("data-exdividenddate", overviewData["ExDividendDate"]);

  setInnerHtmlById(
    "data-forwardannualdividendrate",
    overviewData["ForwardAnnualDividendRate"]
  );

  setInnerHtmlById(
    "data-forwardannualdividendyield",
    overviewData["ForwardAnnualDividendYield"]
  );

  setInnerHtmlById("data-payoutratio", overviewData["PayoutRatio"]);

  setInnerHtmlById("data-lastsplitfactor", overviewData["LastSplitFactor"]);

  setInnerHtmlById("data-lastsplitdate", overviewData["LastSplitDate"]);

  setInnerHtmlById("data-sharesoutstanding", overviewData["SharesOutstanding"]);

  setInnerHtmlById(
    "data-fiftydaymovingaverage",
    overviewData["50DayMovingAverage"]
  );

  setInnerHtmlById(
    "data-twohundreddaymovingaverage",
    overviewData["200DayMovingAverage"]
  );

  setInnerHtmlById("data-bookvalue", overviewData["BookValue"]);

  setInnerHtmlById("data-eps", overviewData["EPS"]);

  setInnerHtmlById("data-assettype", overviewData["AssetType"]);

  setInnerHtmlById("data-cik", overviewData["CIK"]);

  setInnerHtmlById("data-exchange", overviewData["Exchange"]);

  setInnerHtmlById("data-currency", overviewData["Currency"]);

  setInnerHtmlById("data-country", overviewData["Country"]);

  setInnerHtmlById("data-sector", overviewData["Sector"]);

  setInnerHtmlById("data-industry", overviewData["Industry"]);

  setInnerHtmlById("data-fulltimeemployees", overviewData["FullTimeEmployees"]);

  setInnerHtmlById("data-fiscalyearend", overviewData["FiscalYearEnd"]);

  setInnerHtmlById("data-latestquarter", overviewData["LatestQuarter"]);

  setInnerHtmlById("data-type", overviewData["Type"]);

  setInnerHtmlById("data-country", overviewData["Country"]);

  hideOrDisplayDivSearchResults(true);
}

function hideOrDisplayDivSearchResults(isDisplay) {
  hideOrDisplayDiv("search-results", isDisplay);

  hideOrDisplayDiv("extra-space", !isDisplay);
}

function hideOrDisplayDiv(id, isDisplay) {
  const div = document.getElementById(id);
  if (isDisplay) {
    div.removeAttribute("hidden");
  } else {
    div.setAttribute("hidden", "hidden");
  }
}

function callSearchStockAPI(apiEndpoint, isLatestUpdate) {
  // Set up the request
  const xhr = new XMLHttpRequest();

  // Open the connection
  xhr.open("GET", apiEndpoint, true);

  xhr.onerror = function () {
    showError("Please try again later.");
  };

  // Set up a handler for when the task for the request is complete
  xhr.onload = function () {
    if (xhr.status == 200) {
      showError("");
      const jsonResponse = JSON.parse(xhr.responseText);
      if (isLatestUpdate) {
        populateLatestUpdateData(jsonResponse);
      } else {
        populateOverviewData(jsonResponse);
      }
    } else {
      const jsonResponse = JSON.parse(xhr.responseText);
      if (jsonResponse.message) {
        showError(jsonResponse.message);
      } else {
        showError("Please try again later.");
      }
      hideOrDisplayDivSearchResults(false);
    }
  };

  // Send the data.
  xhr.send();
}

function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function (e) {
    var a,
      b,
      i,
      val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].toUpperCase().includes(val.toUpperCase())) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function (e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName("input")[0].value.split(
            " | ",
            1
          );
          /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) {
      //up
      /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

function callFindAllTickersAPI() {
  const localStorageAllTickerKey = "allTickers";

  //Read value from local storage first
  const allTickers = JSON.parse(localStorage.getItem(localStorageAllTickerKey));
  if (allTickers) {
    g_allTickers = allTickers;
    return g_allTickers;
  }

  // Set up the request
  const xhr = new XMLHttpRequest();

  const requestEndpoint = generateEndpoint(g_apiAllTickers);

  // Open the connection
  xhr.open("GET", requestEndpoint, true);

  xhr.onerror = function () {
    return g_allTickers;
  };

  // Set up a handler for when the task for the request is complete
  xhr.onload = function () {
    if (xhr.status == 200) {
      const jsonAllStocks = JSON.parse(xhr.responseText);
      for (let i = 0; i < jsonAllStocks.length; i++) {
        g_allTickers.push(
          jsonAllStocks[i].ticker + " | " + jsonAllStocks[i].name
        );
      }

      //Update local storage
      localStorage.setItem(
        localStorageAllTickerKey,
        JSON.stringify(g_allTickers)
      );
      return g_allTickers;
    } else {
      return g_allTickers;
    }
  };

  // Send the data.
  xhr.send();
}

function searchQuery() {
  const path = window.location.pathname;
  if (!(g_pathDict.search === path)) {
    return;
  }
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const ticker = urlParams.get("ticker");
  if (isEmptyString(ticker)) {
    return;
  }
  setSearchTickerValue(ticker);
  onSearch();
}

function onPageLoad() {
  callFindAllTickersAPI();

  /*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
  autocomplete(document.getElementById("search-ticker"), g_allTickers);

  searchQuery();
}
