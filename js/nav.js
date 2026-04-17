// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
hamburger?.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  hamburger.classList.toggle('active');
});

// Dropdown toggle on mobile
document.querySelectorAll('.dropdown > .nav-link').forEach(btn => {
  btn.addEventListener('click', (e) => {
    if (window.innerWidth <= 700) {
      e.preventDefault();
      btn.parentElement.classList.toggle('open');
    }
  });
});

// ===== HERO CAROUSEL =====
(function() {
  const slides = document.querySelectorAll('.carousel-slide');
  const dots   = document.querySelectorAll('.dot');
  if (!slides.length) return;

  let current = 0;
  let timer;

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current]?.classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current]?.classList.add('active');
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function startAuto() {
    clearInterval(timer);
    timer = setInterval(next, 5000);
  }

  document.getElementById('carouselNext')?.addEventListener('click', () => { next(); startAuto(); });
  document.getElementById('carouselPrev')?.addEventListener('click', () => { prev(); startAuto(); });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goTo(parseInt(dot.dataset.index));
      startAuto();
    });
  });

  // Touch / swipe support
  let touchStartX = 0;
  const track = document.getElementById('carouselTrack');
  track?.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track?.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); startAuto(); }
  });

  startAuto();
})();

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  const backToTop = document.querySelector('.back-to-top');
  
  if (window.scrollY > 50) {
    nav?.classList.add('scrolled');
  } else {
    nav?.classList.remove('scrolled');
  }
  
  // Show/hide back to top button
  if (backToTop) {
    if (window.scrollY > 300) {
      backToTop.style.display = 'flex';
      backToTop.style.opacity = '1';
    } else {
      backToTop.style.opacity = '0';
      setTimeout(() => {
        if (window.scrollY <= 300) backToTop.style.display = 'none';
      }, 300);
    }
  }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all cards and info-cards
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.card, .info-card, .section-header');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});

// Form validation for contact page
const contactForm = document.querySelector('form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = contactForm.querySelector('input[type="text"]')?.value;
    const phone = contactForm.querySelector('input[type="tel"]')?.value;
    const email = contactForm.querySelector('input[type="email"]')?.value;
    
    if (!name || !phone || !email) {
      alert('कृपया सभी आवश्यक फ़ील्ड भरें!');
      return;
    }
    
    if (phone.length < 10) {
      alert('कृपया सही मोबाइल नंबर दर्ज करें!');
      return;
    }
    
    alert('धन्यवाद! हम जल्द ही आपसे संपर्क करेंगे। 🙏');
    contactForm.reset();
  });
}

// Add loading animation
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
  
  // Hide back to top initially
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    backToTop.style.display = 'none';
    backToTop.style.opacity = '0';
  }
});
