document.addEventListener("DOMContentLoaded", function() {
    // 背景グラデーション要素の作成
    var bgDiv = document.createElement('div');
    bgDiv.className = 'bg-gradient';
    
    // 丸い模様のリスト作成
    var circlesUl = document.createElement('ul');
    circlesUl.className = 'circles';
    
    // bodyの先頭に挿入（z-indexで制御するため順序は柔軟ですが、念のため先頭へ）
    document.body.insertBefore(circlesUl, document.body.firstChild);
    document.body.insertBefore(bgDiv, document.body.firstChild);

    // 設定
    const colors = [
        'rgba(129, 212, 250, 0.3)', // 淡い青
        'rgba(165, 214, 167, 0.3)', // 淡い緑
        'rgba(255, 245, 157, 0.3)', // 淡い黄色
        'rgba(255, 255, 255, 0.2)', // 白
        'rgba(165, 214, 167, 0.2)', // 薄い緑
        'rgba(129, 212, 250, 0.2)'  // 薄い青
    ];
    const animations = ['animateBubble', 'animateExpand', 'animateShrink'];

    // サークル生成関数
    function createCircle() {
        const li = document.createElement('li');
        
        // ランダムなサイズ (20px - 180px)
        const size = Math.floor(Math.random() * 160) + 20;
        li.style.width = size + 'px';
        li.style.height = size + 'px';
        
        // ランダムな位置 (0% - 100%)
        li.style.left = Math.random() * 100 + '%';
        
        // ランダムな色
        li.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        // ランダムなアニメーション時間 (15s - 40s)
        const duration = Math.floor(Math.random() * 25) + 15;
        li.style.animationDuration = duration + 's';
        
        // ランダムなアニメーションタイプ
        li.style.animationName = animations[Math.floor(Math.random() * animations.length)];
        
        // コンテナに追加
        circlesUl.appendChild(li);
        
        // アニメーション終了時に要素を削除（メモリリーク防止）
        li.addEventListener('animationend', function() {
            li.remove();
        });

        // 次の生成までの時間をランダムに設定 (200ms - 1500ms)
        const nextTime = Math.random() * 1300 + 200;
        setTimeout(createCircle, nextTime);
    }    
    // 継続的な生成を開始
    createCircle();
});