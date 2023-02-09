const player = document.querySelector(".player");
const gameContainer = document.querySelector("#game-container");
let score = 0;
let enemySpeed = 2;
let gameInterval;

document.addEventListener("keydown", function(event) {
  switch (event.keyCode) {
    case 37: // left arrow
      moveLeft();
      break;
    case 38: // up arrow
      moveUp();
      break;
    case 39: // right arrow
      moveRight();
      break;
    case 40: // down arrow
      moveDown();
      break;
  }
});

function moveLeft() {
  let leftPos = player.offsetLeft - 50;
  if (leftPos >= 0) {
    player.style.left = `${leftPos}px`;
  }
}

function moveUp() {
  let topPos = player.offsetTop - 50;
  if (topPos >= 0) {
    player.style.top = `${topPos}px`;
  }
}

function moveRight() {
  let leftPos = player.offsetLeft + 50;
  if (leftPos <= 400) {
    player.style.left = `${leftPos}px`;
  }
}

function moveDown() {
  let topPos = player.offsetTop + 50;
  if (topPos <= 400) {
    player.style.top = `${topPos}px`;
  }
}

function startGame() {
  score = 0;
  enemySpeed = 2;
  gameInterval = setInterval(function() {
    updateGame();
  }, 1000);
}

function updateGame() {
  score++;
  enemySpeed += 0.1;
  createEnemy();
}

function createEnemy() {
  const enemy = document.createElement("div");
  enemy.classList.add("enemy");
  enemy.style.left = `${Math.floor(Math.random() * 450)}px`;
  enemy.style.top = `${Math.floor(Math.random() * 450)}px`;
  gameContainer.appendChild(enemy);
  moveEnemy(enemy, enemySpeed);
}

function moveEnemy(enemy, speed) {
let xPos = enemy.offsetLeft + speed;
let yPos = enemy.offsetTop + speed;
if (xPos >= 0 && xPos <= 450 && yPos >= 0 && yPos <= 450) {
enemy.style.left = `${xPos}px`;
enemy.style.top = `${yPos}px`;

} else {
gameContainer.removeChild(enemy);
}
}

function checkCollision(player, enemy) {
let playerRect = player.getBoundingClientRect();
let enemyRect = enemy.getBoundingClientRect();
if (
playerRect.left < enemyRect.right &&
playerRect.right > enemyRect.left &&
playerRect.top < enemyRect.bottom &&
playerRect.bottom > enemyRect.top
) {
// Collision detected, end game
endGame();
}
}

function endGame() {
clearInterval(gameInterval);
alert(Game Over! You survived for ${score} seconds.);
while (gameContainer.firstChild) {
gameContainer.removeChild(gameContainer.firstChild);
}
}

startGame();
