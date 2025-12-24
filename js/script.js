const navbar = document.getElementById('navbar');

// ======================================
// 1. DYNAMIC NAVBAR TEXT COLOR (Intersection Observer)
// ======================================

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    // Check if the section is intersecting the viewport near the top
    if (entry.isIntersecting) {
      const theme = entry.target.getAttribute('data-theme');
      
      // Remove any previous theme class
      navbar.classList.remove('light-text', 'dark-text');
      
      // Apply the new theme class based on the section's data-theme
      if (theme === 'light') {
        // Light background section (Projects/About) -> MUST use dark text
        navbar.classList.add('dark-text'); 
      } else {
        // Dark background section (Hero/Contact) -> MUST use light text (white)
        navbar.classList.add('light-text'); 
      }
    }
  });
}, { 
    // Trigger the switch when the section is 100px from the top
    rootMargin: '-100px 0px 0px 0px' 
});

// Observe all sections with the 'data-theme' attribute
document.querySelectorAll('section[data-theme]').forEach(sec => {
  observer.observe(sec);
});

// Set the default state (on the Hero section)
navbar.classList.add('light-text');

// ======================================
// 2. SMOOTH SCROLLING FALLBACK
// ======================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Only trigger JS fallback if CSS scroll-behavior isn't supported/active
        if (typeof document.body.style.scrollBehavior === 'undefined' || document.body.style.scrollBehavior !== 'smooth') {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});