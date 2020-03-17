
let bSmiling = false;
let maxTimeWithOutSmile = 2000; // millis
let counterSmileSegs = 0;
let startTimer = 0;
let numSecondsSmiling = 3;
let c1Ini, c1End;


let bReset = true;

//let bDecay = false;
let proportionCam;
let proportionWindow;
let scaleWindow_W;
let scaleWindow_H;

function setup() {
    loadCamera(320*2,240*2);//400, 300);//1280, 720);
    proportionCam = videoInput.width / videoInput.height;
    proportionWindow = windowWidth / windowHeight;
    scaleWindow_W =  windowWidth / videoInput.width;
    scaleWindow_H =  windowHeight / videoInput.height;

    if(true){
      console.log("videoInput.width = " + str(videoInput.width));
      console.log("videoInput.height = " + str(videoInput.height));
      console.log("proportionCam = " + str(proportionCam));

      //console.log("window.screen.width = " + str(window.screen.width));
      //console.log("window.screen.height = " + str(window.screen.height));
      console.log("windowWidth= " + str(windowWidth));
      console.log("windowHeight= " + str(windowHeight));
      console.log("proportionWindow = " + str(proportionWindow));

      console.log("scaleWindow_W = " + str(scaleWindow_W));
      console.log("scaleWindow_H = " + str(scaleWindow_H));
    }

    loadTracker();
    loadCanvas(videoInput.width*scaleWindow_W, videoInput.height*scaleWindow_H); //400,300);
    videoInput.hide();

    console.log("width end= " + str(width));
    console.log("height end= " + str(height));
    c1Ini = color(255,230, 233, 123); //'#FFE9E6');
    c1End = color(255, 77, 100, 123);//'#FFA696');
}
//-----------------------------------------------------

function draw() {
    update();
    clear();

    noStroke();
    if(counterSmileSegs == numSecondsSmiling)fill(0,0);
    else fill(0,150);
    rect(0,0,width,height);

push();
    scale(scaleWindow_W, scaleWindow_H);//window.screen.width, window.screen.height); //400,300);
    fill(255);
    image(videoInput,0,0);
    drawPoints();
    drawSmiling_1(false, true);
pop();

    drawDebugEmotions();

}

//----------------------------------------------------
function update(){
  getPositions();
  getEmotions();

  if(emotions){
    if(predictedEmotions.length){
        let scaleTime = 0.001;
        let timeSegs = millis()*scaleTime;
        //console.log("Angry = " + str(predictedEmotions[0].value)+" HAPPY = " +str(predictedEmotions[3].value));
        bSmiling = updateSmileDetection(predictedEmotions[0].value, predictedEmotions[3].value, 0.3, 0.5);
        if(bSmiling){
            counterSmileSegs = timeSegs - startTimer;
            if(counterSmileSegs > numSecondsSmiling) counterSmileSegs = numSecondsSmiling;
        }else{
            counterSmileSegs = 0;
            startTimer = timeSegs;
          //  if(!bDecay){
          //      bDecay = true;
          //  }
        }
    }
  }
}

//---------------------------------------------------
function updateSmileDetection(_angryVal, _happyVal, _thresholdAngry, _thresholdHappy) {
    let isSimiling = false;
    if(_angryVal < _thresholdAngry && _happyVal > _thresholdHappy){
        isSimiling = true;
    }
    return isSimiling;
}

//////////////////////////////////////////////////////////
//-----------------------------------------------------
function drawDebugEmotions() {
  let scaleIniY = 0.85;
  let scaleIniX = 0.40;
  let scaleValuesEmotion = 30;

  push();
  stroke(255);
  rect(width*scaleIniX, height-80*2-height*scaleIniY, 405, 140);
  pop();

  push();
  fill(255);
  if (emotions) {
      // andry=0, sad=1, surprised=2, happy=3
      for (var i = 0;i < predictedEmotions.length;i++) {
          rect(width*scaleIniX+i * 110+20, height-80-height*scaleIniY, 30, -predictedEmotions[i].value * scaleValuesEmotion);
      }
  }

  text("ANGRY", width*scaleIniX+20, height-40-height*scaleIniY);
  text("SAD", width*scaleIniX+130, height-40-height*scaleIniY);
  text("SURPRISED", width*scaleIniX+220, height-40-height*scaleIniY);
  if(bSmiling)fill(255, 0, 0);
  //else fadoill(0,150);
  text("HAPPY", width*scaleIniX+340, height-40-height*scaleIniY);
  pop();
}

function drawSmiling_1(_bDrawTime, _bDrawTransparentRect){

  if(_bDrawTime){
    push();
      //scale(2, 2, 2);
      //translate(width*0.25, height*0.25);
      textSize(20);
      textAlign(CENTER);
      if(bSmiling)fill(255, 0, 0);
      text(nf(counterSmileSegs, 0, 2), width*0.5, height*0.5);
      //text(str(counterSmileSegs), 0,0);
    pop();
  }

  if(_bDrawTransparentRect){
    push();
      translate(0, height);
      scale(1,-1,1);
      let pct = map(counterSmileSegs, 0, numSecondsSmiling, 0, 1);
      let cLerp = lerpColor(c1Ini, c1End, pct);
      fill(cLerp);
      rect(0,0,width, height*pct);
    pop();
  }

}



function drawPoints() {
    fill(255);
    for (var i=0; i<positions.length -3; i++) {
        ellipse(positions[i][0], positions[i][1], 2, 2);
    }
}

///---------------------------------
function keyPressed(){
  bReset = true;
}
