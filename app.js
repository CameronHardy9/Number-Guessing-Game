"use strict";

const button = document.querySelector(".button");
const container = document.querySelector(".container");
const input = document.querySelector(".input");
const prompt = document.querySelector(".prompt");
const difficulty = document.getElementById("difficulty");
const info = document.querySelector(".info");
const error = document.querySelector(".error");

window.addEventListener("keyup",(e) => {
    if(e.key === "Enter") {
        button.click();
    }
})

button.onclick = () => {
    if (!input.value) {
        error.hidden = false;
    } else {
        error.hidden = true;
        const game = new GuessGame(input.value);
        button.disabled = true;
        input.value = "";
        game.diffSelect();
    }
}

class GuessGame {
    constructor(name) {
        this.name = name;
        this.rand = null;
        this.count = null;
        this.mode = null;
    }
    diffSelect() {
        difficulty.hidden = false;
        input.hidden = true;
        button.textContent = "Select";
        prompt.textContent = `Hi, ${this.name}! Please select your difficulty.`
        button.disabled = false;
        button.onclick = () => {
            this.mode = Number(difficulty.value);
            input.placeholder = `1 - ${this.mode}`;
            button.textContent = "Guess";
            difficulty.hidden = true;
            this.gameStart();
        };
    }
    gameStart() {
        input.setAttribute("type", "number");
        input.min = "1";
        input.max = `${this.mode}`;
        prompt.textContent = `Guess a number between 1 and ${this.mode}!`
        this.rand = Math.floor(Math.random() * this.mode + 1);
        this.count = 7;
        info.textContent = `Guesses remaining: ${this.count}`;
        info.hidden = false;
        input.hidden = false;
        button.onclick = () => {
            this.guess(input.value);
        };
    }
    guess(guess) {
        console.log(guess);
        if(guess == this.rand) {
            input.value = "";
            this.right();
        } else {
            input.value = "";
            this.wrong();
        }
    }
    right() {
        console.log("right");
        container.style.boxShadow = "0px 5px 5px lightgreen"
    }
    wrong() {
        console.log("wrong");
        container.style.boxShadow = "0px 5px 5px red"
    }
    replay() {

    }
}





class NumGame {
    constructor(playerName) {
        this.playerName = playerName;
        this.rand = null;
        this.count = null;
    }
    gameStart() {
        this.rand = Math.floor(Math.random() * 100 + 1);
        this.count = 7;
        let userInput = prompt(
            `${this.playerName}, guess what number I'm thinking of between 1 and 100!\n\nYou have 7 tries.`
        );
        this.guess(userInput);
    }
    guess(num) {
        this.count--;
        num == this.rand ? this.right() : this.wrong(num);
    }
    right() {
        alert(
            `Congratulations ${this.playerName}, you got the number in ${
                7 - this.count
            } guesses!`
        );
    }
    wrong(num) {
        let highLow;
        this.count <= 0
            ? this.lose()
            : num < this.rand
            ? (highLow = "low")
            : (highLow = "high");
        this.guess(
            prompt(
                `That guess was too ${highLow}.\n\nYou can guess ${this.count} more time(s). Try again!`
            )
        );
    }
    lose() {
        let retry = prompt(
            "Sorry, you ran out of guesses!\n\nWould you like to play again? [y,n]"
        );
        retry == "y"
            ? this.gameStart()
            : alert(`Bye ${this.playerName}! Thanks for playing!`);
    }
}

// let game = new NumGame(prompt("What is your name?"));
// game.gameStart();

