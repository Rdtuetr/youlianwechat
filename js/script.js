// 初始化友链数据
let friendLinks = JSON.parse(localStorage.getItem('friendLinks')) || [
    {
        name: 'Rdtuetr',
        url: '#',
        description: '本人首页',
        avatar: 'https://i.postimg.cc/bJzk1wzt/20250817142658.jpg'
    },
    {
        name: '书法小生--碧云轩主',
        url: 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=html%3E%20%3Chtml%3E%20%3Chead%3E%20%3Cmeta%20http-equiv=Content-Type%20content=&scene=124#wechat_redirect',
        description: 'Friends',
        avatar: 'https://i.postimg.cc/0QZbpGQY/20250817154734.jpg'
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
