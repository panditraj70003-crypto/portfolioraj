/* ── script.js ── */

/* ─── NAV: scroll effect + hamburger ─── */
const nav       = document.getElementById('nav');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav__links');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ─── REVEAL on scroll ─── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // stagger children that are .reveal inside the same parent
        entry.target.style.transitionDelay = `${i * 0.05}s`;
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ─── CONTACT FORM via Formspree ─── */
const contactForm = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');
const btnText     = document.getElementById('btnText');
const formNote    = document.getElementById('formNote');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name    = document.getElementById('senderName').value.trim();
  const email   = document.getElementById('senderEmail').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    showNote('Please fill in all fields.', 'error');
    return;
  }

  // Build a mailto link that opens in the user's mail client
  // pointing to Raj's email, with the sender's details in the body
  const subject = encodeURIComponent(`Portfolio Message from ${name}`);
  const body    = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  );
  const mailtoUrl = `mailto:panditraj70003@gmail.com?subject=${subject}&body=${body}`;

  // Open the mailto link
  window.location.href = mailtoUrl;

  // Show success feedback
  btnText.textContent = 'Opening Mail Client… ✅';
  submitBtn.disabled  = true;
  showNote('Your mail client should open. Send the email from there!', 'success');

  // Reset after 5 s
  setTimeout(() => {
    contactForm.reset();
    btnText.textContent  = 'Send Message ✉️';
    submitBtn.disabled   = false;
    formNote.textContent = '';
    formNote.className   = 'form-note';
  }, 5000);
});

function showNote(msg, type) {
  formNote.textContent = msg;
  formNote.className   = `form-note ${type}`;
}

/* ─── Smooth highlight active nav link ─── */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav__links a');

const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navItems.forEach(a => a.style.color = '');
        const active = document.querySelector(`.nav__links a[href="#${entry.target.id}"]`);
        if (active) active.style.color = 'var(--accent)';
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(s => activeObserver.observe(s));