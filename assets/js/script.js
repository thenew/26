
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

function timestamp() {
  return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}

// core

var now = 0,
    dt   = 0,
    last = timestamp(),
    step = 1/60;

function frame() {
    console.log(timestamp());
  now = timestamp();
  dt = dt + Math.min(1, (now - last) / 1000);
  while(dt > step) {
    dt = dt - step;
    update(step);
  }
  render(dt);
  last = now;
  requestAnimationFrame(frame);
}

// start
requestAnimationFrame(frame);

// actions

function render() {
    if(isGameOver) {

    } else {
        meterEl.innerHTML = stress;
    }
}

function update() {
    cooldown++;
    if(cooldown > 200 && stress > 0) {
        stress--;
    } else {
        TweenLite.to(document.querySelector('#container .fail-slate'), 2, {'opacity': 1});
    }

    // stress
    if(stress > 5000) {
        gameOver(false);
    }
}

function gameOver(success) {
    isGameOver = true;
    if(success) {
        document.querySelector('#container').classList.add('game-over-victory');
        alert('Victory');
    } else {
        document.querySelector('#container').classList.add('game-over-fail');
        alert('game over');
    }
}

setTimeout(function() {
    gameOver(true);
}, 26000);

    var stress = 0;
    var isGameOver = false;


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
