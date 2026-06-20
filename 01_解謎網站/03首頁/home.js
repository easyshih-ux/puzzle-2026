const groupDialog = document.querySelector('#groupDialog');
const groupGrid = document.querySelector('#groupGrid');
const selectionStatus = document.querySelector('#selectionStatus');
const missionGrid = document.querySelector('#missionGrid');
const missionLock = document.querySelector('#missionLock');
const missionCards = [...document.querySelectorAll('.mission-card')];
const chooseGroup = document.querySelector('#chooseGroup');

for (let group = 1; group <= 13; group += 1) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'group-button';
  button.textContent = `第 ${group} 組`;
  button.addEventListener('click', () => selectGroup(group));
  groupGrid.append(button);
}

const hanNums = ['', '壹', '貳', '參', '肆', '伍', '陸', '柒', '捌', '玖', '拾', '拾壹', '拾貳', '拾參'];
const stampContainer = document.querySelector('#stampContainer');

function selectGroup(group) {
  localStorage.setItem('yumi-selected-group', String(group));
  document.querySelectorAll('.group-button').forEach((button, index) => button.classList.toggle('is-selected', index + 1 === group));
  selectionStatus.textContent = `已確認第 ${group} 組，組別與任務進度會自動保存。`;
  chooseGroup.textContent = `已選擇第 ${group} 組`;
  setMissionLock(false);
  renderStamp(group);
}

function renderStamp(group) {
  if (!stampContainer) return;
  stampContainer.innerHTML = '';
  const stamp = document.createElement('div');
  stamp.className = 'team-stamp';
  const hanNum = hanNums[group] || String(group);
  stamp.innerHTML = `<div class="stamp-text">第${hanNum}組<br>參戰</div>`;
  stampContainer.appendChild(stamp);

  // 蓋章時對頁面進行輕微震動回饋
  setTimeout(() => {
    document.body.classList.add('stamp-shake');
    setTimeout(() => {
      document.body.classList.remove('stamp-shake');
    }, 150);
  }, 300); // 動畫落下至紙面瞬間
}

function setMissionLock(locked) {
  missionGrid.classList.toggle('is-locked', locked);
  missionGrid.setAttribute('aria-disabled', String(locked));
  missionLock.hidden = !locked;
  missionCards.forEach((card) => {
    card.tabIndex = locked ? -1 : 0;
    card.setAttribute('aria-disabled', String(locked));
  });
}

chooseGroup.addEventListener('click', () => {
  groupDialog.showModal();
  const savedGroup = Number(localStorage.getItem('yumi-selected-group'));
  if (savedGroup >= 1 && savedGroup <= 13) selectGroup(savedGroup);
});

// 阻擋未選組別時的點擊跳轉（防護鍵盤 Enter 或其他邊緣觸發）
missionCards.forEach((card) => {
  card.addEventListener('click', (e) => {
    const isLocked = missionGrid.classList.contains('is-locked');
    if (isLocked) {
      e.preventDefault();
    }
  });
});

const savedGroup = Number(localStorage.getItem('yumi-selected-group'));
if (savedGroup >= 1 && savedGroup <= 13) {
  chooseGroup.textContent = `已選擇第 ${savedGroup} 組`;
  setMissionLock(false);
  renderStamp(savedGroup);
} else {
  setMissionLock(true);
}
