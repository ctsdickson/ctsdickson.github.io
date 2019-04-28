// Initial Setup
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;



// Variables
let mouse = {
	x: innerWidth / 2,
	y: innerHeight / 2
};

let ballCount = 50;
let balls = [];
let gravityPos = [];
let friction = .995;
let explosionDistance = 2;
let shouldExplode = false;

const colors = [
  '#81C3D7',
  '#D9DCD6',
  '#3A7CA5',
  '#2F6690'
];

const bgColor = '#16425B';


// Event Listeners
addEventListener("mousemove", function(event) {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
  gravityPos = [mouse.x, mouse.y];
});

addEventListener("mouseout", function(event) {
  gravityPos = [canvas.width / 2, canvas.height / 2];
});

addEventListener("resize", function() {
	canvas.width = innerWidth;
	canvas.height = innerHeight;

	init();
});

addEventListener("click", function() {
	init();
});


// Utility Functions
function randomIntFromRange(min,max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomeFloatFromRange(min, max){
  return Math.random() * (max - min) + min;
}

function randomColor(colors) {
	return colors[Math.floor(Math.random() * colors.length)];
}


// Objects
function Ball(px, py, vx, vy, f, radius, color) {
	this.p = [px, py];
  this.v = [vx, vy];
  this.gv = [0, 0];
  this.gp = 0;
	this.radius = radius;
	this.color = color;
  this.f = f;

	this.update = function() {
    // calculate gravity vector
    this.gv = [gravityPos[0] - this.p[0], gravityPos[1] - this.p[1]];

    // Calculate gravity intensity
    let a = gravityPos[0] - this.p[0];
    let b = gravityPos[1] - this.p[1];
    this.gp = 1 / (Math.sqrt( a*a + b*b ));

    // Explode if needed
    if (shouldExplode){
      this.v[0] *= randomeFloatFromRange(-10, 10);
      this.v[1] *= randomeFloatFromRange(-10, 10);
    }

    // Reduce ball's own velocity with friction
    this.v[0] *= this.f;
    this.v[1] *= this.f;

    // Calculate new velocity, add gravity
    this.v[0] += this.gv[0] * this.gp * this.f;
    this.v[1] += this.gv[1] * this.gp * this.f;

    // Move
		this.p[0] += this.v[0];
		this.p[1] += this.v[1];
		this.draw();
	};

	this.draw = function() {
    c.save();
		c.beginPath();
		c.arc(this.p[0], this.p[1], this.radius, 0, Math.PI * 2, false);
		c.fillStyle = this.color;
		c.fill();
		c.closePath();
    c.restore();
	};
}


// Implementation
function init() {
  gravityPos = [canvas.width / 2, canvas.height / 2];
  balls = [];
  for(let i = 0 ; i < ballCount ; i++){
    let rd = randomeFloatFromRange(1, 7);
    let px = randomeFloatFromRange(0, canvas.width);
    let py = randomeFloatFromRange(0, canvas.height);
    let vx = randomeFloatFromRange(-10, 10);
    let vy = randomeFloatFromRange(-10, 10);
    let f = friction;
    balls.push(new Ball(px, py, vx, vy, f, rd, randomColor(colors)));
  }
}

// Animation Loop
function animate() {
	requestAnimationFrame(animate);
  resetCanvas(bgColor);
  updateShouldExplode();
  for(let i = 0 ; i < balls.length ; i++){
    balls[i].update();
  }
}

init();
animate();

function resetCanvas(color){
  if(color){
    c.save();
    c.fillStyle = color;
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.restore();
    var background = new Image();
    background.src = "images/misc/neuron_net.jpg";
    c.drawImage(background,0,0,canvas.width,canvas.height);
    c.font = (canvas.width / 22) + "px Arial";
    c.fillStyle = "white"
    var textoff = canvas.width / 20;
    var textls = canvas.width / 13;
    c.fillText("Lack of Innovative Ideas?", 100, textoff);
    c.fillText("Lack of human resource?", 100, textoff + textls);
    c.fillText("Not enough budget?", 100, textoff + (textls*2));
    c.font = (canvas.width / 20) + "px Arial";
    c.fillStyle = "white"
    c.fillText("We Make Change Happen!", 100, textoff + (textls*3));
  }else{
    c.clearRect(0, 0, canvas.width, canvas.height);
  }
}

  function updateShouldExplode(){
    let x = 0;
    let y = 0;
    for(let i = 0 ; i < balls.length ; i++){
      x += balls[i].v[0] < 0 ? balls[i].v[0] * -1 : balls[i].v[0];
      y += balls[i].v[1] < 0 ? balls[i].v[1] * -1 : balls[i].v[1];
    }
    shouldExplode = x / balls.length < explosionDistance && y / balls.length < explosionDistance;
  }
