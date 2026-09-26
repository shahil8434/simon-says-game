        //Login

let loginBtn = document.querySelector("#login-btn");

loginBtn.addEventListener("click", function(){
    let name = document.querySelector("#username").value;
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;

    if(name === "" || email === "" || password === ""){
        alert("Please fill all the fields");
        return;
    }
    document.querySelector("#login-page").style.display = "none";
    document.querySelector("#game-page").style.display = "block";
});



        //Start
let gameSeq = [];
let userSeq = [];

let level = 0;

let highestScore =
    Number(localStorage.getItem("highestScore")) || 0;

let btns = ["one", "two", "three", "four"];

let started = false;

let acceptingInput = false;

let h2 = document.querySelector("#message");
let score = document.querySelector("#score");

score.innerText = `Highest Score: ${highestScore}`;

document.addEventListener("keydown", function () {

    if (started === false) {

        startGame();

    }

});

function startGame() {

    started = true;

    gameSeq = [];
    userSeq = [];
    level = 0;

    h2.innerText = "Get Ready...";

    levelUp();

}

function gameFlash(btn) {

    btn.classList.add("gameflash");

    setTimeout(() => {

        btn.classList.remove("gameflash");

    }, 250);

}

function userFlash(btn) {

    btn.classList.add("userflash");

    setTimeout(() => {

        btn.classList.remove("userflash");

    }, 150);

}

function levelUp() {

    userSeq = [];

    level++;

    h2.innerText = `Level ${level}`;

    acceptingInput = false;

    let randomNum =
        Math.floor(Math.random() * btns.length);

    let randomColor = btns[randomNum];

    gameSeq.push(randomColor);

    console.log("Game Sequence:", gameSeq);

    playSequence();

}

function playSequence() {

    let i = 0;

    let interval = setInterval(() => {

        let color = gameSeq[i];

        let btn =
            document.querySelector(`.${color}`);

        gameFlash(btn);

        i++;


        if (i === gameSeq.length) {

            clearInterval(interval);

            setTimeout(() => {

                acceptingInput = true;

            }, 400);

        }

    }, 600);

}

function checkAns(idx) {

    if (userSeq[idx] === gameSeq[idx]) {

        console.log("Correct!");

        if (userSeq.length === gameSeq.length) {

            acceptingInput = false;

            setTimeout(() => {

                levelUp();

            }, 800);

        }

    } else {

        gameOver();

    }

}

function btnPress() {

    if (!started || !acceptingInput) {
        return;
    }

    let btn = this;

    userFlash(btn);

    let userColour =
        btn.classList[1];

    userSeq.push(userColour);

    console.log("User Sequence:", userSeq);

    checkAns(userSeq.length - 1);

}

function gameOver() {

    acceptingInput = false;

    let currentScore = level - 1;

    if (currentScore > highestScore) {

        highestScore = currentScore;

        localStorage.setItem(
            "highestScore",
            highestScore
        );

    }

    score.innerText =
        `Highest Score: ${highestScore}`;

    h2.innerHTML =
        `Game Over! <br>
         Your Score: <b>${currentScore}</b> <br>
         Highest Score: <b>${highestScore}</b> <br>
         Press any key to restart.`;

    document.body.style.backgroundColor = "red";

    setTimeout(() => {

        document.body.style.backgroundColor = "white";

    }, 150);


    reset();

}

function reset() {

    started = false;

    acceptingInput = false;

    gameSeq = [];

    userSeq = [];

    level = 0;

}

let allBtns =
    document.querySelectorAll(".btn");

allBtns.forEach((btn) => {

    btn.addEventListener(
        "click",
        btnPress
    );

});