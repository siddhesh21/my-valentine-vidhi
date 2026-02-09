/**********************
 * ELEMENT REFERENCES
 **********************/
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const envelopeText = document.getElementById("envelope-text");

const title = document.getElementById("letter-title");
const subtitle = document.querySelector(".day-subtitle");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const yesBtn = document.querySelector("#letter-buttons .yes-btn");
const noBtn = document.querySelector("#letter-buttons .no-btn");
const chocolateButtons = document.getElementById("chocolate-buttons");
const chocoYesBtn = document.getElementById("choco-yes");
const chocoNoBtn = document.getElementById("choco-no");
const teddyButtons = document.getElementById("teddy-buttons");
const teddyYesBtn = document.getElementById("teddy-yes");
const teddyNoBtn = document.getElementById("teddy-no");
const finalText = document.getElementById("final-text");
const counterText = document.getElementById("counter-text");
const letterWindow = document.querySelector(".letter-window");

/**********************
 * DAY CONFIGURATION
 **********************/
const DAY_CONFIG = {
    sunflower: {
        envelopeText: "🌻 Sunflower Day 🌻",
        // title: "Not a Rose... But Something That Feels Like Us 🌻",
        subtitle: "Some things grow better their own way.",
        cat: "cat_sunflower.gif",
        bodyClass: "sunflower-day",
        ringHint: false,
        onYes: {
            cat: "cat_ring.gif",
            ringHint: true
        },
        finalText: `
            <strong>Sunflower Day 🌻</strong><br><br>
            Just like sunflowers turn toward the sun,<br>
            I keep finding my way back to you.
        `
    },

    propose: {
        envelopeText: "💍 Propose Day 💍",
        title: "This Isn't a Question. It's a Promise.",
        subtitle: "Not All Rings Close a Circle. Some Let It Flow.",
        cat: "cat_heart.gif",
        bodyClass: "propose-day",
        ringHint: false,

        onYes: {
            cat: "cat_ring.gif",
            ringHint: true
        },

        finalText: `
            <strong>Propose Day</strong><br>
            Love doesn't pause when we're apart.
            There's something coming for you, alongwith me.<br>
            Not to bind us, but to continue our flow,<br>
            without hesitation.
        `
    },


    chocolate: {
        envelopeText: "🍫 A Little Comfort Day 🍫",
        title: "This One's Just for You.",
        subtitle: "Things I'd bring you without being asked.",
        bodyClass: "chocolate-day",

        steps: [
            {
                text: "When cramps hit and the world feels too loud…",
                offer: "Biscoff, warmth, and zero expectations.",
                cat: "cat_biscoff.gif"
            },
            {
                text: "When you want something deep and grounding…",
                offer: "70% dark chocolate. Slow bites.",
                cat: "cat_dark_chocolate.gif"
            },
            {
                text: "When you're craving something familiar and easy…",
                offer: "Those Nutella biscuits you love.",
                cat: "cat_nutella.gif"
            },
            {
                text: "When your head feels heavy and thoughts won't slow…",
                offer: "Ice peach tea. Cold glass. Quiet moments.",
                cat: "cat_peach_tea.gif"
            },
            {
                text: "When you want something fresh and gentle…",
                offer: "Strawberries & blueberries, just washed.",
                cat: "cat_berries.gif"
            },
            {
                text: "When the day deserves a proper pause…",
                offer: "Tiramisu. Soft, rich, unhurried.",
                cat: "cat_tiramisu.gif"
            },
            {
                text: "When you're in the mood for something indulgent…",
                offer: "Strawberry cheesecake, just for you.",
                cat: "cat_cheesecake.gif"
            },
            {
                text: "When care looks like thoughtfulness…",
                offer: "Figs and persimmon, picked just right.",
                cat: "cat_fruit_basket.gif"
            },
            {
                text: "And when the night slows down…",
                offer: "A Cosmo. With me. No rush.",
                cat: "cat_cosmo.gif"
            }
        ],

        finalText: `
        <strong>Chocolate Day</strong><br>
        I may not always be there instantly,<br>
        but I already know what helps.<br>
        One day soon, I'll bring all of this myself.<br>
        And stay.
    `
    },
    teddy: {
        envelopeText: "🧸 Soft Things Day 🧸",
        title: "Some Things Are Meant to Be Held.",
        subtitle: "Not rushed. Not loud. Just yours.",
        cat: "cat_husky.gif",
        bodyClass: "teddy-day",

        steps: [
            {
                text: "When you need something soft and familiar…",
                offer: "A little white rabbit, waiting for you.",
                cat: "cat_rabbit.gif"
            },
            {
                text: "So a part of me stays with you…",
                offer: "A perfume I chose just for you.",
                cat: "cat_perfume.gif"
            },
            {
                text: "Something I made, slowly.",
                offer: "A small sunset, painted for you.",
                cat: "cat_easel.gif"
            },
            {
                text: "For days you disappear into stories.",
                offer: "Books, anime, and quiet corners.",
                cat: "cat_books.gif"
            },
            {
                text: "For tired skin and softer nights.",
                offer: "Strawberry body butter & warmth.",
                cat: "cat_skincare.gif"
            },
            {
                text: "For carrying little things that matter.",
                offer: "Something Coach. Something you.",
                cat: "cat_bag.gif"
            },
            {
                text: "For luck. For us.",
                offer: "A four-leaf clover, always close.",
                cat: "cat_clover.gif"
            },
            {
                text: "For tense days and gentle care.",
                offer: "Flowers, comfort, and presence.",
                cat: "cat_flowers.gif"
            },
            {
                text: "And for the part of you that loves the sky…",
                offer: "Something is coming. Just for you.",
                cat: "cat_sky.gif"
            }
        ],

        ringHint: false,
        onYes: {
            cat: "cat_husky.gif",
            ringHint: true
        },

        finalText: `
        <strong>Soft Things Day</strong><br><br>
        I don't just love you. I look after you.<br>
        And I always will.
    `
    },
    valentine: {
        envelopeText: "❤️ Valentine's Day ❤️",
        title: "I Choose You. Still.",
        subtitle: "Today, tomorrow, and every quiet day after.",
        cat: "cat_heart.gif",
        bodyClass: "valentine-day",
        ringHint: false,
        finalText: `
            <strong>14th March 2026 · Valentine's Evening</strong><br><br>
            Elegant white top.<br>
            Long, sleek black skirt.
        `
    }
};

/**********************
 * DAY DETECTION
 **********************/
function getValentineDay() {
    const istNow = new Date(
        new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    );
    const month = istNow.getMonth() + 1;
    const date = istNow.getDate();

    if (month !== 2) return null;

    if (date === 7) return "sunflower";
    if (date === 8) return "propose";
    if (date === 9) return "chocolate";
    if (date === 10) return "teddy";
    if (date === 11) return "promise";
    if (date === 12) return "Hug";
    if (date === 13) return "kiss";
    if (date === 14) return "valentine";

    return null;
}

/**********************
 * MANUAL TEST OVERRIDE
 **********************/
// Change this to "sunflower", "propose", "valentine" for testing
const MANUAL_DAY = null; // setting it to null for auto-detect

const activeDay =
    MANUAL_DAY || getValentineDay() || "sunflower";

const dayConfig = DAY_CONFIG[activeDay];

/**********************
 * APPLY DAY CONFIG
 **********************/
document.body.classList.add(dayConfig.bodyClass);

envelopeText.textContent = dayConfig.envelopeText;
title.textContent = dayConfig.title;
subtitle.textContent = dayConfig.subtitle;

catImg.src = dayConfig.cat;
catImg.classList.remove("ring-cat", "ring-hint", "no-shrink");
if (dayConfig.cat === "cat_heart.gif") {
    catImg.classList.add("no-shrink");
}

finalText.innerHTML = dayConfig.finalText;
finalText.style.display = "none";

/**********************
 * ENVELOPE INTERACTION
 **********************/
envelope.addEventListener("click", () => {
    envelope.style.display = "none";
    letter.style.display = "flex";

    setTimeout(() => {
        letterWindow.classList.add("open");
    }, 50);
});

/**********************
 * NO BUTTON LOGIC
 **********************/
let yesScale = 1;
yesBtn.style.transformOrigin = "center center";
yesBtn.style.transition = "transform 0.3s ease";
let stepIndex = 0;

noBtn.addEventListener("click", () => {
    yesScale += 1.2;

    yesBtn.style.position = "fixed";
    yesBtn.style.top = "50%";
    yesBtn.style.left = "50%";
    yesBtn.style.transform = `translate(-50%, -50%) scale(${yesScale})`;
});

/**********************
 * INITIALIZE DAY
 **********************/
// function initializeDay() {
//     if (dayConfig.steps) {
//         loadChocolateStep(0);
//         yesBtn.alt = "Yes";
//         noBtn.alt = "No";
//     } else {
//         title.textContent = dayConfig.title;
//         subtitle.textContent = dayConfig.subtitle;
//         catImg.src = dayConfig.cat;
//         finalText.innerHTML = dayConfig.finalText;
//     }
// }

function initializeDay() {
    if (dayConfig.steps) {
        loadChocolateStep(0);
        buttons.style.display = "none";
        chocolateButtons.style.display = activeDay === "chocolate" ? "flex" : "none";
        teddyButtons.style.display = activeDay === "teddy" ? "flex" : "none";
    } else {
        title.textContent = dayConfig.title;
        subtitle.textContent = dayConfig.subtitle;
        catImg.src = dayConfig.cat;
        finalText.innerHTML = dayConfig.finalText;
        buttons.style.display = "flex";
        chocolateButtons.style.display = "none";
        teddyButtons.style.display = "none";
    }
}

/**********************
 * CHOCOLATE DAY STEPS
 **********************/
// function loadChocolateStep(index) {
//     const step = dayConfig.steps[index];

//     title.textContent = step.text;
//     subtitle.textContent = step.offer;
//     catImg.src = step.cat;
// }

function loadChocolateStep(index) {
    const step = dayConfig.steps[index];

    title.textContent = step.text;
    subtitle.textContent = step.offer;
    catImg.src = step.cat;

    renderProgress(index, dayConfig.steps.length);
}

/**********************
 * CHOCOLATE DAY BUTTON LABELS
 **********************/
function setChocolateButtonLabels() {
    yesBtn.insertAdjacentHTML(
        "afterend",
        `<div class="btn-label">That sounds perfect 🫶</div>`
    );

    noBtn.insertAdjacentHTML(
        "afterend",
        `<div class="btn-label">Maybe later</div>`
    );
}

/**********************
 * BUTTON INTERACTIONS
 **********************/
yesBtn.addEventListener("click", () => handleChoice(true));
noBtn.addEventListener("click", () => handleChoice(false));
chocoYesBtn.addEventListener("click", () => handleChoice(true));
chocoNoBtn.addEventListener("click", () => handleChoice(false));
teddyYesBtn.addEventListener("click", () => handleChoice(true));
teddyNoBtn.addEventListener("click", () => handleChoice(false));

function handleChoice(isYes) {

    // Chocolate Day step flow
    if (dayConfig.steps) {
        stepIndex++;

        if (stepIndex < dayConfig.steps.length) {
            loadChocolateStep(stepIndex);
            return;
        }
        // End of steps
        buttons.style.display = "none";
        chocolateButtons.style.display = "none";
        teddyButtons.style.display = "none";
        title.style.display = "none";
        subtitle.style.display = "none";

        if (dayConfig.onYes?.cat) {
            catImg.src = dayConfig.onYes.cat;
            catImg.classList.add("ring-cat");
            if (dayConfig.onYes.ringHint) {
                catImg.classList.add("ring-hint");
            }
        }

        finalText.innerHTML = dayConfig.finalText;
        finalText.style.display = "block";
        progressIndicator.style.display = "none";
        return;
    }

    // Propose Day YES logic
    if (isYes && dayConfig.onYes) {
        catImg.src = dayConfig.onYes.cat;
        catImg.classList.add("ring-cat");
        if (dayConfig.onYes.ringHint) {
            catImg.classList.add("ring-hint");
        }
    }

    buttons.style.display = "none";
    chocolateButtons.style.display = "none";
    teddyButtons.style.display = "none";
    title.style.display = "none";
    finalText.innerHTML = dayConfig.finalText;
    finalText.style.display = "block";
}

/**********************
 * COUNTDOWN
 **********************/
const meetDate = new Date("2026-03-14T00:00:00+05:30").getTime();

setInterval(() => {
    const now = Date.now();
    const diff = meetDate - now;

    if (diff <= 0) {
        counterText.textContent = "Today 🤍";
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    counterText.textContent = `Until I see you: ${days} days`;
}, 1000);

/**********************
 * PROGRESS INDICATOR
 **********************/

const progressIndicator = document.getElementById("progress-indicator");

function renderProgress(currentIndex, total) {
    progressIndicator.innerHTML = "";

    for (let i = 0; i < total; i++) {
        const dot = document.createElement("span");
        dot.textContent = "●";
        dot.classList.add("progress-dot");

        if (i <= currentIndex) {
            dot.classList.add("active");
        }

        progressIndicator.appendChild(dot);
    }
}

initializeDay();
