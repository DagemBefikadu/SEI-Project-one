const game = document.getElementById('canvas')
const points = document.getElementById('collected')
const clock = document.getElementById('timer')
const ctx = canvas.getContext('2d');

game.setAttribute('width', getComputedStyle(game)['width'])
game.setAttribute('height', getComputedStyle(game)['height'])

// console.log('current game width', game.width)
// console.log('current game height', game.height)

function hoopDreamer(x, y, color, width, height) {
    this.x = x
    this.y = y
    this.color = color
    this.width = width
    this.height = height
    
    this.render = function () {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

function spawnObjects(color, width, height) {
    this.x = Math.floor(Math.random() * game.width)
    this.y = Math.floor(Math.random() * game.height)    
    this.color = color
    this.width = width
    this.height = height
    this.type = 'good'
    
    this.render = function () {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

let player = new hoopDreamer(10, 10, 'beige', 30, 30)
console.log('plyer at' , player)
//Lets get the random objects on the game board
// let basketball = new spawnObjects('orange', 15, 15)


const gameLoop = () => {
    ctx.clearRect(0, 0, game.width, game.height)
    player.render()
    courtObjects.forEach((objects) => {
        objects.render()
    })
    // basketball.render()
    // bigBasketball.render()
    // food.render()
    // sweat.render()
}

let courtObjects = []
console.log(courtObjects)

// const createMoreCourtObjects = () => {
//     for(i= 0; i < 1; i++) {
//         let basketball = new spawnObjects('orange', 15, 15)
//         let bigBasketball = new spawnObjects('red', 20,20)
//         let food = new spawnObjects('brown', 20,10)
//         let sweat = new spawnObjects('blue', 10,20)
//         courtObjects.push(basketball,bigBasketball, food, sweat)
//         if (courtObjects.length <= 16) {
            
//         }
//     }
// }
// console.log(courtObjects )  
// createMoreCourtObjects()

function courtObject() {
        spawnInterval = setInterval(() => {
            let basketball = new spawnObjects('orange', 15, 15)
            let bigBasketball = new spawnObjects('red', 20,20)
            let food = new spawnObjects('brown', 20,10)
            let sweat = new spawnObjects('blue', 10,20)
            courtObjects.push(basketball,bigBasketball, food, sweat)
            if (courtObjects.length >= 20) {
                clearInterval(spawnInterval)
                console.log(courtObjects)
            }
            console.log(spawnInterval)
            console.log(courtObjects)
        }, 3000)
    } 
courtObject()


//THis handles the players movement
const movementHandler = (e) => {
    switch (e.keyCode) {
        // player UP
        case (87):
            player.y -= 10
            break
        // left
        case (65):
            player.x -= 10
            break
        // down
        case (83):
            player.y += 10
            break
        // right
        case (68):
            player.x += 10
            break
    }
}

document.addEventListener('keydown', movementHandler)


//Button is currently shot clock for now, we want to change that function to happen once the player moves.
document.addEventListener("click", start);
let time;
let timeStart = 24;

const shotDoneClock = () => {
    clearInterval(time)
}

function shotClock(){
    timeStart  = timeStart - 1
    if(timeStart >= 0) {
        document.getElementById('shotClock').innerHTML = timeStart
        console.log(timeStart)
    }else {
        shotDoneClock();
    }
}

function start() {
    time = setInterval(shotClock, 1000);
    
    shotClock()
}

let stop = () => {clearInterval(gameInterval)}

let gameInterval = setInterval(gameLoop, 70)