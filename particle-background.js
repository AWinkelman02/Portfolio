var canvas = document.getElementById('body-canvas');

canvas.width = innerWidth;
canvas.height = innerHeight;

var c = canvas.getContext('2d');

function Circle(x, y, dx, dy, radius, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  
  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    
    c.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
    c.fill();
  }
  
  this.update = function() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0){
    this.dx = -this.dx;
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0){
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;
    
    this.draw();
   }
}

var circleArray = [];

for (var i = 0; i < 150; i++){
  var radius = Math.random() * 3;
  var x = Math.random() * (innerWidth - radius * 2) + radius;
  var y = Math.random() * (innerHeight - radius * 2) + radius;
  var dx = (Math.random() - 0.5);
  var dy = (Math.random() - 0.5);
  //Random color
  var color = {
    r: 0,
    g: randomNormal({ mean: 125, dev: 20 }),
    b: randomNormal({ mean: 125, dev: 20 }),
    a: rand(0, 1),
  };
  circleArray.push(new Circle(x, y, dx, dy, radius, color))
}

function animate (){
  requestAnimationFrame(animate)
  c.clearRect(0, 0, innerWidth, canvas.height);
  circleArray.forEach(function(elem) {
    elem.update();
  })
}

animate();
