// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

function Ball(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }

  Ball.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  Ball.prototype.update = function() {
    if ((this.x + this.size) >= width) {
      this.velX = -(this.velX);
    }
  
    if ((this.x - this.size) <= 0) {
      this.velX = -(this.velX);
    }
  
    if ((this.y + this.size) >= height) {
      this.velY = -(this.velY);
    }
  
    if ((this.y - this.size) <= 0) {
      this.velY = -(this.velY);
    }
  
    this.x += this.velX;
    this.y += this.velY;
  }
  
let balls = [];


// Adams code: Gör så att man kan välja hur många bollar det ska finnas men det börjar på 15 vid sid öppning.
function changeAmountOfBalls() {
  balls = []
  let amountChange = (document.querySelector("input").value);
  amountOfBalls(amountChange);
}


function amountOfBalls(amount) {
  while (balls.length < amount) {
    // Adams code: Det är en 10% chans att en boll blir extra stor.
    let big = random(1,10);
    let size;
    if (big == 1) {
      size = 35;
    }
    else {
      size = random(10,20);
    }
    //

    // Adams code: Har gjort så att om en boll har hastigheten -1,0,1 så ändras den till -10 eller 10.
    let speedX = random(-7,7);
    let speedY = random(-7,7);
    
    if (speedX >= -1 && speedX <= 1) {
      let direction = random(1,2)
      if (direction = 1) {
        speedX = 10;
      } else {
        speedX = -10;
      }
    }

    if (speedY >= -1 && speedY <= 1) {
      let direction = random(1,2)
      if (direction = 1) {
        speedY = 10;
      } else {
        speedY = -10;
      }
    }

    //
    
    let ball = new Ball(
      random(0 + size,width - size),
      random(0 + size,height - size),
      speedX,
      speedY,
      'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
      size
    );

    balls.push(ball);
  }
}
amountOfBalls(15)


Ball.prototype.collisionDetect = function() {
  for (let j = 0; j < balls.length; j++) {
    if (!(this === balls[j])) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
      }
    }
  }
}

// Adams code: Pause och Start funktion
let velXSave = [];
let velYSave = [];

function pause() {
  let i = 0;
  while (i < balls.length) {

    velXSave[i] = balls[0].velX;
    velYSave[i] = balls[0].velY;

    x = balls[0].x;
    y = balls[0].y;
    velX = 0;
    velY = 0;
    color = balls[0].color;
    size = balls[0].size;

    
    ball = new Ball(x, y, velX, velY, color, size);
    balls.shift();
    balls.push(ball);
    i++;
  }
  document.querySelector("#pause").classList.add("invisible");
  document.querySelector("#start").classList.remove("invisible");
}

function start() {
  let i = 0;
  while (i < balls.length) {
    x = balls[0].x;
    y = balls[0].y;
    velX = velXSave[i];
    velY = velYSave[i];
    color = balls[0].color;
    size = balls[0].size;

    
    ball = new Ball(x, y, velX, velY, color, size);
    balls.shift();
    balls.push(ball);
    i++;
  }
  document.querySelector("#pause").classList.remove("invisible");
  document.querySelector("#start").classList.add("invisible");
}
// 


function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();
  }
  

  requestAnimationFrame(loop);
}
loop();




