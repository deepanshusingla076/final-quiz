// Test authentication service with mock data
const testAuth = {
  // Mock login for testing when backend is not available
  mockLogin: async (credentials) => {
    console.log('Using mock login for:', credentials.usernameOrEmail);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Basic validation
    if (!credentials.usernameOrEmail || !credentials.password) {
      throw new Error('Please enter both username and password.');
    }
    
    if (credentials.password.length < 1) {
      throw new Error('Password cannot be empty.');
    }
    
    // For any valid input, create or use existing user
    const username = credentials.usernameOrEmail.toLowerCase().split('@')[0]; // Extract username from email if provided
    
    const mockUsers = {
      'teacher': {
        id: 1759133954141, // Use consistent ID that matches the error
        username: 'teacher',
        email: 'teacher@example.com',
        firstName: 'Teacher',
        lastName: 'User',
        role: 'TEACHER'
      },
      'student': {
        id: 1759133954142,
        username: 'student',
        email: 'student@example.com',
        firstName: 'Student',
        lastName: 'User',
        role: 'STUDENT'
      },
      'admin': {
        id: 1759133954143,
        username: 'admin',
        email: 'admin@example.com',
        firstName: 'Admin',
        lastName: 'User',
        role: 'TEACHER'
      }
    };
    
    // Check if user exists in mock users
    let user = mockUsers[credentials.usernameOrEmail.toLowerCase()] || 
               Object.values(mockUsers).find(u => u.email === credentials.usernameOrEmail.toLowerCase());
    
    // If not found, create a new user based on the input
    if (!user) {
      const isEmail = credentials.usernameOrEmail.includes('@');
      user = {
        id: Date.now(),
        username: isEmail ? username : credentials.usernameOrEmail,
        email: isEmail ? credentials.usernameOrEmail : `${credentials.usernameOrEmail}@example.com`,
        firstName: credentials.usernameOrEmail.charAt(0).toUpperCase() + credentials.usernameOrEmail.slice(1),
        lastName: 'User',
        role: 'STUDENT' // Default role for new users
      };
    }
    
    console.log('Mock login successful for user:', user.username);
    return {
      token: 'mock-jwt-token-' + Date.now(),
      user: user
    };
  },
  
  // Mock register for testing
  mockRegister: async (userData) => {
    console.log('Using mock register for:', userData.username);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Simple validation
    if (!userData.username || !userData.email || !userData.password) {
      throw new Error('All fields are required.');
    }
    
    if (!userData.firstName || !userData.lastName) {
      throw new Error('First name and last name are required.');
    }
    
    const newUser = {
      id: Date.now(),
      username: userData.username,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      role: userData.role || 'STUDENT'
    };
    
    console.log('Mock registration successful for user:', newUser.username);
    
    return {
      token: 'mock-jwt-token-' + Date.now(),
      user: newUser
    };
  }
};

export default testAuth;