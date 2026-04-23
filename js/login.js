// login.js
import { auth, signInWithEmailAndPassword, googleProvider, signInWithPopup } from './auth.js';

const form = document.getElementById('loginForm');
const alertDiv = document.getElementById('alertMessage');
const googleBtn = document.getElementById('googleSignInBtn');

// Email/Password sign-in
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alertDiv.className = 'alert alert--success';
    alertDiv.textContent = '✓ Signed in! Redirecting...';
    setTimeout(() => window.location.href = 'dashboard.html', 1200);
  } catch (error) {
    alertDiv.className = 'alert alert--error';
    alertDiv.textContent = error.message;
  }
});

// Google Sign-In
googleBtn.addEventListener('click', async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    // User is signed in
    alertDiv.className = 'alert alert--success';
    alertDiv.textContent = '✓ Signed in with Google! Redirecting...';
    setTimeout(() => window.location.href = 'dashboard.html', 1200);
  } catch (error) {
    alertDiv.className = 'alert alert--error';
    alertDiv.textContent = error.message;
  }
});