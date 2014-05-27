// polyfills
(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

function frame() {
  update();
  render();
  window.requestAnimationFrame(frame);
}

document.addEventListener('DOMContentLoaded', function(){
    window.requestAnimationFrame(frame);
});


function render() {
}

function update() {
    meterEl.innerHTML = stress;
    cooldown++;
    if(cooldown > 200 && stress > 0) {
        stress--;
    }
}


    var stress = 0;

    var meterEl = document.querySelector('#js-meter');
      // stress++;


    // playbackRate from 0.5 to 4

    //                   10 à 400
    //                    1 à 0.5

    var audio = document.querySelector('#audio');
        // audio.play();

    var windowVideo = document.querySelector('#window');
    windowVideo.addEventListener('click', function (e) {
        // windowVideo.playbackRate = 0.4;
        windowVideo.play();

        TweenLite.to(windowVideo, 3, {playbackRate:0});
    });

var cooldown = 0;

var speedMouse = 0;
var timestamp = null;
var lastMouseX = null;
var lastMouseY = null;

var slowRate = false;
var resetRate = true;
var rate = 1;

document.addEventListener("mousemove", function(e) {

    if (timestamp === null) {
        timestamp = Date.now();
        lastMouseX = e.screenX;
        lastMouseY = e.screenY;
        return;
    }

    var now = Date.now();
    var dt =  now - timestamp;
    var dx = e.screenX - lastMouseX;
    var dy = e.screenY - lastMouseY;
    var speedX = Math.round(dx / dt * 100);
    var speedY = Math.round(dy / dt * 100);

    speedMouse = Math.max( Math.abs(speedY), Math.abs(speedX) );

    timestamp = now;
    lastMouseX = e.screenX;
    lastMouseY = e.screenY;

    if(speedMouse > 10) {
        stress++;
        cooldown = 0;
    }


    if(speedMouse < 2) {
        rate = 1;
    } else if(speedMouse < 10) {
        rate = 0.9;
    } else if(speedMouse > 50) {
        rate = 0.8;
    } else if(speedMouse > 100) {
        rate = 0.7;
    } else if(speedMouse > 200) {
        rate = 0.65;
    } else if(speedMouse > 400) {
        rate = 0.5;
    }
    // TweenLite.to(audio, 10, {playbackRate:rate});


    if(speedMouse > 200) {
        slowRate = true;
    } else if(speedMouse < 5) {
        resetRate = true;
    }

    if(slowRate) {
        TweenLite.to(audio, 10, {playbackRate:rate, onComplete:rateCallback});
    }


});

    function rateCallback() {

        if(resetRate) {
            TweenLite.to(audio, 10, {playbackRate:rate, onComplete:rateCallback});
            resetRate = false;
        }
        if(slowRate) {
            slowRate = false;
        }
    }

// });
