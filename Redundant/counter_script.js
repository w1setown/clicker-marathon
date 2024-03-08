var counter = document.getElementById('count');
var cphElement = document.getElementById('cph'); 
var count = 0;
var nice = document.getElementById('nice');
var niceNumbers = [69, 169, 269, 369, 469, 569, 669, 690, 769, 869, 969];
var movingBackground = document.getElementById('moving-background');
var hud = document.getElementById('hud');
var brown = document.getElementById('brown');
var green = document.getElementById('green');
var man = document.getElementById('man')
man.style.position = 'absolute';
man.style.top = '-300%'
man.style.left = '45%'
green.appendChild(man);
var backgroundPositionX = 0;
var timeElement = document.getElementById('time');
var startTime = null;
var timerInterval = null;
var resignElement = document.getElementById('resign'); 

// Sæt bredden af HUD, 'green' og 'brown' til at være det samme som movingBackground
hud.style.width = movingBackground.offsetWidth + 'px';
green.style.width = movingBackground.offsetWidth + 'px';

// Opdater bredden af HUD og brown når vinduets størrelse ændres
window.addEventListener('resize', function() {
    hud.style.width = movingBackground.offsetWidth + 'px';
    green.style.width = movingBackground.offsetWidth + 'px';
});

// Lyt efter klik inde i den bevægende baggrund
movingBackground.addEventListener('click', function() {
  increaseCounter();
  updateClicksPerHour();
});

// Lyt efter tryk på mellemrumstasten
document.addEventListener('keydown', function(event) {
  if (event.code === 'Space') {
    increaseCounter();
    

    // Start the timer
    if (startTime === null) {
      startTime = Date.now();
      timerInterval = setInterval(function() {
        var elapsedTime = Date.now() - startTime;
        var seconds = Math.floor(elapsedTime / 1000);
        var minutes = Math.floor(seconds / 60);
        seconds = seconds % 60;
        timeElement.textContent = 'Time: ' + minutes + 'm ' + seconds + 's';
        
        
        updateClicksPerHour();
      }, 1000);
    }
  }
});

// Lyt efter klik på resign element
resignElement.addEventListener('click', function() {
  showGameOverPopup();
});

// Funktion til at øge tælleren og håndtere niceNumbers
function increaseCounter() {
  count += 1;
  counter.textContent = count;

  if (niceNumbers.includes(count)) {
    nice.style.display = 'block';
    nice.style.opacity = '1';
    setTimeout(function() {
      nice.style.opacity = '0';
      setTimeout(function() {
        nice.style.display = 'none';
      }, 1000);
    }, 1000);
  }

  backgroundPositionX += -10; // juster denne værdi for at ændre, hvor meget baggrunden bevæger sig
  movingBackground.style.backgroundPosition = backgroundPositionX + 'px 0';
}

function updateClicksPerHour() {
  if (startTime !== null) {
    var elapsedTime = Date.now() - startTime;
    var hours = elapsedTime / 1000 / 60 / 60;
    var cph = count / hours;
    cphElement.textContent = (cph / 1000).toFixed(2) + ' kc/hr: ';
  }
}

// Funktion til at vise "GAME OVER" popup
function showGameOverPopup() {
  // Opret popup-container
  var popupContainer = document.createElement('div');
  popupContainer.style.position = 'fixed';
  popupContainer.style.top = '0';
  popupContainer.style.left = '0';
  popupContainer.style.width = '100%';
  popupContainer.style.height = '100%';
  popupContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  popupContainer.style.display = 'flex';
  popupContainer.style.justifyContent = 'center';
  popupContainer.style.alignItems = 'center';
  popupContainer.style.zIndex = '999';

  // Opret GAME OVER tekst
  var gameOverText = document.createElement('p');
  gameOverText.textContent = 'GAME OVER';
  gameOverText.style.color = '#fff';
  gameOverText.style.fontSize = '3rem';
  gameOverText.style.fontWeight = 'bold';
  popupContainer.appendChild(gameOverText);

  // Opret Refresh button
  var refreshButton = document.createElement('button');
  refreshButton.textContent = 'Refresh';
  refreshButton.style.backgroundColor = '#0bc4d1';
  refreshButton.style.border = 'none';
  refreshButton.style.color = '#fff';
  refreshButton.style.padding = '18px 32px';
  refreshButton.style.fontSize = '16px';
  refreshButton.style.cursor = 'pointer';
  refreshButton.style.borderRadius = '8px';
  refreshButton.addEventListener('click', function() {
    location.reload();
  });
  popupContainer.appendChild(refreshButton);

  // Tilføj popup-container til body
  document.body.appendChild(popupContainer);
}
