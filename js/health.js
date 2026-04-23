// health.js
import { auth, onAuthStateChanged } from './auth.js';
import { setupChatbot, showToast } from './utils.js';

onAuthStateChanged(auth, (user) => { if (!user) window.location.href = 'login.html'; });

// Weight sparkline
const weights = [74.0, 73.7, 73.5, 73.3, 73.0, 72.8, 72.6, 72.4];
const minW = Math.min(...weights), maxW = Math.max(...weights), rangeW = maxW - minW || 1;
const wChart = document.getElementById('weightChart');
weights.forEach((w, i) => {
  const bar = document.createElement('div');
  bar.className = 'sparkline-bar' + (i === weights.length - 1 ? ' latest' : '');
  bar.style.height = ((w - minW) / rangeW * 80 + 20) + '%';
  bar.title = w + ' kg';
  wChart.appendChild(bar);
});
document.getElementById('weightDetails').innerHTML = `<span>8 weeks ago: 74.0 kg</span><span>Today: 72.4 kg</span>`;

// Sleep bars
const sleepData = [{ d: 'Mon', h: 7.5 }, { d: 'Tue', h: 6.0 }, { d: 'Wed', h: 8.5 }, { d: 'Thu', h: 7.0 }, { d: 'Fri', h: 5.5 }, { d: 'Sat', h: 8.0 }, { d: 'Sun', h: 7.4 }];
const sleepBars = document.getElementById('sleepBars');
sleepData.forEach(({ d, h }) => {
  sleepBars.innerHTML += `<div class="sleep-bar-row"><span style="width:40px;">${d}</span><div class="sleep-bar-bg"><div class="sleep-bar-fill" style="width:${h / 10 * 100}%"></div></div><span>${h}h</span></div>`;
});
document.getElementById('sleepSummary').innerHTML = `<span>Weekly avg: 7.4h</span><span>Best: 8.5h</span>`;

// Top stats
document.getElementById('topStats').innerHTML = `
  <div class="stat-box"><p class="stat-box__num">72.4</p><p>Weight (kg)</p></div>
  <div class="stat-box"><p class="stat-box__num">24.1</p><p>BMI</p></div>
  <div class="stat-box"><p class="stat-box__num">62</p><p>Resting HR</p></div>
  <div class="stat-box"><p class="stat-box__num">7.4</p><p>Sleep (hrs)</p></div>
  <div class="stat-box"><p class="stat-box__num">22%</p><p>Body Fat</p></div>
`;

// Save measurement
document.getElementById('saveMetricBtn').onclick = () => {
  showToast('✨ Measurement saved successfully!');
  document.getElementById('metricValue').value = '';
};

// Chatbot
setupChatbot();
document.getElementById('chatbot-fab').onclick = () => window.toggleChat();
document.getElementById('chat-send').onclick = () => window.sendChat();
document.getElementById('chat-input').addEventListener('keypress', (e) => { if (e.key === 'Enter') window.sendChat(); });