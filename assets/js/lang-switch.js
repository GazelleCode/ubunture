function changeLanguage(lang) {
  // 1. 指定された言語のデータが存在するか確認
  if (!translations[lang]) return;

  // 2. ページ内の data-i18n 属性を持つ要素をすべて探す
  const elements = document.querySelectorAll('[data-i18n]');
    
  // 3. それぞれの要素のテキストを書き換える
  elements.forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[lang][key]) {
      // innerHTMLを使うと改行タグ<br>なども反映されます
      element.innerHTML = translations[lang][key]; 
    }
  });

  // 4. 現在の言語をブラウザに保存（リロードしても維持するため）
  localStorage.setItem('preferredLanguage', lang);
}

// ページ読み込み時の自動設定
document.addEventListener('DOMContentLoaded', () => {
  // 保存された言語があればそれを使う。なければブラウザの言語設定を見る。それもなければ 'en'
  const savedLang = localStorage.getItem('preferredLanguage');
  const browserLang = navigator.language.slice(0, 2); // 'ja-JP' -> 'ja'
  const defaultLang = savedLang || (translations[browserLang] ? browserLang : 'en');
  
  changeLanguage(defaultLang);
});