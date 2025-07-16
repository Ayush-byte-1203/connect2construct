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
            name: "Foundation Work",
            description: "Professional foundation services including excavation, concrete pouring, and structural support.",
            category: "residential",
            price: 5000
        },
        {
            id: 2,
            name: "Framing & Structure",
            description: "Expert framing services for residential and commercial structures with quality materials.",
            category: "residential",
            price: 8000
        },
        {
            id: 3,
            name: "Roofing Services",
            description: "Complete roofing solutions including installation, repair, and maintenance services.",
            category: "residential",
            price: 12000
        },
        {
            id: 4,
            name: "Electrical & Plumbing",
            description: "Licensed electrical and plumbing services for all construction projects.",
            category: "residential",
            price: 3500
        },
        {
            id: 5,
            name: "Interior Finishing",
            description: "High-quality interior finishing including drywall, painting, and flooring.",
            category: "residential",
            price: 6500
        },
        {
            id: 6,
            name: "Kitchen Remodeling",
            description: "Complete kitchen renovation with custom cabinets, countertops, and modern appliances.",
            category: "residential",
            price: 25000
        },
        {
            id: 7,
            name: "Bathroom Renovation",
            description: "Complete bathroom renovation with modern fixtures, tiling, and plumbing.",
            category: "residential",
            price: 15000
        },
        {
            id: 8,
            name: "Office Buildings",
            description: "Complete commercial office construction and renovation services.",
            category: "commercial",
            price: 50000
        },
        {
            id: 9,
            name: "Retail Spaces",
            description: "Specialized retail construction and tenant improvement services.",
            category: "commercial",
            price: 25000
        },
        {
            id: 10,
            name: "Restaurant Build-out",
            description: "Complete restaurant construction with commercial kitchen and dining areas.",
            category: "commercial",
            price: 75000
        },
        {
            id: 11,
            name: "Warehouses & Distribution",
            description: "Large-scale warehouse and distribution center construction.",
            category: "industrial",
            price: 75000
        },
        {
            id: 12,
            name: "Manufacturing Facilities",
            description: "Industrial manufacturing facility construction and setup.",
            category: "industrial",
            price: 100000
        }
    ],
    
    contractors: [
        {
            id: 1,
            name: "Michael Thompson",
            email: "michael@buildpro.com",
            phone: "(555) 123-4567",
            specialty: "General Contractor",
            description: "20+ years experience in residential and commercial construction. Specializing in custom homes and renovations.",
            experience: "20+ years experience",
            location: "Downtown District",
            rating: 4.9,
            reviewCount: 127,
            isLicensed: true,
            isInsured: true,
            bio: "Experienced general contractor with 20+ years in residential and commercial construction. Specializing in custom homes and renovations with a focus on quality and customer satisfaction.",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80"
        },
        {
            id: 2,
            name: "Sarah Rodriguez",
            email: "sarah@electropro.com",
            phone: "(555) 234-5678",
            specialty: "Electrical Contractor",
            description: "Expert electrical contractor specializing in residential and commercial electrical systems, smart home installations.",
            experience: "15+ years experience",
            location: "North District",
            rating: 5.0,
            reviewCount: 89,
            isLicensed: true,
            isInsured: true,
            bio: "Licensed electrician specializing in residential and commercial electrical systems. Expert in smart home technology and energy-efficient solutions.",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b69a2a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80"
        },
        {
            id: 3,
            name: "David Chen",
            email: "david@plumbpro.com",
            phone: "(555) 345-6789",
            specialty: "Plumbing Contractor",
            description: "Master plumber with expertise in residential, commercial plumbing systems, and emergency repairs.",
            experience: "18+ years experience",
            location: "South District",
            rating: 4.8,
            reviewCount: 156,
            isLicensed: true,
            isInsured: true,
            bio: "Master plumber with expertise in both residential and commercial plumbing systems. Specializing in new construction and complex renovations.",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80"
        },
        {
            id: 4,
            name: "Emily Wilson",
            email: "emily@carpentrypro.com",
            phone: "(555) 456-7890",
            specialty: "Carpentry Contractor",
            description: "Master carpenter specializing in custom woodwork, cabinetry, and finish carpentry.",
            experience: "12+ years experience",
            location: "West District",
            rating: 4.7,
            reviewCount: 78,
            isLicensed: true,
            isInsured: true,
            bio: "Skilled carpenter specializing in custom woodwork and cabinetry. Known for attention to detail and high-quality craftsmanship.",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80"
        },
        {
            id: 5,
            name: "James Rodriguez",
            email: "james@roofingpro.com",
            phone: "(555) 567-8901",
            specialty: "Roofing Contractor",
            description: "Professional roofing contractor with experience in all types of roofing systems and materials.",
            experience: "16+ years experience",
            location: "East District",
            rating: 4.9,
            reviewCount: 134,
            isLicensed: true,
            isInsured: true,
            bio: "Professional roofer with experience in all types of roofing systems. Specializing in residential and commercial roofing projects.",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80"
        },
        {
            id: 6,
            name: "Lisa Anderson",
            email: "lisa@interiorpro.com",
            phone: "(555) 678-9012",
            specialty: "Interior Design Contractor",
            description: "Creative interior designer with a focus on modern and sustainable design solutions.",
            experience: "14+ years experience",
            location: "Central District",
            rating: 4.8,
            reviewCount: 92,
            isLicensed: true,
            isInsured: true,
            bio: "Creative interior designer with a focus on modern and sustainable design. Specializing in residential and commercial interior projects.",
            avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80"
        },
        {
            id: 7,
            name: "Robert Martinez",
            email: "robert@masonrypro.com",
            phone: "(555) 789-0123",
            specialty: "Masonry Contractor",
            description: "Expert masonry contractor specializing in brick, stone, and concrete work.",
            experience: "22+ years experience",
            location: "Downtown District",
            rating: 4.9,
            reviewCount: 167,
            isLicensed: true,
            isInsured: true,
            bio: "Expert masonry contractor with over 22 years of experience in brick, stone, and concrete work. Known for precision and durability.",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80"
        },
        {
            id: 8,
            name: "Jennifer Kim",
            email: "jennifer@paintingpro.com",
            phone: "(555) 890-1234",
            specialty: "Painting Contractor",
            description: "Professional painting contractor specializing in interior and exterior painting services.",
            experience: "10+ years experience",
            location: "North District",
            rating: 4.7,
            reviewCount: 85,
            isLicensed: true,
            isInsured: true,
            bio: "Professional painting contractor with expertise in both interior and exterior painting. Specializing in residential and commercial projects.",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b69a2a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80"
        }
    ],
    
    laborers: [
        {
            id: 1,
            name: "Carlos Martinez",
            specialty: "Master Carpenter",
            experience: "12+ years experience",
            hourlyRate: 45,
            rating: 4.9,
            reviewCount: 67,
            available: true,
            profileImage: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80"
        },
        {
            id: 2,
            name: "Jennifer Liu",
            specialty: "Electrical Technician",
            experience: "8+ years experience",
            hourlyRate: 52,
            rating: 5.0,
            reviewCount: 43,
            available: true,
            profileImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80"
        },
        {
            id: 3,
            name: "Robert Johnson",
            specialty: "Plumbing Specialist",
            experience: "15+ years experience",
            hourlyRate: 48,
            rating: 4.8,
            reviewCount: 91,
            available: true,
            profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80"
        },
        {
            id: 4,
            name: "Maria Garcia",
            specialty: "Concrete Specialist",
            experience: "10+ years experience",
            hourlyRate: 42,
            rating: 4.7,
            reviewCount: 54,
            available: false,
            profileImage: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80"
        },
        {
            id: 5,
            name: "Thomas Wilson",
            specialty: "General Labor",
            experience: "6+ years experience",
            hourlyRate: 28,
            rating: 4.6,
            reviewCount: 32,
            available: true,
            profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80"
        },
        {
            id: 6,
            name: "Anna Rodriguez",
            specialty: "Painting Specialist",
            experience: "9+ years experience",
            hourlyRate: 32,
            rating: 4.8,
            reviewCount: 78,
            available: true,
            profileImage: "https://images.unsplash.com/photo-1494790108755-2616b69a2a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80"
        },
        {
            id: 7,
            name: "Kevin Brown",
            specialty: "Drywall Specialist",
            experience: "11+ years experience",
            hourlyRate: 38,
            rating: 4.7,
            reviewCount: 65,
            available: false,
            profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80"
        },
        {
            id: 8,
            name: "Lisa Davis",
            specialty: "Flooring Specialist",
            experience: "7+ years experience",
            hourlyRate: 35,
            rating: 4.9,
            reviewCount: 46,
            available: true,
            profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80"
        }
    ],
    
    projects: [
        {
            id: 1,
            title: "Modern Family Home",
            description: "3,500 sq ft modern home with sustainable features and smart home integration.",
            category: "Custom Residential Build",
            contractorId: 1,
            contractorName: "Michael Thompson",
            completionYear: 2024,
            completedDate: "2024-01-15",
            image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
        },
        {
            id: 2,
            title: "Corporate Office Renovation",
            description: "Complete renovation of 15,000 sq ft office space with modern amenities.",
            category: "Commercial Office Space",
            contractorId: 2,
            contractorName: "Sarah Rodriguez",
            completionYear: 2024,
            completedDate: "2024-02-20",
            image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
        },
        {
            id: 3,
            title: "Industrial Warehouse",
            description: "50,000 sq ft warehouse facility with advanced logistics systems.",
            category: "Distribution Center",
            contractorId: 3,
            contractorName: "David Chen",
            completionYear: 2024,
            completedDate: "2024-03-10",
            image: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
        },
        {
            id: 4,
            title: "Kitchen Remodel",
            description: "Complete kitchen transformation with premium materials and appliances.",
            category: "Luxury Kitchen Renovation",
            contractorId: 1,
            contractorName: "Michael Thompson",
            completionYear: 2024,
            completedDate: "2024-01-30",
            image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
        },
        {
            id: 5,
            title: "Spa Bathroom",
            description: "Luxury spa-style bathroom with premium finishes and smart features.",
            category: "Master Bathroom Remodel",
            contractorId: 2,
            contractorName: "Sarah Rodriguez",
            completionYear: 2024,
            completedDate: "2024-02-25",
            image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
        },
        {
            id: 6,
            title: "Restaurant Build-out",
            description: "Complete restaurant build-out with commercial kitchen and dining areas.",
            category: "Restaurant Construction",
            contractorId: 3,
            contractorName: "David Chen",
            completionYear: 2024,
            completedDate: "2024-03-05",
            image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
        },
        {
            id: 7,
            title: "Luxury Apartment Complex",
            description: "High-end apartment complex with 50 units and modern amenities.",
            category: "Multi-Family Residential",
            contractorId: 4,
            contractorName: "Emily Wilson",
            completionYear: 2024,
            completedDate: "2024-02-15",
            image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
        },
        {
            id: 8,
            title: "Retail Shopping Center",
            description: "New shopping center with 20 retail spaces and parking facilities.",
            category: "Commercial Retail",
            contractorId: 5,
            contractorName: "James Rodriguez",
            completionYear: 2024,
            completedDate: "2024-03-20",
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
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