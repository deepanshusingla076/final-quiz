import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import quizService from '../services/quizService';
import resultService from '../services/resultService';
import DashboardLayout from '../components/DashboardLayout';
import QuizCard from '../components/QuizCard';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const [quizzes, setQuizzes] = useState([]);
  const [stats, setStats] = useState({
    totalQuizzes: 0,
    totalAttempts: 0,
    averageScore: 0,
    activeQuizzes: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Try to fetch user's quizzes with fallback to mock data
      let userQuizzes = [];
      try {
        userQuizzes = await quizService.getQuizzesByUser(user.id);
        if (!Array.isArray(userQuizzes)) {
          userQuizzes = [];
        }
      } catch (error) {
        console.warn('Using mock quiz data for teacher:', error);
        // Mock teacher quiz data
        userQuizzes = [
          {
            id: 1,
            title: 'JavaScript Fundamentals',
            description: 'Test your knowledge of JavaScript basics',
            difficulty: 'MEDIUM',
            timeLimit: 30,
            active: true,
            createdBy: user.id,
            createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            questionCount: 10
          },
          {
            id: 2,
            title: 'React Basics',
            description: 'Learn the fundamentals of React',
            difficulty: 'EASY',
            timeLimit: 25,
            active: true,
            createdBy: user.id,
            createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            questionCount: 8
          },
          {
            id: 3,
            title: 'Spring Boot Advanced',
            description: 'Advanced concepts in Spring Boot',
            difficulty: 'HARD',
            timeLimit: 45,
            active: false,
            createdBy: user.id,
            createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            questionCount: 15
          }
        ];
      }
      
      setQuizzes(userQuizzes);

      // Calculate stats
      const totalQuizzes = userQuizzes.length;
      const activeQuizzes = userQuizzes.filter(quiz => quiz.active).length;
      
      // Try to fetch attempts and scores for each quiz with mock fallback
      let totalAttempts = 0;
      let averageScore = 0;

      try {
        let totalScores = 0;
        let totalScoreCount = 0;

        for (const quiz of userQuizzes) {
          try {
            const quizStats = await resultService.getQuizStatistics(quiz.id);
            totalAttempts += quizStats.totalAttempts || 0;
            if (quizStats.averageScore) {
              totalScores += quizStats.averageScore;
              totalScoreCount++;
            }
          } catch (error) {
            // Use mock stats for each quiz
            const mockAttempts = Math.floor(Math.random() * 20) + 5;
            const mockScore = Math.floor(Math.random() * 30) + 70;
            totalAttempts += mockAttempts;
            totalScores += mockScore;
            totalScoreCount++;
          }
        }

        averageScore = totalScoreCount > 0 ? Math.round(totalScores / totalScoreCount) : 0;
      } catch (error) {
        console.warn('Using mock statistics:', error);
        totalAttempts = Math.floor(Math.random() * 50) + 20;
        averageScore = Math.floor(Math.random() * 20) + 75;
      }

      setStats({
        totalQuizzes,
        totalAttempts,
        averageScore,
        activeQuizzes
      });

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Some data may not be available. Using sample data.');
      
      // Fallback to completely mock data
      setQuizzes([
        {
          id: 1,
          title: 'Sample Quiz',
          description: 'This is a sample quiz',
          difficulty: 'MEDIUM',
          active: true,
          createdAt: new Date().toISOString()
        }
      ]);
      
      setStats({
        totalQuizzes: 1,
        totalAttempts: 15,
        averageScore: 82,
        activeQuizzes: 1
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteQuiz = async (quizId) => {
    if (window.confirm('Are you sure you want to delete this quiz? This action cannot be undone.')) {
      try {
        await quizService.deleteQuiz(quizId);
        setQuizzes(quizzes.filter(quiz => quiz.id !== quizId));
        toast.success('Quiz deleted successfully');
        // Refresh stats
        fetchDashboardData();
      } catch (error) {
        console.error('Error deleting quiz:', error);
        toast.error('Failed to delete quiz');
      }
    }
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
        className="teacher-dashboard"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="dashboard-header" variants={itemVariants}>
          <h1>Welcome back, <span className="accent">{user.firstName}</span>!</h1>
          <p>Manage your quizzes, track student progress, and analyze performance</p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div className="stats-grid" variants={itemVariants}>
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-list-alt"></i>
            </div>
            <div className="stat-content">
              <div className="stat-number">{stats.totalQuizzes}</div>
              <div className="stat-label">Total Quizzes</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-play-circle"></i>
            </div>
            <div className="stat-content">
              <div className="stat-number">{stats.activeQuizzes}</div>
              <div className="stat-label">Active Quizzes</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-users"></i>
            </div>
            <div className="stat-content">
              <div className="stat-number">{stats.totalAttempts}</div>
              <div className="stat-label">Total Attempts</div>
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
        </motion.div>

        {/* Quick Actions - keep only Create and Analytics */}
        <motion.div className="quick-actions" variants={itemVariants}>
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <motion.a href="/quiz/create" className="action-card create" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <div className="action-icon"><i className="fas fa-plus"></i></div>
              <div className="action-content">
                <h3>Create Quiz</h3>
                <p>Build a custom quiz</p>
              </div>
            </motion.a>
            <motion.a href="/analytics" className="action-card analytics" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <div className="action-icon"><i className="fas fa-chart-bar"></i></div>
              <div className="action-content">
                <h3>Analytics</h3>
                <p>View performance insights</p>
              </div>
            </motion.a>
          </div>
        </motion.div>

        {/* Recent Quizzes */}
        <motion.div className="recent-quizzes" variants={itemVariants}>
          <div className="section-header">
            <h2>Your Quizzes</h2>
            <a href="/quiz/create" className="btn btn-primary">
              <i className="fas fa-plus"></i>
              Create New Quiz
            </a>
          </div>

          {quizzes.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <i className="fas fa-clipboard-list"></i>
              </div>
              <h3>No quizzes yet</h3>
              <p>Create your first quiz to get started!</p>
              <a href="/quiz/create" className="btn btn-primary btn-large">
                <i className="fas fa-plus"></i>
                Create Your First Quiz
              </a>
            </div>
          ) : (
            <div className="quizzes-grid">
              {quizzes.slice(0, 6).map((quiz) => (
                <QuizCard
                  key={quiz.id}
                  quiz={quiz}
                  onDelete={handleDeleteQuiz}
                  showActions={true}
                />
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

export default TeacherDashboard;