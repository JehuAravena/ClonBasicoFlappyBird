let cancion = new Audio("musica.ogg");

let reproducido = false;

document.addEventListener("click", function () {

  if (!reproducido) {
  
    cancion.volume = document.getElementById("volume-slider").value / 100;
    cancion.play();
  
    reproducido = true;
  }
});

let slider = document.getElementById("volume-slider");
slider.addEventListener("input", function () {

  cancion.volume = slider.value / 100;
});

function gameOver() {
  bird.jugador.x = 50;
  bird.jugador.y = canvas.height / 2;
  bird.jugador.caida = 0;
  bird.tubos.arriba.x = canvas.width;
  bird.tubos.abajo.x = canvas.width;
  bird.tubos.arriba.velocidad = 1;
  bird.tubos.abajo.velocidad = 1;
  bird.puntos = 0;
  iniciado = false;
  cancion.pause();
  cancion = new Audio("bonk.ogg");
  cancion.play();

  setTimeout(function () {
    alert("Chocaste, tu puntuacion fue: " + bird.puntos);
  }, 50);


  reproducido = false;
  cancion = new Audio("musica.ogg");
}

cancion.addEventListener("ended", function () {

  cancion.loop = true;
  cancion.play();
});
