import { fetchAPI } from './authService';
import mockQuizService from './mockQuizService';

const quizService = {
  // Get all quizzes with pagination
  getAllQuizzes: async (page = 0, size = 10) => {
    try {
      return await fetchAPI(`/quizzes?page=${page}&size=${size}`, { method: 'GET' });
    } catch (error) {
      console.warn('Backend getAllQuizzes failed, using mock data:', error.message);
      if (error.message === 'TIMEOUT' || error.message === 'NETWORK_ERROR' || error.message === 'BACKEND_ERROR') {
        return await mockQuizService.mockGetAllQuizzes(page, size);
      }
      throw error;
    }
  },

  // Get quiz by ID
  getQuizById: async (quizId) => {
    try {
      return await fetchAPI(`/quizzes/${quizId}`, { method: 'GET' });
    } catch (error) {
      console.warn('Backend getQuizById failed, using mock data:', error.message);
      if (error.message === 'TIMEOUT' || error.message === 'NETWORK_ERROR' || error.message === 'BACKEND_ERROR') {
        return await mockQuizService.mockGetQuizById(quizId);
      }
      throw error;
    }
  },

  // Get quizzes by topic
  getQuizzesByTopic: async (topic) => {
    try {
      return await fetchAPI(`/quizzes/topic/${encodeURIComponent(topic)}`, { method: 'GET' });
    } catch (error) {
      console.warn('Backend getQuizzesByTopic failed, using mock data:', error.message);
      if (error.message === 'TIMEOUT' || error.message === 'NETWORK_ERROR' || error.message === 'BACKEND_ERROR') {
        return await mockQuizService.mockGetAllQuizzes().then(result => 
          result.content.filter(quiz => quiz.topic === topic)
        );
      }
      throw error;
    }
  },

  // Get quizzes by difficulty
  getQuizzesByDifficulty: async (difficulty) => {
    try {
      return await fetchAPI(`/quizzes/difficulty/${difficulty}`, { method: 'GET' });
    } catch (error) {
      console.warn('Backend getQuizzesByDifficulty failed, using mock data:', error.message);
      if (error.message === 'TIMEOUT' || error.message === 'NETWORK_ERROR' || error.message === 'BACKEND_ERROR') {
        return await mockQuizService.mockGetAllQuizzes().then(result => 
          result.content.filter(quiz => quiz.difficulty === difficulty)
        );
      }
      throw error;
    }
  },

  // Get quizzes by user (teacher)
  getQuizzesByUser: async (userId) => {
    try {
      return await fetchAPI(`/quizzes/user/${userId}`, { method: 'GET' });
    } catch (error) {
      console.warn('Backend getQuizzesByUser failed, using mock data:', error.message);
      if (error.message === 'TIMEOUT' || error.message === 'NETWORK_ERROR' || error.message === 'BACKEND_ERROR') {
        return await mockQuizService.mockGetQuizzesByUser(userId);
      }
      throw error;
    }
  },

  // Create manual quiz
  createQuiz: async (quizData) => {
    try {
      return await fetchAPI('/quizzes', {
        method: 'POST',
        body: JSON.stringify(quizData),
      });
    } catch (error) {
      console.warn('Backend createQuiz failed, using mock data:', error.message);
      if (error.message === 'TIMEOUT' || error.message === 'NETWORK_ERROR' || error.message === 'BACKEND_ERROR') {
        return await mockQuizService.mockCreateQuiz(quizData);
      }
      throw error;
    }
  },

  // Generate AI quiz
  generateAiQuiz: async (generationRequest) => {
    try {
      return await fetchAPI('/quizzes/generate', {
        method: 'POST',
        body: JSON.stringify(generationRequest),
      });
    } catch (error) {
      console.warn('Backend generateAiQuiz failed, using mock data:', error.message);
      if (error.message === 'TIMEOUT' || error.message === 'NETWORK_ERROR' || error.message === 'BACKEND_ERROR') {
        return await mockQuizService.mockGenerateAiQuiz(generationRequest);
      }
      throw error;
    }
  },

  // Update quiz
  updateQuiz: async (quizId, quizData) => {
    try {
      return await fetchAPI(`/quizzes/${quizId}`, {
        method: 'PUT',
        body: JSON.stringify(quizData),
      });
    } catch (error) {
      console.warn('Backend updateQuiz failed, using mock data:', error.message);
      if (error.message === 'TIMEOUT' || error.message === 'NETWORK_ERROR' || error.message === 'BACKEND_ERROR') {
        return await mockQuizService.mockUpdateQuiz(quizId, quizData);
      }
      throw error;
    }
  },

  // Delete quiz
  deleteQuiz: async (quizId) => {
    try {
      return await fetchAPI(`/quizzes/${quizId}`, { method: 'DELETE' });
    } catch (error) {
      console.warn('Backend deleteQuiz failed, using mock data:', error.message);
      if (error.message === 'TIMEOUT' || error.message === 'NETWORK_ERROR' || error.message === 'BACKEND_ERROR') {
        return await mockQuizService.mockDeleteQuiz(quizId);
      }
      throw error;
    }
  },

  // Get quiz questions
  getQuizQuestions: async (quizId) => {
    try {
      return await fetchAPI(`/quizzes/${quizId}/questions`, { method: 'GET' });
    } catch (error) {
      console.warn('Backend getQuizQuestions failed, using mock data:', error.message);
      if (error.message === 'TIMEOUT' || error.message === 'NETWORK_ERROR' || error.message === 'BACKEND_ERROR') {
        const quiz = await mockQuizService.mockGetQuizById(quizId);
        return quiz.questions || [];
      }
      throw error;
    }
  },

  // Add question to quiz
  addQuestionToQuiz: async (quizId, questionData) => {
    try {
      return await fetchAPI(`/quizzes/${quizId}/questions`, {
        method: 'POST',
        body: JSON.stringify(questionData),
      });
    } catch (error) {
      console.warn('Backend addQuestionToQuiz failed:', error.message);
      throw error;
    }
  },

  // Update question
  updateQuestion: async (quizId, questionId, questionData) => {
    try {
      return await fetchAPI(`/quizzes/${quizId}/questions/${questionId}`, {
        method: 'PUT',
        body: JSON.stringify(questionData),
      });
    } catch (error) {
      console.warn('Backend updateQuestion failed:', error.message);
      throw error;
    }
  },

  // Delete question
  deleteQuestion: async (quizId, questionId) => {
    try {
      return await fetchAPI(`/quizzes/${quizId}/questions/${questionId}`, { method: 'DELETE' });
    } catch (error) {
      console.warn('Backend deleteQuestion failed:', error.message);
      throw error;
    }
  },

  // Search quizzes
  searchQuizzes: async (keyword) => {
    try {
      return await fetchAPI(`/quizzes/search?keyword=${encodeURIComponent(keyword)}`, { method: 'GET' });
    } catch (error) {
      console.warn('Backend searchQuizzes failed, using mock data:', error.message);
      if (error.message === 'TIMEOUT' || error.message === 'NETWORK_ERROR' || error.message === 'BACKEND_ERROR') {
        const allQuizzes = await mockQuizService.mockGetAllQuizzes();
        return allQuizzes.content.filter(quiz => 
          quiz.title.toLowerCase().includes(keyword.toLowerCase()) ||
          quiz.description.toLowerCase().includes(keyword.toLowerCase())
        );
      }
      throw error;
    }
  },

  // Get quiz statistics
  getQuizStats: async (quizId) => {
    try {
      return await fetchAPI(`/quizzes/${quizId}/stats`, { method: 'GET' });
    } catch (error) {
      console.warn('Backend getQuizStats failed, using mock data:', error.message);
      if (error.message === 'TIMEOUT' || error.message === 'NETWORK_ERROR' || error.message === 'BACKEND_ERROR') {
        return {
          totalAttempts: Math.floor(Math.random() * 50) + 1,
          averageScore: Math.floor(Math.random() * 40) + 60,
          completionRate: Math.floor(Math.random() * 30) + 70
        };
      }
      throw error;
    }
  },
};

export default quizService;
