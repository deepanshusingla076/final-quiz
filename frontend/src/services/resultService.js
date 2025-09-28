import { fetchAPI } from './authService';

const resultService = {
  // Submit quiz attempt (alias for submitQuizAttempt)
  submitResult: async (resultData) => {
    return await fetchAPI('/results/submit', {
      method: 'POST',
      body: JSON.stringify(resultData),
    });
  },

  // Submit quiz attempt
  submitQuizAttempt: async (attemptData) => {
    return await fetchAPI('/results/submit', {
      method: 'POST',
      body: JSON.stringify(attemptData),
    });
  },

  // Get result by ID
  getResultById: async (resultId) => {
    return await fetchAPI(`/results/${resultId}`, { method: 'GET' });
  },

  // Get results by user
  getResultsByUser: async (userId, page = 0, size = 10) => {
    return await fetchAPI(`/results/user/${userId}?page=${page}&size=${size}`, { method: 'GET' });
  },

  // Get results by quiz
  getResultsByQuiz: async (quizId, page = 0, size = 10) => {
    return await fetchAPI(`/results/quiz/${quizId}?page=${page}&size=${size}`, { method: 'GET' });
  },

  // Get quiz statistics
  getQuizStatistics: async (quizId) => {
    return await fetchAPI(`/results/quiz/${quizId}/stats`, { method: 'GET' });
  },

  // Get user statistics
  getUserStatistics: async (userId) => {
    return await fetchAPI(`/results/user/${userId}/stats`, { method: 'GET' });
  },
};

export default resultService;