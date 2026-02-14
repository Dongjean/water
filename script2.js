const paragraph = `Dear Claire,

Happy Valentine's Day babygirl! Even now, I cant believe how lucky I am to be able to call you mine. Honestly, if I had to do it all over again, It'd always be you. We may have our ups and downs, and we may not be the most perfect couple, but I love you, in all of your perfect imperfections that make you human, my human.

Really dont know how you do it, but your existence just reels me in. You're my first thought in the morning, and my last thought I cherish to bed. You're the one who gives me pep talks in my head before exams, and you're the one who gives me strength to push through hard times. You're my girl, and I'm yours, and no matter what the world throws at us, I'll always stand by you.

If I'm gonna be really honest with you, I fell in love with you at first sight, and fell in love again when we talked (drunk HAHHA). I'm falling deeper in love with you every day and I want to fall in love even deeper. I'll be the bigger man and say I loved you first, and I'll love you always <3

Thank you for loving me. Thank you for reminding me to drink water. Thank you for always showing up even when things are hard and stressful, and I pledge to return this lifelong debt that I'm not sure how I can repay. I love you truly, and cheers to 1000 more years of love!

With love,
Doji <3

P.S.
anyway...`;

// const paragraph = "hello bruh wtf";

const letterCont = document.getElementsByClassName("letterCont");
const buttonCont = document.getElementsByClassName("buttonCont");
const openMailButton = document.getElementsByClassName("mailButton");
const mailNotif = document.getElementById("mailNotif");

const requestText = document.getElementsByClassName("request");

const letterContent = letterCont[0].children[0];

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function autoType() {

  // Turn on the cursor
  // console.log(letterCont[0].children[0].children[1]);
  letterCont[0].children[0].children[1].innerHTML = '|';
  await delay(1);
  for (let i = 0; i<paragraph.length; i++) {
    const currChar = paragraph[i];
    if (currChar == ' ') {
      
      // Only do the random pauses between words
      const isPause = Math.floor(Math.random() * 10);
      if (isPause > 9) {
        await delay(2000);
      }
    }

    const typingSpeed = Math.floor(Math.random() * 10) * 10 + 50;
    await delay(typingSpeed);
    
    letterCont[0].children[0].children[0].innerHTML += currChar;
  }

  // After we are done, start the request
  askher();
}

function askher() {
  requestText[0].classList.add("ask");
}

function openOptions() {
  buttonCont[0].classList.add('ask');

  const noBox = buttonCont[0].children[1];
  document.addEventListener("mousemove", (e) => {

    // Get box coords
    const rect = noBox.getBoundingClientRect();
    const boxX = rect.left + rect.width / 2;
    const boxY = rect.top + rect.height / 2;

    // Get distance of mouse from box
    const dx = e.clientX - boxX;
    const dy = e.clientY - boxY;
    const distance = Math.sqrt(dx*dx + dy*dy);

    // How far it moves visually
    const repelDistance = 80;

    if (distance < 150) {
      const angle = Math.atan2(dy, dx);
      const moveX = -Math.cos(angle) * repelDistance;
      const moveY = -Math.sin(angle) * repelDistance;

      noBox.style.transform = `translate(${moveX}px, ${moveY}px)`;
    } else {
      noBox.style.transform = `translate(0, 0)`; // Return to normal
    }
  });
}

// Add in animation for yes 존나 뿅뿅
function yes() {

  const heartCont = document.getElementById("heartCont");

  document.body.style.backgroundColor = "#FF7782";

  for (let j = 0; j < 500; j++) {
    const heart = document.createElement("img");
    heart.src = "P03fav.png";
    heart.classList.add("heart");

    const angle = Math.random() * 2 * Math.PI;
    const distance = 1000 + Math.random() * 200;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    const duration = 1000 + Math.random() * 1000;

    heart.style.transform = `translate(0,0)`;
    heart.style.opacity = 1;

    heartCont.appendChild(heart);
    // Hearts are added

    // Now animate yayz
    heart.animate([
      { transform: `translate(0,0) scale(1)`, opacity: 1 },
      { transform: `translate(${x}px, ${-y}px) scale(0.5)`, opacity: 0 }
    ], {
      duration: duration,
      easing: "cubic-bezier(.17,.67,.83,.67)"
    });

    setTimeout(() => {
      heart.remove();
    }, duration);

  }
  //setInterval(emojiwaterfall(), 200);
}

function emojiwaterfall() {
  const emojils = ["✨", "💖", "🔥", "🌸", "⭐", "💫"];
  const emoji = document.createElement("div");
  emoji.classList.add("emoji");

  emoji.textContent = emojils[Math.floor(Math.random() * emojils.length)];

  emoji.style.left = Math.random() * 100 + "vw";
  emoji.style.fontSize = Math.random() * 20 + 15 + "px";
  emoji.style.animationDuration = Math.random() * 3 + 3 + "s";

  heartCont.appendChild(emoji);

  setTimeout(() => {
    emoji.remove();
  }, 6000);
}

requestText[0].addEventListener('transitionend', () => {
  openOptions();
});

openMailButton[0].addEventListener('click', () => {
  openMailButton[0].classList.add("animate");
  mailNotif.remove();
});

openMailButton[0].addEventListener('transitionend', () => {
  openMailButton[0].remove();
  autoType();
})

const yesButton = buttonCont[0].children[0];
yesButton.addEventListener('click', () => {
  yes();

})

