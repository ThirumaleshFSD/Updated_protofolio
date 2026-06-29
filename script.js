/* ===================================
   THIRUMALESH PORTFOLIO - JavaScript
   =================================== */

// ========================
// TYPED.JS INITIALIZATION
// ========================
document.addEventListener('DOMContentLoaded', () => {

  // Typed.js for hero section
  const typed = new Typed('#typedText', {
    strings: [
      'Full-Stack Developer',
      'AI Learner',
      'MERN Stack Developer',
      'Cybersecurity Enthusiast',
      'Future Entrepreneur',
      'Google Aspirant 🚀'
    ],
    typeSpeed: 60,
    backSpeed: 40,
    backDelay: 2000,
    loop: true,
    cursorChar: '|',
  });

  // ========================
  // PARTICLE SYSTEM
  // ========================
  const particlesContainer = document.getElementById('particles');
  const particleCount = 40;

  for (let i = 0; i < particleCount; i++) {
    createParticle();
  }

  function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    const size = Math.random() * 4 + 1;
    const x = Math.random() * 100;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 15;
    const hue = Math.random() > 0.5 ? '260deg' : '190deg';

    particle.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${x}%;
      background: hsl(${hue}, 80%, 65%);
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
    `;

    particlesContainer.appendChild(particle);
  }

  // ========================
  // HEADER SCROLL EFFECT
  // ========================
  const header = document.getElementById('header');
  const scrollTopBtn = document.getElementById('scrollTop');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Header glass effect
    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll to top button
    if (scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }

    // Active nav link
    updateActiveNav();
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ========================
  // ACTIVE NAVIGATION
  // ========================
  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar a');
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // ========================
  // MOBILE HAMBURGER MENU
  // ========================
  const hamburger = document.getElementById('hamburger');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileNavOverlay.classList.toggle('active');
    document.body.style.overflow = mobileNavOverlay.classList.contains('active') ? 'hidden' : '';
  });

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileNavOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // ========================
  // DARK / LIGHT THEME TOGGLE
  // ========================
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const savedTheme = localStorage.getItem('theme') || 'dark';

  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon(next);
  });

  function updateThemeIcon(theme) {
    if (theme === 'dark') {
      themeIcon.className = 'bx bx-moon';
    } else {
      themeIcon.className = 'bx bx-sun';
    }
  }

  // ========================
  // SCROLL REVEAL ANIMATION
  // ========================
  const revealEls = document.querySelectorAll('.section-header, .about-grid, .timeline-item, .skill-category, .service-card, .project-card, .contact-grid');

  revealEls.forEach(el => {
    el.classList.add('reveal');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealEls.forEach(el => observer.observe(el));

  // ========================
  // SKILL BAR ANIMATION
  // ========================
  const skillFills = document.querySelectorAll('.skill-fill');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const width = fill.getAttribute('data-width');
        setTimeout(() => {
          fill.style.width = width + '%';
        }, 200);
        skillObserver.unobserve(fill);
      }
    });
  }, { threshold: 0.3 });

  skillFills.forEach(fill => skillObserver.observe(fill));

  // ========================
  // COUNTER ANIMATION
  // ========================
  const counters = document.querySelectorAll('.stat-number');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'));
        let current = 0;
        const increment = target / 40;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            counter.textContent = target;
            clearInterval(timer);
          } else {
            counter.textContent = Math.floor(current);
          }
        }, 30);
        counterObserver.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  // ========================
  // PROJECT FILTER
  // ========================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
          card.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ========================
  // CONTACT FORM HANDLING
  // ========================
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const btnText = document.getElementById('btnText');
  const btnLoading = document.getElementById('btnLoading');
  const formSuccess = document.getElementById('formSuccess');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Show loading state
    btnText.style.display = 'none';
    btnLoading.style.display = 'flex';
    submitBtn.disabled = true;

    // Simulate form submission (2 seconds)
    setTimeout(() => {
      btnText.style.display = 'flex';
      btnLoading.style.display = 'none';
      submitBtn.disabled = false;
      formSuccess.style.display = 'flex';
      contactForm.reset();

      setTimeout(() => {
        formSuccess.style.display = 'none';
      }, 5000);
    }, 2000);
  });

  // ========================
  // SMOOTH SCROLL FOR NAV LINKS
  // ========================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ========================
  // CURSOR GLOW EFFECT (Desktop)
  // ========================
  if (window.matchMedia('(pointer: fine)').matches) {
    const cursor = document.createElement('div');
    cursor.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: rgba(108, 99, 255, 0.6);
      pointer-events: none;
      z-index: 9999;
      transition: transform 0.15s ease, opacity 0.3s ease;
      mix-blend-mode: screen;
      transform: translate(-50%, -50%);
    `;
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });

    document.addEventListener('mousedown', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1.8)';
    });

    document.addEventListener('mouseup', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  }

  // ========================
  // TILT EFFECT ON CARDS (Desktop)
  // ========================
  if (window.matchMedia('(pointer: fine)').matches) {
    const tiltCards = document.querySelectorAll('.service-card, .project-card, .timeline-card');

    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotX = -(y / rect.height) * 6;
        const rotY = (x / rect.width) * 6;
        card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // ========================
  // IMAGE FALLBACK
  // ========================
  const profileImg = document.getElementById('profileImg');
  if (profileImg) {
    profileImg.onerror = () => {
      profileImg.style.display = 'none';
      const parent = profileImg.parentElement;
      const fallback = document.createElement('div');
      fallback.style.cssText = `
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: linear-gradient(135deg, #6c63ff, #00d4ff);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 6rem;
        color: white;
        font-weight: 800;
        font-family: 'Outfit', sans-serif;
      `;
      fallback.textContent = 'T';
      parent.insertBefore(fallback, profileImg);
    };
  }

  // ========================
  // KEYBOARD SHORTCUTS
  // ========================
  document.addEventListener('keydown', (e) => {
    // Press 'T' to toggle theme
    if (e.key === 't' && !e.ctrlKey && !e.metaKey && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
      themeToggle.click();
    }
    // Escape to close mobile menu
    if (e.key === 'Escape' && mobileNavOverlay.classList.contains('active')) {
      hamburger.classList.remove('active');
      mobileNavOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // ========================
  // RESUME MANAGER LOGIC
  // ========================
  const resumeModal = document.getElementById('resumeModal');
  const resumeManagerToggle = document.getElementById('resumeManagerToggle');
  const closeResumeModal = document.getElementById('closeResumeModal');
  const heroResumeBtn = document.getElementById('heroResumeBtn');
  const aboutResumeBtn = document.getElementById('aboutResumeBtn');
  const viewResumeBtn = document.getElementById('viewResumeBtn');
  const downloadResumeBtn = document.getElementById('downloadResumeBtn');
  const deleteResumeBtn = document.getElementById('deleteResumeBtn');
  const resumeDropZone = document.getElementById('resumeDropZone');
  const resumeInput = document.getElementById('resumeInput');
  const resumeStatusName = document.getElementById('resumeStatusName');
  const adminActions = document.getElementById('adminActions');

  // Load state on page start
  updateResumeUI();

  // Show / Close Resume Manager Modal
  if (resumeManagerToggle) {
    resumeManagerToggle.addEventListener('click', () => {
      resumeModal.classList.add('active');
    });
  }

  if (closeResumeModal) {
    closeResumeModal.addEventListener('click', () => {
      resumeModal.classList.remove('active');
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target === resumeModal) {
      resumeModal.classList.remove('active');
    }
  });

  // Esc key closes resume modal too
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal && resumeModal.classList.contains('active')) {
      resumeModal.classList.remove('active');
    }
  });

  // Action buttons
  if (heroResumeBtn) {
    heroResumeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      viewCurrentResume();
    });
  }

  if (aboutResumeBtn) {
    aboutResumeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      viewCurrentResume();
    });
  }

  if (viewResumeBtn) {
    viewResumeBtn.addEventListener('click', () => {
      viewCurrentResume();
    });
  }

  if (downloadResumeBtn) {
    downloadResumeBtn.addEventListener('click', () => {
      downloadCurrentResume();
    });
  }

  if (deleteResumeBtn) {
    deleteResumeBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to delete your uploaded resume? This will revert back to the default resume.')) {
        localStorage.removeItem('uploaded_resume');
        localStorage.removeItem('uploaded_resume_name');
        updateResumeUI();
        alert('Uploaded resume deleted successfully!');
      }
    });
  }

  // Trigger file browse when clicking drop zone
  if (resumeDropZone) {
    resumeDropZone.addEventListener('click', () => {
      resumeInput.click();
    });

    // Drag and drop event listeners
    ['dragenter', 'dragover'].forEach(eventName => {
      resumeDropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        resumeDropZone.classList.add('dragover');
      }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      resumeDropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        resumeDropZone.classList.remove('dragover');
      }, false);
    });

    resumeDropZone.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      const files = dt.files;
      if (files && files.length > 0) {
        handleResumeFile(files[0]);
      }
    });
  }

  if (resumeInput) {
    resumeInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files.length > 0) {
        handleResumeFile(e.target.files[0]);
      }
    });
  }

  // UI state manager
  function updateResumeUI() {
    const uploadedResume = localStorage.getItem('uploaded_resume');
    const uploadedResumeName = localStorage.getItem('uploaded_resume_name');

    if (uploadedResume && uploadedResumeName) {
      if (resumeStatusName) resumeStatusName.textContent = uploadedResumeName;
      if (adminActions) adminActions.style.display = 'flex';
    } else {
      if (resumeStatusName) resumeStatusName.textContent = 'Default Resume (resume.pdf)';
      if (adminActions) adminActions.style.display = 'none';
    }
  }

  // File Upload Processor
  function handleResumeFile(file) {
    if (!file) return;

    // Check if PDF
    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      alert('Only PDF files are accepted for the resume upload.');
      return;
    }

    // Check file size (localStorage is limited to ~5MB, so keep it under 3.5MB to be safe)
    if (file.size > 3.5 * 1024 * 1024) {
      alert('The PDF file is too large. Please upload a compressed PDF under 3.5MB to ensure it can be saved in local browser storage.');
      return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const base64Data = e.target.result;
        localStorage.setItem('uploaded_resume', base64Data);
        localStorage.setItem('uploaded_resume_name', file.name);
        updateResumeUI();
        alert('Resume uploaded and updated successfully!');
      } catch (err) {
        console.error(err);
        alert('Failed to save the resume due to local browser storage limits. Please try a smaller PDF file.');
      }
    };
    reader.readAsDataURL(file);
  }

  // View PDF
  function viewCurrentResume() {
    const uploadedResume = localStorage.getItem('uploaded_resume');
    const uploadedResumeName = localStorage.getItem('uploaded_resume_name');

    if (uploadedResume && uploadedResumeName) {
      openBase64PDF(uploadedResume, uploadedResumeName);
    } else {
      // Fallback: Open default resume.pdf in a new tab
      window.open('resume.pdf', '_blank');
    }
  }

  // Download PDF
  function downloadCurrentResume() {
    const uploadedResume = localStorage.getItem('uploaded_resume');
    const uploadedResumeName = localStorage.getItem('uploaded_resume_name');

    if (uploadedResume && uploadedResumeName) {
      triggerDownload(uploadedResume, uploadedResumeName);
    } else {
      // Fallback: Download default resume.pdf
      const a = document.createElement('a');
      a.href = 'resume.pdf';
      a.download = 'resume.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }

  // Base64 to Blob PDF Opener
  function openBase64PDF(base64Data, filename) {
    try {
      const parts = base64Data.split(';base64,');
      const contentType = parts[0].split(':')[1];
      const raw = window.atob(parts[1]);
      const rawLength = raw.length;
      const uInt8Array = new Uint8Array(rawLength);
      
      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }
      
      const blob = new Blob([uInt8Array], { type: contentType });
      const blobUrl = URL.createObjectURL(blob);
      
      const newTab = window.open(blobUrl, '_blank');
      if (!newTab) {
        // Fallback to download if blocked by browser
        triggerDownload(base64Data, filename);
      }
    } catch (err) {
      console.error('Failed to open PDF blob:', err);
      // Fallback
      triggerDownload(base64Data, filename);
    }
  }

  // Base64 Download Trigger
  function triggerDownload(base64Data, filename) {
    const a = document.createElement('a');
    a.href = base64Data;
    a.download = filename || 'resume.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

});
