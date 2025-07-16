const canvas = document.getElementById("fun_game");
const context = canvas.getContext("2d");

context.scale(20, 20);
context.fillStyle = "#000";
context.fillRect(0, 0, canvas.width, canvas.height);

function createMatrix(width, height) {
  const matrix = [];
  while (height--) {
    matrix.push(new Array(width).fill(0));
  }
  return matrix;
}

// Peça em formato de "T"
function createPiece() {
  return [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ];
}

// Desenha a peça na posição atual
function drawMatrix(matrix, offset) {
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        context.fillStyle = "red";
        context.fillRect(x + offset.x, y + offset.y, 1, 1);
      }
    });
  });
}

// Limpa a tela e redesenha
function draw() {
  context.fillStyle = "#000";
  context.fillRect(0, 0, canvas.width, canvas.height);

  drawMatrix(player.matrix, player.pos);
}

// Faz a peça cair
function update(deltaTime) {
  dropCounter += deltaTime;
  if (dropCounter > dropInterval) {
    player.pos.y++;
    dropCounter = 0;
  }
  draw();
  requestAnimationFrame(updateWrapper);
}

function updateWrapper(time = 0) {
  const deltaTime = time - lastTime;
  lastTime = time;
  update(deltaTime);
}

// Movimento com teclas
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    player.pos.x--;
  } else if (event.key === "ArrowRight") {
    player.pos.x++;
  } else if (event.key === "ArrowDown") {
    player.pos.y++;
  }
});

// Variáveis de jogo
const arena = createMatrix(12, 20);
const player = {
  pos: { x: 5, y: 0 },
  matrix: createPiece(),
};

let dropCounter = 0;
let dropInterval = 1000; // ms

let lastTime = 0;
updateWrapper();
