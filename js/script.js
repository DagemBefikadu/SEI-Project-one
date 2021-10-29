const game = document.getElementById("canvas");
let points = document.getElementById("counted");
const clock = document.getElementById("timer");
const ctx = canvas.getContext("2d");
let pointCounter = 0;

game.setAttribute("width", getComputedStyle(game)["width"]);
game.setAttribute("height", getComputedStyle(game)["height"]);

const basketballImg = new Image()
const bigBasketballImg = new Image()
const frenchFriesImg = new Image()
const sweatMarkImg = new Image()
const basketballPlayer = new Image()

basketballPlayer.src = ('css/img/BasketballPlayer.png');
basketballImg.src = ('css/img/basketball.png');
bigBasketballImg.src = ('css/img/bigBasketball.png');
frenchFriesImg.src = ('css/img/frenchFries.png');
sweatMarkImg.src = ('css/img/sweatMark.png');

function hoopDreamer(x, y, url, width, height) {
this.url = url
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;

  this.render = function () {
    // ctx.fillStyle = this.color;
    ctx.drawImage(this.url, this.x, this.y, this.width, this.height)
  };
}

function spawnObjects(url, width, height) {
    this.url = url
  this.x = Math.floor(Math.random() * game.width);
  this.y = Math.floor(Math.random() * game.height);
//   this.color = color;
  this.width = width;
  this.height = height;
  this.alive = true;
  if (this.url == frenchFriesImg) {
    this.points = -1;
  } else if (this.url == sweatMarkImg) {
    this.points = -1;
  } else if (this.url == bigBasketballImg) {
    this.points = 2;
  } else {
    this.points = 1;
  }

  this.render = function () {
    if (this.alive === true) {
    //   ctx.fillStyle = this.color;
    //   ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.drawImage(this.url, this.x, this.y, this.width, this.height)
    }
  };
}

//What we want our player to look like by using the constructor
let player = new hoopDreamer(10, 10, basketballPlayer,  60, 60);
console.log("plyer at", player);

//This loop has to run to see objects on the game board
const gameLoop = () => {
  ctx.clearRect(0, 0, game.width, game.height);
  player.render();
  for (let i = 0; i < courtObjects.length; i++) {
    courtObjects[i].render();
    if (
      player.x < courtObjects[i].x + courtObjects[i].width &&
      player.x + player.width > courtObjects[i].x &&
      player.y < courtObjects[i].y + courtObjects[i].height &&
      player.y + player.height > courtObjects[i].y &&
      courtObjects[i].alive == true
    ) {
      console.log("hi");
      courtObjects[i].alive = false;
      courtObjects.splice(courtObjects[i], 0);
      pointCounter += courtObjects[i].points;
      points.innerHTML = pointCounter;
    }
  }
};
//With this empty array I can push in all my objects, so I can use it later .(its global)
let courtObjects = [];

//This function gives me the ability to limit how many objects appear at a time, while stopping to many from appearing.
function courtObject() {
  spawnInterval = setInterval(() => {
    let basketball = new spawnObjects(basketballImg, 30, 30);
    let bigBasketball = new spawnObjects(bigBasketballImg, 30, 30);
    let food = new spawnObjects(frenchFriesImg, 30, 30);
    let sweat = new spawnObjects(sweatMarkImg, 30, 30);
    courtObjects.push(basketball, bigBasketball, food, sweat);
    if (courtObjects.length >= 56) {
      clearInterval(spawnInterval);
      console.log(courtObjects);
    }
    console.log(spawnInterval);
    // console.log(courtObjects);
  }, 100);
}
courtObject();

//THis handles the players movement
const movementHandler = (e) => {
  switch (e.keyCode) {
    // player UP
    case 87:
      player.y -= 10;
      if (player.y <= 0) {
        player.y = 0;
      }
      break;
    // left
    case 65:
      player.x -= 10;
      if (player.x <= 0) {
        player.x = 0;
      }
      break;
    // down
    case 83:
      player.y += 10;
      if (player.y + player.height >= game.height) {
        player.y = game.height - player.height;
      }
      break;
    // right
    case 68:
      player.x += 10;
      if (player.x + player.width >= game.width) {
        player.x = game.width - player.width;
      }
      break;
  }
};

document.addEventListener("keydown", movementHandler);

//Button is currently shot clock for now, we want to change that function to happen once the player moves.
document.addEventListener("click", start);
let time;
let timeStart = 24;

const shotDoneClock = () => {
  clearInterval(time);
};

function shotClock() {
  timeStart = timeStart - 1;
  if (timeStart >= 0) {
    document.getElementById("shotClock").innerHTML = timeStart;
    // console.log(timeStart);
  } else {
    shotDoneClock();
    stopGameLoop();
    winnerAlert();
    location.reload();
  }
}

function winnerAlert() {
  if (pointCounter > 16) {
    alert("YOU WIN!!!!!!");
  } else if(pointCounter > 10)  {
    alert("Awee soo close....");
  } else {
  alert("Try again!!!!")
  }
}
document.addEventListener("click", gameStartScreen);
function gameStartScreen() {
    let x = document.getElementById("startMenu");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
}

function start() {
  time = setInterval(shotClock, 2000);

  shotClock();
}

let stopGameLoop = () => {
  clearInterval(gameInterval);
};

let gameInterval = setInterval(gameLoop, 70);