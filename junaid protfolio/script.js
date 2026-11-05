const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((element) => observer.observe(element));

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const typedText = document.querySelector('.typed-text');
if (typedText) {
  const words = JSON.parse(typedText.dataset.words || '["Aspiring Developer","Programming Enthusiast","Technology Explorer"]');
  let index = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typeLoop = () => {
    const currentWord = words[index];

    if (isDeleting) {
      typedText.textContent = currentWord.substring(0, charIndex--);
    } else {
      typedText.textContent = currentWord.substring(0, charIndex++);
    }

    if (!isDeleting && charIndex > currentWord.length) {
      isDeleting = true;
      setTimeout(typeLoop, 1200);
      return;
    }

    if (isDeleting && charIndex < 0) {
      isDeleting = false;
      index = (index + 1) % words.length;
      charIndex = 0;
    }

    const speed = isDeleting ? 60 : 120;
    setTimeout(typeLoop, speed);
  };

  typeLoop();
}

const cards = document.querySelectorAll('[data-tilt]');
cards.forEach((card) => {
  card.addEventListener('mousemove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 16;
    const rotateX = (0.5 - (y / rect.height)) * 16;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
  });
});

const particlesCanvas = document.getElementById('particles');
if (particlesCanvas) {
  const ctx = particlesCanvas.getContext('2d');
  const particles = [];
  const particleCount = 110;

  const resizeCanvas = () => {
    particlesCanvas.width = window.innerWidth * window.devicePixelRatio;
    particlesCanvas.height = window.innerHeight * window.devicePixelRatio;
    particlesCanvas.style.width = window.innerWidth + 'px';
    particlesCanvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
  };

  const createParticle = () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    radius: Math.random() * 2.2 + 0.7,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    alpha: Math.random() * 0.7 + 0.2
  });

  const initParticles = () => {
    particles.length = 0;
    for (let i = 0; i < particleCount; i += 1) {
      particles.push(createParticle());
    }
  };

  const drawParticles = () => {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > window.innerWidth) particle.vx *= -1;
      if (particle.y < 0 || particle.y > window.innerHeight) particle.vy *= -1;

      ctx.beginPath();
      ctx.fillStyle = `rgba(126, 155, 255, ${particle.alpha})`;
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(drawParticles);
  };

  resizeCanvas();
  initParticles();
  drawParticles();

  window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
  });
}

document.querySelector('.contact-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const submitButton = event.currentTarget.querySelector('button[type="submit"]');
  if (submitButton) {
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Message Sent';
    submitButton.disabled = true;

    setTimeout(() => {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
      event.currentTarget.reset();
    }, 2000);
  }
});
