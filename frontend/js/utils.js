// utils.js
export function initWeeklyChart(elementId, data = [320,480,210,560,390,640,420]) {
  const container = document.getElementById(elementId);
  if (!container) return;
  const max = Math.max(...data);
  container.innerHTML = '';
  data.forEach((v, i) => {
    const group = document.createElement('div');
    group.className = 'week-bar-group';
    const bar = document.createElement('div');
    bar.className = 'week-bar' + (i === 1 ? ' today' : '');
    bar.style.height = (v / max * 100) + '%';
    bar.title = v + ' kcal';
    group.appendChild(bar);
    container.appendChild(group);
  });
}

export function showToast(message, duration = 4000) {
  let toast = document.getElementById('globalToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'globalToast';
    toast.style.cssText = 'position:fixed; bottom:20px; left:20px; background:white; border-left:5px solid #F472B6; border-radius:20px; padding:12px 20px; box-shadow:0 8px 20px rgba(0,0,0,0.1); transform:translateX(-150%); transition:0.3s; z-index:300;';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `${message}<button onclick="this.parentElement.style.transform='translateX(-150%)'" style="margin-left:12px; background:none; border:none; font-size:1.2rem;">×</button>`;
  toast.style.transform = 'translateX(0)';
  setTimeout(() => { if (toast) toast.style.transform = 'translateX(-150%)'; }, duration);
}

export function setupChatbot() {
  const replies = [
    "Great question! For fat loss, aim for a 300–500 kcal deficit daily. 🎯",
    "Protein is key! Try to hit 1.6–2.2g per kg of body weight. 💪",
    "Rest days are just as important as training days — your muscles grow when you recover!",
    "Hydration tip: drink 35 ml per kg of body weight daily. 💧",
    "For best results, combine strength training with 150 min of cardio per week."
  ];
  let ri = 0;

  window.toggleChat = function() {
    const panel = document.getElementById('chatbot-panel');
    if (panel) panel.classList.toggle('open');
  };
  window.sendChat = function() {
    const input = document.getElementById('chat-input');
    const val = input.value.trim();
    if (!val) return;
    const messages = document.getElementById('chat-messages');
    messages.innerHTML += `<div class="chat-bubble chat-bubble--user">${escapeHtml(val)}</div>`;
    input.value = '';
    setTimeout(() => {
      messages.innerHTML += `<div class="chat-bubble chat-bubble--bot">${replies[ri % replies.length]}</div>`;
      ri++;
      messages.scrollTop = messages.scrollHeight;
    }, 600);
    messages.scrollTop = messages.scrollHeight;
  };
}

function escapeHtml(str) {
  return str.replace(/[&<>]/g, function(m) {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    return m;
  });
}

export function initAddGoalFeature(goalsListId, modalId, goalNameInputId) {
  window.showAddGoal = function() {
    document.getElementById(modalId).style.display = 'flex';
  };
  window.hideAddGoal = function() {
    document.getElementById(modalId).style.display = 'none';
  };
  window.addGoal = function() {
    const name = document.getElementById(goalNameInputId).value.trim();
    if (!name) return;
    const list = document.getElementById(goalsListId);
    list.innerHTML += `<li class="goal-item">
      <div class="goal-item__top"><span>🎯 ${escapeHtml(name)}</span><span>0%</span></div>
      <div class="progress-bar"><div class="progress-fill" style="width:0%"></div></div>
      <small>Just started — keep going!</small>
    </li>`;
    window.hideAddGoal();
    document.getElementById(goalNameInputId).value = '';
  };
}