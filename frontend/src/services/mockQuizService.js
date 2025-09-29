// Mock quiz service for testing when backend is not available
const mockQuizService = {
  // Mock quizzes storage (in-memory for demo)
  quizzes: [
    {
      id: 1,
      title: "JavaScript Fundamentals",
      description: "Test your knowledge of basic JavaScript concepts",
      topic: "Programming",
      difficulty: "EASY",
      timeLimit: 30,
      totalQuestions: 5,
      createdBy: 1,
      createdAt: new Date().toISOString(),
      questions: [
        {
          id: 1,
          questionText: "What is JavaScript?",
          questionType: "MULTIPLE_CHOICE",
          options: ["A programming language", "A coffee type", "A browser", "An OS"],
          correctAnswers: [0],
          points: 10
        },
        {
          id: 2,
          questionText: "Which symbol is used for comments in JavaScript?",
          questionType: "MULTIPLE_CHOICE",
          options: ["//", "#", "/**/", "All of the above"],
          correctAnswers: [3],
          points: 10
        }
      ]
    },
    {
      id: 2,
      title: "React Basics",
      description: "Understanding React components and state",
      topic: "Programming",
      difficulty: "MEDIUM",
      timeLimit: 45,
      totalQuestions: 3,
      createdBy: 1,
      createdAt: new Date().toISOString(),
      questions: [
        {
          id: 3,
          questionText: "What is a React component?",
          questionType: "MULTIPLE_CHOICE",
          options: ["A function or class", "A HTML tag", "A CSS style", "A database"],
          correctAnswers: [0],
          points: 15
        }
      ]
    }
  ],

  // Mock quiz generation
  mockCreateQuiz: async (quizData) => {
    console.log('Using mock quiz creation for:', quizData.title);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Validate required fields
    if (!quizData.title || !quizData.description) {
      throw new Error('Title and description are required');
    }
    
    const newQuiz = {
      id: Date.now(),
      title: quizData.title,
      description: quizData.description,
      topic: quizData.topic || 'General',
      difficulty: quizData.difficulty || 'MEDIUM',
      timeLimit: quizData.timeLimit || 30,
      totalQuestions: quizData.questions?.length || 0,
      createdBy: quizData.createdBy || 1,
      createdAt: new Date().toISOString(),
      questions: quizData.questions || []
    };
    
    // Add to mock storage
    mockQuizService.quizzes.push(newQuiz);
    
    console.log('Mock quiz created successfully:', newQuiz.title);
    return newQuiz;
  },

  // Mock AI quiz generation
  mockGenerateAiQuiz: async (generationRequest) => {
    console.log('Using mock AI quiz generation for topic:', generationRequest.topic);
    
    // Simulate longer AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (!generationRequest.topic) {
      throw new Error('Topic is required for AI quiz generation');
    }
    
    // Generate mock AI questions based on topic
    const mockQuestions = [
      {
        id: Date.now() + 1,
        questionText: `What is the main concept in ${generationRequest.topic}?`,
        questionType: "MULTIPLE_CHOICE",
        options: [
          `Basic ${generationRequest.topic} principle`,
          `Advanced ${generationRequest.topic} theory`,
          `${generationRequest.topic} application`,
          `${generationRequest.topic} history`
        ],
        correctAnswers: [0],
        points: 10
      },
      {
        id: Date.now() + 2,
        questionText: `How do you apply ${generationRequest.topic} in practice?`,
        questionType: "MULTIPLE_CHOICE",
        options: [
          "Through study and practice",
          "By memorizing facts",
          "Through repetition only",
          "By avoiding practice"
        ],
        correctAnswers: [0],
        points: 10
      },
      {
        id: Date.now() + 3,
        questionText: `What are the benefits of learning ${generationRequest.topic}?`,
        questionType: "MULTIPLE_CHOICE",
        options: [
          "Better understanding and skills",
          "No benefits",
          "Waste of time",
          "Creates confusion"
        ],
        correctAnswers: [0],
        points: 10
      }
    ];
    
    const aiQuiz = {
      id: Date.now(),
      title: `AI Generated: ${generationRequest.topic} Quiz`,
      description: `AI-generated quiz covering ${generationRequest.topic} fundamentals`,
      topic: generationRequest.topic,
      difficulty: generationRequest.difficulty || 'MEDIUM',
      timeLimit: generationRequest.timeLimit || 30,
      totalQuestions: mockQuestions.length,
      createdBy: generationRequest.createdBy || 1,
      createdAt: new Date().toISOString(),
      questions: mockQuestions,
      isAiGenerated: true
    };
    
    // Add to mock storage
    mockQuizService.quizzes.push(aiQuiz);
    
    console.log('Mock AI quiz generated successfully:', aiQuiz.title);
    return aiQuiz;
  },

  // Mock get all quizzes
  mockGetAllQuizzes: async (page = 0, size = 10) => {
    console.log('Using mock get all quizzes');
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const startIndex = page * size;
    const endIndex = startIndex + size;
    const paginatedQuizzes = mockQuizService.quizzes.slice(startIndex, endIndex);
    
    return {
      content: paginatedQuizzes,
      totalElements: mockQuizService.quizzes.length,
      totalPages: Math.ceil(mockQuizService.quizzes.length / size),
      currentPage: page,
      size: size
    };
  },

  // Mock get quiz by ID
  mockGetQuizById: async (quizId) => {
    console.log('Using mock get quiz by ID:', quizId);
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const quiz = mockQuizService.quizzes.find(q => q.id == quizId);
    if (!quiz) {
      throw new Error('Quiz not found');
    }
    
    return quiz;
  },

  // Mock get quizzes by user
  mockGetQuizzesByUser: async (userId) => {
    console.log('Using mock get quizzes by user:', userId);
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Return user's quizzes (for demo, return all quizzes)
    return mockQuizService.quizzes.filter(q => q.createdBy == userId);
  },

  // Mock update quiz
  mockUpdateQuiz: async (quizId, quizData) => {
    console.log('Using mock update quiz:', quizId);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const quizIndex = mockQuizService.quizzes.findIndex(q => q.id == quizId);
    if (quizIndex === -1) {
      throw new Error('Quiz not found');
    }
    
    mockQuizService.quizzes[quizIndex] = {
      ...mockQuizService.quizzes[quizIndex],
      ...quizData,
      id: quizId, // Preserve ID
      updatedAt: new Date().toISOString()
    };
    
    console.log('Mock quiz updated successfully');
    return mockQuizService.quizzes[quizIndex];
  },

  // Mock delete quiz
  mockDeleteQuiz: async (quizId) => {
    console.log('Using mock delete quiz:', quizId);
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const quizIndex = mockQuizService.quizzes.findIndex(q => q.id == quizId);
    if (quizIndex === -1) {
      throw new Error('Quiz not found');
    }
    
    mockQuizService.quizzes.splice(quizIndex, 1);
    console.log('Mock quiz deleted successfully');
    return { message: 'Quiz deleted successfully' };
  }
};

export default mockQuizService;