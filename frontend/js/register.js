// register.js
import { auth, createUserWithEmailAndPassword, updateProfile } from './auth.js';

const form = document.getElementById('registerForm');
const alertDiv = document.getElementById('alertMessage');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: `${firstName} ${lastName}` });
    alertDiv.className = 'alert alert--success';
    alertDiv.textContent = '✓ Account created! Redirecting...';
    setTimeout(() => window.location.href = 'dashboard.html', 1500);
  } catch (error) {
    alertDiv.className = 'alert alert--error';
    alertDiv.textContent = error.message;
  }
});

//added functionality
// Inside register.js, add a Google button listener
import { auth, createUserWithEmailAndPassword, updateProfile, googleProvider, signInWithPopup } from './auth.js';

const googleRegisterBtn = document.getElementById('googleRegisterBtn');
if (googleRegisterBtn) {
  googleRegisterBtn.addEventListener('click', async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // Optionally set display name from Google
      const displayName = result.user.displayName || result.user.email.split('@')[0];
      await updateProfile(result.user, { displayName });
      alertDiv.className = 'alert alert--success';
      alertDiv.textContent = '✓ Account created with Google! Redirecting...';
      setTimeout(() => window.location.href = 'dashboard.html', 1500);
    } catch (error) {
      alertDiv.className = 'alert alert--error';
      alertDiv.textContent = error.message;
    }
  });
}