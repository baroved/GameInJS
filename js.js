var countEnemies = 0;
var countGoodies = 0;

const startBallTop = '10px';
const gameBoardHeight = '400';
const gameBoardWidth = '600';
let intrval;


window.addEventListener('DOMContentLoaded', (event) => {



    //create gameBoard
    var gameBoard = CreateElement('div', document.body, ['gameBoard']);
    //create catcher
    var catcher = CreateElement('div', document.body, ['catcherStyle']);
    catcher.setAttribute("id", "catcherId");
    //create button start

    var button = CreateElement('button', gameBoard, ['buttonStyle']);
    button.innerText = 'Start';
    //score
    var score = CreateElement('div', gameBoard, ['scoreStyle']);
    //score enemies
    var enemies = CreateElement('div', score, ['counterStyle', 'enemiesStyle']);
    enemies.setAttribute("id", "enemiesId");
    enemies.innerText = countEnemies;
    //score goodies
    var goodies = CreateElement('div', score, ['counterStyle', 'goodiesStyle']);
    goodies.setAttribute("id", "goodiesId");
    goodies.innerText = countGoodies;

    //create ball
    var ball = CreateElement('div', gameBoard, ['ballStyle']);
    ball.setAttribute("id", "ballId");
    

    document.addEventListener("keydown", PositionGoodies);
    button.addEventListener('click', function () {
        intrval = setInterval(startGame, 17);
    });

});

function startGame() {
    var ball = document.getElementById('ballId');
    ball.style.visibility='visible';
    var catcher = document.getElementById('catcherId');
    var goodiesCounter = document.getElementById('goodiesId');
    var enemiesCounter = document.getElementById('enemiesId');

    var eTopPos = ball.offsetTop;

    if (ball.offsetTop > gameBoardHeight) {
        if (CheckCollision(catcher, ball))
            goodiesCounter.innerText = ++countGoodies;
        else
            enemiesCounter.innerText = ++countEnemies;

        if (countGoodies == 10 || countEnemies == 10) {


            if (countGoodies == 10)
                AlertFinish("Winner!!");
            else
                AlertFinish("Lose!!");

            clearInterval(intrval);


        }
        ball.style.left = RndStartBallLeft();
        ball.style.top = startBallTop;
        ball.style.visibility='hidden';

    } else
        ball.style.top = (eTopPos + 5) + 'px';

}

function AlertFinish(str) {

    setTimeout(function () {
        alert("You are" + " " + str);
        var goodiesCounter = document.getElementById('goodiesId');
        var enemiesCounter = document.getElementById('enemiesId');
        countGoodies = 0;
        countEnemies = 0;
        goodiesCounter.innerText = countGoodies;
        enemiesCounter.innerText = countEnemies;
    }, 500);
}



function RndStartBallLeft() {
    return (Math.floor(Math.random() * 560) + 1) + 'px';
}

function CheckCollision(catcher, enemies) {
    if ((enemies.offsetLeft < catcher.offsetLeft + catcher.offsetWidth) &&
        (enemies.offsetLeft + enemies.offsetWidth > catcher.offsetLeft) &&
        (enemies.offsetTop < catcher.offsetTop + catcher.offsetHeight) &&
        (enemies.offsetHeight + enemies.offsetTop > catcher.offsetTop))
        return true;
    else
        return false;
}


function PositionGoodies(event) {

    var catcher = document.getElementById("catcherId");
    var eLeftPos = catcher.offsetLeft;

    if (event.keyCode == 39 && (catcher.offsetLeft + catcher.offsetWidth) < gameBoardWidth)
        catcher.style.left = (eLeftPos + 16) + 'px';

    else
    if (event.keyCode == 37 && catcher.offsetLeft > 10) {
        catcher.style.left = (eLeftPos - 16) + 'px';
    }
}

function CreateElement(type, parent, classList) {
    var element = document.createElement(type);
    for (var item in classList) {
        element.classList.add(classList[item]);
    }
    parent.appendChild(element);
    return element;
}