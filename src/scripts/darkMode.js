// Dark mode functionality
const darkModeToggle = () => {
  // Check for saved user preference, if any
  const userPreference = localStorage.getItem('darkMode');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Function to enable dark mode
  const enableDarkMode = () => {
    document.documentElement.classList.add('dark');
    localStorage.setItem('darkMode', 'enabled');
    updateToggleUI(true);
  };
  
  // Function to disable dark mode
  const disableDarkMode = () => {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('darkMode', 'disabled');
    updateToggleUI(false);
  };
  
  // Update the toggle UI to match the current mode
  const updateToggleUI = (isDark) => {
    const toggles = document.querySelectorAll('.dark-mode-toggle input[type="checkbox"]');
    toggles.forEach(toggle => {
      toggle.checked = isDark;
    });
  };
  
  // Set initial state based on user preference or system preference
  if (userPreference === 'enabled') {
    enableDarkMode();
  } else if (userPreference === 'disabled') {
    disableDarkMode();
  } else if (prefersDarkScheme.matches) {
    // If no saved preference, use system preference
    enableDarkMode();
  } else {
    disableDarkMode();
  }
  
  // Listen for toggle clicks
  document.addEventListener('DOMContentLoaded', () => {
    const toggles = document.querySelectorAll('.dark-mode-toggle input[type="checkbox"]');
    
    toggles.forEach(toggle => {
      // Set initial state
      toggle.checked = document.documentElement.classList.contains('dark');
      
      // Add event listener
      toggle.addEventListener('change', () => {
        if (toggle.checked) {
          enableDarkMode();
        } else {
          disableDarkMode();
        }
      });
    });
  });
  
  // Listen for system preference changes
  prefersDarkScheme.addEventListener('change', (e) => {
    // Only change if user hasn't set a preference
    if (!localStorage.getItem('darkMode')) {
      if (e.matches) {
        enableDarkMode();
      } else {
        disableDarkMode();
      }
    }
  });
};

// Initialize dark mode
darkModeToggle();

export default darkModeToggle;
