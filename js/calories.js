// calories.js
import { auth, onAuthStateChanged } from './auth.js';
import { setupChatbot, showToast } from './utils.js';

const GOAL = 4000;
let waterMl = 1800;
let foods = { Breakfast: [], Lunch: [], Dinner: [], Snacks: [] };
let macros = { p: 0, c: 0, f: 0 };
let dayOffset = 0;

const macroMap = {
  'Chicken breast (100g)': { p: 31, c: 0, f: 3.6, kcal: 165 },
  'Brown rice (1 cup)': { p: 5, c: 45, f: 1.8, kcal: 216 },
  'Greek yogurt (150g)': { p: 15, c: 9, f: 0.7, kcal: 100 },
  'Banana': { p: 1.3, c: 27, f: 0.4, kcal: 105 },
  'Oats (50g)': { p: 6, c: 30, f: 3, kcal: 177 },
  'Eggs (2 large)': { p: 13, c: 1, f: 10, kcal: 143 }
};

// Auth protection
onAuthStateChanged(auth, (user) => {
  if (!user) window.location.href = 'login.html';
});

function updateDate() {
  const d = new Date(); d.setDate(d.getDate() + dayOffset);
  document.getElementById('dateLabel').textContent = d.toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long' });
}
function changeDay(n) { dayOffset += n; updateDate(); render(); }
document.getElementById('prevDayBtn').onclick = () => changeDay(-1);
document.getElementById('nextDayBtn').onclick = () => changeDay(1);
updateDate();

function getTotalCals() { return Object.values(foods).flat().reduce((s, f) => s + f.kcal, 0); }

function render() {
  const total = getTotalCals();
  document.getElementById('calConsumed').textContent = total;
  document.getElementById('calRemaining').textContent = Math.max(0, GOAL - total) + ' left';
  const pct = Math.min(total / GOAL, 1);
  document.getElementById('calorieRing').style.strokeDashoffset = 477.5 * (1 - pct);
  document.getElementById('macroP').textContent = Math.round(macros.p) + ' / 160 g';
  document.getElementById('macroC').textContent = Math.round(macros.c) + ' / 250 g';
  document.getElementById('macroF').textContent = Math.round(macros.f) + ' / 65 g';
  document.getElementById('pBar').style.width = Math.min(macros.p / 160 * 100, 100) + '%';
  document.getElementById('cBar').style.width = Math.min(macros.c / 250 * 100, 100) + '%';
  document.getElementById('fBar').style.width = Math.min(macros.f / 65 * 100, 100) + '%';
  ['Breakfast', 'Lunch', 'Dinner', 'Snacks'].forEach(meal => {
    const el = document.getElementById(meal.toLowerCase() + '-items');
    const totSpan = document.getElementById(meal.toLowerCase() + 'Total');
    const mTotal = foods[meal].reduce((s, f) => s + f.kcal, 0);
    totSpan.textContent = mTotal + ' kcal';
    el.innerHTML = foods[meal].map((f, i) => `<div class="food-item"><div><strong>${escapeHtml(f.name)}</strong><br/><small>${f.meal}</small></div><div>${f.kcal} kcal <button class="remove-food" data-meal="${meal}" data-idx="${i}" style="background:none;border:none;color:#DB2777;">✕</button></div></div>`).join('');
  });
  document.getElementById('waterAmt').textContent = (waterMl / 1000).toFixed(1) + ' L';
  document.getElementById('waterFill').style.width = Math.min(waterMl / 2500 * 100, 100) + '%';
  // Attach remove handlers
  document.querySelectorAll('.remove-food').forEach(btn => {
    btn.onclick = () => removeFood(btn.dataset.meal, parseInt(btn.dataset.idx));
  });
}

function addFood() {
  const name = document.getElementById('foodName').value.trim();
  const kcal = parseInt(document.getElementById('foodCals').value) || 0;
  const meal = document.getElementById('foodMeal').value;
  if (!name) return;
  const m = macroMap[name] || { p: kcal * 0.08, c: kcal * 0.12, f: kcal * 0.03, kcal: kcal || 150 };
  foods[meal].push({ name, kcal: m.kcal, meal });
  macros.p += m.p; macros.c += m.c; macros.f += m.f;
  document.getElementById('foodName').value = '';
  document.getElementById('foodCals').value = '';
  render();
}
document.getElementById('addFoodBtn').onclick = addFood;

function removeFood(meal, idx) {
  const f = foods[meal][idx];
  const m = macroMap[f.name] || { p: f.kcal * 0.08, c: f.kcal * 0.12, f: f.kcal * 0.03 };
  macros.p -= m.p; macros.c -= m.c; macros.f -= m.f;
  foods[meal].splice(idx, 1);
  render();
}

function addWater(ml) {
  waterMl = Math.min(waterMl + ml, 4000);
  render();
}
document.querySelectorAll('.water-add').forEach(btn => {
  btn.onclick = () => addWater(parseInt(btn.dataset.ml));
});

function escapeHtml(str) {
  return str.replace(/[&<>]/g, function(m) {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    return m;
  });
}

// Chatbot
setupChatbot();
document.getElementById('chatbot-fab').onclick = () => window.toggleChat();
document.getElementById('chat-send').onclick = () => window.sendChat();
document.getElementById('chat-input').addEventListener('keypress', (e) => { if (e.key === 'Enter') window.sendChat(); });

render();