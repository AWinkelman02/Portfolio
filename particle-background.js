const PARTICLE_COUNT = 30 * 2;
const Particles = [];

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function normalPool(o){var r=0;do{var a=Math.round(normal({mean:o.mean,dev:o.dev}));if(a<o.pool.length&&a>=0)return o.pool[a];r++}while(r<100)}function randomNormal(o){if(o=Object.assign({mean:0,dev:1,pool:[]},o),Array.isArray(o.pool)&&o.pool.length>0)return normalPool(o);var r,a,n,e,l=o.mean,t=o.dev;do{r=(a=2*Math.random()-1)*a+(n=2*Math.random()-1)*n}while(r>=1);return e=a*Math.sqrt(-2*Math.log(r)/r),t*e+l}


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let WIDTH = document.body.clientWidth;
let HEIGHT = document.body.clientHeight;
const DEPTH = 5;
const SPEED1 = 0.001;

canvas.width = WIDTH;
canvas.height = HEIGHT;

window.onresize = function() {
  WIDTH = document.body.clientWidth;
  HEIGHT = document.body.clientHeight;
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
}

function spawnNew(start = false) {
  const p = {
    x: Math.random(),
    y: start ? 1.1 : rand(0, 1.5), // spawn in slightly off-screen, to avoid jarring pop-in
    z: Math.random(),
    r: 0,
    g: randomNormal({ mean: 125, dev: 30 }),
    b: randomNormal({ mean: 125, dev: 30 }),
    a: 1
  };
  p.startingX = p.x;
  p.startingY = p.y;
  Particles.push(p)
}

if (Particles.length < PARTICLE_COUNT) {
    for (var l = 0; l < 50; l++) {
      spawnNew(true);
    }
  }

function render() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  
  ctx.fillStyle = "white";
  
  const delet = [];
  
  for (let i = 0; i < Particles.length; i++) {
    let {x, y, z, r, g, b, a} = Particles[i];
    const sideLen = Math.floor(z * DEPTH);
    
    const screenX = Math.floor(((WIDTH * x) - (sideLen / 2)) * 10) / 10;
    const screenY = Math.floor(((HEIGHT * y) - (sideLen / 2)) * 10) / 10;
    
    //const color = 100 //z * 255;

    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
    ctx.fillRect(screenX, screenY, sideLen, sideLen);
    
    y -= SPEED1 * z;
    if (y < 0) {
      delet.push(i);
      // delete Particles[i];
      spawnNew(true);
    } else {
      Particles[i].y = y;
    }
  }
  
  for (let i = 0; i < delet.length; i++) {
    Particles.splice(delet[i] - i, 1);
  }
  
  if (Particles.length < PARTICLE_COUNT) {
    for (var l = 0; l < 50; l++) {
      spawnNew(true);
    }
  }
  
  window.requestAnimationFrame(render);
}
window.requestAnimationFrame(render);