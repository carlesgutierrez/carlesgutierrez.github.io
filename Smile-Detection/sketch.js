//Init information
let myTextSize = 60;
let statusMachine = 0; // 0 (init) , 1 (interaction) , 2(end)
let maxInitTimer = 6000;
let initTimer = 0;
let textINIT = "SMILE 15\"";
let textEND = "MISSION ACCOMPLISHED";
let bReset = false;
let maxTimeEnd = 4000;
let endedTimer = 0;

let bSmiling = false;
//let maxTimeWithOutSmile = 2000; // millis
let counterSmileSegs = 0;
let startTimer = 0;
let numTimeSmiling = 15000;
let c1Ini, c1End;
let newSizeCir = 0;

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

    initTimer = millis();
}
//-----------------------------------------------------
function drawMainInteraction(){

      let pct = map(counterSmileSegs, 0, numTimeSmiling, 0, 1);
      let cLerp = lerpColor(c1Ini, c1End, pct);
      let sizeCir = map(global_happyValue, 0, 1, 150, height*0.75);
      newSizeCir += (sizeCir - newSizeCir) * 0.05
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
      ellipse(width*0.5, height*0.5, newSizeCir, newSizeCir);
      pop();


      InitTextStyle();
      text(floor((numTimeSmiling - counterSmileSegs)/1000), width*0.5, height*0.5 +myTextSize*0.5);
      //text("Happy["+str(nf(global_happyValue, 0, 2))+"]", width*0.5, height*0.5 +40);
      endTextStype();

}

function InitTextStyle(){
  push();
  textSize(myTextSize);
  textAlign(CENTER);

  fill(100);
  //stroke(100);
  noStroke();
  strokeWeight(1);

}

function endTextStype(){
  pop();
}

//----------------------------------------------------
function drawInit(){
  //draw text START
  InitTextStyle();
  text(textINIT, width*0.5, height*0.5);
  endTextStype();
}

//----------------------------------------------------
function drawEnd(){
  InitTextStyle();
  text(textEND, width*0.5, height*0.5);
  endTextStype();
}

//-----------------------------------------------------
function draw() {
  update();
  background(255);

  if(statusMachine == 0){
    drawInit();
  }
  else if(statusMachine == 1){
   drawMainInteraction();
  }
  else if(statusMachine == 2){
    drawEnd();
  }


}

//----------------------------------------------------
function update(){

  //logic
  switch (statusMachine) {
    case 0:
        if(millis() - initTimer < maxInitTimer)statusMachine = 0;
        else {
          statusMachine = 1;
          startTimer = millis();
        }
      break;
    case 1:
      updateSmileDetection(global_happyValue, 0.3);
      if(counterSmileSegs == numTimeSmiling){
        statusMachine = 2;
      }
      else {
        statusMachine = 1;
        endedTimer = millis();
        //counterSmileSegs = 0;
      }
      break;
    case 2:
      if(millis() - endedTimer < maxTimeEnd)statusMachine = 2;
      else {
        statusMachine = 0;
        initTimer = millis();
      }
  }

}

//---------------------------------------------------
function updateSmileDetection(_happyVal, _thresholdHappy) {
    let timeSegs = millis() + maxInitTimer;
    if(_happyVal > _thresholdHappy){
        bSmiling = true;
        counterSmileSegs = timeSegs - startTimer;
        if(counterSmileSegs > numTimeSmiling) counterSmileSegs = numTimeSmiling;
    }
    else {
      bSmiling = false;
      counterSmileSegs = 0;
      startTimer = timeSegs;
    }
}

///---------------------------------
function keyPressed(){
  background(0);
  bReset = true;
}
