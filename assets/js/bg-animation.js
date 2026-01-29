document.addEventListener("DOMContentLoaded", function() {
    // 背景グラデーション要素の作成
    var bgDiv = document.createElement('div');
    bgDiv.className = 'bg-gradient';
    
    // 丸い模様のリスト作成
    var circlesUl = document.createElement('ul');
    circlesUl.className = 'circles';
    
    // 18個のli要素を追加
    for(var i=0; i<18; i++) {
        circlesUl.appendChild(document.createElement('li'));
    }

    // bodyの先頭に挿入（z-indexで制御するため順序は柔軟ですが、念のため先頭へ）
    document.body.insertBefore(circlesUl, document.body.firstChild);
    document.body.insertBefore(bgDiv, document.body.firstChild);
});