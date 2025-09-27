import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import quizService from '../services/quizService';
import resultService from '../services/resultService';
import DashboardLayout from '../components/DashboardLayout';
import QuizCard from '../components/QuizCard';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [availableQuizzes, setAvailableQuizzes] = useState([]);
  const [recentResults, setRecentResults] = useState([]);
  const [stats, setStats] = useState({
    totalAttempts: 0,
    averageScore: 0,
    quizzesCompleted: 0,
    bestScore: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch available quizzes
      const quizzes = await quizService.getAllQuizzes();
      setAvailableQuizzes(quizzes.filter(quiz => quiz.active));

      // Fetch user's results
      const userResults = await resultService.getUserResults(user.id);
      setRecentResults(userResults.slice(0, 5)); // Show recent 5 results

      // Calculate stats
      const totalAttempts = userResults.length;
      const scores = userResults.map(result => result.score);
      const averageScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
      const bestScore = scores.length > 0 ? Math.max(...scores) : 0;
      
      // Count unique quizzes completed
      const uniqueQuizzes = new Set(userResults.map(result => result.quizId));
      const quizzesCompleted = uniqueQuizzes.size;

      setStats({
        totalAttempts,
        averageScore,
        quizzesCompleted,
        bestScore
      });

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'excellent';
    if (score >= 60) return 'good';
    if (score >= 40) return 'fair';
    return 'poor';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return <LoadingSpinner text="Loading your dashboard..." />;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <DashboardLayout>
      <motion.div
        className="student-dashboard"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="dashboard-header" variants={itemVariants}>
          <h1>Welcome back, <span className="accent">{user.firstName}</span>!</h1>
          <p>Discover quizzes, track your progress, and improve your knowledge</p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div className="stats-grid" variants={itemVariants}>
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-trophy"></i>
            </div>
            <div className="stat-content">
              <div className="stat-number">{stats.bestScore}%</div>
              <div className="stat-label">Best Score</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <div className="stat-content">
              <div className="stat-number">{stats.averageScore}%</div>
              <div className="stat-label">Average Score</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <div className="stat-content">
              <div className="stat-number">{stats.quizzesCompleted}</div>
              <div className="stat-label">Quizzes Completed</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-play"></i>
            </div>
            <div className="stat-content">
              <div className="stat-number">{stats.totalAttempts}</div>
              <div className="stat-label">Total Attempts</div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div className="quick-actions" variants={itemVariants}>
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <motion.a
              href="/quiz/browse"
              className="action-card browse"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="action-icon">
                <i className="fas fa-search"></i>
              </div>
              <div className="action-content">
                <h3>Browse Quizzes</h3>
                <p>Explore all available quizzes by category</p>
              </div>
            </motion.a>

            <motion.a
              href="/results"
              className="action-card results"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="action-icon">
                <i className="fas fa-chart-pie"></i>
              </div>
              <div className="action-content">
                <h3>View Results</h3>
                <p>Check your quiz history and performance</p>
              </div>
            </motion.a>

            <motion.a
              href="/profile"
              className="action-card profile"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="action-icon">
                <i className="fas fa-user-cog"></i>
              </div>
              <div className="action-content">
                <h3>Profile Settings</h3>
                <p>Update your preferences and info</p>
              </div>
            </motion.a>

            <motion.a
              href="/leaderboard"
              className="action-card leaderboard"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="action-icon">
                <i className="fas fa-medal"></i>
              </div>
              <div className="action-content">
                <h3>Leaderboard</h3>
                <p>See how you rank against others</p>
              </div>
            </motion.a>
          </div>
        </motion.div>

        <div className="dashboard-content">
          {/* Recent Quiz Results */}
          <motion.div className="recent-results" variants={itemVariants}>
            <div className="section-header">
              <h2>Recent Results</h2>
              <a href="/results" className="btn btn-secondary">
                View All Results
              </a>
            </div>

            {recentResults.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">
                  <i className="fas fa-clipboard-list"></i>
                </div>
                <h3>No quiz attempts yet</h3>
                <p>Take your first quiz to see your results here!</p>
                <a href="/quiz/browse" className="btn btn-primary">
                  <i className="fas fa-play"></i>
                  Browse Quizzes
                </a>
              </div>
            ) : (
              <div className="results-list">
                {recentResults.map((result) => (
                  <motion.div
                    key={result.id}
                    className="result-item"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="result-info">
                      <h3>{result.quizTitle}</h3>
                      <div className="result-meta">
                        <span className="date">
                          <i className="fas fa-calendar"></i>
                          {formatDate(result.completedAt)}
                        </span>
                        <span className="time">
                          <i className="fas fa-clock"></i>
                          {Math.round(result.timeTaken / 60)} min
                        </span>
                      </div>
                    </div>
                    <div className={`score-badge ${getScoreColor(result.score)}`}>
                      {result.score}%
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Available Quizzes */}
          <motion.div className="available-quizzes" variants={itemVariants}>
            <div className="section-header">
              <h2>Available Quizzes</h2>
              <a href="/quiz/browse" className="btn btn-secondary">
                Browse All
              </a>
            </div>

            {availableQuizzes.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">
                  <i className="fas fa-search"></i>
                </div>
                <h3>No quizzes available</h3>
                <p>Check back later for new quizzes!</p>
              </div>
            ) : (
              <div className="quizzes-grid">
                {availableQuizzes.slice(0, 6).map((quiz) => (
                  <QuizCard
                    key={quiz.id}
                    quiz={quiz}
                    showActions={false}
                    showTakeQuiz={true}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default StudentDashboard;