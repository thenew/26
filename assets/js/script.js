document.addEventListener('DOMContentLoaded', function(){

    var windowVideo = document.querySelector('#window');
    windowVideo.addEventListener('click', function (e) {
        // windowVideo.playbackRate = 0.4;
        windowVideo.play();

        TweenLite.to(windowVideo, 3, {playbackRate:0});
    });

    var speedMouse = 0;
    var timestamp = null;
    var lastMouseX = null;
    var lastMouseY = null;

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

    console.log(speedMouse);
    });



});
