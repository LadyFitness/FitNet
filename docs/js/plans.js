// plans.js
import { auth, onAuthStateChanged } from './auth.js';
import { setupChatbot, showToast } from './utils.js';

onAuthStateChanged(auth, (user) => { if (!user) window.location.href = 'login.html'; });

const plans = [
  { name: "Summer Shred 6-Week", tags: "fitness advanced", emoji: "🏋️", desc: "High-intensity weight training + cardio", meta: "6 weeks · 45-60 min · 5×/week" },
  { name: "30-Day Yoga Reset", tags: "fitness beginner home", emoji: "🧘", desc: "Flexibility & stress relief", meta: "30 days · 20-30 min · At home" },
  { name: "Couch to 5K", tags: "fitness beginner", emoji: "🏃", desc: "From couch to 5km in 8 weeks", meta: "8 weeks · 30 min · 3×/week" },
  { name: "Clean Eating Reset", tags: "diet", emoji: "🥗", desc: "4-week whole food nutrition", meta: "4 weeks · 1,800 kcal · High protein" },
  { name: "16:8 Fasting Protocol", tags: "diet beginner", emoji: "⚡", desc: "Intermittent fasting plan", meta: "6 weeks · 16hr fast · Flexible" },
  { name: "Cycling Performance", tags: "fitness advanced", emoji: "🚴", desc: "10-week periodised cycling", meta: "10 weeks · 60-90 min · 4×/week" },
  { name: "No-Gym Body Sculpt", tags: "fitness home beginner", emoji: "💪", desc: "Bodyweight only", meta: "8 weeks · 30-40 min · At home" },
  { name: "Muscle Builder Nutrition", tags: "diet advanced", emoji: "🥩", desc: "High protein muscle gain", meta: "12 weeks · Calorie surplus · 200g protein" }
];

let activePlan = null;
let filter = 'all';

function renderPlans() {
  const filtered = filter === 'all' ? plans : plans.filter(p => p.tags.includes(filter));
  const grid = document.getElementById('plansGrid');
  grid.innerHTML = filtered.map(p => `
    <div class="card plan-card" data-tags="${p.tags}">
      <div class="plan-card__image">${p.emoji}</div>
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <div class="plan-card__meta" style="font-size:0.75rem;color:var(--text-muted);margin:8px 0">${p.meta}</div>
      <button class="btn ${activePlan === p.name ? 'btn--primary' : 'btn--outline'} start-plan-btn" data-name="${p.name}">${activePlan === p.name ? 'Active ✓' : 'Start Plan →'}</button>
    </div>
  `).join('');
  document.querySelectorAll('.start-plan-btn').forEach(btn => {
    btn.onclick = () => startPlan(btn.dataset.name);
  });
}

function startPlan(planName) {
  const plan = plans.find(p => p.name === planName);
  if (!plan) return;
  activePlan = planName;
  localStorage.setItem('activePlan', planName);
  document.getElementById('activePlanCard').style.display = 'block';
  document.getElementById('activePlanName').textContent = plan.name;
  document.getElementById('activePlanDetails').textContent = plan.meta;
  document.getElementById('activePlanProgress').style.width = '48%'; // example
  showToast(`✨ ${plan.name} started! You're on your way.`);
  renderPlans();
}

// Load saved active plan
const saved = localStorage.getItem('activePlan');
if (saved) {
  activePlan = saved;
  const plan = plans.find(p => p.name === saved);
  if (plan) {
    document.getElementById('activePlanCard').style.display = 'block';
    document.getElementById('activePlanName').textContent = plan.name;
    document.getElementById('activePlanDetails').textContent = plan.meta;
    document.getElementById('activePlanProgress').style.width = '48%';
  }
}

// Filters
const filters = ['all', 'fitness', 'diet', 'beginner', 'advanced', 'home'];
const filterContainer = document.getElementById('planFilters');
filterContainer.innerHTML = filters.map(f => `<button class="filter-pill ${f === filter ? 'active' : ''}" data-filter="${f}">${f.charAt(0).toUpperCase() + f.slice(1)}</button>`).join('');
document.querySelectorAll('.filter-pill').forEach(btn => {
  btn.onclick = () => {
    filter = btn.dataset.filter;
    renderPlans();
    document.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  };
});

renderPlans();

// Chatbot
setupChatbot();
document.getElementById('chatbot-fab').onclick = () => window.toggleChat();
document.getElementById('chat-send').onclick = () => window.sendChat();
document.getElementById('chat-input').addEventListener('keypress', (e) => { if (e.key === 'Enter') window.sendChat(); });