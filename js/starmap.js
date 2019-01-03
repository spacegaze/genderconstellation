var spread_slider;
var number_slider;
var color_slider;
var glow_slider;
var line_slider;
var rotate_checkbox;
var stars = [];
var lines= [];
var position={};
var point1;
var point2;

var spread = 3;
var num_stars= 9;
var color_shift= 128;
var glow= 11;
var num_lines= num_stars;

function setup() {
    frameRate(10);
    createCanvas(768,512, WEBGL);
    background(0,0,0,0);

    var div = createDiv('Spread');
    spread_slider= createSlider(1, 10, spread);
    var div = createDiv('Number of stars');
    number_slider= createSlider(3, 18, num_stars);
    var div = createDiv('Color Shift');
    color_slider= createSlider(1, 255, color_shift);
    var div = createDiv('Glow');
    glow_slider= createSlider(6, 16, glow);
    rotate_checkbox = createCheckbox('  Rotate?', false);
    lines_checkbox = createCheckbox('  Show Lines?', true);


}

function draw() {
    background(0,0,20);



    if (rotate_checkbox.checked()){
        rotateY(frameCount * 0.03);
    }

    spread = spread_slider.value();
    num_stars= number_slider.value();
    color_shift= color_slider.value();
    glow= glow_slider.value();

    for (var i = 0; i < num_stars; i++) {
      position={};
      position.x= random(-512, 512);
      position.y= random(-384, 384);
      position.z= random(-512, 512);
      stars.push(position);
    }



     noStroke();
     for (var i = 0; i < num_stars; i++) {
       push();
       translate(spread*0.1*stars[i].x, spread*0.1*stars[i].y, spread*0.1*stars[i].z);
       var c1;
       if (color_shift<128) {
         c1=color(255,color_shift*2, color_shift*2, glow);
       }
       else if (color_shift>=128) {
         c1 = color((255-color_shift)*2, (255-color_shift)*2, 255, glow);
       }
       var c2 = color(255,255,255,0);
       for (var r = glow; r > 0; --r) {
         fill(lerpColor(c1, c2, r/glow));
         sphere(r);
       }
       pop();
     }
    fill(255,255, 255,255);
    for (var i = 0; i < num_stars; i++) {
      push();
      translate(spread*0.1*stars[i].x, spread*0.1*stars[i].y, spread*0.1*stars[i].z);
      sphere(2);
      pop();
    }
    stroke(255, 30);


  if (lines_checkbox.checked()){
  for (var i = 0; i < num_stars*1.5; i++) {
    point1=floor(random(0, num_stars));
    point2=floor(random(0, num_stars));
    line(spread*0.1*stars[point1].x, spread*0.1*stars[point1].y, spread*0.1*stars[point1].z, spread*0.1*stars[point2].x, spread*0.1*stars[point2].y, spread*0.1*stars[point2].z);
     }
  }
    orbitControl();
  }
