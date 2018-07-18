var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var request = require('request');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
const axios = require('axios');


app.set("view engine", "ejs");

app.get("/", function (req, res) {
var data;
var data2;
  axios.all([
      axios.get('https://epndeals.api.ebay.com/epndeals/v1?marketplace=us&campaignid=5338330297&toolid=100034&rotationId=711-53200-19255-0&type=DAILY&format=json'),
      axios.get('https://svcs.ebay.com/MerchandisingService?OPERATION-NAME=getMostWatchedItems&SERVICE-NAME=MerchandisingService&SERVICE-VERSION=1.1.0&CONSUMER-ID=TrentonN-SkinnyPi-PRD-bc970d9ce-9ed166d5&version=517&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&maxResults=3')
]).then(axios.spread(function (response1, response2) {
  data = response1.data;
  data2 = response2.data;
  res.render("home", { data: data, data2: data2 });
   
})).catch(error => {
  console.log(error);
});

    

    

});

app.get("/category/:categoryName", function (req, res) {
    var request = require('request');
    var catID;
    var categoryName;

    switch (req.params.categoryName) {
        case "video-games":
            catID = 1249;
            categoryName = "Video Games"
            break;
        case "tv":
            catID = 11071;
            categoryName = "TV"
            break;
        case "computers":
            catID = 58058;
            categoryName = "Computers"
            break;
        case "outdoors":
            catID = 159043;
            categoryName = "Outdoors"
            break;
        case "home-and-garden":
            catID = 11700;
            categoryName = "Home & Garden"
            break;
        case "clothing":
            catID = 11450;
            categoryName = "Clothing"
            break;
        case "cameras":
            catID = 625;
            categoryName = "Cameras"
            break;
        case "auto":
            catID = 6000;
            categoryName = "Auto"
            break;
        case "health-and-beauty":
            catID = 26395;
            categoryName = "Health & Beauty"
            break;
        case "baby":
            catID = 2984;
            categoryName = "Baby"
            break;
        case "travel":
            catID = 3252;
            categoryName = "Travel"
            break;
        default:
            catID = 99;
            categoryName = "All Results"
    }
    var categoryURL = 'http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByCategory&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=TrentonN-SkinnyPi-PRD-bc970d9ce-9ed166d5&version=517&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&categoryId=' + catID + '&paginationInput.entriesPerPage=108&itemFilter(0).name=ListingType%20&itemFilter(0).value(0)=AuctionWithBIN&itemFilter(0).value(1)=FixedPrice&itemFilter(0).value(2)=StoreInventory';
    var popularDealsURL = 'http://svcs.ebay.com/MerchandisingService?OPERATION-NAME=getMostWatchedItems&SERVICE-NAME=MerchandisingService&SERVICE-VERSION=1.1.0&CONSUMER-ID=TrentonN-SkinnyPi-PRD-bc970d9ce-9ed166d5&version=517&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&maxResults=3&categoryId=' + catID;
    axios.all([
        axios.get(categoryURL),
        axios.get(popularDealsURL)
    ]).then(axios.spread(function (response1, response2) {
        data = response1.data;
        data2 = response2.data;
        console.log(data2.getMostWatchedItemsResponse.itemRecommendations.item.length);
        res.render("category", { data: data, data2: data2, categoryName: categoryName });

    })).catch(error => {
        console.log(error);
    });


});

app.get("/results", function (req, res) {
    var query = req.query.search;
    var url = "http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsAdvanced&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=TrentonN-SkinnyPi-PRD-bc970d9ce-9ed166d5&version=517&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=" + query + "&paginationInput.entriesPerPage=108&itemFilter(0).name=ListingType%20&itemFilter(0).value(0)=AuctionWithBIN&itemFilter(0).value(1)=FixedPrice&itemFilter(0).value(2)=StoreInventory";
    request(url, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            var data = JSON.parse(body);
            res.render("results", { data: data, query: query });
        }

    });

});

app.listen(3000, function () {
    console.log("Server started on http://localhost:3000/");
});