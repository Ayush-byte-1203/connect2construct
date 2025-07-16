const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Serve static files
app.use(express.static('.'));

// Mock data storage - In production, this would be replaced with a real database
const storage = {
    services: [
        {
            id: 1,
            name: "Home Renovation",
            description: "Complete home renovation services including kitchen, bathroom, and living spaces",
            category: "residential",
            price: 15000
        },
        {
            id: 2,
            name: "Office Building Construction",
            description: "Professional office building construction with modern amenities",
            category: "commercial",
            price: 250000
        },
        {
            id: 3,
            name: "Industrial Facility Setup",
            description: "Complete industrial facility construction and setup",
            category: "industrial",
            price: 500000
        },
        {
            id: 4,
            name: "Kitchen Remodeling",
            description: "Modern kitchen remodeling with custom cabinets and appliances",
            category: "residential",
            price: 25000
        },
        {
            id: 5,
            name: "Retail Store Design",
            description: "Custom retail store design and construction",
            category: "commercial",
            price: 75000
        },
        {
            id: 6,
            name: "Warehouse Construction",
            description: "Large-scale warehouse construction and logistics setup",
            category: "industrial",
            price: 350000
        },
        {
            id: 7,
            name: "Bathroom Renovation",
            description: "Complete bathroom renovation with modern fixtures",
            category: "residential",
            price: 12000
        },
        {
            id: 8,
            name: "Restaurant Buildout",
            description: "Complete restaurant construction and kitchen setup",
            category: "commercial",
            price: 125000
        }
    ],
    
    contractors: [
        {
            id: 1,
            name: "John Smith",
            specialty: "General Construction",
            location: "New York, NY",
            rating: 4.8,
            experience: 15,
            email: "john.smith@email.com",
            phone: "(555) 123-4567",
            bio: "Experienced general contractor with 15+ years in residential and commercial construction.",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
        },
        {
            id: 2,
            name: "Sarah Johnson",
            specialty: "Electrical Work",
            location: "Los Angeles, CA",
            rating: 4.9,
            experience: 12,
            email: "sarah.johnson@email.com",
            phone: "(555) 234-5678",
            bio: "Licensed electrician specializing in residential and commercial electrical systems.",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b69a2a7e?w=150&h=150&fit=crop&crop=face"
        },
        {
            id: 3,
            name: "Mike Davis",
            specialty: "Plumbing",
            location: "Chicago, IL",
            rating: 4.7,
            experience: 20,
            email: "mike.davis@email.com",
            phone: "(555) 345-6789",
            bio: "Master plumber with expertise in both residential and commercial plumbing systems.",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        },
        {
            id: 4,
            name: "Emily Wilson",
            specialty: "Carpentry",
            location: "Seattle, WA",
            rating: 4.6,
            experience: 10,
            email: "emily.wilson@email.com",
            phone: "(555) 456-7890",
            bio: "Skilled carpenter specializing in custom woodwork and cabinetry.",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
        },
        {
            id: 5,
            name: "David Brown",
            specialty: "Roofing",
            location: "Miami, FL",
            rating: 4.8,
            experience: 18,
            email: "david.brown@email.com",
            phone: "(555) 567-8901",
            bio: "Professional roofer with experience in all types of roofing systems.",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
        },
        {
            id: 6,
            name: "Lisa Anderson",
            specialty: "Interior Design",
            location: "Austin, TX",
            rating: 4.9,
            experience: 14,
            email: "lisa.anderson@email.com",
            phone: "(555) 678-9012",
            bio: "Creative interior designer with a focus on modern and sustainable design.",
            avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face"
        }
    ],
    
    laborers: [
        {
            id: 1,
            name: "Carlos Martinez",
            specialty: "General Labor",
            hourlyRate: 25,
            available: true
        },
        {
            id: 2,
            name: "Robert Taylor",
            specialty: "Masonry",
            hourlyRate: 35,
            available: false
        },
        {
            id: 3,
            name: "James Wilson",
            specialty: "Painting",
            hourlyRate: 30,
            available: true
        },
        {
            id: 4,
            name: "Maria Garcia",
            specialty: "Concrete",
            hourlyRate: 40,
            available: true
        },
        {
            id: 5,
            name: "Thomas Johnson",
            specialty: "General Labor",
            hourlyRate: 28,
            available: false
        },
        {
            id: 6,
            name: "Anna Rodriguez",
            specialty: "Painting",
            hourlyRate: 32,
            available: true
        }
    ],
    
    projects: [
        {
            id: 1,
            title: "Modern Family Home",
            description: "Complete renovation of a 3-bedroom family home with modern amenities",
            contractorName: "John Smith",
            contractorId: 1,
            completedDate: "2024-01-15",
            image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop"
        },
        {
            id: 2,
            title: "Downtown Office Building",
            description: "New construction of a 10-story office building in downtown area",
            contractorName: "Sarah Johnson",
            contractorId: 2,
            completedDate: "2024-02-20",
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop"
        },
        {
            id: 3,
            title: "Luxury Apartment Complex",
            description: "High-end apartment complex with 50 units and modern amenities",
            contractorName: "Mike Davis",
            contractorId: 3,
            completedDate: "2024-03-10",
            image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop"
        },
        {
            id: 4,
            title: "Restaurant Renovation",
            description: "Complete renovation of a downtown restaurant with new kitchen",
            contractorName: "Emily Wilson",
            contractorId: 4,
            completedDate: "2024-01-30",
            image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop"
        },
        {
            id: 5,
            title: "Industrial Warehouse",
            description: "Construction of a 50,000 sq ft industrial warehouse facility",
            contractorName: "David Brown",
            contractorId: 5,
            completedDate: "2024-02-25",
            image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop"
        },
        {
            id: 6,
            title: "Retail Shopping Center",
            description: "New shopping center with 20 retail spaces and parking",
            contractorName: "Lisa Anderson",
            contractorId: 6,
            completedDate: "2024-03-05",
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop"
        }
    ],
    
    contactSubmissions: [],
    
    nextContactId: 1
};

// API Routes

// Services routes
app.get('/api/services', (req, res) => {
    try {
        const { category } = req.query;
        let services = storage.services;
        
        if (category && category !== 'all') {
            services = services.filter(service => service.category === category);
        }
        
        res.json(services);
    } catch (error) {
        console.error('Error fetching services:', error);
        res.status(500).json({ error: 'Failed to fetch services' });
    }
});

// Contractors routes
app.get('/api/contractors', (req, res) => {
    try {
        const { specialty, location } = req.query;
        let contractors = storage.contractors;
        
        if (specialty) {
            contractors = contractors.filter(contractor => 
                contractor.specialty.toLowerCase().includes(specialty.toLowerCase())
            );
        }
        
        if (location) {
            contractors = contractors.filter(contractor => 
                contractor.location.toLowerCase().includes(location.toLowerCase())
            );
        }
        
        res.json(contractors);
    } catch (error) {
        console.error('Error fetching contractors:', error);
        res.status(500).json({ error: 'Failed to fetch contractors' });
    }
});

app.get('/api/contractors/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const contractor = storage.contractors.find(c => c.id === id);
        
        if (!contractor) {
            return res.status(404).json({ error: 'Contractor not found' });
        }
        
        res.json(contractor);
    } catch (error) {
        console.error('Error fetching contractor:', error);
        res.status(500).json({ error: 'Failed to fetch contractor' });
    }
});

// Laborers routes
app.get('/api/laborers', (req, res) => {
    try {
        const { specialty, available } = req.query;
        let laborers = storage.laborers;
        
        if (specialty) {
            laborers = laborers.filter(laborer => 
                laborer.specialty.toLowerCase().includes(specialty.toLowerCase())
            );
        }
        
        if (available === 'true') {
            laborers = laborers.filter(laborer => laborer.available);
        }
        
        res.json(laborers);
    } catch (error) {
        console.error('Error fetching laborers:', error);
        res.status(500).json({ error: 'Failed to fetch laborers' });
    }
});

// Projects routes
app.get('/api/projects', (req, res) => {
    try {
        const { contractorId } = req.query;
        let projects = storage.projects;
        
        if (contractorId) {
            projects = projects.filter(project => project.contractorId === parseInt(contractorId));
        }
        
        res.json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
});

// Contact routes
app.post('/api/contact', (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }
        
        const submission = {
            id: storage.nextContactId++,
            name,
            email,
            subject,
            message,
            createdAt: new Date().toISOString()
        };
        
        storage.contactSubmissions.push(submission);
        
        console.log('Contact submission received:', submission);
        
        res.status(201).json(submission);
    } catch (error) {
        console.error('Error submitting contact form:', error);
        res.status(500).json({ error: 'Failed to submit contact form' });
    }
});

// Serve the main HTML file for any route (SPA support)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT} to view the application`);
});