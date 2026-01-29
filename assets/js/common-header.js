// c:\Users\ntksh\mycodes\ubuntureSite\assets\js\common-header.js
// Google Analytics (GA4) の設定
(function() {
    // ★ここにあなたの測定ID (例: G-1234567890) を入力してください
    var gaId = 'G-83F25BDQJG';

    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + gaId;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', gaId);
})();

const headerHTML = `
    <div class="header-area">
        <div class="main-header ">
            <div class="header-bottom  header-sticky">
                <div class="container-fluid">
                    <div class="row align-items-center">
                        <div class="col-xl-2 col-lg-2">
                            <div class="logo">
                                <a href="index.html"><img src="assets/img/logo/logo.png" alt=""></a>
                            </div>
                        </div>
                        <div class="col-xl-10 col-lg-10">
                            <div class="menu-wrapper  d-flex align-items-center justify-content-end">
                                <div class="main-menu d-none d-lg-block">
                                    <nav>
                                        <ul id="navigation">                                                                                          
                                            <li>
                                                <a href="#" id="lang-btn" onclick="toggleLanguage(); return false;" class="btn lang-switch-btn" style="padding: 10px 20px; min-width: 60px; height: auto; line-height: 1; margin-left: 10px;">JP</a>
                                            </li>
                                            <li><a href="index.html" data-i18n="nav.home">Home</a></li>
                                            <li><a href="about.html" data-i18n="nav.about">About</a></li>
                                            <li><a href="what-do.html" data-i18n="nav.what_do">What we Do</a></li>
                                            <li><a href="coming-soon.html" data-i18n="nav.blog">Blog</a>
                                                <ul class="submenu">
                                                    <li><a href="coming-soon.html" data-i18n="nav.blog">Blog</a></li>
                                                    <li><a href="coming-soon.html" data-i18n="nav.blog_details">Blog Details</a></li>
                                                    <li><a href="coming-soon.html" data-i18n="nav.elements">Element</a></li>
                                                </ul>
                                            </li>
                                            <li><a href="contact.html" data-i18n="nav.contact">Contact</a></li>
                                            <li class="d-lg-none"><a href="contact.html" data-i18n="header.donation">Make a Donation</a></li>
                                        </ul>
                                    </nav>
                                </div>
                                <div class="header-right-btn d-none d-lg-block ml-20">
                                    <a href="contact.html" class="btn header-btn" data-i18n="header.donation">Make a Donation</a>
                                </div>
                            </div>
                        </div> 
                        <div class="col-12">
                            <div class="mobile_menu d-block d-lg-none"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;

// IDが 'common-header' の要素の中にHTMLを挿入
document.getElementById('common-header').innerHTML = headerHTML;

// 丸いボタンをbodyに直接追加（ヘッダーのtransformの影響を受けないようにするため）
const mobileBtnHTML = `
    <button id="round-mobile-btn" class="round-mobile-btn" aria-label="Menu" style="display: none;">
        <span></span>
        <span></span>
        <span></span>
    </button>
    <style>
        .round-mobile-btn {
            position: fixed;
            top: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            background-color: #000;
            border-radius: 50%;
            border: none;
            z-index: 10000; /* ヘッダーより手前に表示 */
            display: flex; /* Flexboxで中央揃え */
            flex-direction: column;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            padding: 0;
        }
        .round-mobile-btn span {
            display: block;
            width: 24px;
            height: 2px;
            background-color: #fff;
            margin: 3px 0;
            transition: 0.3s;
        }
        .round-mobile-btn.active span:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }
        .round-mobile-btn.active span:nth-child(2) {
            opacity: 0;
        }
        .round-mobile-btn.active span:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
        @media (min-width: 992px) {
            .round-mobile-btn { display: none !important; }
        }
    </style>
`;
document.body.insertAdjacentHTML('beforeend', mobileBtnHTML);

// 翻訳スクリプトを動的に読み込む関数
function loadScript(src, callback) {
    var script = document.createElement('script');
    script.src = src;
    if (callback) script.onload = callback;
    document.body.appendChild(script);
}

// translations.js を読み込んだ後に lang-switch.js を読み込む
loadScript('assets/js/translations.js', function() {
    loadScript('assets/js/lang-switch.js');
});