// Global state management
const state = {
    currentPage: 'home',
    services: [],
    contractors: [],
    laborers: [],
    projects: [],
    filteredServices: [],
    filteredContractors: [],
    filteredLaborers: [],
    filteredProjects: []
};

// API endpoints
const API_BASE = '/api';

// Utility functions
function showLoading() {
    document.getElementById('loading-spinner').classList.add('show');
}

function hideLoading() {
    document.getElementById('loading-spinner').classList.remove('show');
}

function showError(message) {
    alert(message); // In production, use a proper toast/notification system
}

// API functions
async function fetchData(endpoint) {
    try {
        showLoading();
        const response = await fetch(`${API_BASE}${endpoint}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        showError(`Error fetching data: ${error.message}`);
        return [];
    } finally {
        hideLoading();
    }
}

async function postData(endpoint, data) {
    try {
        showLoading();
        const response = await fetch(`${API_BASE}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        showError(`Error submitting data: ${error.message}`);
        throw error;
    } finally {
        hideLoading();
    }
}

// Navigation functions
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    document.getElementById(pageId).classList.add('active');
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    document.querySelector(`[href="#${pageId}"]`).classList.add('active');
    
    state.currentPage = pageId;
    
    // Load page-specific data
    loadPageData(pageId);
}

async function loadPageData(pageId) {
    switch(pageId) {
        case 'home':
            await loadHomeData();
            break;
        case 'services':
            await loadServicesData();
            break;
        case 'contractors':
            await loadContractorsData();
            break;
        case 'laborers':
            await loadLaborersData();
            break;
        case 'portfolio':
            await loadPortfolioData();
            break;
    }
}

// Home page functions
async function loadHomeData() {
    // Load featured services
    const services = await fetchData('/services');
    state.services = services;
    renderFeaturedServices(services.slice(0, 6));
    
    // Load featured contractors
    const contractors = await fetchData('/contractors');
    state.contractors = contractors;
    renderFeaturedContractors(contractors.slice(0, 6));
}

function renderFeaturedServices(services) {
    const grid = document.getElementById('featured-services-grid');
    grid.innerHTML = services.map(service => `
        <div class="service-card">
            <div class="service-icon">
                <i class="fas ${getCategoryIcon(service.category)}"></i>
            </div>
            <h3 class="service-title">${service.name}</h3>
            <p class="service-description">${service.description}</p>
            <div class="service-price">$${service.price}</div>
        </div>
    `).join('');
}

function renderFeaturedContractors(contractors) {
    const grid = document.getElementById('featured-contractors-grid');
    grid.innerHTML = contractors.map(contractor => `
        <div class="contractor-card" onclick="showContractorModal(${contractor.id})">
            <img src="${contractor.avatar || 'https://via.placeholder.com/80'}" alt="${contractor.name}" class="contractor-avatar">
            <h3 class="contractor-name">${contractor.name}</h3>
            <p class="contractor-specialty">${contractor.specialty}</p>
            <div class="contractor-rating">
                <span>${'★'.repeat(Math.floor(contractor.rating))}</span>
                <span>${contractor.rating}</span>
            </div>
            <p class="contractor-location">${contractor.location}</p>
        </div>
    `).join('');
}

// Services page functions
async function loadServicesData() {
    const services = await fetchData('/services');
    state.services = services;
    state.filteredServices = services;
    renderServices(services);
}

function renderServices(services) {
    const grid = document.getElementById('services-grid');
    grid.innerHTML = services.map(service => `
        <div class="service-card">
            <div class="service-icon">
                <i class="fas ${getCategoryIcon(service.category)}"></i>
            </div>
            <h3 class="service-title">${service.name}</h3>
            <p class="service-description">${service.description}</p>
            <div class="service-price">$${service.price}</div>
            <span class="badge badge-${getCategoryColor(service.category)}">${service.category}</span>
        </div>
    `).join('');
}

function filterServices() {
    const categoryFilter = document.getElementById('category-filter').value;
    const searchTerm = document.getElementById('search-services').value.toLowerCase();
    
    let filtered = state.services;
    
    if (categoryFilter && categoryFilter !== 'all') {
        filtered = filtered.filter(service => service.category === categoryFilter);
    }
    
    if (searchTerm) {
        filtered = filtered.filter(service => 
            service.name.toLowerCase().includes(searchTerm) ||
            service.description.toLowerCase().includes(searchTerm)
        );
    }
    
    state.filteredServices = filtered;
    renderServices(filtered);
}

// Contractors page functions
async function loadContractorsData() {
    const contractors = await fetchData('/contractors');
    state.contractors = contractors;
    state.filteredContractors = contractors;
    renderContractors(contractors);
}

function renderContractors(contractors) {
    const grid = document.getElementById('contractors-grid');
    grid.innerHTML = contractors.map(contractor => `
        <div class="contractor-card" onclick="showContractorModal(${contractor.id})">
            <img src="${contractor.avatar || 'https://via.placeholder.com/80'}" alt="${contractor.name}" class="contractor-avatar">
            <h3 class="contractor-name">${contractor.name}</h3>
            <p class="contractor-specialty">${contractor.specialty}</p>
            <div class="contractor-rating">
                <span>${'★'.repeat(Math.floor(contractor.rating))}</span>
                <span>${contractor.rating}</span>
            </div>
            <p class="contractor-location">${contractor.location}</p>
        </div>
    `).join('');
}

function filterContractors() {
    const specialtyFilter = document.getElementById('specialty-filter').value;
    const locationFilter = document.getElementById('location-filter').value;
    
    let filtered = state.contractors;
    
    if (specialtyFilter) {
        filtered = filtered.filter(contractor => contractor.specialty.toLowerCase().includes(specialtyFilter));
    }
    
    if (locationFilter) {
        filtered = filtered.filter(contractor => contractor.location.toLowerCase().includes(locationFilter));
    }
    
    state.filteredContractors = filtered;
    renderContractors(filtered);
}

// Laborers page functions
async function loadLaborersData() {
    const laborers = await fetchData('/laborers');
    state.laborers = laborers;
    state.filteredLaborers = laborers;
    renderLaborers(laborers);
}

function renderLaborers(laborers) {
    const grid = document.getElementById('laborers-grid');
    grid.innerHTML = laborers.map(laborer => `
        <div class="laborer-card">
            <h3 class="laborer-name">${laborer.name}</h3>
            <p class="laborer-specialty">${laborer.specialty}</p>
            <div class="laborer-rate">$${laborer.hourlyRate}/hour</div>
            <span class="laborer-availability ${laborer.available ? 'available' : 'unavailable'}">
                ${laborer.available ? 'Available' : 'Unavailable'}
            </span>
        </div>
    `).join('');
}

function filterLaborers() {
    const specialtyFilter = document.getElementById('laborer-specialty-filter').value;
    const availableOnly = document.getElementById('available-only').checked;
    
    let filtered = state.laborers;
    
    if (specialtyFilter) {
        filtered = filtered.filter(laborer => laborer.specialty.toLowerCase().includes(specialtyFilter));
    }
    
    if (availableOnly) {
        filtered = filtered.filter(laborer => laborer.available);
    }
    
    state.filteredLaborers = filtered;
    renderLaborers(filtered);
}

// Portfolio page functions
async function loadPortfolioData() {
    const projects = await fetchData('/projects');
    state.projects = projects;
    state.filteredProjects = projects;
    renderPortfolio(projects);
    
    // Populate contractor filter
    const contractorFilter = document.getElementById('contractor-filter');
    const contractors = [...new Set(projects.map(p => p.contractorName))];
    contractorFilter.innerHTML = '<option value="">All Contractors</option>' + 
        contractors.map(name => `<option value="${name}">${name}</option>`).join('');
}

function renderPortfolio(projects) {
    const grid = document.getElementById('portfolio-grid');
    grid.innerHTML = projects.map(project => `
        <div class="project-card">
            <img src="${project.image || 'https://via.placeholder.com/350x200'}" alt="${project.title}" class="project-image">
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-meta">
                    <span>By ${project.contractorName}</span>
                    <span>${project.completedDate}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function filterPortfolio() {
    const contractorFilter = document.getElementById('contractor-filter').value;
    
    let filtered = state.projects;
    
    if (contractorFilter) {
        filtered = filtered.filter(project => project.contractorName === contractorFilter);
    }
    
    state.filteredProjects = filtered;
    renderPortfolio(filtered);
}

// Modal functions
async function showContractorModal(contractorId) {
    const contractor = await fetchData(`/contractors/${contractorId}`);
    const modal = document.getElementById('contractor-modal');
    const detailsDiv = document.getElementById('contractor-details');
    
    detailsDiv.innerHTML = `
        <div class="contractor-detail">
            <img src="${contractor.avatar || 'https://via.placeholder.com/120'}" alt="${contractor.name}" class="contractor-avatar" style="width: 120px; height: 120px;">
            <h2>${contractor.name}</h2>
            <p class="contractor-specialty">${contractor.specialty}</p>
            <div class="contractor-rating">
                <span>${'★'.repeat(Math.floor(contractor.rating))}</span>
                <span>${contractor.rating}</span>
            </div>
            <p><strong>Location:</strong> ${contractor.location}</p>
            <p><strong>Experience:</strong> ${contractor.experience} years</p>
            <p><strong>Email:</strong> ${contractor.email}</p>
            <p><strong>Phone:</strong> ${contractor.phone}</p>
            <div class="contractor-bio">
                <h3>About</h3>
                <p>${contractor.bio}</p>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('contractor-modal').style.display = 'none';
}

// Form handling
async function handleContactForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    try {
        await postData('/contact', data);
        alert('Message sent successfully!');
        event.target.reset();
    } catch (error) {
        // Error already handled in postData function
    }
}

// Helper functions
function getCategoryIcon(category) {
    switch(category) {
        case 'residential': return 'fa-home';
        case 'commercial': return 'fa-building';
        case 'industrial': return 'fa-industry';
        default: return 'fa-tools';
    }
}

function getCategoryColor(category) {
    switch(category) {
        case 'residential': return 'primary';
        case 'commercial': return 'accent';
        case 'industrial': return 'secondary';
        default: return 'primary';
    }
}

// Mobile navigation
function toggleMobileNav() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Navigation event listeners
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('href').substring(1);
            showPage(pageId);
            
            // Close mobile menu if open
            document.querySelector('.nav-menu').classList.remove('active');
        });
    });
    
    // Mobile navigation toggle
    document.getElementById('nav-toggle').addEventListener('click', toggleMobileNav);
    
    // Filter event listeners
    document.getElementById('category-filter')?.addEventListener('change', filterServices);
    document.getElementById('search-services')?.addEventListener('input', filterServices);
    document.getElementById('specialty-filter')?.addEventListener('change', filterContractors);
    document.getElementById('location-filter')?.addEventListener('change', filterContractors);
    document.getElementById('laborer-specialty-filter')?.addEventListener('change', filterLaborers);
    document.getElementById('available-only')?.addEventListener('change', filterLaborers);
    document.getElementById('contractor-filter')?.addEventListener('change', filterPortfolio);
    
    // Contact form
    document.getElementById('contact-form').addEventListener('submit', handleContactForm);
    
    // Modal close
    document.querySelector('.close').addEventListener('click', closeModal);
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('contractor-modal');
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Handle browser back/forward
    window.addEventListener('popstate', function(event) {
        const pageId = location.hash.substring(1) || 'home';
        showPage(pageId);
    });
    
    // Initialize the home page
    const initialPage = location.hash.substring(1) || 'home';
    showPage(initialPage);
});

// Handle hash changes
window.addEventListener('hashchange', function() {
    const pageId = location.hash.substring(1) || 'home';
    showPage(pageId);
});