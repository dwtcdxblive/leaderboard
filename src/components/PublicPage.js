import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Logo from '../assets/GITEX-AFRICA (1).png';
import 'bootstrap/dist/css/bootstrap.min.css';

const PublicPage = () => {
  const [approvedTestimonials, setApprovedTestimonials] = useState([]);
  const [firstTestimonial, setFirstTestimonial] = useState(null);

  // Function to fetch data and update state
  const fetchApprovedTestimonials = () => {
    axios
      .get('http://localhost:5000/api/testimonials/pending')
      .then((response) => {
        // Convert content to numbers and sort in descending order
        const sortedData = response.data.sort(
          (a, b) => parseFloat(b.content) - parseFloat(a.content)
        );
        const limitedData = sortedData.slice(0, 10);
        setApprovedTestimonials(limitedData);

        // Set the first testimonial separately
        if (limitedData.length > 0) {
          setFirstTestimonial(limitedData[0]);
        }
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
        <div className='content d-flex align-items-start h-100 w-100'>
          <div className='container cont-ui-spacing'>
            <div className='row justify-content-center'>
              {firstTestimonial && (
                <div className='col-md-12 d-flex justify-content-center score-spacing'>
                  <div className='w-100'>
                    <div className='border-0 text-center d-flex justify-content-between'>
                      <h4></h4>
                      <h4 className='first-name-style'>{firstTestimonial.author}</h4>
                      <h5 className='first-score-style'>{firstTestimonial.content}</h5>
                    </div>
                  </div>
                </div>
              )}
              {approvedTestimonials.slice(1).map((testimonial) => (
                <div
                  className='col-md-12 d-flex justify-content-center score-spacing'
                  key={testimonial._id}
                >
                  <div className='w-100'>
                    <div className='border-0 text-center d-flex justify-content-between'>
                      <h4></h4>
                      <h4>{testimonial.author}</h4>
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
