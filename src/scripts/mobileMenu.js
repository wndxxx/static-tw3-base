// Mobile menu functionality
const mobileMenu = () => {
  let isMenuOpen = false;
  
  // Function to initialize the mobile menu
  const initMobileMenu = () => {
    // Create references to DOM elements
    const hamburgerButton = document.querySelector('.hamburger-button');
    const mobileMenuElement = document.querySelector('.mobile-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    
    if (!hamburgerButton || !mobileMenuElement || !mobileMenuOverlay) {
      console.error('Mobile menu elements not found');
      return;
    }
    
    // Function to open the menu
    const openMenu = () => {
      mobileMenuElement.classList.add('open');
      mobileMenuOverlay.classList.add('open');
      hamburgerButton.classList.add('open');
      isMenuOpen = true;
      
      // Prevent body scrolling when menu is open
      document.body.style.overflow = 'hidden';
    };
    
    // Function to close the menu
    const closeMenu = () => {
      mobileMenuElement.classList.remove('open');
      mobileMenuOverlay.classList.remove('open');
      hamburgerButton.classList.remove('open');
      isMenuOpen = false;
      
      // Re-enable body scrolling
      document.body.style.overflow = '';
    };
    
    // Toggle menu state
    const toggleMenu = () => {
      if (isMenuOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    };
    
    // Event listeners
    hamburgerButton.addEventListener('click', toggleMenu);
    mobileMenuOverlay.addEventListener('click', closeMenu);
    
    // Close menu when clicking a link inside it
    const menuLinks = mobileMenuElement.querySelectorAll('a');
    menuLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMenu();
      }
    });
    
    // Close menu on window resize if screen becomes large enough
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024 && isMenuOpen) {
        closeMenu();
      }
    });
    
    // Add touch swipe support for closing the menu
    let touchStartX = 0;
    let touchEndX = 0;
    
    mobileMenuElement.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    mobileMenuElement.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
    
    const handleSwipe = () => {
      // If swiped right (for a right-side menu)
      if (touchEndX - touchStartX > 100) {
        closeMenu();
      }
    };
  };
  
  // Initialize when DOM is loaded
  document.addEventListener('DOMContentLoaded', initMobileMenu);
};

// Initialize mobile menu
mobileMenu();

export default mobileMenu;
