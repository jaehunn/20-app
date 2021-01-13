// @see https://developer.mozilla.org/ko/docs/Web/HTML/Canvas
// @see https://developer.mozilla.org/ko/docs/Web/API/Window/requestAnimationFrame

const rulesBtnEl = document.getElementById("rules-btn");
const closeBtnEl = document.getElementById("close-btn");
const rulesEl = document.getElementById("rules");

const canvasEl = document.getElementById("canvas");
const ctx = canvasEl.getContext("2d");

let score = 0;

const BRICK_ROW = 9;
const BRICK_COL = 5;

// Create ball props
const ball = {
  // center
  x: canvasEl.width / 2,
  y: canvasEl.width / 2,

  size: 10,
  dx: 4,
  dy: -4, // up
  speed: 4,
};

// Create paddle props
const paddle = {
  // center
  x: canvasEl.width / 2 - 40,
  y: canvasEl.height - 20,

  width: 80,
  height: 10,
  dx: 0, // dy(x) horizontal
  speed: 8,
};

// Create brick props
const brickInfo = {
  width: 70,
  height: 20,
  padding: 10,

  offsetX: 45,
  offsetY: 60,
  visible: true,
};

// Create bicks
const bricks = [];
for (let row = 0; row < BRICK_ROW; row += 1) {
  bricks[row] = [];
  for (let col = 0; col < BRICK_COL; col += 1) {
    const x = row * (brickInfo.width + brickInfo.padding) + brickInfo.offsetX;
    const y = col * (brickInfo.height + brickInfo.padding) + brickInfo.offsetY;

    bricks[row][col] = { x, y, ...brickInfo };
  }
}

update();

// Update canvas drawing and animation
function update() {
  movePaddle();
  moveBall();

  // Draw everything
  draw();

  requestAnimationFrame(update);
}

// Move ball on canvas
function moveBall() {
  // diagonal moving
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Wall collision -> // reversing
  // x axis - right, left
  if (ball.x + ball.size > canvasEl.width || ball.x - ball.size < 0)
    ball.dx *= -1;

  // y axis - top, bottom
  if (ball.y + ball.size > canvasEl.height || ball.y - ball.size < 0)
    ball.dy *= -1;

  // Paddle collision
  if (
    ball.x - ball.size > paddle.x &&
    ball.x + ball.size < paddle.x + paddle.width &&
    ball.y + ball.size > paddle.y
  ) {
    ball.dy = -ball.speed;
  }

  // Brick collision
  bricks.forEach((brickCol) => {
    brickCol.forEach((brick) => {
      if (brick.visible) {
        if (
          ball.x - ball.size > brick.x && // left side
          ball.x + ball.size < brick.x + brick.width && // right side
          ball.y + ball.size > brick.y && // top side
          ball.y - ball.size < brick.y + brick.height // bottom side
        ) {
          ball.dy *= -1;
          brick.visible = false;

          // break success
          increaseScore();
        }
      }
    });
  });

  // Lose: Hit bottom wall
  if (ball.y + ball.size > canvasEl.height) {
    showAllBricks();

    score = 0;
  }
}

// Increase Score
function increaseScore() {
  score += 1;

  if (score % (BRICK_ROW * BRICK_ROW) === 0) showAllBricks();
}

// Make all bricks appear
function showAllBricks() {
  bricks.forEach((brickCol) => {
    brickCol.forEach((brick) => (brick.visible = true));
  });
}

// Move paddle on canvas
function movePaddle() {
  paddle.x += paddle.dx;

  // Wall detection
  // right
  if (paddle.x + paddle.width > canvasEl.width) {
    paddle.x = canvas.width - paddle.width;
  }

  // left
  if (paddle.x < 0) {
    paddle.x = 0;
  }
}

// Draw everything
function draw() {
  // clear canvas
  ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

  drawBall();
  drawPaddle();
  drawScore();
  drawBricks();
}

// Draw bricks on canvas
function drawBricks() {
  bricks.forEach((brickCol) => {
    brickCol.forEach(({ x, y, width, height, visible }) => {
      ctx.beginPath();
      ctx.rect(x, y, width, height);
      ctx.fillStyle = visible ? "#0095dd" : "transparent";
      ctx.fill();
      ctx.closePath();
    });
  });
}

// Draw ball on canvas
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2); // x y size start-angle end-angle
  ctx.fillStyle = "#0095dd";
  ctx.fill();
  ctx.closePath();
}

// Draw paddle on canvas
function drawPaddle() {
  ctx.beginPath();

  ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
  ctx.fillStyle = "#0095dd";
  ctx.fill();
  ctx.closePath();
}

// Draw score on canvas
function drawScore() {
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, canvasEl.width - 100, 30);
}

// Keydown event
function keyDown(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    paddle.dx = paddle.speed;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    paddle.dx = -paddle.speed;
  }
}

// Keyup event
function keyUp(e) {
  if (
    e.key === "Right" ||
    e.key === "ArrowRight" ||
    e.key === "Left" ||
    e.key === "ArrowLeft"
  ) {
    paddle.dx = 0;
  }
}

// Keyboard event handlers
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

// Rules and close event handlers
rulesBtnEl.addEventListener("click", () => rulesEl.classList.add("show"));
closeBtnEl.addEventListener("click", () => rulesEl.classList.remove("show"));
