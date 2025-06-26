// Import our CSS
import '../styles/main.css';

// Import components and functionality
import './darkMode.js';
import './mobileMenu.js';

// Import content
import contentData from '../data/content.json';

// Function to load content from JSON
function loadContent() {
  // Set document title
  document.title = contentData.site.title;
  
  // Load site-wide elements
  loadSiteElements();
  
  // Determine current page and load page-specific content
  const currentPath = window.location.pathname;
  
  if (currentPath === '/' || currentPath.endsWith('/index.html')) {
    loadHomePage();
  } else if (currentPath.includes('/about')) {
    loadAboutPage();
  } else if (currentPath.includes('/pricing')) {
    loadPricingPage();
  }
}

// Load site-wide elements like logo
function loadSiteElements() {
  // Load logo if it exists
  const logoElements = document.querySelectorAll('[data-content="logo"]');
  logoElements.forEach(element => {
    // Clear any existing content first
    element.innerHTML = '';
    
    // Add the logo image
    const img = document.createElement('img');
    img.src = contentData.site.logo.src;
    img.alt = contentData.site.logo.alt;
    element.appendChild(img);
  });
  
  // Load copyright text
  const copyrightElements = document.querySelectorAll('[data-content="copyright"]');
  copyrightElements.forEach(element => {
    element.textContent = contentData.footer.copyright;
  });
}

// Load home page content
function loadHomePage() {
  const homeData = contentData.pages.home;
  
  // Load hero section
  const heroTitle = document.querySelector('[data-content="hero-title"]');
  if (heroTitle) heroTitle.textContent = homeData.hero.title;
  
  const heroSubtitle = document.querySelector('[data-content="hero-subtitle"]');
  if (heroSubtitle) heroSubtitle.textContent = homeData.hero.subtitle;
  
  const heroPrimaryCta = document.querySelector('[data-content="hero-cta-primary"]');
  if (heroPrimaryCta) {
    heroPrimaryCta.textContent = homeData.hero.cta.primary.text;
    heroPrimaryCta.href = homeData.hero.cta.primary.url;
  }
  
  const heroSecondaryCta = document.querySelector('[data-content="hero-cta-secondary"]');
  if (heroSecondaryCta) {
    heroSecondaryCta.textContent = homeData.hero.cta.secondary.text;
    heroSecondaryCta.href = homeData.hero.cta.secondary.url;
  }
  
  const heroImage = document.querySelector('[data-content="hero-image"]');
  if (heroImage) {
    heroImage.src = homeData.hero.image.src;
    heroImage.alt = homeData.hero.image.alt;
  }
  
  // Load features
  const featuresContainer = document.querySelector('[data-content="features"]');
  if (featuresContainer) {
    featuresContainer.innerHTML = '';
    homeData.features.forEach(feature => {
      const featureEl = document.createElement('div');
      featureEl.className = 'feature-card';
      featureEl.innerHTML = `
        <div class="feature-icon" data-icon="${feature.icon}"></div>
        <h3>${feature.title}</h3>
        <p>${feature.description}</p>
      `;
      featuresContainer.appendChild(featureEl);
    });
  }
}

// Load about page content
function loadAboutPage() {
  const aboutData = contentData.pages.about;
  
  // Load hero section
  const heroTitle = document.querySelector('[data-content="hero-title"]');
  if (heroTitle) heroTitle.textContent = aboutData.hero.title;
  
  const heroSubtitle = document.querySelector('[data-content="hero-subtitle"]');
  if (heroSubtitle) heroSubtitle.textContent = aboutData.hero.subtitle;
  
  const heroImage = document.querySelector('[data-content="hero-image"]');
  if (heroImage) {
    heroImage.src = aboutData.hero.image.src;
    heroImage.alt = aboutData.hero.image.alt;
  }
  
  // Load content sections
  const contentContainer = document.querySelector('[data-content="about-content"]');
  if (contentContainer) {
    contentContainer.innerHTML = '';
    aboutData.content.forEach(section => {
      const sectionEl = document.createElement('div');
      sectionEl.className = 'content-section';
      sectionEl.innerHTML = `
        <h2>${section.title}</h2>
        <p>${section.text}</p>
      `;
      contentContainer.appendChild(sectionEl);
    });
  }
  
  // Load team members
  const teamContainer = document.querySelector('[data-content="team"]');
  if (teamContainer) {
    teamContainer.innerHTML = '';
    aboutData.team.forEach(member => {
      const memberEl = document.createElement('div');
      memberEl.className = 'team-member';
      memberEl.innerHTML = `
        <img src="${member.image}" alt="${member.name}">
        <h3>${member.name}</h3>
        <p>${member.title}</p>
      `;
      teamContainer.appendChild(memberEl);
    });
  }
}

// Load pricing page content
function loadPricingPage() {
  const pricingData = contentData.pages.pricing;
  
  // Load hero section
  const heroTitle = document.querySelector('[data-content="hero-title"]');
  if (heroTitle) heroTitle.textContent = pricingData.hero.title;
  
  const heroSubtitle = document.querySelector('[data-content="hero-subtitle"]');
  if (heroSubtitle) heroSubtitle.textContent = pricingData.hero.subtitle;
  
  // Load pricing plans
  const plansContainer = document.querySelector('[data-content="pricing-plans"]');
  if (plansContainer) {
    plansContainer.innerHTML = '';
    pricingData.plans.forEach(plan => {
      const planEl = document.createElement('div');
      planEl.className = `pricing-plan ${plan.highlighted ? 'highlighted' : ''}`;
      
      let featuresHTML = '';
      plan.features.forEach(feature => {
        featuresHTML += `<li>${feature}</li>`;
      });
      
      planEl.innerHTML = `
        <h3>${plan.name}</h3>
        <div class="price">
          <span class="amount">${plan.price}</span>
          <span class="period">${plan.period}</span>
        </div>
        <p>${plan.description}</p>
        <ul class="features">
          ${featuresHTML}
        </ul>
        <a href="${plan.cta.url}" class="btn btn-primary">${plan.cta.text}</a>
      `;
      plansContainer.appendChild(planEl);
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  loadContent();
});

// Export for use in other modules
export { contentData };
