import React, { useState } from 'react';
import axios from 'axios';

const TestimonialSubmission = () => {
  const [testimonialData, setTestimonialData] = useState({
    author: '',
    content: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Client-side validation
    if (!testimonialData.author || !testimonialData.content) {
      setErrorMessage('Please fill in both the author and content fields.');
      return;
    }

    // Display loading indicator
    setIsLoading(true);

    // Send a POST request to submit the testimonial
    axios
      .post('http://localhost:5000/api/testimonials', testimonialData)
      .then((response) => {
        // Handle successful submission
        setSuccessMessage('Score submitted successfully.');
        setTestimonialData({ author: '', content: '' });
      })
      // ...
      .catch((error) => {
        // Handle submission error
        console.error('Error submitting Score:', error);
        setErrorMessage(
          'Error submitting Score. Please try again later.'
        );
      })

      .finally(() => {
        // Hide loading indicator
        setIsLoading(false);
      });
  };

  return (
    <div>
      <div className='image-background'>
        <div className='content'>
          <div className='container d-flex justify-content-center h-100v'>
            <div className='row justify-content-center align-items-center'>
              <div className='col-md-12'>
                <div className='card'>
                  <div className='card-header'>Add Your Score</div>
                  <div className='card-body'>
                    <form onSubmit={handleSubmit}>
                      <div className='pb-2'>
                        <label htmlFor='exampleFormControlInput1'>
                          <h5>Player:</h5>
                        </label>
                        <input
                          className='form-control'
                          id='exampleFormControlInput1'
                          placeholder='Name'
                          value={testimonialData.author}
                          onChange={(e) =>
                            setTestimonialData({
                              ...testimonialData,
                              author: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className='pb-2'>
                        <label htmlFor='exampleFormControlTextarea1'>
                          <h5>Score:</h5>
                        </label>
                        <input
                          type='number'
                          maxlength='120'
                          className='form-control'
                          id='exampleFormControlTextarea1'
                          rows='3'
                          value={testimonialData.content}
                          onChange={(e) =>
                            setTestimonialData({
                              ...testimonialData,
                              content: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      {isLoading ? (
                        <p>Loading...</p>
                      ) : (
                        <>
                          {successMessage && (
                            <p className='success-message'>{successMessage}</p>
                          )}
                          {errorMessage && (
                            <p className='error-message'>{errorMessage}</p>
                          )}
                          <input
                            className='btn btn-primary mt-3'
                            type='submit'
                            value='Submit'
                          />{' '}
                        </>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSubmission;
