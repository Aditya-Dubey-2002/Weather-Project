const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post('/',function(req,res){
    console.log(req.body.cityName);
    const query = req.body.cityName;
    const apiKey = "40cb0b7a9fc7911b870c4e78fab0930c";
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;

    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            const weatherDescription = weatherData.weather[0].description;
            const temp = weatherData.main.temp;
            const weatherIcon = weatherData.weather[0].icon;
            const imgURL = "http://openweathermap.org/img/wn/"+weatherIcon+"@2x.png";

            res.write("<p>It feels like "+weatherDescription +".</p>");
            res.write("<h1>The weather is "+weatherDescription+" and the temperatur is "+temp+" degree Celcius.</h1>");
            res.write("<img src="+imgURL+" ></img>");
            
            res.send();
        });
    })
})


app.listen(3000,function(){
    console.log("Server running on port 3000.");
});
