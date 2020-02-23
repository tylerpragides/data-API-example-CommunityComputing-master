var flower = {
  name: "sunflower",
  "r": 255,
  "g": 200,
  "b": 0
}


function setup() {
  createCanvas(400, 400);
  background(200);

//draw the flower object
   fill(flower.r, flower.g,       flower.b);
  ellipse(150,150,150,150);

//and write its name
  stroke(0);
  textSize(22);
  text(flower.name, 100, 150);
}
