document.addEventListener('DOMContentLoaded', () => {
  // 1. 定義 13 個小組入口資料
  const groups = [
    { id: 1, name: "第01組", url: "https://view.genially.com/68763e42ab77cefe054c0070", style: "door" },
    { id: 2, name: "第02組", url: "https://view.genially.com/68763e42ab77cefe054c0070", style: "file" },
    { id: 3, name: "第03組", url: "https://view.genially.com/68763e42ab77cefe054c0070", style: "note" },
    { id: 4, name: "第04組", url: "https://view.genially.com/68763e42ab77cefe054c0070", style: "puzzle" },
    { id: 5, name: "第05組", url: "https://view.genially.com/68763e42ab77cefe054c0070", style: "scroll" },
    { id: 6, name: "第06組", url: "https://view.genially.com/68763e42ab77cefe054c0070", style: "notebook" },
    { id: 7, name: "第07組", url: "https://view.genially.com/68763e42ab77cefe054c0070", style: "safe" },
    { id: 8, name: "第08組", url: "https://view.genially.com/68763e42ab77cefe054c0070", style: "envelope" },
    { id: 9, name: "第09組", url: "https://view.genially.com/68763e42ab77cefe054c0070", style: "compass" },
    { id: 10, name: "第10組", url: "https://view.genially.com/68763e42ab77cefe054c0070", style: "key" },
    { id: 11, name: "第11組", url: "https://view.genially.com/68763e42ab77cefe054c0070", style: "magnifier" },
    { id: 12, name: "第12組", url: "https://view.genially.com/68763e42ab77cefe054c0070", style: "board" },
    { id: 13, name: "第13組", url: "https://view.genially.com/68763e42ab77cefe054c0070", style: "book" }
  ];

  const lobbyGrid = document.querySelector('#lobbyGrid');

  // 2. 針對 13 種不同的 style，回傳精緻的 inline SVG 手繪向量圖
  function getIconSvg(style) {
    const svgs = {
      // 門 (紅色把手)
      door: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="25" y="15" width="50" height="70" rx="4" fill="#fff" stroke="#101114" stroke-width="4.5"/>
        <path d="M25 35h50M25 60h50" stroke="#d7d9dc" stroke-width="3" stroke-dasharray="3 3"/>
        <circle cx="63" cy="50" r="5" fill="#ed2e38" stroke="#101114" stroke-width="3.5"/>
        <path d="M63 53v6" stroke="#101114" stroke-width="3"/>
      </svg>`,
      
      // 卷宗夾 (藍色)
      file: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="28" width="60" height="48" rx="3" fill="#1465d8" stroke="#101114" stroke-width="4.5"/>
        <path d="M20 28h18l6-8h36v8" fill="none" stroke="#101114" stroke-width="4.5" stroke-linejoin="round"/>
        <rect x="30" y="38" width="40" height="26" fill="#fff" stroke="#101114" stroke-width="3.5"/>
        <line x1="38" y1="46" x2="62" y2="46" stroke="#101114" stroke-width="3"/>
        <line x1="38" y1="54" x2="54" y2="54" stroke="#101114" stroke-width="3"/>
      </svg>`,
      
      // 便條紙 (黃色、附膠帶)
      note: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="22" width="60" height="60" fill="#fce475" stroke="#101114" stroke-width="4.5"/>
        <line x1="28" y1="36" x2="72" y2="36" stroke="#101114" stroke-width="3" stroke-dasharray="3 3"/>
        <line x1="28" y1="48" x2="72" y2="48" stroke="#101114" stroke-width="3" stroke-dasharray="3 3"/>
        <line x1="28" y1="60" x2="62" y2="60" stroke="#101114" stroke-width="3" stroke-dasharray="3 3"/>
        <!-- 頂部手繪膠帶 -->
        <polygon points="35,10 65,14 62,26 32,22" fill="#fff" opacity="0.85" stroke="#101114" stroke-width="3.5" stroke-linejoin="round"/>
      </svg>`,
      
      // 拼圖 (藍色)
      puzzle: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M25 25 h16 a8 8 0 0 1 16 0 h18 v16 a8 8 0 0 1 0 16 v18 h-18 a8 8 0 0 0 -16 0 h-16 v-50 z" 
              fill="#1465d8" stroke="#101114" stroke-width="4.5" stroke-linejoin="round"/>
        <circle cx="50" cy="50" r="4" fill="#fff"/>
      </svg>`,
      
      // 地圖卷軸
      scroll: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="22" y="20" width="56" height="60" rx="3" fill="#fff" stroke="#101114" stroke-width="4.5"/>
        <!-- 左右卷軸軸心 -->
        <rect x="15" y="16" width="7" height="68" rx="2" fill="#ed2e38" stroke="#101114" stroke-width="4"/>
        <rect x="78" y="16" width="7" height="68" rx="2" fill="#ed2e38" stroke="#101114" stroke-width="4"/>
        <!-- 地圖路線 -->
        <path d="M32 40 q12 -12 20 8 t20 -12" fill="none" stroke="#1465d8" stroke-width="4.5" stroke-dasharray="6 4" stroke-linecap="round"/>
        <circle cx="32" cy="40" r="5" fill="#ed2e38" stroke="#101114" stroke-width="2"/>
        <polygon points="72,32 76,40 68,40" fill="#ed2e38" stroke="#101114" stroke-width="2"/>
      </svg>`,
      
      // 筆記本 (紅皮、線圈)
      notebook: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="26" y="16" width="52" height="68" rx="4" fill="#ed2e38" stroke="#101114" stroke-width="4.5"/>
        <rect x="36" y="26" width="32" height="48" fill="#fff" stroke="#101114" stroke-width="3"/>
        <!-- 筆記本線圈 -->
        <circle cx="26" cy="24" r="4" fill="#fff" stroke="#101114" stroke-width="3"/>
        <circle cx="26" cy="38" r="4" fill="#fff" stroke="#101114" stroke-width="3"/>
        <circle cx="26" cy="52" r="4" fill="#fff" stroke="#101114" stroke-width="3"/>
        <circle cx="26" cy="66" r="4" fill="#fff" stroke="#101114" stroke-width="3"/>
        <path d="M22 24h8M22 38h8M22 52h8M22 66h8" stroke="#101114" stroke-width="3.5"/>
      </svg>`,
      
      // 保險箱 (鐵灰黃色輪盤)
      safe: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="60" height="60" rx="6" fill="#fff" stroke="#101114" stroke-width="4.5"/>
        <!-- 密碼輪盤 -->
        <circle cx="50" cy="50" r="20" fill="#fce475" stroke="#101114" stroke-width="4"/>
        <circle cx="50" cy="50" r="8" fill="#fff" stroke="#101114" stroke-width="3.5"/>
        <!-- 刻度 -->
        <line x1="50" y1="30" x2="50" y2="34" stroke="#101114" stroke-width="3.5"/>
        <line x1="50" y1="66" x2="50" y2="70" stroke="#101114" stroke-width="3.5"/>
        <line x1="30" y1="50" x2="34" y2="50" stroke="#101114" stroke-width="3.5"/>
        <line x1="66" y1="50" x2="70" y2="50" stroke="#101114" stroke-width="3.5"/>
      </svg>`,
      
      // 信封 (藍底紅章)
      envelope: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="18" y="26" width="64" height="48" rx="2" fill="#fff" stroke="#101114" stroke-width="4.5"/>
        <!-- 信封折線 -->
        <path d="M18 26l32 26 32-26" fill="none" stroke="#101114" stroke-width="4.5" stroke-linejoin="round"/>
        <path d="M18 74l24-20M82 74L58 54" stroke="#101114" stroke-width="3.5"/>
        <!-- 紅色圓印章 -->
        <circle cx="50" cy="54" r="8" fill="#ed2e38" stroke="#101114" stroke-width="3.5"/>
      </svg>`,
      
      // 羅盤 (黃色、藍色指標)
      compass: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="34" fill="#fff" stroke="#101114" stroke-width="4.5"/>
        <circle cx="50" cy="50" r="28" fill="none" stroke="#d7d9dc" stroke-width="2.5" stroke-dasharray="4 2"/>
        <!-- 羅盤指針 -->
        <polygon points="50,22 57,50 50,44" fill="#ed2e38" stroke="#101114" stroke-width="3" stroke-linejoin="round"/>
        <polygon points="50,78 57,50 50,44" fill="#1465d8" stroke="#101114" stroke-width="3" stroke-linejoin="round"/>
        <circle cx="50" cy="50" r="6" fill="#fce475" stroke="#101114" stroke-width="3"/>
      </svg>`,
      
      // 鑰匙 (金黃色)
      key: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="36" cy="50" r="16" fill="#fce475" stroke="#101114" stroke-width="4.5"/>
        <circle cx="36" cy="50" r="6" fill="#fff" stroke="#101114" stroke-width="3"/>
        <!-- 鑰匙柄 -->
        <rect x="52" y="45" width="30" height="10" fill="#fce475" stroke="#101114" stroke-width="4"/>
        <path d="M68 55v10M76 55v10" stroke="#101114" stroke-width="4" stroke-linecap="round"/>
      </svg>`,
      
      // 放大鏡 (藍鏡片、紅手柄)
      magnifier: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="44" cy="44" r="24" fill="#f7f7f4" stroke="#101114" stroke-width="4.5"/>
        <!-- 放大鏡折射格紋 -->
        <path d="M30 44h28M44 30v28" stroke="#1465d8" stroke-width="3.5" opacity="0.6"/>
        <!-- 鏡框邊緣反光 -->
        <path d="M26 32a20 20 0 0 1 24 -6" fill="none" stroke="#1465d8" stroke-width="4" stroke-linecap="round"/>
        <!-- 手柄 -->
        <rect x="62" y="62" width="22" height="10" rx="3" fill="#ed2e38" stroke="#101114" stroke-width="4.5" transform="rotate(45 62 62)"/>
      </svg>`,
      
      // 告示板 (軟木黃底、紅圖釘)
      board: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="24" width="60" height="52" rx="2" fill="#fff" stroke="#101114" stroke-width="4.5"/>
        <rect x="25" y="29" width="50" height="42" fill="#fce475" opacity="0.9" stroke="#101114" stroke-width="3.5"/>
        <line x1="32" y1="42" x2="68" y2="42" stroke="#101114" stroke-width="3"/>
        <line x1="32" y1="52" x2="60" y2="52" stroke="#101114" stroke-width="3"/>
        <!-- 紅色圖釘 -->
        <circle cx="50" cy="18" r="5" fill="#ed2e38" stroke="#101114" stroke-width="3.5"/>
        <path d="M50 23v4" stroke="#101114" stroke-width="3.5"/>
      </svg>`,
      
      // 書本 (古典開書、藍色封面)
      book: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 72c12-6 24-6 34 0 10-6 22-6 34 0V26c-12-6-24-6-34 0-10-6-22-6-34 0z" fill="#fff" stroke="#101114" stroke-width="4.5" stroke-linejoin="round"/>
        <!-- 中間裝訂線 -->
        <line x1="50" y1="26" x2="50" y2="76" stroke="#101114" stroke-width="4"/>
        <!-- 書本底座 -->
        <path d="M16 75c12-6 24-6 34 0 10-6 22-6 34 0" fill="none" stroke="#1465d8" stroke-width="4" stroke-linecap="round"/>
        <line x1="24" y1="40" x2="42" y2="40" stroke="#d7d9dc" stroke-width="2.5"/>
        <line x1="24" y1="50" x2="38" y2="50" stroke="#d7d9dc" stroke-width="2.5"/>
        <line x1="58" y1="40" x2="76" y2="40" stroke="#d7d9dc" stroke-width="2.5"/>
        <line x1="58" y1="50" x2="70" y2="50" stroke="#d7d9dc" stroke-width="2.5"/>
      </svg>`
    };
    
    return svgs[style] || svgs.file;
  }

  // 3. 開始動態產生小組任務卡片
  groups.forEach((group, index) => {
    // 建立 <a> 標籤
    const card = document.createElement('a');
    card.href = group.url;
    card.target = '_blank';
    card.className = `lobby-card style-${group.style}`;
    
    // 設定鍵盤聚焦語義
    card.setAttribute('aria-label', `${group.name} 任務入口`);
    
    // 注入卡片內容：手繪圖示、組別標題、進入按鈕
    card.innerHTML = `
      <div class="card-icon-wrapper">
        ${getIconSvg(group.style)}
      </div>
      <h2 class="card-title">${group.name}</h2>
      <div class="enter-btn">
        <span>進入任務</span>
      </div>
    `;

    // 4. 極致細節：加入不規則的微幅旋轉，營造手帳拼貼的凌亂美感
    const randomRotate = (Math.random() * 5 - 2.5).toFixed(1); // 隨機偏轉 -2.5deg 至 2.5deg
    card.style.setProperty('--card-rotate', `${randomRotate}deg`);
    
    // 5. 交錯動畫加載時間延遲 (Stagger animation delay)
    card.style.animationDelay = `${index * 50}ms`;

    // 將卡片附掛到網格中
    lobbyGrid.appendChild(card);
  });
});
