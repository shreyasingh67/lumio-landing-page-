// 🔥 COMPLETE FUNCTIONAL JAVASCRIPT
class LumioApp {
  constructor() {
    this.yearlyPricing = false;
    this.init();
  }

  init() {
    this.cursorEffect();
    this.loader();
    this.progressBar();
    this.mobileMenu();
    this.scrollReveal();
    this.statsAnimation();
    this.smoothScroll();
    this.interactiveButtons();
  }

  // Custom cursor
  cursorEffect() {
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursorRing');
    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.125;
      ringY += (mouseY - ringY) * 0.125;
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    };
    animateRing();

    // Hover effects
    document.querySelectorAll('a, button, .feature-card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        ring.style.width = '52px';
        ring.style.height = '52px';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.width = '10px';
        cursor.style.height = '10px';
        ring.style.width = '36px';
        ring.style.height = '36px';
      });
    });
  }

  // Loader
  loader() {
    window.addEventListener('load', () => {
      document.getElementById('loader').style.opacity = '0';
      setTimeout(() => {
        document.getElementById('loader').style.display = 'none';
      }, 500);
    });
  }

  // Progress bar
  progressBar() {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scroll = window.scrollY;
          const height = document.body.scrollHeight - window.innerHeight;
          const progress = (scroll / height) * 100;
          document.getElementById('progress').style.width = progress + '%';
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // Mobile menu
  mobileMenu() {
    document.getElementById('menuBtn').onclick = () => {
      document.getElementById('navLinks').classList.toggle('active');
    };
  }

  // Scroll reveal
  scrollReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 100);
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  // Stats counter
  statsAnimation() {
    const animateStats = (el) => {
      const final = parseFloat(el.textContent.replace(/[^\d.]/g, ''));
      let count = 0;
      const increment = final / 50;
      const timer = setInterval(() => {
        count += increment;
        if (count >= final) {
          el.textContent = el.dataset.original || el.textContent;
          clearInterval(timer);
        } else {
          el.textContent = Math.floor(count) + (el.dataset.suffix || '');
        }
      }, 30);
    };

    document.querySelectorAll('.stat-num').forEach(stat => {
      stat.dataset.original = stat.textContent;
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          animateStats(stat);
          observer.unobserve(stat);
        }
      });
      observer.observe(stat);
    });
  }

  // Smooth scroll
  smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        document.getElementById('navLinks').classList.remove('active');
      });
    });
  }

  // Interactive buttons
  interactiveButtons() {
    document.querySelectorAll('.btn-primary, .nav-cta').forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (e.target.onclick) return;
        this.showToast('Coming soon! 🚀', 'success');
      });
    });
  }

  // Toast notifications
  showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type} show`;
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

  // Email forms
  static submitEmail(emailId) {
    const email = document.getElementById(emailId).value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
      LumioApp.showToast('Please enter a valid email ❌', 'error');
      return false;
    }
    
    // Simulate API call
    setTimeout(() => {
      LumioApp.showToast('Welcome to Lumio! Check your email 🎉', 'success');
      document.getElementById(emailId).value = '';
      document.querySelector('.email-form').classList.add('success');
      setTimeout(() => {
        document.querySelector('.email-form').classList.remove('success');
      }, 2000);
    }, 800);
    
    return true;
  }

  // Pricing toggle
  togglePricing() {
    this.yearlyPricing = !this.yearlyPricing;
    const priceEl = document.querySelector('.plan-card.featured .amount');
    const periodEl = document.querySelector('.plan-card.featured .period');
    const toggleBtn = event.target;
    
    if (this.yearlyPricing) {
      priceEl.textContent = '$90';
      periodEl.textContent = '/year (save 17%)';
      toggleBtn.textContent = 'Switch to Monthly';
    } else {
      priceEl.textContent = '$9';
      periodEl.textContent = '/month';
      toggleBtn.textContent = 'Switch to Yearly';
    }
  }
}

// Initialize app
const app = new LumioApp();

// Global functions for onclick handlers
function submitHeroEmail() { LumioApp.submitEmail('heroEmail'); }
function submitCtaEmail() { LumioApp.submitEmail('ctaEmail'); }
function openDemo() {
  document.getElementById('modal').style.display = 'flex';
  app.showToast('Demo opened! 🎬', 'success');
}
function closeModal() {
  document.getElementById('modal').style.display = 'none';
}