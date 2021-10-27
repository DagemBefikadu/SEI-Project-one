const game = document.getElementById("canvas");
const points = document.getElementById("collected");
const clock = document.getElementById("timer");
const ctx = canvas.getContext("2d");

game.setAttribute("width", getComputedStyle(game)["width"]);
game.setAttribute("height", getComputedStyle(game)["height"]);

function hoopDreamer(x, y, color, width, height) {
  this.x = x;
  this.y = y;
  this.color = color;
  this.width = width;
  this.height = height;

  this.render = function () {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };
}

function spawnObjects(color, width, height) {
  this.x = Math.floor(Math.random() * game.width);
  this.y = Math.floor(Math.random() * game.height);
  this.color = color;
  this.width = width;
  this.height = height;
  this.alive = true ;

  this.render = function () {
      if(this.alive === true) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
      }
  };
}

//What we want our player to look like by using the constructor
let player = new hoopDreamer(10, 10, "beige", 15, 15);
console.log("plyer at", player);

//This loop has to run to see objects on the game board
const gameLoop = () => {
  ctx.clearRect(0, 0, game.width, game.height);
  player.render();
   for ( let i = 0; i < courtObjects.length; i++) {
       courtObjects[i].render()
       if(player.x < courtObjects[i].x + courtObjects[i].width && 
        player.x + player.width > courtObjects[i].x &&
        player.y < courtObjects[i].y + courtObjects[i].height &&
        player.y + player.height > courtObjects[i].y ){
        courtObjects[i].alive = false
        courtObjects.splice(courtObjects[i],0)
       }
   }
}
//With this empty array I can push in all my objects, so I can use it later .(its global)
let courtObjects = [];

//This function gives me the ability to limit how many objects appear at a time, while stopping to many from appearing. 
function courtObject() {
  spawnInterval = setInterval(() => {
    let basketball = new spawnObjects("orange", 15, 15);
    let bigBasketball = new spawnObjects("red", 15, 15);
    let food = new spawnObjects("brown", 15, 15);
    let sweat = new spawnObjects("blue", 15, 15);
    courtObjects.push(basketball, bigBasketball, food, sweat);
    if (courtObjects.length >= 12) {
      clearInterval(spawnInterval);
      console.log(courtObjects);
    }
    console.log(spawnInterval);
    // console.log(courtObjects);
  }, 500);
}
courtObject();

//THis handles the players movement
const movementHandler = (e) => {
  switch (e.keyCode) {
    // player UP
    case 87:
      player.y -= 10;
      break;
    // left
    case 65:
      player.x -= 10;
      break;
    // down
    case 83:
      player.y += 10;
      break;
    // right
    case 68:
      player.x += 10;
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
  }
}

function start() {
  time = setInterval(shotClock, 1000);

  shotClock();
}

let stop = () => {
  clearInterval(gameInterval);
};

let gameInterval = setInterval(gameLoop, 70);
