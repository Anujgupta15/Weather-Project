const express = require("express");

const https = require("https");

const bodyParser = require('body-parser')


const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

const port = 3000;

app.get('/', function(req, res) {

  res.sendFile(__dirname + "/index.html");
});

app.post('/', function(req, res) {

  var inputcity = req.body.city;
  // console.log(inputcity);

  const place = inputcity;
  const apkey = "a3b3cf9962df6dc339a22f0b187aa8a4";
  const unit = "metric";

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + place + "&appid=" + apkey + "&units=" + unit;

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {

      const weatherdata = JSON.parse(data);
      // console.log(weatherdata);
      const temp = weatherdata.main.temp;
      const weatherDiscription = weatherdata.weather[0].description;
      const icon = weatherdata.weather[0].icon;

      const imageicon = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write("<p>The temperature description is " + weatherDiscription + "</p>");

      res.write("<h1>The temperature in Jabalpur is " + temp + " degree Celsius</h1>");

      res.write("<img src=" + imageicon + ">");
      res.send();


    });

  })


});
//








app.listen(port, function() {
  console.log("Server is working");
});
