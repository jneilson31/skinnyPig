var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var request = require('request');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));


app.set("view engine", "ejs");

app.get("/", function (req, res) {
    var request = require('request');
    request('https://epndeals.api.ebay.com/epndeals/v1?marketplace=us&campaignid=5338330297&toolid=100034&rotationId=711-53200-19255-0&type=DAILY&format=json', function (error, response, body) {

        if (!error && response.statusCode === 200) {
            var data = JSON.parse(body);
            res.render("home", { data: data });
        }

    });

});

app.get("/clothing", function (req, res) {
    var request = require('request');
    request('http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByCategory&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=TrentonN-SkinnyPi-PRD-bc970d9ce-9ed166d5&version=517&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&categoryId=11450&paginationInput.entriesPerPage=12&itemFilter(0).name=ListingType%20&itemFilter(0).value(0)=AuctionWithBIN&itemFilter(0).value(1)=FixedPrice&itemFilter(0).value(2)=StoreInventory', function (error, response, body) {

        if (!error && response.statusCode === 200) {
            var data = JSON.parse(body);
            res.render("clothing", { data: data });
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
    console.log("Server started");
});