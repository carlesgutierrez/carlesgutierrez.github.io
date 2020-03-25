// Jitter class
class ClockCounter {
  constructor() {
    //general vars
    this.totalSeconds = 15;
    this.radCircle = 118.5;
    this.scaleRadis = 1.16;

    this.ballWeight = 18;
    this.color1;
    this.color2;
    this.mouseId = 0;
    this.timerInit = 0;

    //Timer vars
    this.idActualSec = 0; //from 1 to 14
    this.timer = 0;
    this.bPause = true;
  }

  //-------------------------
 play(){
   this.timerInit = millis();
   this.bPause = false;
 }

 //-------------------------
 stop(){
  this.reset();
  this.bPause = true;
 }

//--------------------------------------------------
 reset(){
   this.idActualSec = 0;
   this.timerInit = millis();
   this.idActualSec = 0;
 }

//---------------------------------------------------
  setup(scale, _totalSeconds){

    this.totalSeconds = _totalSeconds;
    this.radCircle = this.radCircle*scale;
    console.log("with scale= "+str(scale)+" then radCircle = "+str(this.radCircle));

    strokeWeight(10);
    angleMode(DEGREES);
    //setup colors
    console.log("setup Colors");
    this.color1 = color(255, 100);
    console.log(this.color1);
    this.color2 = color(255, 255);
    console.log(this.color2);
    //
    this.timerInit = millis();
    this.bPause = true;
  }


//----------------------------------------------------
 drawClockNumbers(_x, _y){
   push();
   translate(_x, _y);
   //(map(mouseX, 0, width, 0, totalSeconds));
   let numSize = (this.radCircle*0.9);
   textFont('Helvetica');
   textSize(32);
   fill(this.color2);
   textAlign(CENTER, CENTER);
   text('seconds', 0, this.radCircle*0.3);
   textSize(numSize);
   text(nf(this.mouseId, 2, 0), 0, -this.radCircle*0.1);
   //text(str(mouseId), 0, 0);

   pop();
 }

//-----------------------------------------------------
  drawClockShapes(_x, _y) {
    push();
    translate(_x, _y);
    rotate(-90);

    var radiusBalls = this.radCircle * this.scaleRadis;
    //console.log(radiusBalls);
    var angle = 360 / this.totalSeconds;

    if(!this.bPause){
      this.mouseId = int((millis() - this.timerInit) * 0.001); //int(map(mouseX, 0, width, 0, totalSeconds));
      if (this.mouseId > this.totalSeconds) {
        this.mouseId = this.totalSeconds;
      }
    }

    for (var i = 0; i <= this.totalSeconds; i++) {
      var x = cos(angle * i) * radiusBalls;
      var y = sin(angle * i) * radiusBalls;

      if (this.mouseId >= i) {
        stroke(this.color2);
      } else {
        stroke(this.color1);
      }

      strokeWeight(this.ballWeight);
      point(x, y);
    }

    noFill();
    strokeWeight(2);
    stroke(this.color1);
    ellipse(0, 0, this.radCircle * 2, this.radCircle * 2); //detail only for webGl mode

    pop();
  }

  //------------------------------------
  display(_x, _y) {
    this.drawClockNumbers(_x, _y);
    this.drawClockShapes(_x, _y);
  }
}//end class
