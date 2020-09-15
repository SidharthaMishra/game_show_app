document.addEventListener(
    "DOMContentLoaded",
    function() {
        //variables
        const keyboard = document.querySelector("#qwerty");
        const scoreBoard = document.querySelector("#scoreboard");
        const phrase = document.querySelector("#phrase");
        let missed = 0;
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
        const startOverlay = document.querySelector("#overlay");
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

        //Event Listeners
        startGameBtn.addEventListener("click", function() {
            startOverlay.style.display = "none";
        });


    });