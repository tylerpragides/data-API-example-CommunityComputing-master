var weather;
var timeToSunset;
var num = [];
var lj;
let cities;
var bc;
var country = "US";
var start; //CANT DEFINE HERE BC IT DOESNT KNOW 'COLOR' FUNCTION YET
var stop;

function setup() {
  start = color(255,204,0);
  stop = color(255,100,255);

  var button = document.getElementById('button')
  button.addEventListener('click', lj)

  let canvas = createCanvas(800, 400).elt;
  console.log(canvas);

  canvas.parentElement.insertBefore(canvas, button);

  loadJSON("city.list.json", gotCities)

  bc = [0,0,0];
}

//LOADS RANDOM CITY DATA OF COUNTRY
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
    if(cities[i].country == country){
      num.push(cities[i].id)
    }
  }
}

function setGradient(c1, c2) {
noFill();
  for (var y = 0; y < height; y++) {
    var inter = map(y, 0, height, 0, 1);
    var c = lerpColor(c1, c2, inter);
    stroke(c);
    line(0, y, width, y);
  }
}

function draw() {

  setGradient(start,stop)

  // background(bc[0],bc[1],bc[2]);
  if (weather) {

    var now = Date.now() / 1000
    var timeToSunset = Math.floor(weather.sys.sunset - now)
    var hourToSunset = Math.floor(timeToSunset / 3600)
    var minuteToSunset = Math.floor(timeToSunset / 60 % 60)
    var secToSunset = Math.floor(timeToSunset % 60)

    //WRITE THE DATA

    textAlign(CENTER)

    fill('white')
    textSize(12)
    text(weather.name + ", " + weather.sys.country, width/2, 50)
    textSize(12)
    text(weather.id, width/2, 70)
    // text('time til sundown', width/2 - 30, height/2 - 30)
    // fill('red')
    textSize(50)
    text(hourToSunset + ' : ' + minuteToSunset + ' : ' + secToSunset, width/2,height/2)

    //DRAW THE WEATHER
    if(secToSunset <= 0 && minuteToSunset <=0 && hourToSunset <= 0){
      bc = [0,0,0];
      fill(230,240,240)
      ellipse(150,150,80,80)
      fill(bc[0],bc[1],bc[2])
      ellipse(165,135,90,90)
    }
    else if (hourToSunset <= 1) {
      bc = [235,130,55];
    }
    else {
      bc = [180,222,255];
    }
  }
}
