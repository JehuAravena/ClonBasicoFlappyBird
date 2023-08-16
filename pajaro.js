
const canvas = document.getElementById("bird");
const context = canvas.getContext("2d");

let iniciado = false;
let cancion = new Audio("musica.ogg");
let reproducido = false;


const bird = {
  anchoCanvas: canvas.width,
  altoCanvas: canvas.height,

  tubos: {
    arriba: {
      x: canvas.width,
      y: -300,
      alto: 500,
      ancho: 50,
      velocidad: 1,
    },
    abajo: {
      x: canvas.width,
      y: 200 + 140,
      alto: 500,
      ancho: 50,
      velocidad: 1,
    },
  },

  jugador: {
    x: 50,
    y: canvas.height / 2,
    alto: 20,
    ancho: 30,
    caida: 0,
    gravedad: 0.3,
    salto: 7,
  },

  puntos: 0,
};

function draw() {
  context.fillStyle = "#82b2ff";
  context.fillRect(0, 0, bird.anchoCanvas, bird.altoCanvas);


  context.fillStyle = "#028200";
  context.fillRect(
    bird.tubos.arriba.x,
    bird.tubos.arriba.y,
    bird.tubos.arriba.ancho,
    bird.tubos.arriba.alto
  );


  context.fillRect(
    bird.tubos.abajo.x,
    bird.tubos.abajo.y,
    bird.tubos.abajo.ancho,
    bird.tubos.abajo.alto
  );


  context.fillStyle = "#fff200";
  context.fillRect(
    bird.jugador.x,
    bird.jugador.y,
    bird.jugador.ancho,
    bird.jugador.alto
  );


  context.font = "40px Arial";
  context.fillText(bird.puntos, canvas.width / 2, 50);

  if (!iniciado) {
    context.fillStyle = "#000";
    context.font = "20px Arial";
    context.fillText(
      "Haz clic para iniciar",
      canvas.width / 2 - 80,
      canvas.height / 2
    );
  }
}

function update() {

  if (!iniciado) {
    return;
  }


  bird.tubos.arriba.x -= bird.tubos.arriba.velocidad;
  bird.tubos.abajo.x -= bird.tubos.abajo.velocidad;

  if (bird.tubos.abajo.x <= -50) {
    bird.tubos.arriba.x = canvas.width;
    bird.tubos.abajo.x = canvas.width;

  
    let rng = Math.random() * (canvas.height - 200);
    bird.tubos.abajo.y = rng + 150;
    bird.tubos.arriba.y = rng + 9 - 500;

    bird.puntos++;
  }


  bird.tubos.arriba.velocidad += 0.0005;
  bird.tubos.abajo.velocidad += 0.0005;


  bird.jugador.caida += bird.jugador.gravedad;
  bird.jugador.y += bird.jugador.caida;


  if (bird.jugador.y + bird.jugador.alto > bird.altoCanvas) {
    bird.jugador.y = bird.altoCanvas - bird.jugador.alto;
    bird.jugador.caida = 0;
  } else if (bird.jugador.y < 0) {
    bird.jugador.y = 0;
    bird.jugador.caida = 0;
  }


  if (
    bird.jugador.x < bird.tubos.arriba.x + bird.tubos.arriba.ancho &&
    bird.jugador.x + bird.jugador.ancho > bird.tubos.arriba.x &&
    bird.jugador.y + 10 < bird.tubos.arriba.y + bird.tubos.arriba.alto &&
    bird.jugador.y + 10 + bird.jugador.alto > bird.tubos.arriba.y
  ) {
    gameOver();
  }

  if (
    bird.jugador.x < bird.tubos.abajo.x + bird.tubos.abajo.ancho &&
    bird.jugador.x + bird.jugador.ancho > bird.tubos.abajo.x &&
    bird.jugador.y - 10 < bird.tubos.abajo.y + bird.tubos.abajo.alto &&
    bird.jugador.y - 10 + bird.jugador.alto > bird.tubos.abajo.y
  ) {
    gameOver();
  }
}

function salto() {
  bird.jugador.caida = -bird.jugador.salto;
}

function gameOver() {
  let puntaje = bird.puntos;
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
    alert("Chocaste, tu puntuacion fue: " + puntaje);
  }, 10);

  reproducido = false;
  cancion = new Audio("musica.ogg");
}

cancion.addEventListener("ended", function () {

  cancion.loop = true;
  cancion.play();
});

function iniciar() {
  if (!iniciado) {
    iniciado = true;
  }
  if (!reproducido) {
    cancion.volume = document.getElementById("volume-slider").value / 100;
    cancion.play();
    reproducido = true;
  }
}

let slider = document.getElementById("volume-slider");
slider.addEventListener("input", function () {

  cancion.volume = slider.value / 100;
});


function gameLoop() {
  draw();
  update();
}

document.addEventListener("click", salto);
document.addEventListener("click", iniciar);

setInterval(gameLoop, 1000 / 60);
