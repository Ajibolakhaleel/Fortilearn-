Here’s your updated and cleaned-up `README.md`, with the necessary backend and frontend instructions incorporated, redundant info trimmed, and formatting made consistent and professional:

---

# FortiLearn

## 🛡️ Description

**FortiLearn** is an interactive web platform designed to democratize cybersecurity education through hands-on learning. It serves as a one-stop hub for curated cybersecurity resources, including books, articles, learning paths, and interactive tools.

> 🔗 [GitHub Repository](https://github.com/Ajibolakhaleel/Fortilearn-)  
> 🎨 [Design Preview](https://uxpilot.ai/s/c5945ee813ea4164dc76cfe17f4f1ad5)

---

## ⚙️ Full Project Setup

### 1. Install All Updates

Make sure your system is up-to-date before proceeding.

---

### 2. Frontend Setup (`fortlearn_frontend_main`)

```bash
cd fortlearn_frontend_main
npm install
npm start
```

This will start the React development server. You can now access the frontend at `http://localhost:3000` (or the port specified in your `.env` file).

---

### 3. Backend Setup (`fortlearnAPI-main`)

```bash
cd fortlearnAPI-main
npm install
npm start
```

This runs the backend server. Ensure any required `.env` variables or MongoDB connections are configured if applicable.

---

## 📁 Project Structure

```bash
FortiLearn/
├── fortlearn_frontend_main/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navigation/
│   │   │   ├── ResourceCard/
│   │   │   ├── Features/
│   │   │   └── Footer/
│   │   ├── pages/
│   │   ├── assets/
│   │   └── App.js
│   └── package.json
├── fortlearnAPI-main/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
```

---

## 🧩 Component Overview

### 🔹 Navigation
- Responsive navbar
- Auth buttons
- Dynamic links

### 🔹 Resource Cards
- Info display with tags
- Difficulty badges
- Quick links

### 🔹 Features Section
- Structured learning
- Community support
- AI-powered help

### 🔹 Footer
- Quick links
- Social media
- Newsletter

---

## 🎨 Styling & Customization

FortiLearn uses Bootstrap 5. You can customize components via:

- Bootstrap variables
- Utility classes
- Custom CSS overrides

Icons are provided by [Lucide React](https://lucide.dev/).

---

## 👨‍💻 Development Tools

Recommended VS Code Extensions:

- ES7+ React Snippets
- Prettier
- ESLint
- GitLens

Editor Settings:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.tabSize": 2
}
```

---

## ✅ Testing Setup

Install testing libraries:

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom
```

Create test files:

```bash
touch src/components/Navigation/Navbar.test.js
touch src/components/ResourceCard/ResourceCard.test.js
```

---

## 🔧 Troubleshooting

- **Port in Use**
  ```bash
  lsof -i :3000
  kill -9 <PID>
  ```

- **Fix Dependency Issues**
  ```bash
  rm -rf node_modules
  npm cache clean --force
  npm install
  ```

- **Node Version**
  ```bash
  nvm install node
  nvm use node
  ```

---

## 🤝 Contributing

1. Fork the repo  
2. Create a branch: `git checkout -b feature/YourFeature`  
3. Commit your changes  
4. Push and open a pull request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE.md).

---

## 🙏 Acknowledgments

- Bootstrap  
- Lucide React  
- Cybersecurity community for curated learning materials  

---

## 📞 Contact

- Email: support@fortilearn.com  
- Twitter: [@FortiLearn](https://twitter.com/FortiLearn)  
- LinkedIn: [FortiLearn](https://linkedin.com/company/fortilearn)

---

## 🔄 Version History

- **v1.0.0** – Initial release  
- **v1.1.0** – AI-powered assistance and improved search added

---

