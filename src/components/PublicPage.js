import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import bg from '../assets/background.mp4';
import Logo from '../assets/GITEX-AFRICA (1).png'
import 'bootstrap/dist/css/bootstrap.min.css';
const PublicPage = () => {
  const [approvedTestimonials, setApprovedTestimonials] = useState([]);

  // Function to fetch data and update state
const fetchApprovedTestimonials = () => {
  axios
    .get('http://localhost:5000/api/testimonials/pending')
    .then((response) => {
      // Convert content to numbers and sort in descending order
      const sortedData = response.data.sort(
        (a, b) => parseFloat(b.content) - parseFloat(a.content)
      );
      const limitedData = sortedData.slice(0, 8);
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
        <nav class='navbar'>
          <div class='container'>
            <a class='navbar-brand m-0' href='#'>
              <img src={Logo} className='logo-size' alt='Bootstrap' />
            </a>
            <h2 className='activation-title'>HIT FOR SIX</h2>
          </div>
        </nav>
        <div className='content d-flex align-items-start h-100 w-100'>
          <div className='container'>
            <div className='row justify-content-center'>
              {approvedTestimonials.map((testimonial) => (
                <div
                  className='col-md-12 d-flex justify-content-center'
                  key={testimonial._id}
                >
                  <div className='card mt-4 w-100'>
                    <div className='card-header header-bg border-0 text-center'>
                      <h4 className=''>{testimonial.author}</h4>
                    </div>
                    <div className='card-text m-2 text-center'>
                      <h5>{testimonial.content}</h5>
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
