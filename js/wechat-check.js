// 微信浏览器检测脚本

// 检测是否为微信浏览器
function isWechatBrowser() {
    const ua = navigator.userAgent.toLowerCase();
    // 更精确的微信浏览器检测
    return /micromessenger/i.test(ua);
}

// 获取当前页面URL，生成二维码
function getCurrentPageUrl() {
    return window.location.href;
}

// 使用纯JavaScript生成简单的二维码提示图
function generateQRCode(url) {
    // 创建一个canvas元素
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');
    
    // 绘制白色背景
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 200, 200);
    
    // 绘制简单的提示文字和图形
    ctx.fillStyle = 'black';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('请使用微信扫码', 100, 50);
    ctx.fillText('访问本页面', 100, 70);
    
    // 绘制简化的二维码图案
    ctx.strokeRect(50, 80, 100, 100);
    ctx.fillText('微信扫码', 100, 130);
    
    // 将canvas转换为图片URL
    return canvas.toDataURL('image/png');
}

// 页面加载时检测浏览器环境
document.addEventListener('DOMContentLoaded', function() {
    if (!isWechatBrowser()) {
        // 获取当前页面URL
        const currentUrl = getCurrentPageUrl();
        
        // 创建遮罩层
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        overlay.style.zIndex = '9999';
        overlay.style.display = 'flex';
        overlay.style.flexDirection = 'column';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        overlay.style.color = 'white';
        overlay.style.textAlign = 'center';
        overlay.style.padding = '20px';
        
        // 生成二维码图片
        const qrCodeDataUrl = generateQRCode(currentUrl);
        
        // 添加提示文字、图标和二维码
        overlay.innerHTML = `
            <div style="margin-bottom: 20px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
            </div>
            <h2 style="margin-bottom: 15px; font-size: 1.5rem;">请在微信中打开</h2>
            <p style="font-size: 1rem; line-height: 1.5; margin-bottom: 20px;">本页面仅支持在微信浏览器中访问</p>
            <div style="background-color: white; padding: 10px; border-radius: 5px; margin-bottom: 15px;">
                <img src="${qrCodeDataUrl}" alt="二维码" style="width: 200px; height: 200px;">
            </div>
            <p style="font-size: 0.9rem; color: #ccc;">请使用微信扫描上方二维码访问</p>
        `;
        
        // 将遮罩添加到页面
        document.body.appendChild(overlay);
        
        // 阻止页面滚动
        document.body.style.overflow = 'hidden';
    }
});
