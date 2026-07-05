// ===== HEADER SCROLL EFFECT =====
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 10);
});

// ===== MOBILE MENU =====
const navToggle = document.querySelector('.nav-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

navToggle.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';

  // Animate hamburger to X
  const spans = navToggle.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});


// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const answer = item.querySelector('.faq-answer');
    const isActive = item.classList.contains('active');

    // Close all
    document.querySelectorAll('.faq-item').forEach(el => {
      el.classList.remove('active');
      el.querySelector('.faq-answer').style.maxHeight = null;
    });

    // Open clicked (if it was closed)
    if (!isActive) {
      item.classList.add('active');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});


// ===== SMOOTH SCROLL for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const headerHeight = header.offsetHeight;
      const targetPos = target.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
  });
});


// ===== SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll('.service-card, .step-card, .clinic-card, .testimonial-card, .faq-item');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity 0.5s ease ${i % 5 * 0.08}s, transform 0.5s ease ${i % 5 * 0.08}s`;
  revealObserver.observe(el);
});


// ===== BOOKING MODAL =====
const modal = document.getElementById('bookingModal');
const modalOverlay = modal.querySelector('.modal-overlay');
const modalClose = modal.querySelector('.modal-close');
const bookingForm = modal.querySelector('.booking-form');

function openBooking() {
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeBooking() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

modalOverlay.addEventListener('click', closeBooking);
modalClose.addEventListener('click', closeBooking);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeBooking();
});

// ===== EASTER EGGS — built by deadboy =====

const deadboyOverlay = document.getElementById('deadboyOverlay');
const deadboyToast = document.getElementById('deadboyToast');
const confettiCanvas = document.getElementById('deadboyConfetti');
const confettiCtx = confettiCanvas.getContext('2d');

// -- CONFETTI ENGINE --
let confettiPieces = [];
let confettiRunning = false;

function resizeConfetti() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeConfetti);
resizeConfetti();

function launchConfetti() {
  confettiPieces = [];
  const colors = ['#009688','#00bfa5','#26c6da','#ff6f61','#ffd54f','#ba68c8','#4fc3f7','#81c784','#ff8a65'];
  for (let i = 0; i < 150; i++) {
    confettiPieces.push({
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * confettiCanvas.height - confettiCanvas.height,
      w: Math.random() * 10 + 5,
      h: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 4,
      vy: Math.random() * 4 + 2,
      spin: Math.random() * 0.2 - 0.1,
      angle: Math.random() * Math.PI * 2,
      opacity: 1
    });
  }
  if (!confettiRunning) {
    confettiRunning = true;
    animateConfetti();
  }
}

function animateConfetti() {
  confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  let alive = 0;
  confettiPieces.forEach(p => {
    if (p.opacity <= 0) return;
    alive++;
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.08;
    p.angle += p.spin;
    // fade out near bottom
    if (p.y > confettiCanvas.height * 0.85) {
      p.opacity -= 0.02;
    }
    confettiCtx.save();
    confettiCtx.translate(p.x, p.y);
    confettiCtx.rotate(p.angle);
    confettiCtx.globalAlpha = Math.max(0, p.opacity);
    confettiCtx.fillStyle = p.color;
    confettiCtx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    confettiCtx.restore();
  });
  if (alive > 0) {
    requestAnimationFrame(animateConfetti);
  } else {
    confettiRunning = false;
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  }
}

// -- TRIGGER: desktop overlay + confetti --
function triggerDesktop() {
  launchConfetti();
  // let confetti rain for a beat before showing the text
  setTimeout(() => deadboyOverlay.classList.add('active'), 600);
}

// -- TRIGGER: mobile toast + confetti --
function triggerMobile() {
  launchConfetti();
  deadboyToast.classList.add('show');
  setTimeout(() => deadboyToast.classList.remove('show'), 3000);
}

// close overlay
deadboyOverlay.addEventListener('click', () => {
  deadboyOverlay.classList.remove('active');
});

// DESKTOP: Konami Code (↑↑↓↓←→←→BA)
const konamiSequence = [38,38,40,40,37,39,37,39,66,65];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
  if (e.keyCode === konamiSequence[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiSequence.length) {
      konamiIndex = 0;
      triggerDesktop();
    }
  } else {
    konamiIndex = 0;
  }
});

// MOBILE: Shake to reveal
let lastShake = 0;
let shakeCount = 0;

if (window.DeviceMotionEvent) {
  window.addEventListener('devicemotion', (e) => {
    const acc = e.accelerationIncludingGravity;
    if (!acc) return;
    const force = Math.sqrt(acc.x * acc.x + acc.y * acc.y + acc.z * acc.z);
    if (force > 25) {
      const now = Date.now();
      if (now - lastShake > 300) {
        shakeCount++;
        lastShake = now;
      }
      if (shakeCount >= 3) {
        shakeCount = 0;
        triggerMobile();
      }
    }
  });
}

// Handle booking form submission
bookingForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(bookingForm);
  const data = Object.fromEntries(formData.entries());

  // Show success state
  const formInner = bookingForm.querySelector('.form-inner');
  formInner.innerHTML = `
    <div style="text-align:center; padding:40px 20px;">
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#009688" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin:0 auto 20px;">
        <circle cx="12" cy="12" r="10"/>
        <path d="m9 12 2 2 4-4"/>
      </svg>
      <h3 style="font-family:Montserrat,sans-serif; margin-bottom:8px;">Booking Request Sent!</h3>
      <p style="color:#666; font-size:0.95rem; margin-bottom:24px;">
        We'll confirm your appointment at <strong>${data.clinic || 'your selected clinic'}</strong> within 24 hours.
      </p>
      <button type="button" class="btn btn-teal" onclick="closeBooking()">Done</button>
    </div>
  `;
});
