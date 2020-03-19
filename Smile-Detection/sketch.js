
let bSmiling = false;
let maxTimeWithOutSmile = 2000; // millis
let counterSmileSegs = 0;
let startTimer = 0;
let numSecondsSmiling = 15;
let c1Ini, c1End;

let bReset = true;

//let bDecay = false;
let bModeFullWindow = false;
let proportionCam;
let proportionWindow;
let scaleWindow_W;
let scaleWindow_H;

function setup() {

    createCanvas(window.screen.width, window.screen.height);//800, 800);
    console.log("width end= " + str(width));
    console.log("height end= " + str(height));
    c1Ini = color(179,46, 42, 200); //'#FFE9E6');
    c1End = color(107, 255, 159, 123);//'#FFA696');
}
//-----------------------------------------------------
function draw() {
    update();
    background(255);


    let pct = map(counterSmileSegs, 0, numSecondsSmiling, 0, 1);
    let cLerp = lerpColor(c1Ini, c1End, pct);
    let sizeCir = map(global_happyValue, 0, 1, 150, height*0.75);
    let sizeStrokeCir = map(global_happyValue, 0, 1, 2, 20);

    push();
    fill(cLerp);
    if(bSmiling){
      stroke(c1End);
      strokeWeight(sizeStrokeCir);
    }else{
      stroke(0);
      strokeWeight(2);
    }
    ellipse(width*0.5, height*0.5, sizeCir, sizeCir);
    pop();


    textSize(20);
    textAlign(CENTER);

    fill(255);
    stroke(0);
    text(nf(counterSmileSegs, 0, 2), width*0.5, height*0.5);
    text("Happy["+str(nf(global_happyValue, 0, 2))+"]", width*0.5, height*0.5 +40);
}

//----------------------------------------------------
function update(){
  updateSmileDetection(global_happyValue, 0.3);


}

//---------------------------------------------------
function updateSmileDetection(_happyVal, _thresholdHappy) {
    let scaleTime = 0.001;
    let timeSegs = millis()*scaleTime;

    if(_happyVal > _thresholdHappy){
        bSmiling = true;
        //console.log("bSmiling");
        counterSmileSegs = timeSegs - startTimer;
        if(counterSmileSegs > numSecondsSmiling) counterSmileSegs = numSecondsSmiling;
    }
    else {
      //console.log("NOT bSmiling");
      bSmiling = false;
      counterSmileSegs = 0;
      startTimer = timeSegs;
    }
}

///---------------------------------
function keyPressed(){
  bReset = true;
  background(255);
}
