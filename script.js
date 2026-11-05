const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuButton.addEventListener('click', () => {
  const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isExpanded));
  menuButton.setAttribute('aria-label', isExpanded ? 'Open navigation menu' : 'Close navigation menu');
  navLinks.classList.toggle('is-open', !isExpanded);
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation menu');
    navLinks.classList.remove('is-open');
  });
});

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const contactForm = document.querySelector('#contact-form');
const formNote = document.querySelector('#form-note');
contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;
  const formData = new FormData(contactForm);
  const subject = encodeURIComponent(`COSMIC enquiry from ${formData.get('name')}`);
  const body = encodeURIComponent(`${formData.get('message')}\n\nFrom: ${formData.get('name')} (${formData.get('email')})`);
  formNote.textContent = 'Your email app should open with your enquiry ready to send.';
  window.location.href = `mailto:hello@cosmic.is-a.dev?subject=${subject}&body=${body}`;
});
