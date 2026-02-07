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
const yesBtn = document.querySelector(".yes-btn");
const noBtn = document.querySelector(".no-btn");
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
    if (date === 14) return "valentine";

    return null;
}

/**********************
 * MANUAL TEST OVERRIDE
 **********************/
// Change this to "sunflower", "propose", "valentine" for testing
const MANUAL_DAY = null; // set to null for auto-detect

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

noBtn.addEventListener("click", () => {
    yesScale += 1.2;

    yesBtn.style.position = "fixed";
    yesBtn.style.top = "50%";
    yesBtn.style.left = "50%";
    yesBtn.style.transform = `translate(-50%, -50%) scale(${yesScale})`;
});

/**********************
 * YES BUTTON — THE MOMENT
 **********************/
yesBtn.addEventListener("click", () => {
    buttons.style.display = "none";
    title.style.display = "none";

    // Reveal ring ONLY if configured
    if (dayConfig.onYes?.cat) {
        setTimeout(() => {
            catImg.src = dayConfig.onYes.cat;
            catImg.classList.add("ring-cat");
            if (dayConfig.onYes.cat !== "cat_heart.gif") {
                catImg.classList.remove("no-shrink");
            }

            if (dayConfig.onYes.ringHint) {
                catImg.classList.add("ring-hint");
            }
        }, 400);
    }

    letterWindow.classList.add("final");

    finalText.style.display = "block";
    finalText.style.opacity = 0;

    setTimeout(() => {
        finalText.style.opacity = 1;
    }, 100);
});

/**********************
 * COUNTDOWN (OPTIONAL)
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
