// GEHRI NGO Website - Main JavaScript
(function(){
  emailjs.init("voDjOpuYu9xr_fOMW");
})();
// ===================================
// 1. DATA
// ===================================
const focusAreas = [
  {
    id: 1,
    title: "Tree Plantation & Ecology",
    description: "Restoring green cover through mass plantation drives and ecological conservation initiatives.",
    icon: "tree-pine"
  },
  {
    id: 2,
    title: "Community Services",
    description: "Empowering local communities through sustainable development and social welfare programs.",
    icon: "users"
  },
  {
    id: 3,
    title: "Education & Awareness",
    description: "Building environmental consciousness through workshops, campaigns, and educational programs.",
    icon: "book-open"
  },
  {
    id: 4,
    title: "Sustainability & Innovation",
    description: "Implementing innovative solutions for long-term environmental and social sustainability.",
    icon: "lightbulb"
  },
  {
    id: 5,
    title: "Corporate & NGO Partnerships",
    description: "Collaborating with organizations to amplify impact through CSR initiatives and joint programs.",
    icon: "handshake"
  }
];

const galleryImages = [
  {
    id: 1,
    url: "https://images.pexels.com/photos/5029923/pexels-photo-5029923.jpeg",
    caption: "Tree Plantation Drive 2024"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1710093072215-65070f9cf93e",
    caption: "Education Workshop with Students"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1758599668234-68f52db62425",
    caption: "Community Cleanup Initiative"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1693967318820-acbd63a0201b",
    caption: "Restored Forest Area"
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1609868714484-2b2556006301",
    caption: "Sustainability Workshop"
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1761619924480-70ac3ea33b67",
    caption: "Nature Conservation Project"
  }
];

// ===================================
// 2. INITIALIZE ON PAGE LOAD
// ===================================
document.addEventListener('DOMContentLoaded', function() {
  // Initialize Lucide icons
  lucide.createIcons();
  
  // Render dynamic content
  renderFocusAreas();
  renderGallery();
  
  // Setup event listeners
  setupNavigation();
  setupForms();
  setupImpactCounters();
  
  // Initialize smooth scrolling
  initSmoothScroll();
});

// ===================================
// 3. RENDER FOCUS AREAS
// ===================================
function renderFocusAreas() {
  const grid = document.getElementById('focusAreasGrid');
  if (!grid) return;
  
  grid.innerHTML = focusAreas.map(area => `
    <div class="network-card focus-card">
      <div class="focus-icon">
        <i data-lucide="${area.icon}"></i>
      </div>
      <h3 class="network-card-title">${area.title}</h3>
      <p class="network-card-content">${area.description}</p>
    </div>
  `).join('');
  
  // Re-initialize icons for new elements
  lucide.createIcons();
}

// ===================================
// 4. RENDER GALLERY
// ===================================
function renderGallery() {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;
  
  grid.innerHTML = galleryImages.map(image => `
    <div class="gallery-item">
      <img src="${image.url}" alt="${image.caption}" />
      <div class="gallery-caption">
        <p class="body-small" style="color: white;">${image.caption}</p>
      </div>
    </div>
  `).join('');
}

// ===================================
// 5. NAVIGATION
// ===================================
function setupNavigation() {
  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');
  const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
  const closeIcon = mobileMenuBtn.querySelector('.close-icon');
  
  mobileMenuBtn.addEventListener('click', function() {
    mainNav.classList.toggle('mobile-open');
    if (mainNav.classList.contains('mobile-open')) {
      menuIcon.style.display = 'none';
      closeIcon.style.display = 'block';
    } else {
      menuIcon.style.display = 'block';
      closeIcon.style.display = 'none';
    }
  });
  
  // Close mobile menu on link click
  const navLinks = document.querySelectorAll('.network-nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      mainNav.classList.remove('mobile-open');
      menuIcon.style.display = 'block';
      closeIcon.style.display = 'none';
    });
  });
  
  // Sticky header on scroll
  const header = document.getElementById('header');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// ===================================
// 6. SMOOTH SCROLLING
// ===================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Handle donate modal
      if (href === '#donate') {
        e.preventDefault();
        openModal('donateModal');
        return;
      }
      
      // Handle get-involved modal
      if (href === '#get-involved') {
        e.preventDefault();
        // Scroll to section instead of modal
        const section = document.getElementById('get-involved');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
        return;
      }
      
      // Regular smooth scroll
      if (href !== '#' && href !== '#home') {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
}

// ===================================
// 7. IMPACT COUNTERS ANIMATION
// ===================================
function setupImpactCounters() {
  const impactSection = document.getElementById('impact');
  if (!impactSection) return;
  
  const counters = document.querySelectorAll('.impact-number');
  let hasAnimated = false;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        animateCounters();
      }
    });
  }, { threshold: 0.5 });
  
  observer.observe(impactSection);
  
  function animateCounters() {
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepValue = target / steps;
      const stepTime = duration / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += stepValue;
        if (current >= target) {
          counter.textContent = formatNumber(target) + '+';
          clearInterval(timer);
        } else {
          counter.textContent = formatNumber(Math.floor(current));
        }
      }, stepTime);
    });
  }
  
  function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}

// ===================================
// 8. MODAL FUNCTIONS
// ===================================
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Re-initialize icons in modal
    setTimeout(() => lucide.createIcons(), 100);
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Reset forms
    const forms = modal.querySelectorAll('form');
    forms.forEach(form => form.reset());
    
    // Clear selected donation amounts
    const options = modal.querySelectorAll('.donation-option');
    options.forEach(opt => opt.classList.remove('selected'));
  }
}

// Close modal on outside click
window.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal')) {
    closeModal(e.target.id);
  }
});

// ===================================
// 9. DONATION FORM
// ===================================
let selectedDonationAmount = null;

function selectAmount(amount) {
  selectedDonationAmount = amount;
  
  // Clear custom amount
  document.getElementById('customAmount').value = '';
  
  // Update selected state
  const options = document.querySelectorAll('.donation-option');
  options.forEach(opt => opt.classList.remove('selected'));
  event.target.closest('.donation-option').classList.add('selected');
  
  // Update display
  document.getElementById('selectedAmount').textContent = '₹' + amount;
}

// Listen to custom amount input
if (document.getElementById('customAmount')) {
  document.getElementById('customAmount').addEventListener('input', function(e) {
    if (e.target.value) {
      selectedDonationAmount = parseInt(e.target.value);
      // Clear predefined selections
      const options = document.querySelectorAll('.donation-option');
      options.forEach(opt => opt.classList.remove('selected'));
      // Update display
      document.getElementById('selectedAmount').textContent = '₹' + e.target.value;
    }
  });
}

// ===================================
// 10. GET INVOLVED FORM
// ===================================
function openInvolveForm(type) {
  openModal('involveModal');
  
  // Set form type
  document.getElementById('involveType').value = type;
  
  // Update form title and options based on type
  const interestSelect = document.getElementById('interestSelect');
  const formTitle = document.getElementById('involveFormTitle');
  
  if (type === 'student') {
    formTitle.textContent = 'Student Application';
    interestSelect.innerHTML = `
      <option value="">Select Interest Area</option>
      <option value="volunteer">Volunteer</option>
      <option value="internship">Internship</option>
      <option value="workshop">Skill Workshops</option>
    `;
  } else if (type === 'public') {
    formTitle.textContent = 'Join Our Community';
    interestSelect.innerHTML = `
      <option value="">How would you like to contribute?</option>
      <option value="events">Attend Events</option>
      <option value="monthly">Monthly Volunteering</option>
      <option value="advocate">Advocacy</option>
      <option value="other">Other</option>
    `;
  } else if (type === 'corporate') {
    formTitle.textContent = 'Partnership Inquiry';
    interestSelect.innerHTML = `
      <option value="">Partnership Interest</option>
      <option value="csr">CSR Partnership</option>
      <option value="employee">Employee Engagement</option>
      <option value="sponsorship">Project Sponsorship</option>
      <option value="other">Other Collaboration</option>
    `;
  }
}

// ===================================
// 11. FORM SUBMISSIONS
// ===================================
function setupForms() {
  // Contact Form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(contactForm);
      console.log('Contact form submitted:', Object.fromEntries(formData));
      contactForm.addEventListener('submit', function(e) {
  e.preventDefault();

  emailjs.send("service_oht5g3c", "template_hs0qxxt", {
    name: contactForm.name.value,
    email: contactForm.email.value,
    subject: contactForm.subject.value,
    message: contactForm.message.value,
    type: "Contact Form"
  }).then(() => {
    alert("Message sent successfully. We’ll get back to you soon.");
    contactForm.reset();
  }).catch((error) => {
    alert("Message failed to send. Please try again.");
    console.error(error);
  });
});
      lucide.createIcons();
    });
  }
  
  // Donation Form
  const donationForm = document.getElementById('donationForm');
  if (donationForm) {
    donationForm.addEventListener('submit', function(e) {
      e.preventDefault();
      if (!selectedDonationAmount) {
        alert('Please select or enter a donation amount.');
        return;
      }
      const formData = new FormData(donationForm);
      formData.append('amount', selectedDonationAmount);
      console.log('Donation form submitted:', Object.fromEntries(formData));
      alert(`Thank you for your generous donation of ₹${selectedDonationAmount}! Payment integration will be added soon.`);
      closeModal('donateModal');
    });
  }
  
  // Get Involved Form
  const involveForm = document.getElementById('involveForm');
  if (involveForm) {
    involveForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(involveForm);
      const type = document.getElementById('involveType').value;
      console.log(`Get Involved form submitted (${type}):`, Object.fromEntries(formData));
      involveForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const type = document.getElementById('involveType').value;

  emailjs.send("service_oht5g3c", "template_hs0qxxt", {
    name: involveForm.name.value,
    email: involveForm.email.value,
    phone: involveForm.phone.value,
    message: involveForm.message.value,
    subject: involveForm.interest.value,
    type: type
  }).then(() => {
    alert("Your application has been sent successfully.");
    involveForm.reset();
    closeModal('involveModal');
  }).catch((error) => {
    alert("Submission failed. Please try again.");
    console.error(error);
  });
});

    });
  }
}

// ===================================
// 12. UTILITY FUNCTIONS
// ===================================

// Add entrance animations on scroll
const observeElements = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.about-block, .network-card, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
};

// Call after a short delay to ensure content is rendered
setTimeout(observeElements, 500);
