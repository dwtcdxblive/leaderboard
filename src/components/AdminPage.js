import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [pendingTestimonials, setPendingTestimonials] = useState([]);

  // Function to fetch data and update state
  const fetchPendingTestimonials = () => {
    axios
      .get('http://localhost:5001/api/testimonials/pending')
      .then((response) => {
        setPendingTestimonials(response.data);
      })
      .catch((error) => {
        console.error('Error fetching pending testimonials:', error);
      });
  };

  // Fetch data initially when the component mounts
  useEffect(() => {
    fetchPendingTestimonials();

    // Set up an interval to fetch new data every 10 seconds
    const interval = setInterval(() => {
      fetchPendingTestimonials();
    }, 10000); // 10000 milliseconds = 10 seconds

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  const handleApproval = (testimonialId) => {
    // Send a PUT request to `/api/testimonials/:id` with the 'approve' action
    axios
      .put(`http://localhost:5001/api/testimonials/${testimonialId}`, {
        action: 'approve',
      })
      .then((response) => {
        // Handle success, you can reload the pending testimonials here if needed
        console.log('Testimonial approved:', response.data);
        // You can also update the state with the new pending testimonials.
        // Fetch pending testimonials again if you want to reflect changes immediately.
        fetchPendingTestimonials();
      })
      .catch((error) => {
        console.error('Error approving testimonial:', error);
      });
  };

  const handleRejection = (testimonialId) => {
    // Send a PUT request to `/api/testimonials/:id` with the 'reject' action
    axios
      .put(`http://localhost:5001/api/testimonials/${testimonialId}`, {
        action: 'reject',
      })
      .then((response) => {
        // Handle success, you can reload the pending testimonials here if needed
        console.log('Testimonial rejected:', response.data);
        // You can also update the state with the new pending testimonials.
        // Fetch pending testimonials again if you want to reflect changes immediately.
        fetchPendingTestimonials();
      })
      .catch((error) => {
        console.error('Error rejecting testimonial:', error);
      });
  };

  return (
    <div>
      <h1 className='text-center mt-5'>Admin Page</h1>
      <div className='container'>
        <div className='row justify-content-center'>
          {pendingTestimonials.map((testimonial) => (
            <div className='text-center m-2 p-3 border' key={testimonial._id}>
              {testimonial.content} by {testimonial.author}
              <div className='d-flex justify-content-center'>
                <button
                  className='btn btn-success mt-3'
                  type='submit'
                  value='Submit'
                  onClick={() => handleApproval(testimonial._id)}
                >
                  Approve
                </button>
                <button
                  className='btn btn-danger mt-3'
                  type='submit'
                  value='Submit'
                  onClick={() => handleRejection(testimonial._id)}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
