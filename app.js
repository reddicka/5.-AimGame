const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const scoreEl = document.querySelector('#currentScore');
const board = document.querySelector('#board');
const colors = [
    '#F58236',
    '#F5DC62',
    '#F52AB8',
    '#6A64F5',
    '#F53E1D',
    '#4985F5',
    '#C6F564',
    '#CC58F5',
];
let time = 4;
let score = 0;

// ======== СОБЫТИЯ ========

startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
});

timeList.addEventListener('click', (event) => {
    // Делeгирование событый
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();
    }
});

board.addEventListener('click', (event) => {
    if (event.target.classList.contains('circle')) {
        score++;
        scoreEl.innerHTML = score;
        event.target.remove();
        createRandomCircle();
    } else if (event.target.classList.contains('again-btn')) {
        screens[1].classList.remove('up');
        // ТУТ ЕЩЕ НЕ СДЕЛАНО
        // board.childNodes.remove();

        timeEl.parentElement.classList.remove('hide');
        scoreEl.parentNode.classList.remove('hide');

        score = 0;
        board.innerHTML = '';
    } else {
        score--;
        scoreEl.innerHTML = score;
    }
});

// ======== ИГРА ========
// DEBUG
//startGame();

function startGame() {
    setTime(time); // устанавливется один раз чтобы не тупило в начале
    createRandomCircle();

    let timerId = setInterval(() => {
        if (time > 0) {
            decreaseTime();
        } else {
            finishGame();
            clearInterval(timerId);
        }
    }, 1000);
}

function decreaseTime() {
    let current = --time;
    setTime(current);
}

function setTime(value) {
    if (time < 10) {
        timeEl.innerHTML = `00:0${value}`;
    } else {
        timeEl.innerHTML = `00:${value}`;
    }
}

function finishGame() {
    // timeEl.parentNode.remove();
    // scoreEl.parentNode.remove();
    timeEl.classList.add('hide');
    scoreEl.classList.add('hide');

    board.innerHTML = `<div><h1>Счет: <span class="primary">${score}</span></h1>
    <button class="again-btn">Еще раз</button></div>`;
}

function createRandomCircle() {
    const circle = document.createElement('div');
    const size = getRamdomNumber(10, 60);
    const color = getRandomColor();
    const { width, height } = board.getBoundingClientRect();

    const x = getRamdomNumber(0, width - size);
    const y = getRamdomNumber(0, height - size);

    circle.classList.add('circle');
    circle.style.backgroundColor = color;
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;

    board.append(circle);
}

function getRamdomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

// Cheat
function winTheGame() {
    function kill() {
        const circle = document.querySelector('.circle');

        if (circle) {
            circle.click();
        }
    }

    setInterval(kill, 42);
}
