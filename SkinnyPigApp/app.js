var express = require("express");
var httpsRedirect = require('express-https-redirect');
var app = express();
app.use('/', httpsRedirect());
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
        axios.get('https://svcs.ebay.com/MerchandisingService?OPERATION-NAME=getMostWatchedItems&SERVICE-NAME=MerchandisingService&SERVICE-VERSION=1.1.0&CONSUMER-ID=TrentonN-SkinnyPi-PRD-bc970d9ce-9ed166d5&&affiliate.trackingId=5338330297&affiliate.networkId=9&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&maxResults=3&categoryId=1249')
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
    var dealsID;
    var noDealsID;
    var categoryName;

    switch (req.params.categoryName) {
        case "video-games":
            dealsID = 1249;
            categoryName = "Video Games"
            break;
        case "tv":
            dealsID = 11071;
            categoryName = "TV"
            break;
        case "computers":
            dealsID = 58058;
            categoryName = "Computers"
            break;
        case "outdoors":
            dealsID = 16034;
            categoryName = "Outdoors"
            break;
        case "home-and-garden":
            dealsID = 11700;
            categoryName = "Home & Garden"
            break;
        case "clothing":
            dealsID = 11450;
            categoryName = "Clothing"
            break;
        case "cameras":
            dealsID = 625;
            categoryName = "Camera"
            break;
        case "auto":
            dealsID = 6000;
            categoryName = "Auto"
            break;
        case "health-and-beauty":
            dealsID = 26395	
            categoryName = "Health & Beauty"
            break;
        case "baby":
           dealsID = 2984;
            categoryName = "Baby"
            break;
        case "travel":
           dealsID = 3252
            categoryName = "Travel"
            break;
        default:
            dealsID = 99;
            categoryName = "All Results"
    }
    var categoryDeals = 'https://epndeals.api.ebay.com/epndeals/v1?marketplace=us&campaignid=5338330297&categoryid=' + dealsID + '&toolid=100034&commissionable=true&rotationId=711-53200-19255-0&type=DAILY%2CWEEKLY%2CCORE&format=json';
    var popularDealsURL = 'https://svcs.ebay.com/MerchandisingService?OPERATION-NAME=getMostWatchedItems&SERVICE-NAME=MerchandisingService&SERVICE-VERSION=1.1.0&CONSUMER-ID=TrentonN-SkinnyPi-PRD-bc970d9ce-9ed166d5&&affiliate.trackingId=5338330297&affiliate.networkId=9&version=517&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&maxResults=3&categoryId=' + dealsID;
    axios.all([
        axios.get(categoryDeals),
        axios.get(popularDealsURL)
    ]).then(axios.spread(function (response1, response2) {
        data = response1.data;
        data2 = response2.data;
        res.render("category", { data: data, data2: data2, categoryName: categoryName });

    })).catch(error => {
        console.log(error);
    });


});

app.get("/categorymobile", function (req, res) {
   
    res.render("categorymobile");


});

app.get("/sitemap.xml", function (req, res) {
    res.set('Content-Type', 'application/xml');
    res.render('sitemap');
})

app.get("/results", function (req, res) {
    var query = req.query.search;
    var shouldShow = true;
    var url = "https://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsAdvanced&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=TrentonN-SkinnyPi-PRD-bc970d9ce-9ed166d5&affiliate.trackingId=5338330297&affiliate.networkId=9&version=517&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=" + query + "&paginationInput.entriesPerPage=108&itemFilter(0).name=ListingType%20&itemFilter(0).value(0)=AuctionWithBIN&itemFilter(0).value(1)=FixedPrice&itemFilter(0).value(2)=StoreInventory";
    request(url, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            var data = JSON.parse(body);
            res.render("results", { data: data, query: query, shouldShow: shouldShow });
        }

    });

});

app.get("*", function (req, res) {
    var data;
    var data2;
    axios.all([
        axios.get('https://epndeals.api.ebay.com/epndeals/v1?marketplace=us&campaignid=5338330297&toolid=100034&rotationId=711-53200-19255-0&type=DAILY&format=json'),
        axios.get('https://svcs.ebay.com/MerchandisingService?OPERATION-NAME=getMostWatchedItems&SERVICE-NAME=MerchandisingService&SERVICE-VERSION=1.1.0&CONSUMER-ID=TrentonN-SkinnyPi-PRD-bc970d9ce-9ed166d5&&affiliate.trackingId=5338330297&affiliate.networkId=9&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&maxResults=3&categoryId=1249')
    ]).then(axios.spread(function (response1, response2) {
        data = response1.data;
        data2 = response2.data;
        res.render("home", { data: data, data2: data2 });

    })).catch(error => {
        console.log(error);
    });
});



app.listen(process.env.PORT, process.env.IP); 
   



