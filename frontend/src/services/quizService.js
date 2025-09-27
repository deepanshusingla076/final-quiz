import { fetchAPI } from './authService';

const quizService = {
  // Get all quizzes with pagination
  getAllQuizzes: async (page = 0, size = 10) => {
    return await fetchAPI(`/quizzes?page=${page}&size=${size}`, { method: 'GET' });
  },

  // Get quiz by ID
  getQuizById: async (quizId) => {
    return await fetchAPI(`/quizzes/${quizId}`, { method: 'GET' });
  },

  // Get quizzes by topic
  getQuizzesByTopic: async (topic) => {
    return await fetchAPI(`/quizzes/topic/${encodeURIComponent(topic)}`, { method: 'GET' });
  },

  // Get quizzes by difficulty
  getQuizzesByDifficulty: async (difficulty) => {
    return await fetchAPI(`/quizzes/difficulty/${difficulty}`, { method: 'GET' });
  },

  // Get quizzes by user (teacher)
  getQuizzesByUser: async (userId) => {
    return await fetchAPI(`/quizzes/user/${userId}`, { method: 'GET' });
  },

  // Create manual quiz
  createQuiz: async (quizData) => {
    return await fetchAPI('/quizzes', {
      method: 'POST',
      body: JSON.stringify(quizData),
    });
  },

  // Generate AI quiz
  generateAiQuiz: async (generationRequest) => {
    return await fetchAPI('/quizzes/generate', {
      method: 'POST',
      body: JSON.stringify(generationRequest),
    });
  },

  // Update quiz
  updateQuiz: async (quizId, quizData) => {
    return await fetchAPI(`/quizzes/${quizId}`, {
      method: 'PUT',
      body: JSON.stringify(quizData),
    });
  },

  // Delete quiz
  deleteQuiz: async (quizId) => {
    return await fetchAPI(`/quizzes/${quizId}`, { method: 'DELETE' });
  },

  // Get quiz questions
  getQuizQuestions: async (quizId) => {
    return await fetchAPI(`/quizzes/${quizId}/questions`, { method: 'GET' });
  },

  // Add question to quiz
  addQuestionToQuiz: async (quizId, questionData) => {
    return await fetchAPI(`/quizzes/${quizId}/questions`, {
      method: 'POST',
      body: JSON.stringify(questionData),
    });
  },

  // Update question
  updateQuestion: async (quizId, questionId, questionData) => {
    return await fetchAPI(`/quizzes/${quizId}/questions/${questionId}`, {
      method: 'PUT',
      body: JSON.stringify(questionData),
    });
  },

  // Delete question
  deleteQuestion: async (quizId, questionId) => {
    return await fetchAPI(`/quizzes/${quizId}/questions/${questionId}`, { method: 'DELETE' });
  },

  // Search quizzes
  searchQuizzes: async (keyword) => {
    return await fetchAPI(`/quizzes/search?keyword=${encodeURIComponent(keyword)}`, { method: 'GET' });
  },

  // Get quiz statistics
  getQuizStats: async (quizId) => {
    return await fetchAPI(`/quizzes/${quizId}/stats`, { method: 'GET' });
  },
};

export default quizService;