// element vars
let squares = document.querySelectorAll(".square");
let color_display = document.querySelector("#color_display");
let message_display = document.querySelector("#message");
let h1 = document.querySelector("h1");
let reset_btn = document.querySelector("#reset");
let easy_btn = document.querySelector("#easy");
let hard_btn = document.querySelector("#hard");

const easy = 3;
const hard = 6;
let mode = hard;
let h1_background_color = "#5c84b1"
let game_background_color = "#232323";
resetGame();
init();

function init() {
   // squares handler
   for (let i = 0; i < squares.length; i++) {
      squares[i].addEventListener("click", function () {
         let clicked_color = this.style.backgroundColor;
         // correct color clicked
         if (clicked_color === correct_color) {
            message_display.textContent = "Correct!";
            changeColors(correct_color);

            for(let j = 0; j < squares.length; j++){
               squares[j].classList.remove("hover");
            }
         }
         // incorrect color clicked
         else {
            this.style.backgroundColor = game_background_color;
            message_display.textContent = "Try Again"
         }
      });
   }

   // reset button
   reset_btn.addEventListener("click", function () {
      resetGame();
   });

   // easy button
   easy_btn.addEventListener("click", function () {
      mode = easy;
      this.classList.add("selected");
      hard_btn.classList.remove("selected");
      resetGame();

      for(let i = easy; i < hard; i++){
         squares[i].style.backgroundColor = game_background_color;
      }
      for (let i = easy; i < hard; i++) {
         squares[i].classList.add("hidden");
      }
   });

   // hard button
   hard_btn.addEventListener("click", function () {
      mode = hard;
      this.classList.add("selected");
      easy_btn.classList.remove("selected");
      resetGame();

      for (let i = easy; i < hard; i++) {
         squares[i].classList.remove("hidden");
      }
   });
}

// assign the colors to squares
function assignColors() {
   colors = generateRandomColors(mode);
   correct_color = pickWinningColor(mode);
   color_display.textContent = correct_color;

   for (let i = 0; i < mode; i++) {
      squares[i].style.backgroundColor = colors[i];
   }
}

// reset the game
function resetGame() {
   reset_btn.textContent = "New Colors";
   message_display.textContent = "";
   h1.style.backgroundColor = h1_background_color;
   assignColors();

   for(let j = 0; j < squares.length; j++){
      squares[j].classList.add("hover");
   }
}

// change the colors of the all squares to the passed color
function changeColors(color) {
   for (let i = 0; i < squares.length; i++) {
      squares[i].style.backgroundColor = color;
   }
   h1.style.backgroundColor = color;
   reset_btn.textContent = "Play Again?";
}

// get a random integer between max and min inclusive
function getRandomInt(min, max) {
   min = Math.ceil(min);
   max = Math.floor(max);
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

// pick color from colors array
function pickWinningColor(num) {
   if (num === 3) {
      return colors[getRandomInt(0, 2)];
   }
   else {
      return colors[getRandomInt(0, 5)];
   }
}

// generate a random rgb color as a string
function randomColor() {
   let r = String(getRandomInt(0, 255));
   let g = String(getRandomInt(0, 255));
   let b = String(getRandomInt(0, 255));

   return `rgb(${r}, ${g}, ${b})`;
}

// generate an array of random colors 
function generateRandomColors(num) {
   let arr = [];
   for (let i = 0; i < num; i++) {
      arr[i] = randomColor();
   }
   return arr;
}