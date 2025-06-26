// Import content data
import { contentData } from '../scripts/main.js';

// Create and export the navbar component
export function createNavbar() {
  // Create the navbar element
  const navbar = document.createElement('nav');
  navbar.className = 'bg-white dark:bg-gray-800 shadow-md';
  
  // Create the container for the navbar content
  const container = document.createElement('div');
  container.className = 'container mx-auto px-4 py-4 flex items-center justify-between';
  navbar.appendChild(container);
  
  // Create the logo section
  const logoSection = document.createElement('div');
  logoSection.className = 'flex items-center';
  
  const logoLink = document.createElement('a');
  logoLink.href = '/';
  logoLink.className = 'text-xl font-bold text-blue-600 dark:text-blue-400';
  logoLink.setAttribute('data-content', 'logo');
  
  // If no logo image is loaded from content, use text
  if (!contentData.site.logo || !contentData.site.logo.src) {
    logoLink.textContent = contentData.site.title;
  }
  
  logoSection.appendChild(logoLink);
  container.appendChild(logoSection);
  
  // Create the desktop navigation
  const desktopNav = document.createElement('div');
  desktopNav.className = 'hidden lg:flex items-center space-x-8';
  
  // Add navigation links from content
  if (contentData.navigation && contentData.navigation.main) {
    contentData.navigation.main.forEach(item => {
      const link = document.createElement('a');
      link.href = item.url;
      link.textContent = item.text;
      link.className = 'text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors';
      desktopNav.appendChild(link);
    });
  }
  
  // Add dark mode toggle
  const darkModeToggle = document.createElement('div');
  darkModeToggle.className = 'dark-mode-toggle ml-4 flex items-center';
  
  const toggleLabel = document.createElement('label');
  toggleLabel.className = 'flex items-center cursor-pointer';
  
  const toggleInput = document.createElement('input');
  toggleInput.type = 'checkbox';
  toggleInput.className = 'toggle-checkbox sr-only';
  
  const toggleSpan = document.createElement('span');
  toggleSpan.className = 'toggle-label w-10 h-6 rounded-full';
  
  const toggleText = document.createElement('span');
  toggleText.className = 'ml-2 text-sm text-gray-600 dark:text-gray-300';
  toggleText.textContent = 'Dark Mode';
  
  toggleLabel.appendChild(toggleInput);
  toggleLabel.appendChild(toggleSpan);
  toggleLabel.appendChild(toggleText);
  darkModeToggle.appendChild(toggleLabel);
  
  desktopNav.appendChild(darkModeToggle);
  container.appendChild(desktopNav);
  
  // Create the mobile hamburger button
  const hamburgerButton = document.createElement('button');
  hamburgerButton.className = 'hamburger-button lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-md focus:outline-none';
  hamburgerButton.setAttribute('aria-label', 'Menu');
  
  // Create hamburger lines
  for (let i = 0; i < 3; i++) {
    const line = document.createElement('span');
    line.className = 'hamburger-line my-0.5';
    hamburgerButton.appendChild(line);
  }
  
  container.appendChild(hamburgerButton);
  
  // Create the mobile menu
  const mobileMenu = document.createElement('div');
  mobileMenu.className = 'mobile-menu';
  
  const mobileMenuContent = document.createElement('div');
  mobileMenuContent.className = 'py-6 px-4 h-full flex flex-col';
  
  // Mobile menu header
  const mobileMenuHeader = document.createElement('div');
  mobileMenuHeader.className = 'flex items-center justify-between mb-8';
  
  const mobileLogo = document.createElement('a');
  mobileLogo.href = '/';
  mobileLogo.className = 'text-xl font-bold text-blue-600 dark:text-blue-400';
  mobileLogo.textContent = contentData.site.title;
  
  const closeButton = document.createElement('button');
  closeButton.className = 'text-gray-600 dark:text-gray-300 focus:outline-none';
  closeButton.innerHTML = '&times;';
  closeButton.setAttribute('aria-label', 'Close menu');
  
  mobileMenuHeader.appendChild(mobileLogo);
  mobileMenuHeader.appendChild(closeButton);
  mobileMenuContent.appendChild(mobileMenuHeader);
  
  // Mobile menu links
  const mobileLinks = document.createElement('div');
  mobileLinks.className = 'flex flex-col space-y-4';
  
  if (contentData.navigation && contentData.navigation.main) {
    contentData.navigation.main.forEach(item => {
      const link = document.createElement('a');
      link.href = item.url;
      link.textContent = item.text;
      link.className = 'text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 py-2 transition-colors';
      mobileLinks.appendChild(link);
    });
  }
  
  mobileMenuContent.appendChild(mobileLinks);
  
  // Mobile dark mode toggle
  const mobileDarkModeToggle = document.createElement('div');
  mobileDarkModeToggle.className = 'dark-mode-toggle mt-auto py-4 flex items-center';
  
  const mobileToggleLabel = document.createElement('label');
  mobileToggleLabel.className = 'flex items-center cursor-pointer';
  
  const mobileToggleInput = document.createElement('input');
  mobileToggleInput.type = 'checkbox';
  mobileToggleInput.className = 'toggle-checkbox sr-only';
  
  const mobileToggleSpan = document.createElement('span');
  mobileToggleSpan.className = 'toggle-label w-10 h-6 rounded-full';
  
  const mobileToggleText = document.createElement('span');
  mobileToggleText.className = 'ml-2 text-gray-600 dark:text-gray-300';
  mobileToggleText.textContent = 'Dark Mode';
  
  mobileToggleLabel.appendChild(mobileToggleInput);
  mobileToggleLabel.appendChild(mobileToggleSpan);
  mobileToggleLabel.appendChild(mobileToggleText);
  mobileDarkModeToggle.appendChild(mobileToggleLabel);
  
  mobileMenuContent.appendChild(mobileDarkModeToggle);
  mobileMenu.appendChild(mobileMenuContent);
  
  // Create the mobile menu overlay
  const mobileMenuOverlay = document.createElement('div');
  mobileMenuOverlay.className = 'mobile-menu-overlay';
  
  // Add mobile menu and overlay to the document
  document.body.appendChild(mobileMenu);
  document.body.appendChild(mobileMenuOverlay);
  
  // Return the navbar element
  return navbar;
}

// Function to inject the navbar into the page
export function injectNavbar() {
  const navbar = createNavbar();
  
  // Find the navbar container or insert at the beginning of the body
  const navbarContainer = document.getElementById('navbar-container');
  if (navbarContainer) {
    navbarContainer.appendChild(navbar);
  } else {
    document.body.prepend(navbar);
  }
}

// Auto-inject when imported if the DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectNavbar);
} else {
  injectNavbar();
}
