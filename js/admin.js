// 正确的密码
const CORRECT_PASSWORD = 'Xcean109208';

// DOM 元素
const loginContainer = document.getElementById('loginContainer');
const adminContainer = document.getElementById('adminContainer');
const loginBtn = document.getElementById('loginBtn');
const passwordInput = document.getElementById('password');
const adminFriendLinksContainer = document.getElementById('adminFriendLinksContainer');
const addLinkForm = document.getElementById('addLinkForm');

// 初始化友链数据
let friendLinks = JSON.parse(localStorage.getItem('friendLinks')) || [
    {
        name: '示例网站',
        url: 'https://example.com',
        description: '这是一个示例网站，展示友链的显示效果',
        avatar: 'https://api.dicebear.com/6.x/micah/svg?seed=example'
    }
];

// 登录验证
loginBtn.addEventListener('click', function() {
    const password = passwordInput.value.trim();
    
    if (password === CORRECT_PASSWORD) {
        // 密码正确，显示管理界面
        loginContainer.style.display = 'none';
        adminContainer.style.display = 'block';
        
        // 渲染友链列表
        renderAdminFriendLinks();
    } else {
        // 密码错误
        alert('密码错误，请重试！');
        passwordInput.value = '';
        passwordInput.focus();
    }
});

// 按Enter键登录
passwordInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        loginBtn.click();
    }
});

// 渲染管理界面的友链列表
function renderAdminFriendLinks() {
    adminFriendLinksContainer.innerHTML = '';
    
    if (friendLinks.length === 0) {
        adminFriendLinksContainer.innerHTML = '<p class="no-links">暂无友链，快来添加第一个吧！</p>';
        return;
    }
    
    friendLinks.forEach((link, index) => {
        const linkElement = document.createElement('div');
        linkElement.className = 'friend-link';
        linkElement.innerHTML = `
            <a href="${link.url}" target="_blank">
                <img src="${link.avatar}" alt="${link.name}" class="friend-avatar">
            </a>
            <div class="friend-info">
                <h3 class="friend-name">${link.name}</h3>
                <p class="friend-desc">${link.description}</p>
                <button class="delete-btn" data-index="${index}">删除</button>
            </div>
        `;
        adminFriendLinksContainer.appendChild(linkElement);
    });
    
    // 添加删除按钮的事件监听
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const index = parseInt(this.getAttribute('data-index'));
            deleteFriendLink(index);
        });
    });
}

// 添加友链
function addFriendLink(name, url, description, avatar) {
    friendLinks.push({
        name,
        url,
        description,
        avatar
    });
    
    // 保存到本地存储
    localStorage.setItem('friendLinks', JSON.stringify(friendLinks));
    
    // 重新渲染友链列表
    renderAdminFriendLinks();
}

// 删除友链
function deleteFriendLink(index) {
    if (confirm('确定要删除这个友链吗？')) {
        friendLinks.splice(index, 1);
        
        // 保存到本地存储
        localStorage.setItem('friendLinks', JSON.stringify(friendLinks));
        
        // 重新渲染友链列表
        renderAdminFriendLinks();
    }
}

// 表单提交事件
addLinkForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const siteName = document.getElementById('siteName').value.trim();
    const siteUrl = document.getElementById('siteUrl').value.trim();
    const siteDesc = document.getElementById('siteDesc').value.trim();
    const siteAvatar = document.getElementById('siteAvatar').value.trim();
    
    if (!siteName || !siteUrl || !siteDesc || !siteAvatar) {
        alert('请填写所有必填字段！');
        return;
    }
    
    // 验证URL格式
    try {
        new URL(siteUrl);
        new URL(siteAvatar);
    } catch (e) {
        alert('请输入有效的URL地址！');
        return;
    }
    
    // 添加新友链
    addFriendLink(siteName, siteUrl, siteDesc, siteAvatar);
    
    // 重置表单
    addLinkForm.reset();
    
    alert('友链添加成功！');
});

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