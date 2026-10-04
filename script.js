const $ = id => document.getElementById(id);

const colors = [
  "#ff68b5",
  "#ffd978",
  "#a98cff",
  "#ffffff",
  "#ffb4dc"
];

function burst(x, y, count = 55) {
  for (let i = 0; i < count; i++) {

    const p = document.createElement("i");
    p.className = "p";

    p.style.left = x + "px";
    p.style.top = y + "px";

    p.style.color =
      colors[Math.floor(Math.random() * colors.length)];

    const angle = Math.random() * Math.PI * 2;
    const distance = 70 + Math.random() * 190;

    p.style.setProperty(
      "--x",
      Math.cos(angle) * distance + "px"
    );

    p.style.setProperty(
      "--y",
      Math.sin(angle) * distance + "px"
    );

    $("particles").appendChild(p);

    setTimeout(() => p.remove(), 1600);
  }
}


function hearts() {

  for (let i = 0; i < 24; i++) {

    setTimeout(() => {

      const h = document.createElement("i");

      h.className = "heart";

      h.textContent =
        ["♡", "🤍", "💗", "✨"][
          Math.floor(Math.random() * 4)
        ];

      h.style.left =
        Math.random() * 100 + "%";

      h.style.setProperty(
        "--x",
        (Math.random() * 160 - 80) + "px"
      );

      h.style.color =
        colors[Math.floor(Math.random() * colors.length)];

      $("particles").appendChild(h);

      setTimeout(() => h.remove(), 5200);

    }, i * 100);
  }
}


function sparkleSound() {

  try {

    const AudioContext =
      window.AudioContext ||
      window.webkitAudioContext;

    const audio = new AudioContext();

    const notes = [
      523.25,
      659.25,
      783.99,
      1046.5
    ];

    notes.forEach((frequency, index) => {

      const oscillator =
        audio.createOscillator();

      const gain =
        audio.createGain();

      oscillator.type = "sine";

      oscillator.frequency.value =
        frequency;

      const time =
        audio.currentTime + index * 0.09;

      gain.gain.setValueAtTime(
        0.0001,
        time
      );

      gain.gain.exponentialRampToValueAtTime(
        0.05,
        time + 0.02
      );

      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        time + 0.25
      );

      oscillator.connect(gain);
      gain.connect(audio.destination);

      oscillator.start(time);
      oscillator.stop(time + 0.28);

    });

  } catch (error) {

    console.log("Audio unavailable");

  }
}


function showToast() {

  const toast =
    document.getElementById("toast");

  if (!toast) return;

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 1800);
}


/* START SCREEN */

const startButton =
  document.getElementById("startBtn");

if (startButton) {

  startButton.onclick = () => {

    document
      .querySelector(".intro")
      .classList.add("hidden");

    setTimeout(() => {

      document
        .querySelector(".gift-screen")
        .classList.remove("hidden");

    }, 650);

    showToast();

  };

}


/* GIFT */

const gift =
  document.getElementById("gift");

let opened = false;

if (gift) {

  gift.onclick = () => {

    if (opened) return;

    opened = true;

    gift.classList.add("open");

    sparkleSound();

    const rect =
      gift.getBoundingClientRect();

    burst(
      rect.left + rect.width / 2,
      rect.top + rect.height / 2,
      80
    );

    setTimeout(() => {

      document
        .querySelector(".gift-screen")
        .classList.add("hidden");

      document
        .querySelector(".birthday")
        .classList.remove("hidden");

      setTimeout(() => {

        burst(
          window.innerWidth / 2,
          window.innerHeight * 0.35,
          100
        );

        hearts();

        showToast();

      }, 500);

    }, 1250);

  };

}


/* CELEBRATE AGAIN */

const againButton =
  document.getElementById("againBtn");

if (againButton) {

  againButton.onclick = () => {

    for (let i = 0; i < 4; i++) {

      setTimeout(() => {

        burst(
          80 + Math.random() *
          (window.innerWidth - 160),

          80 + Math.random() *
          (window.innerHeight * 0.45),

          65
        );

      }, i * 250);

    }

    hearts();

    sparkleSound();

    showToast();

  };

}


/* EXTRA BACKGROUND PARTICLES */

setInterval(() => {

  if (Math.random() > 0.45) return;

  const p =
    document.createElement("i");

  p.className = "p";

  p.style.left =
    Math.random() * window.innerWidth + "px";

  p.style.top =
    Math.random() * window.innerHeight + "px";

  p.style.color =
    colors[Math.floor(Math.random() * colors.length)];

  p.style.setProperty(
    "--x",
    (Math.random() * 60 - 30) + "px"
  );

  p.style.setProperty(
    "--y",
    (Math.random() * 60 - 30) + "px"
  );

  const particles =
    document.getElementById("particles");

  if (particles) {

    particles.appendChild(p);

    setTimeout(() => p.remove(), 1600);

  }

}, 500);
