# Melee Character Manager - Angular Frontend

A modern, responsive Angular application for managing Super Smash Bros. Melee characters with full CRUD functionality. This application connects to a REST API backend and provides an intuitive interface for managing character data.

## 🚀 Features

- **Full CRUD Operations**: Create, Read, Update, and Delete characters
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI/UX**: Dark theme with intuitive forms and character cards
- **Real-time Updates**: Uses RxJS for reactive data management
- **Form Validation**: Comprehensive form validation with error handling
- **Accessibility**: Focus management and keyboard navigation support
- **Routing**: Multi-page application with character detail views

## 🛠️ Technology Stack

- **Frontend Framework**: Angular 18
- **Language**: TypeScript
- **Styling**: CSS3 with responsive design
- **State Management**: RxJS with BehaviorSubject
- **HTTP Client**: Angular HttpClient
- **Forms**: Reactive Forms with validation
- **Routing**: Angular Router
- **Testing**: Jasmine/Karma testing framework

## 📋 Prerequisites

Before running this application, ensure you have:

- **Node.js**: Version 20.11.1 or higher
- **npm**: Version 10.2.4 or higher
- **Angular CLI**: Version 18 or higher
- **Backend API**: The U05 REST API running on Render

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd u08-angular-frontend-gabrielkereklidispaulin
```

### 2. Install Dependencies

```bash
cd angular-frontend
npm install
```

### 3. Start the Angular Application

```bash
# In the angular-frontend directory
ng serve
```

The application will be available at `http://localhost:4200`

### 4. Build for Production

```bash
ng build
```

## 🏗️ Project Structure

```
u08-angular-frontend-gabrielkereklidispaulin/
├── angular-frontend/           # Angular application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/    # Angular components
│   │   │   ├── services/      # API services
│   │   │   ├── models/        # Data models
│   │   │   └── app.routes.ts  # Routing configuration
│   │   └── styles.css         # Global styles
│   ├── package.json           # Dependencies
│   └── angular.json          # Angular configuration
├── u05/                       # Backend API (separate project)
├── u06/                       # Design reference
├── README.md                  # This file
├── PROJECT_OVERVIEW.md        # Detailed project overview
└── netlify.toml              # Deployment configuration
```

## 🔧 API Integration

The application connects to your U05 REST API on Render with the following endpoints:

- `GET /characters` - Retrieve all characters
- `GET /characters/:id` - Retrieve a specific character
- `POST /characters` - Create a new character
- `PUT /characters/:id` - Update an existing character
- `DELETE /characters/:id` - Delete a character

## 🎨 Design Features

- **Dark Theme**: Consistent with gaming aesthetics
- **Color-coded Badges**: Tier rankings and weight classes with distinct colors
- **Responsive Grid**: Character cards adapt to different screen sizes
- **Interactive Elements**: Hover effects and smooth transitions
- **Form Styling**: Modern form inputs with focus states

## 🧪 Testing

The application includes comprehensive unit tests:

```bash
# Run all tests
ng test

# Run tests with coverage
ng test --code-coverage
```

## 📱 Responsive Design

The application is fully responsive and optimized for:

- **Desktop**: Full-featured interface with multi-column layouts
- **Tablet**: Adapted layouts for medium screens
- **Mobile**: Single-column layouts with touch-friendly controls
- **iPhone 13**: Specifically tested and optimized

## 🚀 Deployment

### Netlify Deployment

1. Build the application:
   ```bash
   cd angular-frontend
   ng build
   ```

2. Deploy to Netlify:
   - Connect your GitHub repository
   - Set build command: `cd angular-frontend && ng build`
   - Set publish directory: `angular-frontend/dist/angular-frontend/browser`

## 🔍 Quick Start for New Developers

### Where to Start

1. **Begin with the Service**: `angular-frontend/src/app/services/character.service.ts`
2. **Review the Models**: `angular-frontend/src/app/models/character.interface.ts`
3. **Main Component**: `angular-frontend/src/app/components/character-list/character-list.component.ts`
4. **Routing**: `angular-frontend/src/app/app.routes.ts`

## 📄 License

This project is part of the U08 Angular Frontend assignment.

## 👨‍💻 Authors

- Gabriel Kereklidis
- Paulin

---

**Note**: This application requires the U05 REST API backend to be running for full functionality.
