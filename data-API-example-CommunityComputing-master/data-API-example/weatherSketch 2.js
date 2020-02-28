var weather;
var timeToSunset;
var num = [5391997, 5368381, 5128581, 6534479];
// var keydown;
// var keyup;
var lj;
let cities;

function setup() {

  // document.addEventListener('keydown',keydown)
  // document.addEventListener('keyup', keyup)
  var button = document.getElementById('button')
  button.addEventListener('click', lj)

  createCanvas(800, 400);
  lj(num[0])
  lj(num[1])

  cities = loadJSON("city.list.json")
  if(cities != null){
    console.log('it work')
  }
}

function lj(){
  loadJSON(
    'https://api.openweathermap.org/data/2.5/weather?id='+ num[Math.floor(Math.random() * num.length)] + '&APPID=001b0f58045147663b1ea518d34d88b4',
    gotData
  );
}

function gotData(data) {
  weather = data;
}

function draw() {

  background(0);
  if (weather) {

    // console.log(id)

    var now = Date.now() / 1000
    var timeToSunset = Math.floor(weather.sys.sunset - now)

    // var minuteToSunset = Math.floor(Math.floor(weather.sys.sunset - now) / 60)
    // var secToSunset = Math.floor(Math.floor(weather.sys.sunset - now) % 60)
    // var hourToSunset = Math.floor(minuteToSunset / 60)

    var hourToSunset = Math.floor(timeToSunset / 3600)
    var minuteToSunset = Math.floor(timeToSunset / 60 % 60)
    var secToSunset = Math.floor(timeToSunset % 60)

    fill('white')
    text(weather.name, width/2, 50)

    fill(255);
    ellipse(200, 200, weather.main.temp, weather.main.temp);
    ellipse(600, 200, weather.main.humidity, weather.main.humidity);

    fill('red')
    text(weather.main.temp, 200,200);
    text(weather.main.humidity, 600,200);

    fill('white')
    text('time til sundown', width/2 - 30, height/2 - 30)
    fill('red')
    text(hourToSunset + ' : ' + minuteToSunset + ' : ' + secToSunset, width/2,height/2)
  }
}

// function keydown(event){
//   if(event.keyCode == 65){
//     lj(num[Math.floor(Math.random() * num.length)])
//   }
// }
//
// function keyup(event){
//   if(event.keyCode == 65){
//     id = 5391997;
//   }
// }
