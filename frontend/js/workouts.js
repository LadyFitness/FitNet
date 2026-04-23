// workouts.js
import { auth, onAuthStateChanged } from './auth.js';
import { setupChatbot, showToast } from './utils.js';

onAuthStateChanged(auth, (user) => { if (!user) window.location.href = 'login.html'; });

// Set min date for scheduling
document.getElementById('wDate').min = new Date().toISOString().split('T')[0];

let upcoming = [
  { type: "HIIT Cardio Blast", date: "Wed 25 Jun", time: "7:00 am", duration: 30 },
  { type: "Lower Body Strength", date: "Fri 27 Jun", time: "6:30 am", duration: 45 }
];

function renderUpcoming() {
  const container = document.getElementById('upcomingList');
  if (upcoming.length === 0) {
    container.innerHTML = '<p style="color:var(--text-muted);text-align:center;">No upcoming workouts. Schedule one!</p>';
    return;
  }
  container.innerHTML = upcoming.map((w, i) => `
    <div class="activity-item" style="border-left:3px solid #F472B6; padding-left:12px;">
      <div>📅</div>
      <div><strong>${w.type}</strong><br/>${w.date} · ${w.time} · ${w.duration} min</div>
      <button class="btn btn--outline btn--sm done-btn" data-index="${i}">Done</button>
    </div>
  `).join('');
  document.querySelectorAll('.done-btn').forEach(btn => {
    btn.onclick = () => {
      const idx = parseInt(btn.dataset.index);
      upcoming.splice(idx, 1);
      renderUpcoming();
      showToast('🎉 Workout completed! Great job!');
    };
  });
}

document.getElementById('scheduleForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const type = document.getElementById('wType').value;
  const dur = document.getElementById('wDuration').value;
  const dateRaw = document.getElementById('wDate').value;
  const time = document.getElementById('wTime').value;
  if (!dateRaw || !time) return;
  const dateObj = new Date(dateRaw);
  const dateStr = dateObj.toLocaleDateString('en-ZA', { weekday: 'short', day: 'numeric', month: 'short' });
  upcoming.push({ type, date: dateStr, time, duration: parseInt(dur) });
  renderUpcoming();
  showToast(`✨ ${type} scheduled for ${dateStr} at ${time}`);
  e.target.reset();
  document.getElementById('wDate').min = new Date().toISOString().split('T')[0];
});

document.getElementById('quickLogBtn').onclick = () => {
  const act = document.getElementById('qActivity').value;
  const dur = document.getElementById('qDur').value;
  const cal = document.getElementById('qCal').value;
  if (!dur || !cal) { showToast('Please fill duration and calories', 2000); return; }
  showToast(`🔥 Logged: ${act} · ${dur} min · ${cal} kcal burned!`);
  document.getElementById('qDur').value = '';
  document.getElementById('qCal').value = '';
};

// Week stats
document.getElementById('weekStats').innerHTML = `
  <div class="stat-box"><p class="stat-box__num">3</p><p>Workouts</p></div>
  <div class="stat-box"><p class="stat-box__num">653</p><p>Kcal burned</p></div>
  <div class="stat-box"><p class="stat-box__num">107</p><p>Active minutes</p></div>
  <div class="stat-box"><p class="stat-box__num">7</p><p>Day streak 🔥</p></div>
`;

// Personal bests
document.getElementById('personalBests').innerHTML = `
  <div style="display:flex;justify-content:space-between;margin:8px 0"><span>🏃 Fastest 5km</span><strong>28:14</strong></div>
  <div style="display:flex;justify-content:space-between;margin:8px 0"><span>🏋️ Max bench press</span><strong>55 kg</strong></div>
  <div style="display:flex;justify-content:space-between;margin:8px 0"><span>🚴 Longest ride</span><strong>34.2 km</strong></div>
`;

renderUpcoming();

// Chatbot
setupChatbot();
document.getElementById('chatbot-fab').onclick = () => window.toggleChat();
document.getElementById('chat-send').onclick = () => window.sendChat();
document.getElementById('chat-input').addEventListener('keypress', (e) => { if (e.key === 'Enter') window.sendChat(); });