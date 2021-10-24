const game = document.getElementById('canvas')
const points = document.getElementById('collected')
const clock = document.getElementById('timer')
const ctx = canvas.getContext('2d');

game.setAttribute('width', getComputedStyle(game)['width'])
game.setAttribute('height', getComputedStyle(game)['height'])

console.log('current game width', game.width)
console.log('current game height', game.height)


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

document.getElementById("timer").addEventListener("click", start);

