/* =========================================
   PROFESSOR MATUNDURA WEBSITE
   BUILT BY CALVIN
========================================= */


/* =========================================
   NAVIGATION
========================================= */

function showSection(sectionId) {

    const sections = document.querySelectorAll(".page-section");

    sections.forEach(section => {
        section.classList.remove("active");
    });

    const target = document.getElementById(sectionId);

    if (target) {
        target.classList.add("active");
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    playClick();
}


/* =========================================
   MESSAGE BUTTON
========================================= */

function openMessage() {

    playSuccess();

    setTimeout(() => {
        showSection("message");
    }, 350);
}


/* =========================================
   SIMPLE BROWSER SOUND
   No external audio files required.
========================================= */

function playTone(frequency = 520, duration = 0.08) {

    try {

        const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;

        if (!AudioContext) return;

        const context = new AudioContext();

        const oscillator =
            context.createOscillator();

        const gain =
            context.createGain();

        oscillator.frequency.value = frequency;
        oscillator.type = "sine";

        gain.gain.setValueAtTime(
            0.06,
            context.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            context.currentTime + duration
        );

        oscillator.connect(gain);
        gain.connect(context.destination);

        oscillator.start();

        oscillator.stop(
            context.currentTime + duration
        );

    } catch (error) {

        console.log("Audio unavailable.");

    }
}


function playClick() {
    playTone(550, 0.06);
}


function playSuccess() {

    playTone(523, 0.1);

    setTimeout(() => {
        playTone(659, 0.1);
    }, 120);

    setTimeout(() => {
        playTone(784, 0.16);
    }, 240);
}


/* =========================================
   DEMO SUPPORT / CONTRIBUTION WALL
========================================= */

/*
   IMPORTANT:
   These are clearly fictional DEMO entries.
   They are NOT real payments.
*/

const demoContributors = [

    ["Calvin", "07****18", 15000],
    ["Kevin", "07****42", 10000],
    ["Daniel", "07****83", 13500],
    ["Brian", "07****29", 12000],
    ["Alex", "07****69", 15000],
    ["Martin", "07****47", 8000],
    ["James", "07****61", 17500],
    ["Victor", "07****35", 9000],
    ["Dennis", "07****72", 11000],
    ["Sam", "07****54", 12500],
    ["Mark", "07****31", 10000],
    ["Chris", "07****88", 15000],
    ["Ian", "07****20", 7500],
    ["Steve", "07****46", 14000],
    ["Mike", "07****91", 9500],
    ["Eric", "07****62", 13000],
    ["David", "07****74", 10000],
    ["Tony", "07****56", 15500],
    ["Peter", "07****39", 12000],
    ["John", "07****27", 9000]
];


let currentAmount = 0;

let targetAmount =
    demoContributors.reduce(
        (total, person) => total + person[2],
        0
    );


/* =========================================
   FORMAT MONEY
========================================= */

function formatKES(number) {

    return "KES " +
        Math.floor(number)
            .toLocaleString("en-KE");

}


/* =========================================
   CREATE CONTRIBUTOR LIST
========================================= */

function buildContributorList() {

    const list =
        document.getElementById(
            "contributorList"
        );

    if (!list) return;

    list.innerHTML = "";

    demoContributors
        .slice(0, 8)
        .forEach(person => {

            const row =
                document.createElement("div");

            row.className =
                "contributor";

            row.innerHTML = `

                <span class="contributor-name">
                    ${person[0]} • ${person[1]}
                </span>

                <span class="contributor-amount">
                    KES ${person[2].toLocaleString("en-KE")}
                </span>

            `;

            list.appendChild(row);

        });
}


/* =========================================
   ANIMATED TOTAL
========================================= */

function animateFundTotal() {

    const amount =
        document.getElementById(
            "fundAmount"
        );

    const progress =
        document.getElementById(
            "progressBar"
        );

    if (!amount || !progress) return;


    /*
       Starts from zero and smoothly counts
       toward the demo total.
    */

    const duration = 6500;

    const startTime = performance.now();


    function update(currentTime) {

        const elapsed =
            currentTime - startTime;

        const percentage =
            Math.min(
                elapsed / duration,
                1
            );

        /*
           Smooth easing
        */

        const eased =
            1 - Math.pow(
                1 - percentage,
                3
            );

        currentAmount =
            targetAmount * eased;

        amount.textContent =
            formatKES(currentAmount);

        progress.style.width =
            Math.min(
                percentage * 100,
                100
            ) + "%";


        if (percentage < 1) {

            requestAnimationFrame(update);

        } else {

            /*
               Restart slowly so the dashboard
               remains visually alive.
            */

            setTimeout(() => {

                currentAmount = 0;

                animateFundTotal();

            }, 2500);

        }

    }

    requestAnimationFrame(update);
}


/* =========================================
   PLAYFUL NO BUTTON
========================================= */

let noAttempts = 0;


function moveNoButton() {

    noAttempts++;

    playTone(300, 0.1);

    const button =
        document.getElementById("noBtn");

    const hint =
        document.getElementById(
            "questionHint"
        );

    if (!button) return;


    const messages = [

        "Are you sure? 😂",

        "Think again, Professor 😭",

        "That button seems suspicious...",

        "Nice try 😂🔥",

        "The website disagrees with you.",

        "One more chance? 👀",

        "You really want to say NO? 😂"

    ];


    hint.textContent =
        messages[
            Math.min(
                noAttempts - 1,
                messages.length - 1
            )
        ];


    /*
       After a few attempts, turn it into
       a playful moving button.
    */

    if (noAttempts >= 2) {

        button.style.position =
            "fixed";

        const padding = 70;

        const maxX =
            window.innerWidth -
            button.offsetWidth -
            padding;

        const maxY =
            window.innerHeight -
            button.offsetHeight -
            padding;

        const randomX =
            Math.max(
                20,
                Math.random() * maxX
            );

        const randomY =
            Math.max(
                20,
                Math.random() * maxY
            );

        button.style.left =
            randomX + "px";

        button.style.top =
            randomY + "px";

        button.style.zIndex = "9999";

    }

}


/* =========================================
   YES BUTTON
========================================= */

function chooseYes() {

    playSuccess();

    const hint =
        document.getElementById(
            "questionHint"
        );

    if (hint) {

        hint.textContent =
            "That's the answer I was waiting for! 🔥";

    }


    setTimeout(() => {

        showSection("surprise");

    }, 800);

}


/* =========================================
   BUTTON HOVER SOUND
========================================= */

document.addEventListener(
    "mouseover",
    function(event) {

        if (
            event.target.matches(
                "button"
            )
        ) {

            playTone(700, 0.025);

        }

    }
);


/* =========================================
   INITIALIZE
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        buildContributorList();

        setTimeout(() => {
            animateFundTotal();
        }, 700);

    }
);