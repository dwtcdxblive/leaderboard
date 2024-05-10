import './App.css';
import React from 'react';
import { HashRouter as Router, Link, Route, Routes } from 'react-router-dom'; // Import Routes
import AdminPage from './components/AdminPage';
import PublicPage from './components/PublicPage';
import TestimonialSubmission from './components/TestimonialSubmission';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {' '}
          {/* Use Routes */}
          <Route exact path='/admin' element={<AdminPage />} />{' '}
          {/* Use element prop */}
          <Route exact path='/public' element={<PublicPage />} />
          <Route exact path='/submit' element={<TestimonialSubmission />} />
          <Route exact path='/' element={<PublicPage />} />{' '}
          {/* Default route */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
