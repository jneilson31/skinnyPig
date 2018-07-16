var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var request = require('request');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));


app.set("view engine", "ejs");

app.get("/", function (req, res) {

    request('https://epndeals.api.ebay.com/epndeals/v1?marketplace=us&campaignid=5338330297&toolid=100034&rotationId=711-53200-19255-0&type=DAILY&format=json', function (error, response, body) {

        if (!error && response.statusCode === 200) {
            var data = JSON.parse(body);
            res.render("home", { data: data });
        }

    });

    

});

app.get("/category/:categoryName", function (req, res) {
    var request = require('request');
    var catID;

switch(req.params.categoryName) {
    case "video-games":
        catID = 1249;
    break;
    case "tv":
        catID = 11071;
    break;
    case "computers":
        catID = 58058;
    break;
    case "outdoors":
        catID = 159043;
    break;
    case "home":
        catID = 11700;
    break;
    case "clothing":
        catID = 11450;
    break;
    case "cameras":
        catID = 625;
    break;
    case "auto":
        catID = 6000;
    break;
    case "health-and-beauty":
        catID = 26395;
    break;
    case "baby":
        catID = 2984;
    break;
    case "travel":
        catID = 3252;
    break;
    default:
        catID = 99;
}
    var url = "http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByCategory&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=TrentonN-SkinnyPi-PRD-bc970d9ce-9ed166d5&version=517&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&categoryId=" + catID + "&paginationInput.entriesPerPage=24&itemFilter(0).name=ListingType%20&itemFilter(0).value(0)=AuctionWithBIN&itemFilter(0).value(1)=FixedPrice&itemFilter(0).value(2)=StoreInventory";
    request(url, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            var data = JSON.parse(body);
            res.render("category", { data: data });
        }

    });

});

app.get("/results", function (req, res) {
    var query = req.query.search;
    var url = "http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsAdvanced&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=TrentonN-SkinnyPi-PRD-bc970d9ce-9ed166d5&version=517&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=" + query + "&paginationInput.entriesPerPage=30&itemFilter(0).name=ListingType%20&itemFilter(0).value(0)=AuctionWithBIN&itemFilter(0).value(1)=FixedPrice&itemFilter(0).value(2)=StoreInventory";
    request(url, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            var data = JSON.parse(body);
            res.render("results", { data: data });
        }

    });

});

app.listen(3000, function () {
    console.log("Server started on http://localhost:3000/");
});