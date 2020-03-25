let bModeClock = true;//false;

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

//add video in our quality
let capture;
let bUseCamera = false;
let camW = 1280;//1920;//300//1280;
let camH = 720;//1080;//150//720;
let camPosX = 0;
let camPosY = 0;
let img1PosX = 0;
let img1PosY = 0;
let img1Rad = 0 ;
//assets
let imageSliderEmpy;

//Clock
let myClock; // Declare object



function preload(){
  //load assets
  //imageSliderEmpy = loadImage('assets/noGlow/smile-sin-rellenar.png');
  imageSliderEmpy = loadImage('assets/noGlow/smile-sin-rellenar.png');
}



//---------------------------------
function setup() {

  //pixelDensity(1);
  setupVideo();

//Colors
  c1Ini = color(179,46, 42, 200); //'#FFE9E6');
  c1End = color(107, 255, 159, 123);//'#FFA696');

//timers
  initTimer = millis();

  createCanvas(windowWidth, windowHeight);//800, 800);
  console.log("Scren width end= " + str(width));
  console.log("Scren height end= " + str(height));

  //Slider
  console.log("imageSliderEmpy.width = " + str(imageSliderEmpy.width));//308
  console.log("imageSliderEmpy.height = " + str(imageSliderEmpy.height));//83
  img1PosY = height*0.75;
  img1Rad = floor(imageSliderEmpy.height*0.5);
  img1PosX = floor(width*0.5)-floor(imageSliderEmpy.width*0.5);
  img1Rad = floor(imageSliderEmpy.height*0.5);

  //clocks

  if(bModeClock){
    console.log("setup ->ClockCounter ->INIT");
    //print("JPÑAAAAAA");
    myClock = new ClockCounter();
    console.log("setup ->ClockCounter ->DONE");
    console.log("width = "+str(width));
    let scaleClock = 1;//map(width, 0, 1920, 0.5, 1);
    myClock.setup(scaleClock, int(numTimeSmiling*0.001));
  }
}

//----------------------------------------------------
function drawVideoCamera(){
  if(bUseCamera){
    if (keyIsPressed == true) {
      console.log("capture.width= "+str(capture.width) + " capture.height= "+str(capture.height));
      //video.play();
    }
    let heightCamera = int(width * capture.height / capture.width);
    let gapUpDownCamera = (height - heightCamera)*0.5;

    if(true)
      image(capture, 0, gapUpDownCamera, width, heightCamera); //
    else {
      push();
      imageMode(CENTER);
      translate(width*0.5, height*0.5);
      image(capture, 0, gapUpDownCamera, capture.width, capture.height); //width, heightCamera
      pop();
    }


  }
}

//-----------------------------------------------------
function draw() {
  update();
  //background(255);
  background(0);
  drawVideoCamera();

  if(statusMachine == 0){
    drawInit();
  }
  else if(statusMachine == 1){
   //drawCenteredCircleInteraction();
   if(bModeClock){
     myClock.display(width*0.2088, height*0.481);//
   }

  }
  else if(statusMachine == 2){
    drawEnd();
  }

  drawSlider();
}

//----------------------------------------------------
function update(){

  if (keyIsPressed == true) {
    console.log("keyIsPressed Working.");
    //video.play();
  }
  //logic
  switch (statusMachine) {
    case 0:
        if(millis() - initTimer < maxInitTimer)statusMachine = 0;
        else {
          statusMachine = 1;
          startTimer = millis();
          myClock.play();
        }
      break;
    case 1:
      updateSmileDetection(global_happyValue, 0.3);
      if(counterSmileSegs == numTimeSmiling){
        window.open("https://duckduckgo.com/");
        statusMachine = 2;
        myClock.stop();
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
      myClock.reset();
    }
}


//---------------------------------------------------
function drawSlider(){
  push();
  translate(img1PosX,img1PosY );
  image(imageSliderEmpy, 0, 0);
  pop();

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
    rect(iniPosX, img1PosY+img1Rad*0.32, pct1, img1Rad+img1Rad*0.33)
  }
  pop();
}

//-----------------------------------------------------
function drawCenteredCircleInteraction(){

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
function setupVideo(){
  /////////////////////////////////
  //video
  let modeCamera = -1;

  if(bUseCamera){

    //captureList(gotSources);
    if(modeCamera == 0){
      let constraints = { //min
        video: {
          mandatory: {
            minWidth: camW, //camH,560 //camW, camH
            minHeight: camH //minHeight
          },
          optional: [{ maxFrameRate: 60 }]
        },
        audio: false
      };
      capture = createCapture(constraints, function(stream) {
        console.log(stream);
      });
      capture.size(camW,camH);

    }
    else if(modeCamera == 1){ //max
      let constraints = {
        video: {
          mandatory: {
            maxWidth: camW, //camH,560 //camW, camH
            maxHeight: camH //minHeight
          },
          optional: [{ maxFrameRate: 60 }]
        },
        audio: false
      };
      capture = createCapture(constraints, function(stream) {
        console.log(stream);
      });
      capture.size(camW,camH);
    }
    else if(modeCamera == 2){ //mobile
      createCanvas(camW, camH);
      var constraints = {
        audio: false,
        video: {
          facingMode: "user"
        }
      };
      capture = createCapture(constraints);
      capture.size(camW,camH);
    }else{
          capture = createCapture(VIDEO);
          capture.size(camW,camH);
    }

    capture.hide();
    console.log("capture.hide()");
  }
}


///---------------------------------
function keyPressed(){
  //background(0);
  bReset = true;
}
