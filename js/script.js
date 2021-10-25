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

let player = new hoopDreamer(10, 10, 'orange', 20, 20)
console.log('plyer at' , player)

const gameLoop = () => {
    ctx.clearRect(0, 0, game.width, game.height)
    player.render()
}

let stop = () => {clearInterval(gameInterval)}

let gameInterval = setInterval(gameLoop, 70)

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


