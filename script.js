/* =========================================================
   PROFESSOR MATUNDURA WEBSITE
   Interactive effects
   Built by Calvin
   ========================================================= */


/* ---------------------------------------------------------
   Simple click sound
   Browsers only allow this after the user interacts.
   --------------------------------------------------------- */

function playClickSound() {
    try {
        const AudioContext =
            window.AudioContext || window.webkitAudioContext;

        if (!AudioContext) {
            return;
        }

        const audio = new AudioContext();
        const oscillator = audio.createOscillator();
        const gain = audio.createGain();

        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(520, audio.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(
            780,
            audio.currentTime + 0.08
        );

        gain.gain.setValueAtTime(0.0001, audio.currentTime);
        gain.gain.exponentialRampToValueAtTime(
            0.08,
            audio.currentTime + 0.01
        );

        gain.gain.exponentialRampToValueAtTime(
            0.0001,
            audio.currentTime + 0.12
        );

        oscillator.connect(gain);
        gain.connect(audio.destination);

        oscillator.start();
        oscillator.stop(audio.currentTime + 0.13);

    } catch (error) {
        console.log("Audio unavailable.");
    }
}


/* ---------------------------------------------------------
   Confetti
   --------------------------------------------------------- */

function launchConfetti(amount = 70) {

    const pieces = [
        "✦",
        "◆",
        "●",
        "✧",
        "★"
    ];

    for (let i = 0; i < amount; i++) {

        const piece = document.createElement("div");

        piece.className = "confetti";

        piece.textContent =
            pieces[Math.floor(Math.random() * pieces.length)];

        piece.style.left =
            Math.random() * 100 + "vw";

        piece.style.top =
            "-30px";

        piece.style.fontSize =
            (8 + Math.random() * 12) + "px";

        piece.style.animationDelay =
            Math.random() * 0.8 + "s";

        piece.style.opacity =
            0.5 + Math.random() * 0.5;

        document.body.appendChild(piece);

        setTimeout(() => {
            piece.remove();
        }, 3500);
    }
}


/* ---------------------------------------------------------
   Add sound to buttons
   --------------------------------------------------------- */

document.addEventListener("click", function (event) {

    const clickable =
        event.target.closest("a, button");

    if (!clickable) {
        return;
    }

    playClickSound();
});


/* ---------------------------------------------------------
   Celebration progress counter
   This is a visual celebration/project meter.
   It is NOT a bank account or financial balance.
   --------------------------------------------------------- */

function startCelebrationCounter() {

    const counter =
        document.getElementById("celebrationCounter");

    const progress =
        document.getElementById("progressFill");

    if (!counter || !progress) {
        return;
    }

    let amount = 0;

    const target = 1000000;

    const step = 5000;

    const interval = setInterval(function () {

        amount += step;

        if (amount >= target) {
            amount = target;
            clearInterval(interval);

            setTimeout(function () {
                launchConfetti(100);
            }, 400);
        }

        counter.textContent =
            "KES " + amount.toLocaleString("en-KE");

        const percentage =
            (amount / target) * 100;

        progress.style.width =
            percentage + "%";

    }, 100);
}


/* ---------------------------------------------------------
   Start counter when journey page loads
   --------------------------------------------------------- */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        startCelebrationCounter();

    }
);


/* ---------------------------------------------------------
   Final page YES button
   --------------------------------------------------------- */

const yesButton =
    document.getElementById("yesButton");

if (yesButton) {

    yesButton.addEventListener(
        "click",
        function () {

            playClickSound();

            launchConfetti(120);

            const message =
                document.getElementById("finalReveal");

            if (message) {

                message.textContent =
                    "You finally clicked it 😂❤️. Big Bro, this whole little website was simply a reminder that your journey is worth celebrating. Keep going — the best chapters are still ahead.";

                message.classList.add("revealed");

            }

        }
    );
}


/* ---------------------------------------------------------
   Final page NO button
   Playful movement — stays inside the screen.
   --------------------------------------------------------- */

const noButton =
    document.getElementById("noButton");

if (noButton) {

    noButton.addEventListener(
        "mouseenter",
        function () {

            moveNoButton();

        }
    );

    noButton.addEventListener(
        "click",
        function () {

            moveNoButton();

        }
    );
}


function moveNoButton() {

    const button =
        document.getElementById("noButton");

    if (!button) {
        return;
    }

    const container =
        document.querySelector(".final-buttons");

    if (!container) {
        return;
    }

    const containerWidth =
        container.clientWidth;

    const buttonWidth =
        button.offsetWidth;

    const maxMove =
        Math.max(
            0,
            containerWidth - buttonWidth - 10
        );

    const randomMove =
        Math.random() * maxMove;

    button.style.transform =
        "translateX(" +
        randomMove +
        "px)";

    button.textContent =
        "Try again 😄";
}