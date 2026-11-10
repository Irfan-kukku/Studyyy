// Motion Graphics Intro Player for Study Planner
(function() {
  const LYRICS = [
    { start: 0.0, end: 2.0, ml: 'നാളെ എക്സാം ആണോ? 📚', en: 'Tomorrow is the exam?' },
    { start: 2.0, end: 3.8, ml: 'ഇതുവരെ ഒരു വരി പോലും പഠിച്ചില്ലേ? 😅', en: 'Haven\'t studied a single line yet?' },
    { start: 3.8, end: 5.2, ml: 'ടെൻഷൻ അടിക്കേണ്ട! ✨', en: 'Don\'t take tension!' },
    { start: 5.2, end: 7.6, ml: 'നേരെ ടെറസിൽ കയറി നാല് ദിക്കിലേക്കും ഒരു സലാം വെച്ചോളൂ! 🫡', en: 'Climb to the terrace & say salaam in all 4 directions!' },
    { start: 7.6, end: 10.8, ml: 'ഇത്രയും ദിവസം പുസ്തകം തലയിണയാക്കി ഉറങ്ങിയിട്ട്... 😴', en: 'After sleeping with books as your pillow all these days...' },
    { start: 10.8, end: 13.0, ml: 'ഒരു ദിവസം കൊണ്ട് സിലബസ് വിഴുങ്ങാമെന്ന് വിചാരിച്ചോ?! 🤯', en: 'Did you think you could swallow the syllabus in 1 day?!' },
    { start: 13.0, end: 15.2, ml: 'ഇനി പഠിക്കാൻ ഇരുന്നാലും പുസ്തകം നിന്നെ തിരിച്ചറിയില്ല... 📖👀', en: 'Even if you sit to study now, the book won\'t recognize you...' },
    { start: 15.2, end: 17.1, ml: 'ഹാഹാഹാഹാഹാ! 😈😂', en: 'Hahahahaha!' }
  ];

  let audioObj = null;
  let overlayEl = null;
  let animFrameId = null;

  function createOverlay(options) {
    if (overlayEl) return overlayEl;
    const isReset = options && options.isStreakReset;
    const tagText = isReset ? `💔 STREAK BROKEN (${options.previousStreak || 1} DAYS LOST)` : '🔥 EXAM MOTIVATION';
    const tagStyle = isReset ? 'background:rgba(244,63,94,0.18);border-color:rgba(244,63,94,0.5);color:#f43f5e;' : 'background:rgba(56,189,248,0.12);border-color:rgba(56,189,248,0.28);color:#38bdf8;';
    overlayEl = document.createElement('div');
    overlayEl.className = 'intro-motion-overlay';
    overlayEl.innerHTML = 
      '<div class="intro-motion-backdrop"></div>' +
      '<div class="intro-motion-card">' +
        '<div class="intro-motion-header">' +
         '<span class="intro-mo'<span class="intro-motion-tag" style="' + tagStyle + '">' + tagText + '</span>' +tion-tag">🔥 EXAM MOTIVATION</span>' +
          '<button type="button" class="intro-motion-close" aria-label="Skip">✕ Skip</button>' +
        '</div>' +
        '<div class="intro-motion-visualizer">' +
          '<span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>' +
        '</div>' +
        '<div class="intro-motion-content">' +
          '<div class="intro-motion-ml" id="introMlText">നാളെ എക്സാം ആണോ? 📚</div>' +
          '<div class="intro-motion-en" id="introEnText">Tomorrow is the exam?</div>' +
        '</div>' +
        '<div class="intro-motion-progress-wrap">' +
          '<div class="intro-motion-progress-bar" id="introProgressBar"></div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlayEl);

    overlayEl.querySelector('.intro-motion-close').addEventListener('click', closeOverlay);
    return overlayEl;
  }

  function closeOverlay() {
    if (audioObj) {
      audioObj.pause();
    }
    if (animFrameId) {
      cancelAnimationFrame(animFrameId);
      animFrameId = null;
    }
    if (overlayEl) {
      overlayEl.classList.remove('active');
      setTimeout(function() {
        if (overlayEl && overlayEl.parentNode) {
          overlayEl.parentNode.removeChild(overlayEl);
          overlayEl = null;
        }
      }, 350);
    }
  }

  function updateFrame() {
    if (!audioObj || !overlayEl) return;
    const cur = audioObj.currentTime || 0;
    const dur = audioObj.duration || 17.08;
    const pct = Math.min(100, Math.max(0, (cur / dur) * 100));

    const pBar = document.getElementById('introProgressBar');
    if (pBar) pBar.style.width = pct + '%';

    let match = LYRICS[0];
    for (let i = 0; i < LYRICS.length; i++) {
      if (cur >= LYRICS[i].start && cur < LYRICS[i].end) {
        match = LYRICS[i];
        break;
      }
    }

    const mlEl = document.getElementById('introMlText');
    const enEl = document.getElementById('introEnText');

    if (mlEl && mlEl.textContent !== match.ml) {
      mlEl.textContent = match.ml;
      mlEl.classList.remove('pulse-text');
      void mlEl.offsetWidth;
      mlEl.classList.add('pulse-text');
      if (cur >= 15.0) {
        mlEl.classList.add('shake-text');
      } else {
        mlEl.classList.remove('shake-text');
      }
    }
    if (enEl && enEl.textContent !== match.en) {
      enEl.textContent = match.en;
    }

    if (!audioObj.paused && !audioObj.ended) {
      animFrameId = requestAnimationFrame(updateFrame);
    } else if (audioObj.ended) {
      setTimeout(closeOverlay, 1200);
    }
  }

  window.playStudyIntro = function(options) {
    createOverlay(options);
    void overlayEl.offsetWidth;
    overlayEl.classList.add('active');

    if (!audioObj) {
      audioObj = new Audio('intro.mp3');
    }
    audioObj.currentTime = 0;
    const playPromise = audioObj.play();

    if (playPromise && playPromise.then) {
      playPromise.then(function() {
        animFrameId = requestAnimationFrame(updateFrame);
      }).catch(function(err) {
        console.log('Autoplay waiting for tap:', err);
        const onFirstTap = function() {
          audioObj.play().then(function() {
            animFrameId = requestAnimationFrame(updateFrame);
          }).catch(function() {});
          document.removeEventListener('click', onFirstTap);
          document.removeEventListener('touchstart', onFirstTap);
        };
        document.addEventListener('click', onFirstTap, { once: true, passive: true });
        document.addEventListener('touchstart', onFirstTap, { once: true, passive: true });
      });
    }
  };

  ();
