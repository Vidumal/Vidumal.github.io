// 1. Theme Switcher Logic
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

// Check local storage for saved theme
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'light') {
        toggleSwitch.checked = true;
    }
}

// Function to switch theme
function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
}

toggleSwitch.addEventListener('change', switchTheme);


// 2. Loading Screen
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1500);
});


// 3. Scroll Animation (Intersection Observer)
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, observerOptions);

const hiddenElements = document.querySelectorAll('.hero, .about, .skills, .projects, .contact');
hiddenElements.forEach((el) => {
    el.classList.add('hidden');
    observer.observe(el);
});


// 4. Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


// Function to load projects from JSON
async function loadProjects() {
    const container = document.getElementById('projects-container');
    
    // 1. Fetch the data from your JSON file
    try {
        const response = await fetch('projects.json');
        const projects = await response.json();

        // 2. Clear any existing content (optional)
        container.innerHTML = '';

        // 3. Loop through each project and create the HTML
        projects.forEach(project => {
            
            // Create the Tech Stack list HTML
            const techStackHTML = project.tech.map(tech => `<li>${tech}</li>`).join('');

            // Build the Card HTML
            const cardHTML = `
                <article class="project-card glass-panel">
                  <div class="card-header">
                    <i class="fas fa-folder-open"></i>
                    <div class="links">
                       <a href="${project.github}" target="_blank"><i class="fab fa-github"></i></a>
                       <a href="${project.url}"><i class="fas fa-external-link-alt"></i></a>
                    </div>
                  </div>
                  <h3><a href="${project.url}">${project.title}</a></h3>
                  <p>${project.description}</p>
                  <ul class="tech-stack">
                    ${techStackHTML}
                  </ul>
                </article>
            `;

            // 4. Add the card to the container
            container.innerHTML += cardHTML;
        });

    } catch (error) {
        console.error('Error loading projects:', error);
        container.innerHTML = '<p style="text-align:center;">Failed to load projects.</p>';
    }
}

// Run this function when the page loads
window.addEventListener('DOMContentLoaded', loadProjects);