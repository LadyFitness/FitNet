// dashboard.js
import { auth, onAuthStateChanged, signOut } from './auth.js';
import { initWeeklyChart, showToast, setupChatbot, initAddGoalFeature } from './utils.js';

// Auth protection
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = 'login.html';
  } else {
    const displayName = user.displayName || user.email.split('@')[0];
    document.getElementById('userName').textContent = displayName;
    document.getElementById('greetingName').textContent = displayName.split(' ')[0];
  }
});

// Sign out
document.getElementById('signOutLink').addEventListener('click', async (e) => {
  e.preventDefault();
  await signOut(auth);
  window.location.href = 'login.html';
});

// Weekly chart
initWeeklyChart('weekChart');

// Notifications bell
document.getElementById('notifBell').addEventListener('click', () => {
  showToast('✨ You have 3 new notifications!');
  document.getElementById('notif-badge').style.display = 'none';
});

// Goals feature
initAddGoalFeature('goalsList', 'goalModal', 'newGoalName');
document.getElementById('addGoalBtn').onclick = () => window.showAddGoal();
document.getElementById('cancelGoalBtn').onclick = () => window.hideAddGoal();
document.getElementById('confirmGoalBtn').onclick = () => window.addGoal();

// Chatbot
setupChatbot();
document.getElementById('chatbot-fab').onclick = () => window.toggleChat();
document.getElementById('chat-send').onclick = () => window.sendChat();
document.getElementById('chat-input').addEventListener('keypress', (e) => { if (e.key === 'Enter') window.sendChat(); });