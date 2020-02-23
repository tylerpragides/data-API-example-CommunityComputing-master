var weather;
var timeToSunset;
var id = 5391997;
var keydown;
var keyup;

function setup() {

  document.addEventListener('keydown',keydown)
  document.addEventListener('keyup', keyup)

  createCanvas(800, 400);
  loadJSON(
    'https://api.openweathermap.org/data/2.5/weather?id='+ id + '&APPID=001b0f58045147663b1ea518d34d88b4',
    gotData
  );
}

function gotData(data) {
  weather = data;
}

function draw() {

  background(0);
  if (weather) {

    console.log(id)

    var now = Date.now() / 1000
    var secToSunset = Math.floor(weather.sys.sunset - now)
    var minuteToSunset = secToSunset / 60
    var hourToSunset = minuteToSunset / 60

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
    text(secToSunset + ' seconds', width/2,height/2)
  }
}

function keydown(event){
  if(event.keyCode == 65){
    id = 6534479
  }
}

function keyup(event){
  if(event.keyCode == 65){
    id = 5391997;
  }
}
