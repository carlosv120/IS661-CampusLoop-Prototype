// Auto-open modal if redirected from login
window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('openSignup') === 'true') {
    localStorage.removeItem('openSignup');
    openModal();
  }
});
