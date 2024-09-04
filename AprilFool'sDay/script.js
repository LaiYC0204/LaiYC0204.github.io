function generateJoke() {
    // 找到輸入框並獲取其值id="name"
    var nameInput = document.getElementById('name').value;

    // 找到要更改文字的<p>元素
    var outputPara = document.getElementById('joke-content');

    // 更改<p>元素的文字內容
    outputPara.textContent = '好了拉' + nameInput + '，今天可是愚人節呢，你以為真的可以生成給你喔';
}