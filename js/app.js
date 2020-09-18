document.addEventListener(
    "DOMContentLoaded",
    function() {
        //variables
        const keyboard = document.querySelector("#qwerty");
        const scoreBoard = document.querySelector("#scoreboard");
        const phrase = document.querySelector("#phrase");
        let missed = 0;
        const winOverlay = document.querySelector(".win");
        winOverlay.style.display = "none";
        const lostOverlay = document.querySelector(".lose");
        lostOverlay.style.display = "none";

        const phrases = [
            //phrases obtained from: https://randomwordgenerator.com/phrase.php
            "When the Rubber hits the Road",
            "Every Cloud has a Silver Lining",
            "Fit as a Fiddle",
            "My Cup of Tea",
            "Down to Earth",
            "A Piece of Cake",
            "On Cloud Nine",
            "Needle in a Haystack",
            "Lickety Split",
            "Know the Ropes",
        ];
        const startOverlay = document.querySelector(".start");
        const startGameBtn = document.querySelectorAll(".btn__reset")[0];
        const restartGameBtn = document.querySelectorAll(".btn__reset")[1];
        const tryAgainGameBtn = document.querySelectorAll(".btn__reset")[2];

        //Functions
        function getRandomPhraseAsArray(arr) {
            const randIndex = Math.floor(Math.random() * arr.length); //random number between 0 and 9
            const randPhrase = arr[randIndex].split("");
            return randPhrase;
        }

        function removePhraseFromDisplay() {
            const phraseContainer = phrase.children[0];
            phrase.removeChild(phraseContainer);
        }

        function resetKeyboard() {
            let k = document.querySelectorAll(".chosen");

            for (let i = 0; i < k.length; i++) {
                k[i].removeAttribute("disabled");
                k[i].classList.remove("chosen");
            }
        }

        function resetLives() {
            for (let i = 0; i < 5; i++) {
                let life = document.createElement("li");
                let heart = document.createElement("img");
                heart.src = "images/liveHeart.png";
                heart.style.height = "35px";
                heart.style.width = "30px";
                life.appendChild(heart);
                life.className = "tries";
                scoreBoard.children[0].appendChild(life);
            }
        }

        function addPhraseToDisplay(arr) {
            let ul = document.createElement("ul");
            phrase.appendChild(ul);

            for (let i = 0; i < arr.length; i++) {
                let li = document.createElement("li");
                li.textContent = arr[i];
                if (arr[i] !== " ") {
                    li.className = "letter";
                } else {
                    li.className = "space";
                }
                phrase.children[0].appendChild(li);
            }
        }

        function checkLetter(btn) {
            let matchedLetter;
            let matchFound = false;
            const letters = document.querySelectorAll(".letter");
            const btnText = btn.textContent;

            for (let i = 0; i < letters.length; i++) {
                if (btnText === letters[i].textContent.toLowerCase()) {
                    letters[i].classList.add("show");
                    matchedLetter = letters[i];
                    matchFound = true;
                }
            }
            if (matchFound === true) {
                return matchedLetter;
            } else {
                return null;
            }
        }

        function checkWin() {
            const numShow = document.querySelectorAll(".show").length;
            const numLetters = document.querySelectorAll(".letter").length;
            if (numShow === numLetters) {
                setTimeout(function() {
                    winOverlay.style.display = "";
                }, 600);
            } else if (missed >= 5) {
                setTimeout(function() {
                    lostOverlay.style.display = "";
                }, 600);
            }
        }

        function startGame() {
            missed = 0;
            winOverlay.style.display = "none";
            lostOverlay.style.display = "none";
            startOverlay.style.display = "none";
            let randPhrase = getRandomPhraseAsArray(phrases);

            const phraseContent = document.querySelector("#phrase").children[0].children;
            if (phraseContent.length > 0) {
                removePhraseFromDisplay();
                resetKeyboard();
                resetLives();
            }
            addPhraseToDisplay(randPhrase);
        }

        //Event Listeners
        startGameBtn.addEventListener("click", startGame);
        restartGameBtn.addEventListener("click", startGame);
        tryAgainGameBtn.addEventListener("click", startGame);

        keyboard.addEventListener("click", function(event) {
            const chosenButton = event.target;
            if (chosenButton.tagName === "BUTTON") {
                chosenButton.className = "chosen";
                chosenButton.disabled = "true";

                const letterFound = checkLetter(chosenButton);

                if (letterFound === null) {
                    missed++;
                    if (missed <= 5) {
                        scoreBoard.children[0].removeChild(
                            scoreBoard.children[0].children[0]
                        );
                    }
                }
                checkWin();
            }
        });
    });