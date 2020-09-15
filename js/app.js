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

        //Event Listeners
        startGameBtn.addEventListener("click", function() {
            startOverlay.style.display = "none";
        });


    });