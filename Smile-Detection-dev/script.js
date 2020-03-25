let idMethodGetMedia = 2;
var global_happyValue = 0.0; //raw RT value
var global_smileValue = 0.0; //lerped value
var video;

console.log("idMethodGetMedia =");
console.log(idMethodGetMedia);

video = document.querySelector('video');

/*if(idMethodGetMedia == 0){
  //video = document.getElementById('video')
  video = document.querySelector('video');
}
else if(idMethodGetMedia == 1){
  video = document.querySelector('video');
}
else if(idMethodGetMedia == 2){
  video = document.querySelector('video');
}*/

//face-api vars

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('models'),
  faceapi.nets.faceExpressionNet.loadFromUri('models')
]).then(startVideo)

function startVideo() {

  if(idMethodGetMedia == 0){
    navigator.getUserMedia(
      { video: { } },
      stream => video.srcObject = stream,
      err => console.error(err)
    )
  }
  else if(idMethodGetMedia == 1){
    // Prefer camera resolution nearest to 1280x720.
    var constraints = { audio: false, video: { width: 1280, height: 720 } };

    navigator.mediaDevices.getUserMedia(constraints)
    .then(function(mediaStream) {
      video.srcObject = mediaStream;
      video.onloadedmetadata = function(e) {
        video.play();
      };
    })
    .catch(function(err) { console.log(err.name + ": " + err.message); }); // always check for errors at the end.
  }
  else if(idMethodGetMedia == 2){
      // Older browsers might not implement mediaDevices at all, so we set an empty object first
      if (navigator.mediaDevices === undefined) {
        console.log("undefined mediaDevices")
        navigator.mediaDevices = {};
      }
      if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function(constraints) {
          // First get ahold of the legacy getUserMedia, if present
          var getUserMedia = navigator.getUserMedia ||
                              navigator.webkitGetUserMedia ||
                              navigator.mozGetUserMedia;

          // Some browsers just don't implement it - return a rejected promise with an error
          // to keep a consistent interface
          if (!getUserMedia) {
            return Promise.reject(new Error('Error-> getUserMedia is not implemented in this browser'));
          }

          // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
          return new Promise(function(resolve, reject) {
            console.log("Script-> Promise: old navigator.getUserMedia ")
            getUserMedia.call(navigator, constraints, resolve, reject);
          });
        }
      }
    }
}//startVideo end


navigator.mediaDevices.getUserMedia({ audio: false, video: true })
.then(function(stream) {
  video.width = 1280;
  video.height = 720;
  //var video = document.querySelector('video');
  // Older browsers may not have srcObject
  if ("srcObject" in video) {
    video.srcObject = stream;
  } else {
    // Avoid using this in new browsers, as it is going away.
    video.src = window.URL.createObjectURL(stream);
  }
  video.onloadedmetadata = function(e) {
    video.play();
  };
})
.catch(function(err) {
  console.log(err.name + ": " + err.message);
});

video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  const displaySize = { width: video.width, height: video.height }
  console.log("displaySize");
  console.log(displaySize);
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    //const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    //const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions()

    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    //faceapi.draw.drawDetections(canvas, resizedDetections)
    //faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    //faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
    if(typeof (detections[0].expressions) == 'undefined'){
      //console.log(detections);
      //console.log("no expressions");
    }else {
      //console.log("happy is = " + str(detections[0].expressions.happy));
      global_happyValue = detections[0].expressions.happy;
    }

  }, 100)
})
