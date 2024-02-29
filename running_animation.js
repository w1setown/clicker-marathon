// running_animation.js

const runningMan = document.getElementById('runningMan');

let currentFrame = 0;
const totalFrames = 5; // Change this to the total number of frames

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        // Change the image source on spacebar press
        currentFrame = (currentFrame + 1) % totalFrames;
        runningMan.src = `assets/ad_run (${currentFrame}).png`;
    }
});
