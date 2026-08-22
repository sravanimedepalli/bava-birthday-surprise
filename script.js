/* ==========================================================================
   BAVA'S BIRTHDAY SURPRISE - MAIN JAVASCRIPT LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------------------------------------------------
  // 1. DATA CONFIGURATION & CONSTANTS
  // ------------------------------------------------------------------------
  const LETTER_PARAGRAPHS = [
    "Happy Birthday to the person who became such a beautiful part of my life. ❤️",
    "You are my comfort, my happiness, my safe place, and one of the most precious people in my world.",
    "I may not always have the perfect words to express what you mean to me, but I hope you always remember this:",
    "I’m grateful for you — for every memory, every smile, every little moment, and for simply being you.",
    "I wish you a life filled with everything your heart desires. And selfishly, I hope I get to be beside you for as many of those moments as possible. 🫶🏻",
    "Happy Birthday, Bava ❤️✨"
  ];

  const JOURNAL_SLIDES = [
    {
      img: "Mine/1.jpeg",
      quote: "From the very first moment, you brought a warmth to my life I never knew I was missing. ❤️",
      duration: 3000 // 0s - 3s (3 sec)
    },
    {
      img: "Mine/2.jpeg",
      quote: "With you, even the simplest, quietest moments become my absolute favorite memories. ✨",
      duration: 4000 // 3s - 7s (4 sec)
    },
    {
      img: "Mine/3.jpeg",
      quote: "Your laugh is my comfort sound, and your smile is my favorite sight in the whole world. 🌸",
      duration: 5000 // 7s - 12s (5 sec)
    },
    {
      img: "Mine/4.jpeg",
      quote: "Thank you for being my safe space, my biggest supporter, and my best friend. 🫶🏻",
      duration: 5000 // 12s - 17s (5 sec)
    },
    {
      img: "Mine/5.jpeg",
      quote: "In a world full of noise, being with you feels like coming home. 💖",
      duration: 5000 // 17s - 22s (5 sec)
    },
    {
      img: "Mine/6.jpeg",
      quote: "Every day with you is proof that love can be soft, gentle, and endlessly beautiful. 🦋",
      duration: 5000 // 22s - 27s (5 sec)
    },
    {
      img: "Mine/7.jpeg",
      quote: "I love the way we talk, the way we share, and the effortless way you hold my heart. 💌",
      duration: 5000 // 27s - 32s (5 sec)
    },
    {
      img: "Mine/8.jpeg",
      quote: "You are my favorite chapter, my happiest story, and my forever favorite person. ❤️✨",
      duration: 5000 // 32s - 37s (5 sec)
    }
  ];

  const SECRET_PASSWORD = "2328";
  const TOTAL_JOURNAL_TIME = 37000; // 37 seconds

  // State Variables
  let currentHeartTaps = 0;
  let journalTimerId = null;
  let journalProgressInterval = null;
  let journalStartTime = 0;
  let currentSlideIndex = 0;
  const audioEl = document.getElementById('journal-audio');

  // ------------------------------------------------------------------------
  // 2. AMBIENT CANVAS PARTICLES (Butterflies, Floating Hearts, Sparkles)
  // ------------------------------------------------------------------------
  const canvas = document.getElementById('ambient-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class Particle {
    constructor(type) {
      this.reset(type);
    }

    reset(type) {
      this.x = Math.random() * canvas.width;
      this.y = canvas.height + Math.random() * 100;
      this.type = type || (Math.random() < 0.2 ? 'butterfly' : Math.random() < 0.6 ? 'heart' : 'sparkle');
      this.size = this.type === 'butterfly' ? 14 + Math.random() * 10 : this.type === 'heart' ? 10 + Math.random() * 8 : 4 + Math.random() * 5;
      this.speedY = 0.4 + Math.random() * 0.8;
      this.speedX = Math.sin(Math.random() * Math.PI) * 0.5;
      this.opacity = 0.2 + Math.random() * 0.6;
      this.wingAngle = 0;
      this.wingSpeed = 0.08 + Math.random() * 0.05;
      this.hue = Math.random() < 0.5 ? 340 : 350; // blush pinks
    }

    update() {
      this.y -= this.speedY;
      this.x += Math.sin(this.y * 0.015) * 0.6 + this.speedX;
      this.wingAngle += this.wingSpeed;

      if (this.y < -30) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;

      if (this.type === 'heart') {
        ctx.fillStyle = `hsl(${this.hue}, 80%, 75%)`;
        ctx.beginPath();
        const topCurveHeight = this.size * 0.3;
        ctx.moveTo(this.x, this.y + topCurveHeight);
        // top left curve
        ctx.bezierCurveTo(
          this.x, this.y, 
          this.x - this.size / 2, this.y, 
          this.x - this.size / 2, this.y + topCurveHeight
        );
        // bottom left curve
        ctx.bezierCurveTo(
          this.x - this.size / 2, this.y + (this.size + topCurveHeight) / 2, 
          this.x, this.y + (this.size + topCurveHeight) / 1.4, 
          this.x, this.y + this.size
        );
        // bottom right curve
        ctx.bezierCurveTo(
          this.x, this.y + (this.size + topCurveHeight) / 1.4, 
          this.x + this.size / 2, this.y + (this.size + topCurveHeight) / 2, 
          this.x + this.size / 2, this.y + topCurveHeight
        );
        // top right curve
        ctx.bezierCurveTo(
          this.x + this.size / 2, this.y, 
          this.x, this.y, 
          this.x, this.y + topCurveHeight
        );
        ctx.fill();
      } else if (this.type === 'butterfly') {
        // Butterfly Fluttering Wings
        ctx.translate(this.x, this.y);
        ctx.fillStyle = `hsl(335, 75%, 82%)`;
        
        const wingScale = Math.sin(this.wingAngle);
        
        // Left wing
        ctx.beginPath();
        ctx.ellipse(-this.size * 0.4, 0, this.size * 0.6 * Math.abs(wingScale), this.size * 0.4, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();
        
        // Right wing
        ctx.beginPath();
        ctx.ellipse(this.size * 0.4, 0, this.size * 0.6 * Math.abs(wingScale), this.size * 0.4, -Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();
        
        // Body
        ctx.fillStyle = '#704752';
        ctx.beginPath();
        ctx.arc(0, 0, 1.5, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Sparkle
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  // Initialize Particle Pool
  for (let i = 0; i < 35; i++) {
    particles.push(new Particle());
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // Burst Particles Function for Interactions
  function spawnBurst(x, y, count = 15) {
    for (let i = 0; i < count; i++) {
      const p = new Particle(Math.random() < 0.7 ? 'heart' : 'sparkle');
      p.x = x;
      p.y = y;
      p.speedY = (Math.random() - 0.5) * 4;
      p.speedX = (Math.random() - 0.5) * 4;
      p.opacity = 0.9;
      particles.push(p);
    }
  }

  // ------------------------------------------------------------------------
  // 3. SECTION SWITCHING LOGIC (Cinematic Smooth Transitions)
  // ------------------------------------------------------------------------
  function switchSection(fromId, toId, delayMs = 400) {
    const currentSec = document.getElementById(fromId);
    const nextSec = document.getElementById(toId);

    if (currentSec) {
      currentSec.classList.add('fade-out');
      setTimeout(() => {
        currentSec.classList.add('hidden');
        currentSec.classList.remove('fade-out', 'active');

        if (nextSec) {
          nextSec.classList.remove('hidden');
          // Force layout reflow
          void nextSec.offsetWidth;
          nextSec.classList.add('active');
        }
      }, delayMs);
    }
  }

  // ------------------------------------------------------------------------
  // 4. SECTION 1 — INTRO TO ENVELOPE
  // ------------------------------------------------------------------------
  const btnOpenSurprise = document.getElementById('btn-open-surprise');
  btnOpenSurprise.addEventListener('click', (e) => {
    const rect = btnOpenSurprise.getBoundingClientRect();
    spawnBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 12);
    switchSection('section-intro', 'section-envelope');
  });

  // ------------------------------------------------------------------------
  // 5. SECTION 2 — ENVELOPE OPENING ANIMATION
  // ------------------------------------------------------------------------
  const envelopeContainer = document.getElementById('romantic-envelope');
  let envelopeOpened = false;

  envelopeContainer.addEventListener('click', openEnvelope);
  envelopeContainer.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      openEnvelope();
    }
  });

  function openEnvelope() {
    if (envelopeOpened) return;
    envelopeOpened = true;

    // Stop continuous floating and open envelope flap
    envelopeContainer.classList.remove('float-anim');
    envelopeContainer.classList.add('open');

    // Spawn heart sparkles
    const rect = envelopeContainer.getBoundingClientRect();
    spawnBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 20);

    // After letter slides up, smoothly switch to Handwritten Letter section
    setTimeout(() => {
      switchSection('section-envelope', 'section-letter', 600);
      setTimeout(startLetterReveal, 700);
    }, 1500);
  }

  // ------------------------------------------------------------------------
  // 6. SECTION 3 — HANDWRITTEN LOVE LETTER REVEAL
  // ------------------------------------------------------------------------
  const letterBody = document.getElementById('letter-text-body');
  const letterSig = document.getElementById('letter-signature-container');
  const letterBtnContainer = document.getElementById('letter-btn-container');

  function startLetterReveal() {
    letterBody.innerHTML = '';
    letterSig.classList.remove('visible');
    letterBtnContainer.classList.remove('visible');
    letterSig.classList.add('hidden');
    letterBtnContainer.classList.add('hidden');

    let pIndex = 0;

    function revealNextParagraph() {
      if (pIndex < LETTER_PARAGRAPHS.length) {
        const pEl = document.createElement('p');
        pEl.className = 'handwritten-line';
        pEl.textContent = LETTER_PARAGRAPHS[pIndex];
        letterBody.appendChild(pEl);

        // Force reflow for fade animation
        setTimeout(() => {
          pEl.classList.add('visible');
        }, 50);

        pIndex++;
        // Small emotional pause between paragraphs
        setTimeout(revealNextParagraph, 1200);
      } else {
        // Reveal signature
        setTimeout(() => {
          letterSig.classList.remove('hidden');
          setTimeout(() => letterSig.classList.add('visible'), 50);

          // Reveal button after signature
          setTimeout(() => {
            letterBtnContainer.classList.remove('hidden');
            setTimeout(() => letterBtnContainer.classList.add('visible'), 100);
          }, 1000);
        }, 800);
      }
    }

    revealNextParagraph();
  }

  const btnTurnPage = document.getElementById('btn-turn-page');
  btnTurnPage.addEventListener('click', () => {
    switchSection('section-letter', 'section-journal');
    startJournalExperience();
  });

  // ------------------------------------------------------------------------
  // 7. SECTION 4 — OUR LITTLE JOURNAL & MUSIC
  // ------------------------------------------------------------------------
  const photoEl = document.getElementById('journal-photo');
  const quoteEl = document.getElementById('journal-quote');
  const progressFill = document.getElementById('journal-progress-fill');
  const indicatorDots = document.querySelectorAll('#journal-indicators .dot');

  function startJournalExperience() {
    currentSlideIndex = 0;
    journalStartTime = Date.now();

    // Start Audio
    if (audioEl) {
      audioEl.currentTime = 0;
      audioEl.volume = 1.0;
      const playPromise = audioEl.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.log('Autoplay deferred until user tap:', err);
        });
      }
    }

    displaySlide(0);
    startProgressTracker();
  }

  function displaySlide(index) {
    if (index >= JOURNAL_SLIDES.length) return;

    currentSlideIndex = index;
    const slide = JOURNAL_SLIDES[index];

    // Smooth Swap Animation
    photoEl.classList.add('fade-swap');
    quoteEl.classList.add('fade-swap');

    setTimeout(() => {
      photoEl.src = slide.img;
      quoteEl.textContent = slide.quote;

      photoEl.classList.remove('fade-swap');
      quoteEl.classList.remove('fade-swap');
    }, 400);

    // Update Dots
    indicatorDots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    // Schedule next slide if applicable
    const nextIndex = index + 1;
    if (nextIndex < JOURNAL_SLIDES.length) {
      journalTimerId = setTimeout(() => {
        displaySlide(nextIndex);
      }, slide.duration);
    }
  }

  function startProgressTracker() {
    if (journalProgressInterval) clearInterval(journalProgressInterval);

    journalProgressInterval = setInterval(() => {
      const elapsed = Date.now() - journalStartTime;
      const progressPercent = Math.min((elapsed / TOTAL_JOURNAL_TIME) * 100, 100);
      progressFill.style.width = `${progressPercent}%`;

      if (elapsed >= TOTAL_JOURNAL_TIME) {
        clearInterval(journalProgressInterval);
        endJournalExperience();
      }
    }, 100);
  }

  function fadeOutAudio(durationMs = 1500) {
    if (!audioEl) return;
    const startVolume = audioEl.volume;
    const interval = 50;
    const step = startVolume / (durationMs / interval);

    const fadeTimer = setInterval(() => {
      if (audioEl.volume > step) {
        audioEl.volume -= step;
      } else {
        audioEl.volume = 0;
        audioEl.pause();
        clearInterval(fadeTimer);
      }
    }, interval);
  }

  function endJournalExperience() {
    if (journalTimerId) clearTimeout(journalTimerId);
    fadeOutAudio(1500);

    setTimeout(() => {
      switchSection('section-journal', 'section-heart-lock');
    }, 1000);
  }

  // ------------------------------------------------------------------------
  // 8. SECTION 5 — SMALL THREE-TAP HEART
  // ------------------------------------------------------------------------
  const heartTapTarget = document.getElementById('heart-tap-target');
  const smallHeartNode = document.getElementById('small-heart-node');
  const tapDots = document.querySelectorAll('.tap-dot');

  heartTapTarget.addEventListener('click', (e) => {
    currentHeartTaps++;

    const rect = heartTapTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    if (currentHeartTaps === 1) {
      tapDots[0].classList.add('filled');
      smallHeartNode.style.transform = 'scale(1.25)';
      setTimeout(() => smallHeartNode.style.transform = 'scale(1)', 250);
      spawnBurst(centerX, centerY, 8);
    } else if (currentHeartTaps === 2) {
      tapDots[1].classList.add('filled');
      smallHeartNode.style.transform = 'scale(1.4)';
      setTimeout(() => smallHeartNode.style.transform = 'scale(1)', 250);
      spawnBurst(centerX, centerY, 15);
    } else if (currentHeartTaps >= 3) {
      tapDots[2].classList.add('filled');
      smallHeartNode.style.transform = 'scale(1.6)';
      spawnBurst(centerX, centerY, 30);

      setTimeout(() => {
        switchSection('section-heart-lock', 'section-password');
        setupPasswordInputs();
      }, 700);
    }
  });

  // ------------------------------------------------------------------------
  // 9. SECTION 6 — PASSWORD LOCK (CODE: 2328)
  // ------------------------------------------------------------------------
  const pinContainer = document.getElementById('pin-container');
  const pinInputs = document.querySelectorAll('.pin-digit');
  const passwordForm = document.getElementById('password-form');
  const feedbackMsg = document.getElementById('password-feedback');

  function setupPasswordInputs() {
    pinInputs.forEach((input, index) => {
      input.value = '';
      input.addEventListener('input', (e) => {
        if (e.target.value.length === 1) {
          if (index < pinInputs.length - 1) {
            pinInputs[index + 1].focus();
          } else {
            // Auto submit when 4th digit entered
            validatePassword();
          }
        }
      });

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !e.target.value && index > 0) {
          pinInputs[index - 1].focus();
        }
      });
    });

    if (pinInputs[0]) {
      setTimeout(() => pinInputs[0].focus(), 400);
    }
  }

  passwordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    validatePassword();
  });

  function validatePassword() {
    let enteredCode = '';
    pinInputs.forEach(i => enteredCode += i.value);

    if (enteredCode === SECRET_PASSWORD) {
      feedbackMsg.style.color = '#4caf50';
      feedbackMsg.textContent = 'Unlocked with love... ✨';
      
      const rect = pinContainer.getBoundingClientRect();
      spawnBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 25);

      setTimeout(() => {
        switchSection('section-password', 'section-video');
        const specialVideo = document.getElementById('special-video');
        if (specialVideo) {
          specialVideo.play().catch(e => console.log('Video play policy:', e));
        }
      }, 800);
    } else {
      feedbackMsg.style.color = 'var(--accent-red)';
      feedbackMsg.textContent = 'Almost... try again ❤️';
      pinContainer.classList.add('shake');

      setTimeout(() => {
        pinContainer.classList.remove('shake');
        pinInputs.forEach(i => i.value = '');
        if (pinInputs[0]) pinInputs[0].focus();
      }, 500);
    }
  }

  // ------------------------------------------------------------------------
  // 10. SECTION 7 & 8 — SPECIAL VIDEO & FINAL BIRTHDAY CELEBRATION SEQUENCE
  // ------------------------------------------------------------------------
  const btnToFinal = document.getElementById('btn-to-final');
  const specialVideo = document.getElementById('special-video');
  const birthdayAudioEl = document.getElementById('birthday-bgm');

  const stepReady = document.getElementById('final-step-ready');
  const stepCelebration = document.getElementById('final-step-celebration');
  const candleFlame = document.getElementById('candle-flame');
  const flameAura = document.getElementById('flame-aura');
  const candleSmoke = document.getElementById('candle-smoke');
  const wishWrapper = document.getElementById('wish-text-wrapper');
  const onceAgainWrapper = document.getElementById('once-again-wrapper');
  const finalMessageBox = document.getElementById('final-message-box');

  btnToFinal.addEventListener('click', () => {
    if (specialVideo) specialVideo.pause();
    switchSection('section-video', 'section-final');
    startFinalSequence();
  });

  if (specialVideo) {
    specialVideo.addEventListener('ended', () => {
      btnToFinal.style.animation = 'gentlePulse 1.5s infinite';
    });
  }

  function startFinalSequence() {
    // Reset all sub-step visibility
    stepReady.classList.remove('hidden');
    stepCelebration.classList.add('hidden');
    wishWrapper.classList.add('hidden');
    onceAgainWrapper.classList.add('hidden');
    finalMessageBox.classList.add('hidden');

    candleFlame.classList.remove('flame-out');
    flameAura.classList.remove('aura-out');
    candleSmoke.classList.add('smoke-hidden');
    candleSmoke.classList.remove('smoke-active');

    // STEP 1 — "Are you ready? 👀❤️" (Keep for 2.5 seconds)
    setTimeout(() => {
      stepReady.classList.add('hidden');
      stepCelebration.classList.remove('hidden');

      // STEP 2 — CAKE REVEAL 🎂 (Keep cake lit on screen for EXACTLY 3 seconds)
      setTimeout(() => {
        // STEP 3 — CANDLE BLOWS OUT 🕯️
        candleFlame.classList.add('flame-out');
        flameAura.classList.add('aura-out');
        candleSmoke.classList.remove('smoke-hidden');
        candleSmoke.classList.add('smoke-active');

        // STEP 4 — "MAKE A WISH" ✨ (Appears right after candle goes out)
        setTimeout(() => {
          wishWrapper.classList.remove('hidden');

          // STEP 5 — BIRTHDAY BGM 🎵 (Starts playing when "Make a Wish" appears)
          if (birthdayAudioEl) {
            birthdayAudioEl.currentTime = 0;
            birthdayAudioEl.volume = 0.9;
            const playPromise = birthdayAudioEl.play();
            if (playPromise !== undefined) {
              playPromise.catch(err => console.log('Birthday BGM deferred until user interaction:', err));
            }
          }

          // Pause 2.5 seconds on "Make a Wish ✨"
          setTimeout(() => {
            wishWrapper.classList.add('hidden');

            // STEP 6 — "Once again..."
            onceAgainWrapper.classList.remove('hidden');

            setTimeout(() => {
              onceAgainWrapper.classList.add('hidden');

              // FINAL MESSAGE REVEAL ❤️
              finalMessageBox.classList.remove('hidden');

              // Burst sparkles
              const rect = finalMessageBox.getBoundingClientRect();
              spawnBurst(rect.left + rect.width / 2, rect.top + 80, 25);
            }, 1600); // "Once again..." pause (1.6s)

          }, 2500); // "Make a wish" pause (2.5s)

        }, 500); // Candle blow delay (0.5s)

      }, 3000); // Cake lit duration (EXACTLY 3 seconds)

    }, 2500); // "Are you ready?" duration (2.5 seconds)
  }

  const btnReplay = document.getElementById('btn-replay');
  btnReplay.addEventListener('click', () => {
    // Stop birthday audio
    if (birthdayAudioEl) {
      birthdayAudioEl.pause();
      birthdayAudioEl.currentTime = 0;
    }

    // Reset state
    currentHeartTaps = 0;
    tapDots.forEach(d => d.classList.remove('filled'));
    envelopeContainer.classList.remove('open');
    envelopeContainer.classList.add('float-anim');
    envelopeOpened = false;

    switchSection('section-final', 'section-intro');
  });
});
