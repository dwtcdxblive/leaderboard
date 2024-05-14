import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Logo from '../assets/GITEX-AFRICA (1).png';
import 'bootstrap/dist/css/bootstrap.min.css';

const PublicPage = () => {
  const [approvedTestimonials, setApprovedTestimonials] = useState([]);

  // Function to fetch data and update state
  const fetchApprovedTestimonials = () => {
    axios
      .get('http://localhost:5001/api/testimonials/pending')
      .then((response) => {
        // Convert content to numbers and sort in descending order
        const sortedData = response.data.sort(
          (a, b) => parseFloat(b.content) - parseFloat(a.content)
        );
        const limitedData = sortedData.slice(0, 5);
        setApprovedTestimonials(limitedData);
      })
      .catch((error) => {
        console.error('Error fetching approved testimonials:', error);
      });
  };

  useEffect(() => {
    fetchApprovedTestimonials();
    const interval = setInterval(fetchApprovedTestimonials, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className='video-background'>
        {/* <nav className='navbar'>
          <div className='container'>
            <a className='navbar-brand m-0' href='#'>
              <img src={Logo} className='logo-size' alt='Bootstrap' />
            </a>
            <h2 className='activation-title'>HIT FOR SIX</h2>
          </div>
        </nav> */}
        
        <div className='content d-flex align-items-start h-100 w-100'>
          <div className='container cont-ui-spacing'>
            <div className='row justify-content-center'>
              {approvedTestimonials.map((testimonial, index) => (
                <div
                  className='col-md-12 d-flex justify-content-center score-spacing'
                  key={testimonial._id}
                >
                  <div className='w-100'>
                    <div className='border-0 text-center d-flex justify-content-around'>
                      {/* <span>{index + 1}</span> Counter */}
                      <h4 className='h4'>{testimonial.author}</h4>
                      <h5 className='h5'>{testimonial.content}</h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicPage;
