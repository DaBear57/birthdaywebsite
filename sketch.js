let disp;
let o;
let n;
const dist = 15;
const speed = 10;
let x = 0;
let y = 0;

function create_array(w,h) {
  arr = new Array(w);
  for (let i = 0; i < w; i++) {
    arr[i] = [];
    for (let j = 0; j < h; j++) {
      arr[i].push(0);
    }
  }
  return arr;
}

function arrayClone(arr) {
  let i, copy;
  if( Array.isArray( arr ) ) {
    copy = arr.slice(0);
    for(i = 0; i < copy.length; i++ ) {
      copy[i] = arrayClone(copy[i]);
    }
    return copy;
  } 
  return arr;
}

function remaining_time() {
  let dest = 2572680;
  let curr = second() + minute() * 60 + hour() * 3600 + day() * 86400;
  if (month() == 10) {curr -= 2678400;}
  let remv = dest - curr;
  let rem = [0,0,0,0];
  rem[0] = floor(remv / 86400);
  remv -= rem[0] * 86400;
  rem[1] = floor(remv / 3600);
  remv -= rem[1] * 3600;
  rem[2] = floor(remv / 60);
  remv -= rem[2] * 60;
  rem[3] = remv;
  return rem;
}

function setup() {
  createCanvas(1200, 400);
  disp = createGraphics(1200, 400);
  noStroke();
  fill(150,150,255);
  disp.noStroke();
  disp.fill(0);
  disp.textAlign(CENTER,CENTER);
  disp.textSize(225);
  o = create_array(width / dist, floor(height / dist));
  n = create_array(width / dist, floor(height / dist));
}

function clrcircle(x, y, img, maxd) {
  let maxr = maxd / 2;
  let bright = 0;
  let sum = 0;
  const detail = 10;
  for (let i = x - maxr; i < x + maxr; i += detail) {
    for (let j = y - maxr; j < y + maxr; j += detail) {
      bright += brightness(img.get(i,j));
      sum++;
    }
  }
  let r = map(bright, 0, 100 * sum, maxd, 0);
  n[x / maxd - 0.5][y / maxd - 0.5] = r;
}

let ps = 0;
let t = 0;

function draw() {
  disp.background(255);
  rem = remaining_time();
  disp.text(str(rem[3]),width / 5 * 4.25, height / 2);
  disp.text(str(rem[2]),width / 5 * 3.125, height / 2);
  disp.text(str(rem[1]),width / 5 * 1.875, height / 2);
  disp.text(str(rem[0]),width / 5 * 0.75, height / 2);
  if (ps != second()) {
    t = 1;
    o = arrayClone(n);
    for (let y = dist / 2; y < height - dist / 2; y += dist) {
      for (let x = dist / 2; x < width - dist / 2; x += dist) {
        clrcircle(x, y, disp, dist);
      }
    }
    ps = second();
  }
  if (t > -0.025) {
    background(0);
    for (let x = 0; x < n.length; x++) {
      for (let y = 0; y < n[0].length; y++) {
        let nr = n[x][y];
        let or = o[x][y];
        ellipse(x * dist + dist / 2,y * dist + dist / 2,map(t,0,1,nr,or));
      }
    }
    t -= 0.03;
    t = constrain(t,0,1);
  }
}
