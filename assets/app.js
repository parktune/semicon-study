/* 공통 스크립트: 읽기/퀴즈 모드 전환. 외부 의존성 없음, file:// 에서 동작 */
(function () {
  var KEY = 'hynix-mode';

  function loadMode() {
    try {
      var m = localStorage.getItem(KEY);
      return m === 'quiz' ? 'quiz' : 'read';
    } catch (e) { return 'read'; }
  }
  function saveMode(m) {
    try { localStorage.setItem(KEY, m); } catch (e) { /* 저장 불가 환경은 무시 */ }
  }

  function applyMode(m) {
    document.body.setAttribute('data-mode', m);
    var qas = document.querySelectorAll('details.qa');
    for (var i = 0; i < qas.length; i++) {
      if (m === 'read') qas[i].setAttribute('open', '');
      else qas[i].removeAttribute('open');
    }
    var btns = document.querySelectorAll('[data-mode-btn]');
    for (var j = 0; j < btns.length; j++) {
      var b = btns[j];
      b.textContent = (m === 'quiz') ? '퀴즈 모드 (답 가림) · 읽기로 전환' : '읽기 모드 (답 펼침) · 퀴즈로 전환';
      if (m === 'quiz') b.classList.add('on'); else b.classList.remove('on');
    }
  }

  function init() {
    var mode = loadMode();
    applyMode(mode);
    var btns = document.querySelectorAll('[data-mode-btn]');
    for (var j = 0; j < btns.length; j++) {
      btns[j].addEventListener('click', function () {
        mode = (mode === 'quiz') ? 'read' : 'quiz';
        saveMode(mode);
        applyMode(mode);
      });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
