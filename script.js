// Elements
const envelope = document.getElementById('envelope-container');
const letter = document.getElementById('letter-container');
const noBtn = document.querySelector('no-btn');
const yesBtn = document.querySelector('.btn[alt="yes"]');

const title = document.getElementById('letter-title');
const catImg = document.getElementById('letter-cat');
const buttons = document.getElementById('letter-buttons');
const finalText = document.getElementById('final-text');

// Open envelope on click

envelope.addEventListener('click', () => {
    envelope.style.display = "none";
    letter.style.display = "flex";

    setTimeout(() => {
        document.querySelector('.letter-window').classList.add('open');
    }, 50);
});

// Logic to move the NO btn

noBtn.addEventListener('mouseenter', () => {
    const min = 200;
    const max = 200;

    const disatnce = Math.floor(Math.random() * (max - min)) + min;
    const angle = Math.floor(Math.random() * Math.PI * 2);

    const moveX = Math.cos(angle) * disatnce;
    const moveY = Math.sin(angle) * disatnce;

    noBtn.style.transition = "transform 0.3s ease";
    noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

// On YES click

yesBtn.addEventListener('click', () => {
    title.textContent = "Yippee! See you soon! 💕";
    catImg.src = "cat_dance.gif";
    document.querySelector('.letter-window').classList.add('final');
    buttons.style.display = "none";
    finalText.style.display = "block";
});