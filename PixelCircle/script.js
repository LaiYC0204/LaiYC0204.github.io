// script.js

// 等待 DOM 完全加載後執行
window.onload = function() {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    const input = document.getElementById('circleSize');
    let scale = 1; // 縮放比例
    let isDragging = false; // 是否正在拖動
    let startX, startY; // 滑鼠開始拖動的起始位置
    let offsetX = 0, offsetY = 0; // 畫布的位移量
    let lastX, lastY; // 上次的滑鼠位置

    // 初次繪製圓圈
    resetCircle()

    // 當圓圈大小改變時重新繪製圓圈
    input.addEventListener('input', resetCircle);

    // 滾輪事件處理
    canvas.addEventListener('wheel', function(event) {
        event.preventDefault(); // 防止滾輪事件滾動頁面

        const zoomSpeed = 1; // 縮放速度
        scale -= Math.sign(event.deltaY) * zoomSpeed; // 根據滾輪方向調整縮放比例
        scale = Math.max(0.1, Math.min(scale, 50)); // 限制缩放范围
        drawCircle();
    });

    // 滑鼠按下事件
    canvas.addEventListener('mousedown', function(event) {
        isDragging = true;
        startX = event.clientX;
        startY = event.clientY;
        lastX = startX;
        lastY = startY;
    });

    // 滑鼠移動事件
    canvas.addEventListener('mousemove', function(event) {
        if (isDragging) {
            const dx = event.clientX - lastX;
            const dy = event.clientY - lastY;
            offsetX += dx;
            offsetY += dy;
            lastX = event.clientX;
            lastY = event.clientY;
            drawCircle();
        }
    });

    // 滑鼠釋放事件
    canvas.addEventListener('mouseup', function() {
        isDragging = false;
    });

    function resetCircle() {
        const size = parseInt(input.value, 10); // 获取圆圈的大小
        scale = Math.min(canvas.width, canvas.height) / (size * 1.5);
        drawCircle();
    }

    function drawCircle() {
        const size = parseInt(input.value, 10); // 獲取圓圈的大小
        const radius = size * 2;

        // 清空畫布
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.save(); // 保存當前狀態

        // 移動畫布原點到畫布中心
        const centerX = canvas.width / 2 + offsetX;
        const centerY = canvas.height / 2 + offsetY;
        ctx.translate(centerX, centerY);

        // 应用初始 scale 和滚轮调整的 scale
        ctx.scale(scale, scale);

        // 繪製網格線
        drawGrid();

        // 繪製圓圈
        pxCircle(0,0, radius, 0.5);

        ctx.restore(); // 恢復之前的狀態
    }

    // 繪製網格線
    function drawGrid() {
        const step = 0.5; // 网格线间隔
        const width = input.value * 5;
        const height = input.value * 5;
        
        // 設定網格線
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 0.1;
        ctx.beginPath();

        ctx.translate(-width / 2, -height / 2);
        
        for (let x = 0; x <= width; x += step) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
        }
        
        for (let y = 0; y <= height; y += step) {
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
        }
        
        ctx.stroke();

        ctx.translate(width / 2, height / 2);
    }

    function pxCircle(x, y, d, s) {
        ctx.save(); // 保存當前狀態
        ctx.translate(Math.round(x), Math.round(y));
      
        const r = Math.round(d / 2);
      
        let cx = r;
        let cy = 0;
        let f = 1.25 - 2 * r;

        while (cx >= -cy) {
            const px = cx * s;
            const py = cy * s;
          
            _pxCircleSquares(px, py, s);
          
            cy = cy - 1;
            if (f >= 0) {
                cx = cx - 1;
                f = f - 2 * (cx + cy) + 5;
            } else {
                f = f - 2 * cy + 3;
            }
        }
      
        ctx.restore(); // 恢復到之前的狀態
    }

    function _pxCircleSquares(x, y, s) {
        ctx.fillStyle = 'black';
        ctx.strokeStyle = 'red'; // 設置邊框顏色
        ctx.lineWidth = 0.1; // 設置邊框寬度
        
        // 繪製方塊
        drawSquare(x, y, s);
        drawSquare(x, -y, s);
        drawSquare(-y, -x, s);
        drawSquare(-y, x, s);
        drawSquare(-x, y, s);
        drawSquare(-x, -y, s);
        drawSquare(y, -x, s);
        drawSquare(y, x, s);
    }

    function drawSquare(x, y, s) {
        ctx.fillRect(x, y, s, s); // 繪製填充方塊
        ctx.strokeRect(x, y, s, s); // 繪製邊框
    }
};
