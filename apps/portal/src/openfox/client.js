// Progressive enhancement only. Release availability is intentionally explicit;
// a successful CI candidate is not a published release or an automatic update.
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', () => {
    const id = link.getAttribute('href')?.slice(1);
    const target = document.getElementById(id || 'main');
    if (target) {
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }
  });
});
