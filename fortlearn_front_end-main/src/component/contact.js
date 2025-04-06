import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    message: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ success: false, message: '' });

    try {
      const response = await fetch('http://localhost:3000/resource/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSubmitStatus({ success: true, message: 'Message sent successfully!' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({ success: false, message: 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-5 mt-5">
      <div className="row">
        <div className="col-lg-6">
          <h1 className="mb-4">Get in Touch</h1>
          <p className="lead mb-5">Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
          
          {submitStatus.message && (
            <div className={`alert ${submitStatus.success ? 'alert-success' : 'alert-danger'}`}>
              {submitStatus.message}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input 
                type="text" 
                className="form-control" 
                id="name" 
                value={formData.name}
                onChange={handleChange}
                required 
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input 
                type="email" 
                className="form-control" 
                id="email" 
                value={formData.email}
                onChange={handleChange}
                required 
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="subject" className="form-label">Subject</label>
              <input 
                type="text" 
                className="form-control" 
                id="subject" 
                value={formData.subject}
                onChange={handleChange}
                required 
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea 
                className="form-control" 
                id="message" 
                rows="5" 
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary px-4 py-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Sending...
                </>
              ) : 'Send Message'}
            </button>
          </form>
        </div>
        
        <div className="col-lg-5 offset-lg-1 mt-5 mt-lg-0">
          <div className="mb-5">
            <h3 className="mb-4">Contact Information</h3>
            <p>123 Business Street, New York, NY 10001</p>
            <p>+1 (555) 123-4567</p>
            <p>contact@company.com</p>
          </div>
          
          <div className="mb-5">
            <h3 className="mb-4">Business Hours</h3>
            <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
            <p>Saturday: 10:00 AM - 4:00 PM</p>
            <p>Sunday: Closed</p>
          </div>
          
          <div>
            <h3 className="mb-4">Follow Us</h3>
            <div className="d-flex gap-3">
              <a href="#" className="text-decoration-none">
                <i className="bi bi-facebook fs-4"></i>
              </a>
              <a href="#" className="text-decoration-none">
                <i className="bi bi-twitter fs-4"></i>
              </a>
              <a href="#" className="text-decoration-none">
                <i className="bi bi-instagram fs-4"></i>
              </a>
              <a href="#" className="text-decoration-none">
                <i className="bi bi-linkedin fs-4"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;