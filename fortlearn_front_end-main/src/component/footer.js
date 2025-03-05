import React from 'react';
import {  Link  } from 'react-router-dom';

function Footer() {
    //   const { isAuthenticated, logout } = useAuth();
    //   const [expanded, setExpanded] = useState(false);
      
    //   const handleLogout = () => {
    //     logout();
      
    //     // setExpanded(false);
    //   };
      
    //   const closeNavbar = () => {
    //     setExpanded(false);
    //   };
      
      return (
        <footer className="bg-white py-5 border-top">
        <div className="container">
          <div className="row">
            {/* About */}
            <div className="col-lg-3 mb-4 mb-lg-0">
              <h5 className="fw-bold mb-3">About</h5>
              <div className="footer-links">
                <Link to="/about/mission">Our Mission</Link><br />
                <Link to="/about/team">Team</Link><br />
                <Link to="/about/careers">Careers</Link>
              </div>
            </div>
            
            {/* Resources */}
            <div className="col-lg-3 mb-4 mb-lg-0">
              <h5 className="fw-bold mb-3">Resources</h5>
              <div className="footer-links">
                <Link to="/resources/learning-paths">Learning Paths</Link><br />
                <Link to="/resources/certifications">Certifications</Link><br />
                <Link to="/blog">Blog</Link>
              </div>
            </div>
            
            {/* Support */}
            <div className="col-lg-3 mb-4 mb-lg-0">
              <h5 className="fw-bold mb-3">Support</h5>
              <div className="footer-links">
                <Link to="/support/help-center">Help Center</Link><br />
                <Link to="/support/contact">Contact Us</Link><br />
                <Link to="/support/faq">FAQ</Link>
              </div>
            </div>
            
            {/* Connect */}
            <div className="col-lg-3">
              <h5 className="fw-bold mb-3">Connect</h5>
              <div className="mb-3">
                <a href="https://twitter.com" className="social-icon" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="https://linkedin.com" className="social-icon" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="https://github.com" className="social-icon" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-github"></i>
                </a>
              </div>
            </div>
          </div>
          
          <div className="text-center text-muted mt-4">
            <small>© {new Date().getFullYear()} CyberHub. All rights reserved.</small>
          </div>
        </div>
      </footer>
      );
    }
    export default Footer;

