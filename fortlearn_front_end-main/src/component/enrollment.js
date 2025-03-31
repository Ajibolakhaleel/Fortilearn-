import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, ListGroup } from 'react-bootstrap';
import { FiClock, FiUsers, FiPlayCircle, FiMonitor, FiAward, FiBookmark } from 'react-icons/fi';

const ResourceDetailsPage = () => {
    const { resourceId } = useParams();
        const navigate = useNavigate();
    
        // State management
        const [resource, setResource] = useState({});
        const [IsEnrolled, setIsEnrolled] = useState('Enroll Now');
        const [error, setError] = useState(null);
    
    
        useEffect(() => {
            try {
                 // Get token from local storage
                 const token = localStorage.getItem('authToken');
    
                 // Check if user is authenticated
                 if (!token) {
                     navigate('/login');
                 }
                     
                fetch(`http://localhost:3000/resource/${resourceId}`, {
                    headers:{
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(response => response.json())
                .then((json) => {
                
                  setResource(json.result)
                }
                )
                .catch(error => console.error(error));
            }  catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch resource details');
                setIsEnrolled("Enroll Now");
            }
           
          }, [resourceId, navigate]);

          // enroll user in the course
        const handleEnroll = async (resource) => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await fetch(`http://localhost:3000/resource/enroll`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ course: resource })
                });
                const data = await response.json();
                
                if (response.ok) {
                    // Handle success (e.g., show success message, update UI)
                    setIsEnrolled("Successfully Enrolled");

                    return data;
                } else {
                    // Handle error from server
                    throw new Error(data.message || 'Failed to enroll');
                }
            } catch (error) {
                console.error('Error enrolling in resource:', error);
                throw error;
            }
        };
  return (
    <Container className="py-5 mt-5">
      <Row>
        <Col lg={8}>
          <h1 className="fw-bold mb-4">{resource.title}</h1>
          
          <div className="d-flex align-items-center mb-4">
            <div className="me-4 d-flex align-items-center">
              <FiClock className="me-1" />
              <span>24 hours</span>
            </div>
            <div className="me-4 d-flex align-items-center">
              <Badge bg="success" className="me-2">{resource.levelClass}</Badge>
            </div>
            <div className="d-flex align-items-center">
              <FiUsers className="me-1" />
              <span>12,453 students</span>
            </div>
          </div>
          
          <p className="mb-4">
            {resource.description}
          </p>
          
          <Card className="mb-4">
            <div className="bg-dark text-center p-5 position-relative" style={{ height: '400px' }}>
              <div className="position-absolute top-50 start-50 translate-middle">
                <FiPlayCircle size={60} color="white" />
              </div>
            </div>
          </Card>
          
          {/* <Card className="mb-4">
            <Card.Header className="bg-white">
              <h2 className="h5 mb-0">Course Content</h2>
            </Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                <div>
                  <h3 className="h6 mb-1">1. Introduction to TypeScript</h3>
                  <small className="text-muted">4 lessons</small>
                </div>
                <span className="text-muted">45 min</span>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                <div>
                  <h3 className="h6 mb-1">2. React Fundamentals</h3>
                  <small className="text-muted">8 lessons</small>
                </div>
                <span className="text-muted">2 hours</span>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                <div>
                  <h3 className="h6 mb-1">3. Advanced Component Patterns</h3>
                  <small className="text-muted">12 lessons</small>
                </div>
                <span className="text-muted">3 hours</span>
              </ListGroup.Item>
            </ListGroup>
          </Card> */}
        </Col>
        
        <Col lg={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Button onClick={() => handleEnroll(resource)} variant="dark" className="w-100 py-2 mb-3">{IsEnrolled}</Button>
              {/* <Button variant="outline-dark" className="w-100 py-2 mb-4">
                <FiBookmark className="me-2" />
                Add to Wishlist
              </Button> */}
              
              <div className="mb-3 d-flex align-items-center">
                <FiAward className="me-3" />
                <span>Certificate of completion</span>
              </div>
              <div className="mb-3 d-flex align-items-center">
                <FiClock className="me-3" />
                <span>Lifetime access</span>
              </div>
              <div className="mb-3 d-flex align-items-center">
                <FiMonitor className="me-3" />
                <span>Access on mobile and TV</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ResourceDetailsPage;