document.addEventListener('DOMContentLoaded', function () {
    // ツール群の定義
    const tools = [
        { name: 'Home (Launcher)', file: 'index.html', isRoot: true },
        { name: 'Cron Generator', file: 'cron-gen.html' },
        { name: 'Decision Roulette', file: 'decision_roulette.html' },
        { name: 'Diff Viewer', file: 'diff-viewer.html' },
        { name: 'Dir Tree Generator', file: 'dirtree-gen.html' },
        { name: 'Password Generator', file: 'password-gen.html' },
        { name: 'Prompt Helper', file: 'prompt-helper.html' },
        { name: 'RDP Generator', file: 'rdp-gen.html' },
        { name: 'Robocopy Generator', file: 'robocopy-gen.html' },
        { name: 'POSIX Text Processor', file: 'posix-textproc.html' },
        { name: 'Subnet Calculator', file: 'subnet-calc.html' },
        { name: 'Unit Converter', file: 'unit-converter.html' },
        { name: 'Hypervisor Sizer', file: 'hypervisor-sizer.html' }
    ];

    // テーマ設定の初期化
    const savedTheme = localStorage.getItem('se-tools-theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.setAttribute('data-theme', 'light');
    }

    // 現在のページが root (index.html 等) か tools/ 配下かを判定
    const isRootFolder = window.location.pathname.endsWith('/') || (window.location.pathname.endsWith('index.html') && !window.location.pathname.includes('/tools/'));

    // DOM要素の生成
    const overlay = document.createElement('div');
    overlay.id = 'se-nav-overlay';

    const drawer = document.createElement('div');
    drawer.id = 'se-nav-drawer';

    let listHtml = '';
    tools.forEach(tool => {
        let href = '';
        if (isRootFolder) {
            href = tool.isRoot ? tool.file : 'tools/' + tool.file;
        } else {
            href = tool.isRoot ? '../' + tool.file : tool.file;
        }
        listHtml += `<li><a href="${href}">${tool.name}</a></li>`;
    });

    drawer.innerHTML = `
        <div class="se-nav-header">
            <div class="logo">SE<span>tools</span></div>
            <button id="se-nav-close">×</button>
        </div>
        <ul class="se-nav-list">
            ${listHtml}
        </ul>
        <div class="se-theme-toggle">
            <button id="theme-toggle-btn">
                <span class="theme-icon-light">☀️ Light Theme</span>
                <span class="theme-icon-dark">🌙 Dark Theme</span>
            </button>
        </div>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(drawer);

    // テーマ切り替えイベント
    const themeBtn = document.getElementById('theme-toggle-btn');
    themeBtn.addEventListener('click', function () {
        const currentTheme = document.body.getAttribute('data-theme');
        if (currentTheme === 'light') {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('se-tools-theme', 'dark');
        } else {
            document.body.setAttribute('data-theme', 'light');
            localStorage.setItem('se-tools-theme', 'light');
        }
    });

    // ハンバーガーボタンを header の左側に挿入（ロゴとグループ化）
    const header = document.querySelector('header');
    if (header) {
        const trigger = document.createElement('button');
        trigger.id = 'se-nav-trigger';
        trigger.innerHTML = '<span></span><span></span><span></span>';
        trigger.title = 'メニューを開く';

        // 既存のロゴを探す
        const logo = header.querySelector('.logo');
        if (logo) {
            // ロゴがある場合、ハンバーガーとロゴをまとめるラッパーを作成
            const leftGroup = document.createElement('div');
            leftGroup.className = 'se-header-left';
            leftGroup.style.display = 'flex';
            leftGroup.style.alignItems = 'center';
            leftGroup.style.gap = '15px';

            // ロゴを移動
            header.prepend(leftGroup);
            leftGroup.appendChild(trigger);
            leftGroup.appendChild(logo);
        } else {
            // ロゴがない場合は単に先頭に追加
            header.prepend(trigger);
        }

        trigger.addEventListener('click', function () {
            overlay.classList.add('active');
            drawer.classList.add('active');
        });
    }

    const closeBtn = document.getElementById('se-nav-close');

    function closeNav() {
        overlay.classList.remove('active');
        drawer.classList.remove('active');
    }

    closeBtn.addEventListener('click', closeNav);
    overlay.addEventListener('click', closeNav);
});
