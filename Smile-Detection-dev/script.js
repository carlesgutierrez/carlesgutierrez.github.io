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
let numTimeSmiling = 3000;
let c1Ini, c1End;
let newSizeCir = 0;

let bModeFullWindow = false;
let proportionCam;
let proportionWindow;
let scaleWindow_W;
//let scaleWindow_H;
let finalSizeWebCamWidth = 0;
let finalSizeWebCamHeight = 0;


//add video in our quality
let capture;
let camPosX = 0;
let camPosY = 0;
let img1PosX = 0;
let img1PosY = 0;
let img1Rad = 0 ;
//assets
let imageSliderEmpy;


function preload(){
  //load assets
  //imageSliderEmpy = loadImage('assets/noGlow/smile-sin-rellenar.png');
  imageSliderEmpy = loadImage('assets/noGlow/smile-sin-rellenar.png');

  /////////////////////////////////
  //video
  let constraints = {
    video: {
      mandatory: {
        minWidth: 1280, //720,560
        minHeight: 720
      },
      optional: [{ maxFrameRate: 10 }]
    },
    audio: false
  };

  capture = createCapture(constraints, function(stream) {
    console.log(stream);
  });

  //capture = createCapture(VIDEO);
  //capture.size(720,560);
  //capture.size(1920,1080);
  capture.hide();
  console.log("capture.hide()");
}

function setup() {

  if(true){
    console.log("capture.width = " + str(capture.width));
    console.log("capture.height = " + str(capture.height));
  }
  proportionCam = capture.width / capture.height;
  proportionWindow = windowWidth / windowHeight;
  scaleWindow_W =  windowWidth / capture.width;
  //scaleWindow_H =  windowHeight / capture.height;
  finalSizeWebCamWidth = capture.width * scaleWindow_W;
  finalSizeWebCamHeight = capture.height * scaleWindow_W;//scaleWindow_H;

  if(false){
    console.log("proportionCam = " + str(proportionCam));
    //console.log("window.screen.width = " + str(window.screen.width));
    //console.log("window.screen.height = " + str(window.screen.height));
    console.log("windowWidth= " + str(windowWidth));
    console.log("windowHeight= " + str(windowHeight));
    console.log("proportionWindow = " + str(proportionWindow));

    console.log("scaleWindow_W = " + str(scaleWindow_W));
    //console.log("scaleWindow_H = " + str(scaleWindow_H));

    console.log("finalSizeWebCamWidth = " + str(finalSizeWebCamWidth));
    console.log("finalSizeWebCamHeight = " + str(finalSizeWebCamHeight));
  }

//Colors
    c1Ini = color(179,46, 42, 200); //'#FFE9E6');
    c1End = color(107, 255, 159, 123);//'#FFA696');

//timers
    initTimer = millis();

    createCanvas(windowWidth, windowHeight);//800, 800);
    console.log("Scren width end= " + str(width));
    console.log("Scren height end= " + str(height));

    //Calc items _positions
    camPosX = floor(width*0.5)-floor(finalSizeWebCamWidth*0.5);
    camPosY = floor(height*0.5-finalSizeWebCamHeight*0.5);

    console.log("imageSliderEmpy.width = " + str(imageSliderEmpy.width));//308
    console.log("imageSliderEmpy.height = " + str(imageSliderEmpy.height));//83
    img1PosX = floor(width*0.5)-floor(imageSliderEmpy.width*0.5);
    img1PosY = camPosY+finalSizeWebCamHeight-100;
    img1Rad = floor(imageSliderEmpy.height*0.5);
}

//-----------------------------------------------------
function draw() {
  update();
  background(255);

  push();
  let camPosX = floor(width*0.5)-floor(finalSizeWebCamWidth*0.5);
  let camPosY = floor(height*0.5-finalSizeWebCamHeight*0.5);
  //console.log("camPosX= "+str(camPosX) + " camPosY= "+str(camPosY));
  translate(camPosX,camPosY );
  image(capture, 0, 0, finalSizeWebCamWidth, finalSizeWebCamHeight);
  pop();

  if(statusMachine == 0){
    drawInit();
  }
  else if(statusMachine == 1){
   drawMainInteraction();
  }
  else if(statusMachine == 2){
    drawEnd();
  }


  push();
  //console.log("camPosX= "+str(camPosX) + " camPosY= "+str(camPosY));
  translate(img1PosX,img1PosY );
  image(imageSliderEmpy, 0, 0);
  pop();

  drawSlider();



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
function drawSlider(){
  push();
  let endSliderXCir = imageSliderEmpy.width*0.73;
  let endSliderXRect = imageSliderEmpy.width*0.60;
  let pct1 = map(counterSmileSegs, 0, numTimeSmiling, 0, endSliderXCir);
  let pct2 = map(counterSmileSegs, 0, numTimeSmiling, 0, endSliderXRect);
  translate(pct1, 0,0);
  fill(255);
  noStroke();
  let posX1Circ = img1PosX+img1Rad;
  ellipse(posX1Circ, img1PosY+img1Rad-img1Rad*0.01, img1Rad+img1Rad*0.35, img1Rad+img1Rad*0.35, 100);
  pop();

  push();
  fill(255);
  noStroke();
  if(pct1 > 0){
    let iniPosX = img1PosX+img1Rad;
    rect(iniPosX, img1PosY+img1Rad*0.32, pct1, img1Rad+img1Rad*0.32)
  }
  pop();
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
