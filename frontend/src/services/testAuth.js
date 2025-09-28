// Test authentication service with mock data
const testAuth = {
  // Mock login for testing when backend is not available
  mockLogin: async (credentials) => {
    console.log('Using mock login for:', credentials.usernameOrEmail);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock users for testing
    const mockUsers = {
      'teacher': {
        id: 1,
        username: 'teacher',
        email: 'teacher@example.com',
        firstName: 'Teacher',
        lastName: 'User',
        role: 'TEACHER'
      },
      'student': {
        id: 2,
        username: 'student',
        email: 'student@example.com',
        firstName: 'Student',
        lastName: 'User',
        role: 'STUDENT'
      },
      'admin': {
        id: 3,
        username: 'admin',
        email: 'admin@example.com',
        firstName: 'Admin',
        lastName: 'User',
        role: 'TEACHER'
      }
    };
    
    // Check if user exists by username or email
    const user = mockUsers[credentials.usernameOrEmail.toLowerCase()] || 
                 Object.values(mockUsers).find(u => u.email === credentials.usernameOrEmail.toLowerCase());
    
    // For demo purposes, accept any password that's not empty
    if (user && credentials.password && credentials.password.length > 0) {
      console.log('Mock login successful for user:', user.username);
      return {
        token: 'mock-jwt-token-' + Date.now(),
        user: user
      };
    } else {
      console.log('Mock login failed - user not found or empty password');
      throw new Error('Invalid credentials. Try: teacher/student/admin with any non-empty password');
    }
  },
  
  // Mock register for testing
  mockRegister: async (userData) => {
    console.log('Using mock register for:', userData.username);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Simple validation
    if (!userData.username || !userData.email || !userData.password) {
      throw new Error('Missing required fields');
    }
    
    const newUser = {
      id: Date.now(),
      username: userData.username,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      role: userData.role
    };
    
    console.log('Mock registration successful for user:', newUser.username);
    
    return {
      token: 'mock-jwt-token-' + Date.now(),
      user: newUser
    };
  }
};

export default testAuth;