document.addEventListener("DOMContentLoaded", function () {

    /* Celebration fund animation */
    const fundAmount = document.getElementById("fundAmount");
    const progressFill = document.getElementById("progressFill");
    const progressText = document.getElementById("progressText");

    if (fundAmount) {

        let amount = 15000;
        const target = 1000000;

        function updateFund() {

            if (amount < target) {

                amount += 500;

                if (amount > target) {
                    amount = target;
                }

                fundAmount.textContent =
                    "KES " + amount.toLocaleString("en-KE");

                const percentage = (amount / target) * 100;

                if (progressFill) {
                    progressFill.style.width =
                        Math.min(percentage, 100) + "%";
                }

                if (progressText) {
                    progressText.textContent =
                        percentage.toFixed(1) + "%";
                }
            }
        }

        /*
         * Slow enough to look like an animated
         * website counter rather than jumping.
         */
        setInterval(updateFund, 1000);
    }


    /* YES surprise */

    const yesButton = document.getElementById("yesButton");
    const finalMessage = document.getElementById("finalMessage");

    if (yesButton && finalMessage) {

        yesButton.addEventListener("click", function () {

            finalMessage.classList.add("show");

            yesButton.textContent = "LET'S GO! 🚀";

            playCelebrationSound();

            finalMessage.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        });

    }


    /* NO button — gentle playful movement */

    const noButton = document.getElementById("noButton");

    if (noButton) {

        noButton.addEventListener("mouseenter", function () {

            const movement = 35;

            const x =
                (Math.random() * movement * 2) - movement;

            const y =
                (Math.random() * movement * 2) - movement;

            noButton.style.transform =
                "translate(" + x + "px, " + y + "px)";

        });

        noButton.addEventListener("click", function () {

            noButton.textContent = "Are you sure? 😂";

            noButton.style.transform = "translateY(-3px)";

        });

    }


    /* Small celebration sound using Web Audio */

    function playCelebrationSound() {

        try {

            const AudioContext =
                window.AudioContext ||
                window.webkitAudioContext;

            if (!AudioContext) {
                return;
            }

            const context = new AudioContext();

            const notes = [523.25, 659.25, 783.99];

            notes.forEach(function (frequency, index) {

                const oscillator =
                    context.createOscillator();

                const gain =
                    context.createGain();

                oscillator.frequency.value = frequency;
                oscillator.type = "sine";

                gain.gain.setValueAtTime(
                    0.0001,
                    context.currentTime
                );

                gain.gain.exponentialRampToValueAtTime(
                    0.12,
                    context.currentTime + 0.03 + index * 0.08
                );

                gain.gain.exponentialRampToValueAtTime(
                    0.0001,
                    context.currentTime + 0.5 + index * 0.08
                );

                oscillator.connect(gain);
                gain.connect(context.destination);

                oscillator.start(
                    context.currentTime + index * 0.08
                );

                oscillator.stop(
                    context.currentTime + 0.6 + index * 0.08
                );

            });

        } catch (error) {
            console.log("Sound unavailable.");
        }

    }

});