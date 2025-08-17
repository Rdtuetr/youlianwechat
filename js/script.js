// 初始化友链数据
let friendLinks = JSON.parse(localStorage.getItem('friendLinks')) || [
    {
        name: 'Rdtuetr',
        url: 'http://weixin.qq.com/r/mp/AhGKkhLEqk-VrVbx90QQ',
        description: '本人网站',
        avatar: 'https://i.postimg.cc/bJzk1wzt/20250817142658.jpg'
    }
];

// DOM 元素
const friendLinksContainer = document.getElementById('friendLinksContainer');

// 渲染友链列表
function renderFriendLinks() {
    friendLinksContainer.innerHTML = '';
    
    if (friendLinks.length === 0) {
        friendLinksContainer.innerHTML = '<p class="no-links">暂无友链</p>';
        return;
    }
    
    friendLinks.forEach((link) => {
        const linkElement = document.createElement('div');
        linkElement.className = 'friend-link';
        linkElement.innerHTML = `
            <a href="${link.url}" target="_blank">
                <img src="${link.avatar}" alt="${link.name}" class="friend-avatar">
            </a>
            <div class="friend-info">
                <h3 class="friend-name">${link.name}</h3>
                <p class="friend-desc">${link.description}</p>
            </div>
        `;
        friendLinksContainer.appendChild(linkElement);
    });
    
    // 添加管理员入口
    const adminLink = document.createElement('div');
    adminLink.className = 'admin-link';
    adminLink.innerHTML = '<a href="./admin.html" class="admin-btn">管理员入口</a>';
    document.querySelector('footer').appendChild(adminLink);
}

// 页面加载时渲染友链列表

// 页面加载时渲染友链列表
document.addEventListener('DOMContentLoaded', function() {
    renderFriendLinks();
    
    // 添加样式到删除按钮
    const style = document.createElement('style');
    style.textContent = `
        .delete-btn {
            background-color: #e74c3c;
            color: white;
            border: none;
            border-radius: 4px;
            padding: 3px 8px;
            font-size: 0.8rem;
            cursor: pointer;
            margin-top: 5px;
            transition: background-color 0.3s;
        }
        
        .delete-btn:hover {
            background-color: #c0392b;
        }
        
        .no-links {
            grid-column: 1 / -1;
            text-align: center;
            padding: 20px;
            color: #7f8c8d;
        }
    `;
    document.head.appendChild(style);
});
