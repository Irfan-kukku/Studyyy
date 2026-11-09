// Intro Audio Player for Study Planner
window.playStudyIntro = function() {
  if (!window._introAudio) { window._introAudio = new Audio('intro.mp3'); }
  window._introAudio.currentTime = 0;
  window._introAudio.play().catch(function(err) {
      const enable = function() { window._introAudio.play(); document.removeEventListener('click', enable); document.removeEventListener('touchstart', enable); };
      document.addEventListener('click', enable);
      document.addEventListener('touchstart', enable);
      });
  };
document.addEventListener('click', function() { window.playStudyIntro(); }, { once: true });
document.addEventListener('touchstart', function() { window.playStudyIntro(); }, { once: true });
