// Import content data
import { contentData } from '../scripts/main.js';

// Create and export the footer component
export function createFooter() {
  // Create the footer element
  const footer = document.createElement('footer');
  footer.className = 'bg-gray-100 dark:bg-gray-800 py-12 mt-12';
  
  // Create the container for the footer content
  const container = document.createElement('div');
  container.className = 'container mx-auto px-4';
  footer.appendChild(container);
  
  // Create the footer grid
  const footerGrid = document.createElement('div');
  footerGrid.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8';
  container.appendChild(footerGrid);
  
  // Create the company info section
  const companyInfo = document.createElement('div');
  companyInfo.className = 'col-span-1';
  
  const companyLogo = document.createElement('div');
  companyLogo.className = 'text-xl font-bold text-blue-600 dark:text-blue-400 mb-4';
  companyLogo.setAttribute('data-content', 'logo');
  
  // If no logo image is loaded from content, use text
  if (!contentData.site.logo || !contentData.site.logo.src) {
    companyLogo.textContent = contentData.site.title;
  }
  
  const companyDescription = document.createElement('p');
  companyDescription.className = 'text-gray-600 dark:text-gray-300 mb-4';
  companyDescription.textContent = contentData.site.description;
  
  companyInfo.appendChild(companyLogo);
  companyInfo.appendChild(companyDescription);
  
  // Add social links if available
  if (contentData.footer && contentData.footer.social && contentData.footer.social.length > 0) {
    const socialLinks = document.createElement('div');
    socialLinks.className = 'flex space-x-4 mt-4';
    
    contentData.footer.social.forEach(social => {
      const link = document.createElement('a');
      link.href = social.url;
      link.className = 'text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400';
      link.setAttribute('aria-label', social.name);
      
      // Use icon name or default to text
      if (social.icon) {
        link.innerHTML = `<span class="icon-${social.icon}" aria-hidden="true"></span>`;
      } else {
        link.textContent = social.name;
      }
      
      socialLinks.appendChild(link);
    });
    
    companyInfo.appendChild(socialLinks);
  }
  
  footerGrid.appendChild(companyInfo);
  
  // Add footer navigation columns
  if (contentData.navigation && contentData.navigation.footer) {
    contentData.navigation.footer.forEach(column => {
      const footerColumn = document.createElement('div');
      footerColumn.className = 'col-span-1';
      
      const columnTitle = document.createElement('h3');
      columnTitle.className = 'text-lg font-semibold text-gray-800 dark:text-white mb-4';
      columnTitle.textContent = column.title;
      footerColumn.appendChild(columnTitle);
      
      if (column.links && column.links.length > 0) {
        const linksList = document.createElement('ul');
        linksList.className = 'space-y-2';
        
        column.links.forEach(link => {
          const listItem = document.createElement('li');
          
          const anchor = document.createElement('a');
          anchor.href = link.url;
          anchor.className = 'text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors';
          anchor.textContent = link.text;
          
          listItem.appendChild(anchor);
          linksList.appendChild(listItem);
        });
        
        footerColumn.appendChild(linksList);
      }
      
      footerGrid.appendChild(footerColumn);
    });
  }
  
  // Add copyright section
  const copyrightSection = document.createElement('div');
  copyrightSection.className = 'mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 text-center';
  
  const copyrightText = document.createElement('p');
  copyrightText.className = 'text-gray-600 dark:text-gray-400';
  copyrightText.setAttribute('data-content', 'copyright');
  
  if (contentData.footer && contentData.footer.copyright) {
    copyrightText.textContent = contentData.footer.copyright;
  } else {
    copyrightText.textContent = `© ${new Date().getFullYear()} ${contentData.site.title}. All rights reserved.`;
  }
  
  copyrightSection.appendChild(copyrightText);
  container.appendChild(copyrightSection);
  
  // Return the footer element
  return footer;
}

// Function to inject the footer into the page
export function injectFooter() {
  const footer = createFooter();
  
  // Find the footer container or append to the end of the body
  const footerContainer = document.getElementById('footer-container');
  if (footerContainer) {
    footerContainer.appendChild(footer);
  } else {
    document.body.appendChild(footer);
  }
}

// Auto-inject when imported if the DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectFooter);
} else {
  injectFooter();
}
