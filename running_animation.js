var runningMan = document.getElementById('runningMan');
var spriteImages = [
    'Counter/assets/ad_idle (0).png',
    'Counter/assets/ad_idle (1).png',
    'Counter/assets/ad_idle (2).png',
    'Counter/assets/ad_idle (3).png',
    'Counter/assets/ad_run (0).png',
    'Counter/assets/ad_run (1).png',
    'Counter/assets/ad_run (2).png',
    'Counter/assets/ad_run (3).png',
    'Counter/assets/ad_run (4).png',
    // Add more images as needed
];

var currentSpriteIndex = 0;
var animationInterval;

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        increaseCounter();
        updateClicksPerHour();

        // Start the running animation
        animationInterval = setInterval(animateRunningMan, 200); // Change the interval as needed
    }
});

document.addEventListener('keyup', function(event) {
    if (event.code === 'Space') {
        // Stop the running animation
        clearInterval(animationInterval);
        // Reset to the initial sprite
        runningMan.src = spriteImages[0];
    }
});

function animateRunningMan() {
    // Change the sprite image
    runningMan.src = spriteImages[currentSpriteIndex];

    // Move to the next sprite (loop back to the beginning if reached the end)
    currentSpriteIndex = (currentSpriteIndex + 1) % spriteImages.length;
}
