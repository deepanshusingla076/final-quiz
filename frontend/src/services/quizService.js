import { fetchAPI } from './authService';

const quizService = {
  getAllQuizzes: async (page = 0, size = 10) => {
    return await fetchAPI(`/quizzes?page=${page}&size=${size}`, { method: 'GET' });
  },

  getQuizById: async (quizId) => {
    return await fetchAPI(`/quizzes/${quizId}`, { method: 'GET' });
  },

  getQuizzesByTopic: async (topic) => {
    return await fetchAPI(`/quizzes/topic/${encodeURIComponent(topic)}`, { method: 'GET' });
  },

  getQuizzesByDifficulty: async (difficulty) => {
    return await fetchAPI(`/quizzes/difficulty/${difficulty}`, { method: 'GET' });
  },

  getQuizzesByUser: async (userId) => {
    return await fetchAPI(`/quizzes/user/${userId}`, { method: 'GET' });
  },

  createQuiz: async (quizData) => {
    return await fetchAPI('/quizzes', {
      method: 'POST',
      body: JSON.stringify(quizData),
    });
  },

  generateAiQuiz: async (generationRequest) => {
    return await fetchAPI('/quizzes/generate', {
      method: 'POST',
      body: JSON.stringify(generationRequest),
    });
  },

  updateQuiz: async (quizId, quizData) => {
    return await fetchAPI(`/quizzes/${quizId}`, {
      method: 'PUT',
      body: JSON.stringify(quizData),
    });
  },

  deleteQuiz: async (quizId) => {
    return await fetchAPI(`/quizzes/${quizId}`, { method: 'DELETE' });
  },

  getQuizQuestions: async (quizId) => {
    return await fetchAPI(`/quizzes/${quizId}/questions`, { method: 'GET' });
  },

  addQuestionToQuiz: async (quizId, questionData) => {
    return await fetchAPI(`/quizzes/${quizId}/questions`, {
      method: 'POST',
      body: JSON.stringify(questionData),
    });
  },

  updateQuestion: async (quizId, questionId, questionData) => {
    return await fetchAPI(`/quizzes/${quizId}/questions/${questionId}`, {
      method: 'PUT',
      body: JSON.stringify(questionData),
    });
  },

  deleteQuestion: async (quizId, questionId) => {
    return await fetchAPI(`/quizzes/${quizId}/questions/${questionId}`, { method: 'DELETE' });
  },

  searchQuizzes: async (keyword) => {
    return await fetchAPI(`/quizzes/search?keyword=${encodeURIComponent(keyword)}`, { method: 'GET' });
  },

  getQuizStats: async (quizId) => {
    return await fetchAPI(`/quizzes/${quizId}/stats`, { method: 'GET' });
  },
};

export default quizService;
