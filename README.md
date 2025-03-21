Fortilearn 

Description

FortiLearn is an interactive web platform designed to democratize cybersecurity education through hands-on learning. It is a one stop hub for all cybersecurity resources.

This application  includes interactive feature such as specialized learning resources like books,articles.

Github Repository 

https://github.com/Ajibolakhaleel/Fortilearn-


3. Env and Project Set Up:
Prerequisites
Node.js
React
Git
Package manager (npm or yarn)
Node

Frontend Setup (React.js)

Navigate to the frontend folder:
cd frontend

Install dependencies:
npm install
# or
yarn install
```

4. Start the development server:
```bash
npm start
# or
yarn start
```

## 🏗️ Project Structure

```
fortilearn/
├── public/
├── src/
│   ├── components/
│   │   ├── Navigation/
│   │   ├── ResourceCard/
│   │   ├── Features/
│   │   └── Footer/
│   ├── pages/
│   ├── assets/
│   └── App.js
├── package.json
└── README.md
```

## 📱 Component Documentation

### Navigation
- Responsive navbar with collapsible menu
- Login/Sign Up button
- Dynamic navigation links

### Resource Cards
- Display course information
- Difficulty level badges
- Course type indicators
- Quick access links

### Features Section
- Structured learning paths
- Community support
- AI-powered assistance

### Footer
- Quick links section
- Social media links
- Newsletter subscription
- Copyright information

## 🎨 Customization

### Colors
The platform uses Bootstrap's default color scheme which can be customized through:
- Bootstrap variables
- Custom CSS
- Utility classes

### Components
All components are built using Bootstrap 5 classes and can be modified using:
- Bootstrap's utility classes
- Custom CSS overrides
- Component props

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE.md file for details

## 🙏 Acknowledgments

- Bootstrap team for their excellent framework
- Lucide React for the beautiful icons
- The cybersecurity community for their valuable resources

## 📞 Contact

For any queries or support, please reach out to:
- Email: support@fortilearn.com
- Twitter: @FortiLearn
- LinkedIn: FortiLearn

## 🔄 Version History

- 1.0.0
  - Initial Release
  - Basic features implementation
- 1.1.0
  - Added AI-powered assistance
  - Improved search functionality
 



This is the link to the github repo :https://github.com/Ajibolakhaleel/Fortilearn-
This is the link for the design : https://uxpilot.ai/s/c5945ee813ea4164dc76cfe17f4f1ad5




this is how to setup the environmetn 
# FortiLearn Project Setup Guide

## 1. Development Environment Setup

### Prerequisites Installation

1. **Install Node.js and npm**
   ```bash
   # For Windows:
   # Download and install from https://nodejs.org/

   # For macOS (using Homebrew):
   brew install node

   # For Ubuntu/Debian:
   sudo apt update
   sudo apt install nodejs npm
   ```

2. **Verify Installation**
   ```bash
   node --version
   npm --version
   ```

3. **Install Git**
   ```bash
   # For Windows:
   # Download and install from https://git-scm.com/

   # For macOS:
   brew install git

   # For Ubuntu/Debian:
   sudo apt install git
   ```

## 2. Project Setup

### Create React Project

1. **Create a new React project using Create React App**
   ```bash
   npx create-react-app fortilearn
   cd fortilearn
   ```

2. **Install Required Dependencies**
   ```bash
   # Install Bootstrap and its dependencies
   npm install bootstrap @popperjs/core

   # Install React Router for navigation
   npm install react-router-dom

   # Install Lucide React for icons
   npm install lucide-react
   ```

3. **Configure Bootstrap**

   Update `src/index.js`:
   ```javascript
   import 'bootstrap/dist/css/bootstrap.min.css';
   import 'bootstrap/dist/js/bootstrap.bundle.min.js';
   ```

### Project Structure Setup

1. **Create Required Directories**
   ```bash
   # Create component directories
   mkdir -p src/components/Navigation
   mkdir -p src/components/ResourceCard
   mkdir -p src/components/Features
   mkdir -p src/components/Footer

   # Create pages directory
   mkdir -p src/pages

   # Create assets directory
   mkdir -p src/assets
   ```

2. **Create Base Components**

   Create `src/components/Navigation/Navbar.js`:
   ```javascript
   import React from 'react';

   const Navbar = () => {
     return (
       // Navbar component code here
     );
   };

   export default Navbar;
   ```

   Repeat for other components:
   - `src/components/ResourceCard/ResourceCard.js`
   - `src/components/Features/Features.js`
   - `src/components/Footer/Footer.js`

3. **Update App.js**
   ```javascript
   import React from 'react';
   import Navbar from './components/Navigation/Navbar';
   import Features from './components/Features/Features';
   import Footer from './components/Footer/Footer';

   function App() {
     return (
       <div className="App">
         <Navbar />
         {/* Other components */}
         <Footer />
       </div>
     );
   }

   export default App;
   ```

## 3. Development Workflow

1. **Start Development Server**
   ```bash
   npm start
   ```

2. **Access the Application**
   - Open browser and navigate to `http://localhost:5173
note : you need to cd into fortanlearn because that is where the frontend is 
3. **Build for Production**
   ```bash
   npm run build
   ```

## 4. Version Control Setup

1. **Initialize Git Repository**
   ```bash
   git init
   ```

2. **Create .gitignore**
   ```bash
   # .gitignore is created by Create React App
   # Add any additional entries if needed
   ```

3. **Make Initial Commit**
   ```bash
   git add .
   git commit -m "Initial project setup"
   ```

## 5. Environment Configuration

1. **Create Environment Files**
   ```bash
   # Development environment
   touch .env.development

   # Production environment
   touch .env.production
   ```

2. **Add Environment Variables**
   ```env
   REACT_APP_API_URL=your_api_url
   REACT_APP_ENV=development
   ```

## 6. IDE Setup (VS Code Recommended)

1. **Install VS Code Extensions**
   - ES7+ React/Redux/React-Native snippets
   - Prettier - Code formatter
   - ESLint
   - GitLens

2. **Configure VS Code Settings**
   ```json
   {
     "editor.formatOnSave": true,
     "editor.defaultFormatter": "esbenp.prettier-vscode",
     "editor.tabSize": 2
   }
   ```

## 7. Testing Setup

1. **Install Testing Dependencies**
   ```bash
   npm install --save-dev @testing-library/react @testing-library/jest-dom
   ```

2. **Create Test Files**
   ```bash
   # Create test files for components
   touch src/components/Navigation/Navbar.test.js
   touch src/components/ResourceCard/ResourceCard.test.js
   ```

## Troubleshooting Common Issues

1. **Node Version Mismatch**
   ```bash
   nvm install node # Install latest version
   nvm use node    # Use latest version
   ```

2. **Port Already in Use**
   ```bash
   # Windows
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F

   # Mac/Linux
   lsof -i :3000
   kill -9 <PID>
   ```

3. **Dependencies Issues**
   ```bash
   # Clear npm cache
   npm cache clean --force

   # Remove node_modules and reinstall
   rm -rf node_modules
   npm install
   ```

