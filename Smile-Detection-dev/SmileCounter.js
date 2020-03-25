// Jitter class
class SmileCounter {
  constructor() {
    //general vars
    this.radCircle = 118.5;
    this.scaleRadis = 1.16;

    this.strokeWrightLineCircle = 18;
    this.color1;
    this.color2;
    this.mouseId = 0;

    //Timer vars
    this.idActualSec = 0; //from 1 to 14
    this.smileValue = 0;
  }

//---------------------------------------------------
  setup(scale){

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
  }

//---------------------------------------------------
  update() {

  }

//----------------------------------------------------
 drawClockNumbers(_x, _y){
   push();
     translate(_x, _y);
     //(map(mouseX, 0, width, 0, totalSeconds));
   let numSize = (this.radCircle*0.9);
   textFont('Helvetica');

   fill(this.color2);
   textAlign(CENTER, CENTER);
   textSize(numSize*0.35);
   text('%', this.radCircle*0.7, 0);
   textSize(32);
   text('smiling', 0, this.radCircle*0.3);
   textSize(numSize);
   text(floor((this.mouseId/360)*100), -this.radCircle*0.2, -this.radCircle*0.1);
   //text(str(mouseId), 0, 0);
   pop();
 }

//-----------------------------------------------------
  drawClockShapes(_x, _y) {
    push();
    translate(_x, _y);
    rotate(-90);

    var radiusBalls = this.radCircle * this.scaleRadis;
    var angle = 1;

    let dist = global_happyValue - this.smileValue;
    this.smileValue = this.smileValue + dist *0.05;
    this.mouseId = int(map(this.smileValue, 0, 1, 0, 360, true));

    for (var i = 0; i <= 360; i++) {
      var x = cos(angle * i) * radiusBalls;
      var y = sin(angle * i) * radiusBalls;

      if (this.mouseId >= i) {
        stroke(this.color2);
      } else {
        stroke(this.color1);
      }
      strokeCap(SQUARE);
      strokeWeight(this.strokeWrightLineCircle);
      noFill();
      arc(0, 0, radiusBalls*2, radiusBalls*2, 0, this.mouseId);
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
