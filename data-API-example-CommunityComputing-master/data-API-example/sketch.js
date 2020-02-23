
let spaceData;

function setup() {
  createCanvas(600, 600);
  loadJSON('http://api.open-notify.org/astros.json', gotData, 'jsonp');
}

function gotData(data) {
  spaceData = data;
}

function draw() {
  background(0);

  fill(255)
  text("How many people are in space right now?", 100,100)
  if (spaceData) {
    text(spaceData.number, 150,150)
    for (var i = 0; i < spaceData.people.length; i++) {
      if (keyIsDown(65)) {
        text(spaceData.people[i].name, 150, 50 * i + 200)
      }
    }
    // text(spaceData.people[1].name,150,200)
  }

}
