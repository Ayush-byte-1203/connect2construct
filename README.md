# ContractorHub - Construction Contractor Management

A modern construction contractor management application built with vanilla HTML, CSS, JavaScript, and Node.js. This project was converted from a React/TypeScript application to demonstrate the same functionality using standard web technologies.

## Features

- **Multi-page SPA**: Single Page Application with client-side routing
- **Responsive Design**: Mobile-first responsive design that works on all devices
- **Professional UI**: Clean, modern interface with smooth animations
- **Real-time Search**: Filter services, contractors, and laborers in real-time
- **Modal System**: Detailed contractor information in modals
- **Contact Form**: Functional contact form with validation
- **Professional Styling**: Consistent color scheme and typography

## Project Structure

```
contractor-hub/
├── index.html          # Main HTML file with all page sections
├── styles.css          # Complete CSS styling (converted from Tailwind)
├── script.js           # Frontend JavaScript (SPA functionality)
├── server.js           # Node.js Express backend
├── package.json        # Node.js dependencies and scripts
└── README.md           # This file
```

## Tech Stack

### Frontend
- **HTML5**: Semantic markup with modern structure
- **CSS3**: Custom CSS converted from Tailwind with CSS variables
- **Vanilla JavaScript**: ES6+ features, async/await, fetch API
- **Font Awesome**: Icons for enhanced UI

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **CORS**: Cross-origin resource sharing
- **In-memory storage**: Mock database for demonstration

## Installation

1. **Clone or download the project files**

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Or start the production server**:
   ```bash
   npm start
   ```

5. **Open your browser** and visit `http://localhost:5000`

## API Endpoints

The backend provides the following REST API endpoints:

### Services
- `GET /api/services` - Get all services
- `GET /api/services?category=residential` - Filter by category

### Contractors
- `GET /api/contractors` - Get all contractors
- `GET /api/contractors?specialty=electrical` - Filter by specialty
- `GET /api/contractors?location=new-york` - Filter by location
- `GET /api/contractors/:id` - Get specific contractor

### Laborers
- `GET /api/laborers` - Get all laborers
- `GET /api/laborers?specialty=masonry` - Filter by specialty
- `GET /api/laborers?available=true` - Filter by availability

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects?contractorId=1` - Filter by contractor

### Contact
- `POST /api/contact` - Submit contact form

## Pages

1. **Home** - Hero section, stats, featured services and contractors, contact form
2. **Services** - Browse all services with filtering and search
3. **Contractors** - View all contractors with filtering options
4. **Laborers** - Find available laborers with specialty filtering
5. **Portfolio** - Project showcase with contractor filtering
6. **About** - Company information and mission

## Features Implemented

### Frontend Features
- Single Page Application (SPA) routing
- Responsive navigation with mobile hamburger menu
- Real-time search and filtering
- Loading states and error handling
- Form validation
- Modal dialogs
- Smooth animations and transitions
- Professional responsive design

### Backend Features
- RESTful API design
- Request validation
- Error handling middleware
- CORS support
- Static file serving
- Contact form processing

## Color Scheme

The application uses a professional color palette:
- **Primary**: Blue (#3B82F6) - Professional and trustworthy
- **Accent**: Yellow (#F59E0B) - Attention-grabbing highlights
- **Background**: White (#FFFFFF) - Clean and minimalist
- **Text**: Dark gray (#1F2937) - Readable and professional
- **Muted**: Light gray (#F3F4F6) - Subtle backgrounds

## Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px and above

## Development

### Running in Development Mode
```bash
npm run dev
```
This uses `nodemon` to automatically restart the server when files change.

### Production Deployment
```bash
npm start
```

### Adding New Features
1. Add new routes in `server.js`
2. Update the frontend routing in `script.js`
3. Add new page sections in `index.html`
4. Style new components in `styles.css`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- Efficient DOM manipulation
- Lazy loading of page content
- Minimal HTTP requests
- Optimized images from Unsplash
- CSS variables for consistent theming

## Security Features

- Input validation on forms
- XSS prevention
- CORS configuration
- Express security middleware

## Future Enhancements

- Database integration (PostgreSQL, MongoDB)
- User authentication system
- Real-time notifications
- Advanced search and filtering
- Image upload functionality
- Payment integration
- Email notifications
- Admin dashboard

## License

MIT License - Feel free to use this project for learning or as a starting point for your own applications.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For questions or issues, please open an issue in the repository or contact the development team.

---

This project demonstrates how to build a modern, professional web application using vanilla HTML, CSS, and JavaScript with a Node.js backend, proving that you don't always need complex frameworks to create beautiful, functional applications.