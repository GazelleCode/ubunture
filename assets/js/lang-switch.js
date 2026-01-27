(function() {
  // 1. 利用可能な言語リストを自動生成（['en', 'ja', ...]）
  const availableLangs = Object.keys(translations);
  let currentLang = 'en'; // 初期値

  // 2. 言語を切り替える関数（HTMLのボタンから呼ばれる）
  window.toggleLanguage = function() {
    // 現在の言語がリストの何番目か探す
    const currentIndex = availableLangs.indexOf(currentLang);
    
    // 次の言語のインデックスを計算（最後の次は最初に戻るループ仕様）
    const nextIndex = (currentIndex + 1) % availableLangs.length;
    const nextLang = availableLangs[nextIndex];

    changeLanguage(nextLang);
  };

  // 3. 画面書き換え処理
  function changeLanguage(lang) {
    if (!translations[lang]) return;
    
    currentLang = lang;

    // テキストの書き換え
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (translations[lang][key]) {
        element.innerHTML = translations[lang][key];
      }
    });

    // ボタンの文字更新（次の言語を表示する）
    const btns = document.querySelectorAll('.lang-switch-btn');
    btns.forEach(btn => {
      // 現在が日本語なら、ボタンには英語(EN)への切替を表示させたい場合など
      // translations.js で設定した nextLangBtn を使う
      btn.innerText = translations[lang].nextLangBtn || "Lang";
    });

    // 設定を保存
    localStorage.setItem('preferredLanguage', lang);
    
    // HTMLタグのlang属性も変えておく（検索エンジン用）
    document.documentElement.lang = lang;
  }

  // 4. 初期化（ページ読み込み時）
  const init = () => {
    const savedLang = localStorage.getItem('preferredLanguage');
    // 保存された言語があればそれ、なければブラウザの言語、それもなければ英語
    const browserLang = (navigator.language || navigator.userLanguage).slice(0, 2);
    const defaultLang = savedLang || (availableLangs.includes(browserLang) ? browserLang : 'en');
    
    changeLanguage(defaultLang);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();