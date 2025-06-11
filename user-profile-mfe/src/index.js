import React from 'react';
import ReactDOM from 'react-dom';
import UserProfile from './UserProfile';
import './styles.css';

// Mock user data for standalone mode
const mockUser = {
  id: 1,
  name: 'Jane Smith',
  email: 'jane.smith@example.com',
  role: 'Software Engineer',
  avatar: '👩‍💻'
};

ReactDOM.render(<UserProfile user={mockUser} />, document.getElementById('root')); 