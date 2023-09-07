'use strict';

{
  // ----------------
  // スマホでの100vhの見え方の違いを調節（main-visual) 
  // ----------------

  const setFillHeight = () => {
    const vh = window.innerHeight * 0.01;//ビューポートの高さを取得し、0.01を掛けて1%の値を算出して、vh単位の値を取得
    document.documentElement.style.setProperty('--vh',`${vh}px`);//カスタム変数--vhの値をドキュメントのルートに設定
}

window.addEventListener('resize', setFillHeight);//画面のサイズ変動があった時に高さを再計算

setFillHeight();//初期化

// ----------------
// スムーススクロール
// ----------------
  const anchors = document.querySelectorAll('a[href^="#"]'); 
  const header = document.querySelector('header').offsetHeight; //header高さ
  const urlHash = location.hash; // URLのアンカー（#以降の部分）を取得

    // 各 anchor にクリックイベント
    for ( let i = 0; i < anchors.length; i++ ) {
      anchors[i].addEventListener('click', (e) => {
        e.preventDefault();  //デフォルトのクリックイベント無効化

      // 各 anchor の href属性取得
      const href= anchors[i].getAttribute("href");

      // topに戻る以外のアンカー
      if (href !== '#') {

        // スクロール先の要素を取得 （アンカーの リンク先 #.. の # を取り除いた名前と一致する id名の要素）
        const target = document.getElementById(href.replace('#', ''));

        // スクロール先の要素の位置を取得
        const position = window.pageYOffset + target.getBoundingClientRect().top;
        

        // スクロールアニメーション
        window.scroll({
          top: position,      // スクロール先要素の左上までスクロール
          behavior: 'smooth'  // スクロールアニメーション
        });

      // topに戻る
      } else {
        // スクロールアニメーション
        window.scroll({
          top: 0,  // スクロール先
          behavior: 'smooth'    // スクロールアニメーション
        });
      }
    });
  }

// -----------
//  アコーディオン
// -----------
const dts = document.querySelectorAll('dt');

dts.forEach(dt => {
  dt.addEventListener('click', () => {
    dt.parentNode.classList.toggle('appear');
      dts.forEach(el => {
        if (dt !== el) {
          el.parentNode.classList.remove('appear');
        }
      });
  });
});

// -----------
//  application ボタン
// -----------
const applicationBtn = document.getElementById('application-btn');

const bodyHeight = document.body.clientHeight // bodyの高さを取得
const windowHeight = window.innerHeight // windowの高さを取得
const bottomPoint = bodyHeight - windowHeight - header; // ページ最下部までスクロールしたかを判定するための位置を計算(headerが浮いているため追加で引く)


window.addEventListener('scroll', () => {

  const currentPos = window.pageYOffset // スクロール量を取得

  //  スクロールを始めると表示

  if (window.pageYOffset > 300) {
    applicationBtn.classList.add('appear');
  } else {
    applicationBtn.classList.remove('appear');
  }

  //  最下部で非表示にする

  if (bottomPoint <= currentPos || window.pageYOffset < 300) { // スクロール量が最下部の位置を過ぎたかどうか,最上部に戻ったかどうか
    applicationBtn.classList.remove('appear');
  } else {
    applicationBtn.classList.add('appear');
  }
});

}