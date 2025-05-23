let img;
let lastTimeClick = 0;
let timeWaitNextClick = 1000;
let bMouseReleased = false;

//-------------------------------
function preload() {
  img = loadImage('smile.png');
  //https://lh3.googleusercontent.com/proxy/C8k19X6wbJp8wyDljFI31G-pN9XUYIOYRfx7z6pJV_mRCqK_ocNep09bKEfiTno0yJ1-vegCISwM20NJfHXf2JEabwn5Ylrc1LIK4IMMrY8NnZ3Vmxvh');
}

//-------------------------------
function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  lastTimeClick = millis();
}

//-------------------------------
function draw() {
  background(10, 10, 10, 255);

  let rx = width*0.5 - img.width*0.5;
  let ry = height*0.5 - img.height*0.5;
  let rw = img.width;
  let rh = img.height;
  let bOverRect = overRect(rx, ry, rw, rh);

  push();
  noFill();

  if (bOverRect){
    stroke(255, 255, 255);
  } else {
    stroke(100, 100, 100);
  }
  rect(rx, ry, rw, rh);

  if (bOverRect){
    if(bMouseReleased && millis() - lastTimeClick > timeWaitNextClick){
      bMouseReleased = false;
      timeWaitNextClick = millis();
      console.log("open the web!");
      window.open("https://carlesgutierrez.github.io/Smile-Detection/");
    }
  } else {
      tint(0, 153, 204, 126); // Tint blue and set transparency
  }
  image(img, width*0.5, height*0.5);

  pop();

  //if(keyIsPressed && !bOpenWeb){
  //  bOpenWeb = true;
  //  console.log("open the web!");
  //}
}

//-------------------------------
function overRect(x, y, w, h) {
  if ((mouseX > x) && (mouseX < x + w) &&
    (mouseY > y) && (mouseY < y + h)) {
    return true;
  } else {
    return false;
  }
}

//-------------------------------
function mouseReleased(){
  bMouseReleased = true;
}
