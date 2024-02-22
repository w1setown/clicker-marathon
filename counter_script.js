var counter = document.getElementById('count');
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

// Sæt bredden af HUD, 'green' og 'brown' til at være det samme som movingBackground
hud.style.width = movingBackground.offsetWidth + 'px';
brown.style.width = movingBackground.offsetWidth + 'px';
green.style.width = movingBackground.offsetWidth + 'px';


// Opdater bredden af HUD og brown når vinduets størrelse ændres
window.addEventListener('resize', function() {
    hud.style.width = movingBackground.offsetWidth + 'px';
    brown.style.width = movingBackground.offsetWidth + 'px';
});

// Lyt efter klik inde i den bevægende baggrund
movingBackground.addEventListener('click', function() {
  increaseCounter();
});

// Lyt efter tryk på mellemrumstasten
document.addEventListener('keydown', function(event) {
  if (event.code === 'Space') {
    increaseCounter();
  }
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