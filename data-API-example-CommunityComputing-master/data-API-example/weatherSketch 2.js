//lines 57 and 58 are not from city.list.json 

var weather;
var timeToSunset;
var num = [];
var lj;
let cities;

function setup() {

  var button = document.getElementById('button')
  button.addEventListener('click', lj)

  createCanvas(800, 400);

  loadJSON("city.list.json", gotCities)

}

function lj(){
  var randomCity = num[Math.floor(Math.random() * num.length)]
  loadJSON(
    'https://api.openweathermap.org/data/2.5/weather?id='+ randomCity + '&APPID=001b0f58045147663b1ea518d34d88b4',
    gotData
  );
}

function gotData(data) {
  weather = data;
}

function gotCities(data) {
  cities = data;
  findCities()
}

function findCities() {
  for (var i = 0; i < cities.length; i++) {
    if(cities[i].country == "US"){
      num.push(cities[i].id)
    }
  }
}

function draw() {

  background(0);
  if (weather) {

    var now = Date.now() / 1000
    var timeToSunset = Math.floor(weather.sys.sunset - now)
    var hourToSunset = Math.floor(timeToSunset / 3600)
    var minuteToSunset = Math.floor(timeToSunset / 60 % 60)
    var secToSunset = Math.floor(timeToSunset % 60)

    fill('white')
    text(weather.name, width/2, 50)
    text(weather.id, width/2, 70)
    text('time til sundown', width/2 - 30, height/2 - 30)
    fill('red')
    text(hourToSunset + ' : ' + minuteToSunset + ' : ' + secToSunset, width/2,height/2)
  }
}
