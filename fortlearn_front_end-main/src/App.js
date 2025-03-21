import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './component/navabr';
import HomePage from './component/Home';
import Footer from './component/footer';
import Resourcespage from './component/resources';
import FortiLearnProfilePage from './component/profile';
import LoginForm from './component/login';
import RegisterForm from './component/register';
import AdminPortal from './component/admin_portal';
import { useState, useEffect } from 'react';

// ChatBot Component
const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! How can I help you today?' }
  ]);
  const [inputText, setInputText] = useState('');

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (inputText.trim() === '') return;
    
    // Add user message
    const newMessages = [...messages, { sender: 'user', text: inputText }];
    setMessages(newMessages);
    setInputText('');
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      setMessages([
        ...newMessages,
        { 
          sender: 'bot', 
          text: 'These are the   cybersecurity tracks that we offer GRC ,Blue Teaming and Red Teaming .' 
        }
      ]);
    }, 1000);
  };

  return (
    <div className="chatbot-container" style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 1000
    }}>
      {/* Chat Button */}
      <button 
        onClick={toggleChat}
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#4a90e2',
          color: 'white',
          border: 'none',
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px'
        }}
      >
        {isOpen ? '✕' : '💬'}
      </button>
      
      {/* Chat Window */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          bottom: '70px',
          right: '0',
          width: '300px',
          height: '400px',
          backgroundColor: 'white',
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          {/* Chat Header */}
          <div style={{
            padding: '10px 15px',
            backgroundColor: '#4a90e2',
            color: 'white',
            fontWeight: 'bold'
          }}>
            Chat Support
          </div>
          
          {/* Messages Container */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            {messages.map((msg, index) => (
              <div key={index} style={{
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                backgroundColor: msg.sender === 'user' ? '#4a90e2' : '#f1f0f0',
                color: msg.sender === 'user' ? 'white' : 'black',
                padding: '8px 12px',
                borderRadius: '18px',
                maxWidth: '80%'
              }}>
                {msg.text}
              </div>
            ))}
          </div>
          
          {/* Input Form */}
          <form onSubmit={handleSendMessage} style={{
            padding: '10px',
            borderTop: '1px solid #eee',
            display: 'flex'
          }}>
            <input
              type="text"
              value={inputText}
              onChange={handleInputChange}
              placeholder="Type your message..."
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: '20px',
                border: '1px solid #ddd',
                marginRight: '8px'
              }}
            />
            <button 
              type="submit"
              style={{
                backgroundColor: '#4a90e2',
                color: 'white',
                border: 'none',
                borderRadius: '20px',
                padding: '8px 16px',
                cursor: 'pointer'
              }}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, checkTokenExpiration } = useAuth();
  
  // Check token expiration before rendering protected routes
  if (!isAuthenticated() || checkTokenExpiration()) {
    console.log('there is a problem here')
  }
  
  return children;
};

const Layout = ({ children }) => {
  const location = useLocation();
  
  // Routes to be hidden
  const hideNavandFooter = ['/user-profile', '/login', '/register', '/admin'];
  
  // Routes where ChatBot should appear
  const showChatBot = ['/', '/resources'];
  
  // Check if current route should hide navbar and footer
  const shouldBeHidden = hideNavandFooter.includes(location.pathname);
  
  // Check if current route should show the ChatBot
  const shouldShowChatBot = showChatBot.includes(location.pathname);
  
  return (
    <>
      {!shouldBeHidden && <Navbar />}
      {children}
      {shouldShowChatBot && <ChatBot />}
      {!shouldBeHidden && <Footer />}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/resources" element={<Resourcespage />} />
            
            {/* Protected Routes */}
            <Route
               path="/user-profile"
               element={
                <ProtectedRoute>
                  <FortiLearnProfilePage />
                </ProtectedRoute>
              }
             />
             <Route
               path="/admin"
               element={
                <ProtectedRoute>
                  <AdminPortal />
                </ProtectedRoute>
              }
             />
             <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
           </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;