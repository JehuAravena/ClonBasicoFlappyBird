let cancion = new Audio("musica.ogg");

// reproduciendo
let reproducido = false;

// si se hace click
document.addEventListener("click", function () {
  // si no se ha reproducido
  if (!reproducido) {
    // reproducir la cancion con el volumen segun el slider
    cancion.volume = document.getElementById("volume-slider").value / 100;
    cancion.play();
    // actualizar la variable
    reproducido = true;
  }
});

// si se cambia el volumen
let slider = document.getElementById("volume-slider");
slider.addEventListener("input", function () {
  // actualizar el volumen
  cancion.volume = slider.value / 100;
});

// si pierde detener la cancion y reproducir "bonk.ogg"
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
  // esperar .05 segundos para la alerta
  setTimeout(function () {
    alert("Chocaste, tu puntuacion fue: " + bird.puntos);
  }, 50);

  // reiniciar la variable
  reproducido = false;
  cancion = new Audio("musica.ogg");
}

// si la cancion termina loopearla
cancion.addEventListener("ended", function () {
  // loop
  cancion.loop = true;
  cancion.play();
});
