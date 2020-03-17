
let bSmiling = false;
let maxTimeWithOutSmile = 2000; // millis
let counterSmileSegs = 0;
let startTimer = 0;
let numSecondsSmiling = 3;
let c1Ini, c1End;


let bReset = true;

//let bDecay = false;

function setup() {
    loadCamera(400, 300);//1280, 720);
    loadTracker();
    loadCanvas(400, 300); //window.screen.width, window.screen.height); //400,300);

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

    drawPoints();
    drawSmiling_1(false, true);
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
  if (emotions) {
      // andry=0, sad=1, surprised=2, happy=3
      for (var i = 0;i < predictedEmotions.length;i++) {
          rect(i * 110+20, height-80, 30, -predictedEmotions[i].value * 30);
      }
  }

  push();
  text("ANGRY", 20, height-40);
  text("SAD", 130, height-40);
  text("SURPRISED", 220, height-40);
  if(bSmiling)fill(255, 0, 0);
  //else fadoill(0,150);
  text("HAPPY", 340, height-40);
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
