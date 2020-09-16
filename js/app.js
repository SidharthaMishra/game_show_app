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
            "Know the Ropes"
        ];
        const startOverlay = document.querySelector(".start");
        const startGameBtn = document.querySelector(".btn__reset");

        //Functions
        function getRandomPhraseAsArray(arr) {
            const randIndex = Math.floor(Math.random() * arr.length); //random number between 0 and 9
            const randPhrase = arr[randIndex].split("");
            return randPhrase;
        }

        function addPhraseToDisplay(arr) {
            for (let i = 0; i < arr.length; i++) {
                let li = document.createElement("li");
                li.textContent = arr[i];
                if (arr[i] !== " ") {
                    li.className = "letter";
                } else {
                    li.className = "space";
                }
                phrase.appendChild(li);
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
                winOverlay.style.display = "";
            } else if (missed >= 5) {
                lostOverlay.style.display = "";
            }
        }
        //Event Listeners
        startGameBtn.addEventListener("click", function() {
            winOverlay.style.display = "none";
            lostOverlay.style.display = "none";
            startOverlay.style.display = "none";

            let randPhrase = getRandomPhraseAsArray(phrases);
            addPhraseToDisplay(randPhrase);
        });

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