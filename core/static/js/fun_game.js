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

class Piece {
  constructor(shape, color) {
    this.shape = shape;
    this.color = color;
  }

  rotate(dir = 1) {
    const m = this.shape;
    for (let y = 0; y < m.length; ++y) {
      for (let x = 0; x < y; ++x) {
        [m[x][y], m[y][x]] = [m[y][x], m[x][y]];
      }
    }
    if (dir > 0) {
      m.forEach((row) => row.reverse());
    } else {
      m.reverse();
    }
  }
}

const PIECES = {
  T: new Piece(
    [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    "purple",
  ),

  I: new Piece(
    [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    "cyan",
  ),

  O: new Piece(
    [
      [1, 1],
      [1, 1],
    ],
    "yellow",
  ),

  L: new Piece(
    [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ],
    "orange",
  ),

  J: new Piece(
    [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    "blue",
  ),

  Z: new Piece(
    [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    "red",
  ),

  S: new Piece(
    [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    "green",
  ),
};

function randomPiece() {
  const keys = Object.keys(PIECES);
  const type = keys[Math.floor(Math.random() * keys.length)];
  const piece = PIECES[type];
  return {
    shape: piece.shape.map((row) => [...row]), // Clona matriz
    color: piece.color,
  };
}

function drawMatrix(matrix, offset, color) {
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        context.fillStyle = color || "red";
        context.fillRect(x + offset.x, y + offset.y, 1, 1);
      }
    });
  });
}

function draw() {
  context.fillStyle = "#121212";
  context.fillRect(0, 0, canvas.width, canvas.height);
  drawMatrix(player.matrix, player.pos, player.color);
}

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

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    player.pos.x--;
  } else if (event.key === "ArrowRight") {
    player.pos.x++;
  } else if (event.key === "ArrowDown") {
    player.pos.y++;
  } else if (event.key === "ArrowUp") {
    const rotated = player.matrix.map((row) => [...row]);
    const temp = new Piece(rotated, player.color);
    temp.rotate();
    player.matrix = temp.shape;
  } else if (event.code === "Space") {
    dropInterval = 70;
  }
});

document.addEventListener("keyup", (event) => {
  if (event.code === "Space") {
    dropInterval = 700;
  }
});

const arena = createMatrix(12, 20);

const { shape, color } = randomPiece();
const player = {
  pos: { x: 5, y: 0 },
  matrix: shape,
  color: color,
};

let dropCounter = 0;
let dropInterval = 700; // ms
let lastTime = 0;

updateWrapper();
