import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import quizService from '../services/quizService';
import resultService from '../services/resultService';
import DashboardLayout from '../components/DashboardLayout';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';
import '../styles/Analytics.css';

const Analytics = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30'); // days
  const [analytics, setAnalytics] = useState({
    overview: {
      totalQuizzes: 0,
      totalAttempts: 0,
      totalStudents: 0,
      averageScore: 0
    },
    quizPerformance: [],
    studentActivity: [],
    categoryBreakdown: [],
    recentActivity: []
  });

  useEffect(() => {
    fetchAnalytics();
  }, [user, timeRange]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);

      // Fetch user's quizzes
      const quizzes = await quizService.getQuizzesByUser(user.id);
      
      // Simulate analytics data (replace with actual API calls)
      const mockAnalytics = {
        overview: {
          totalQuizzes: quizzes.length,
          totalAttempts: Math.floor(Math.random() * 500) + 100,
          totalStudents: Math.floor(Math.random() * 50) + 10,
          averageScore: Math.floor(Math.random() * 30) + 60
        },
        quizPerformance: quizzes.map(quiz => ({
          id: quiz.id,
          title: quiz.title,
          attempts: Math.floor(Math.random() * 50) + 5,
          averageScore: Math.floor(Math.random() * 40) + 50,
          completionRate: Math.floor(Math.random() * 30) + 70,
          difficulty: quiz.difficulty,
          category: quiz.category
        })),
        studentActivity: generateStudentActivity(),
        categoryBreakdown: generateCategoryBreakdown(),
        recentActivity: generateRecentActivity()
      };

      setAnalytics(mockAnalytics);

    } catch (error) {
      console.error('Error fetching analytics:', error);
      toast.error('Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  const generateStudentActivity = () => {
    const activities = [];
    const students = ['Alice Johnson', 'Bob Smith', 'Carol Williams', 'David Brown', 'Eve Davis'];
    
    for (let i = 0; i < 10; i++) {
      activities.push({
        id: i,
        student: students[Math.floor(Math.random() * students.length)],
        action: Math.random() > 0.5 ? 'completed' : 'started',
        quiz: `Sample Quiz ${i + 1}`,
        score: Math.random() > 0.5 ? Math.floor(Math.random() * 40) + 60 : null,
        timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
      });
    }

    return activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  };

  const generateCategoryBreakdown = () => {
    const categories = ['SCIENCE', 'MATHEMATICS', 'HISTORY', 'LITERATURE', 'TECHNOLOGY'];
    return categories.map(category => ({
      category,
      count: Math.floor(Math.random() * 10) + 1,
      averageScore: Math.floor(Math.random() * 30) + 60,
      totalAttempts: Math.floor(Math.random() * 100) + 20
    }));
  };

  const generateRecentActivity = () => {
    const activities = [];
    const actions = [
      'Quiz created: "Introduction to Biology"',
      'Student completed "Math Quiz #1" with 85%',
      'Quiz "History of WWII" published',
      'Student started "Literature Review"',
      'Quiz "JavaScript Basics" updated'
    ];

    for (let i = 0; i < 8; i++) {
      activities.push({
        id: i,
        action: actions[Math.floor(Math.random() * actions.length)],
        timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
        type: Math.random() > 0.5 ? 'quiz' : 'student'
      });
    }

    return activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'excellent';
    if (score >= 60) return 'good';
    if (score >= 40) return 'fair';
    return 'poor';
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'EASY': return 'easy';
      case 'MEDIUM': return 'medium';
      case 'HARD': return 'hard';
      default: return 'medium';
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <LoadingSpinner text="Loading analytics..." />
      </DashboardLayout>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <DashboardLayout>
      <motion.div
        className="analytics-page"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="page-header" variants={itemVariants}>
          <div className="header-content">
            <h1>
              <i className="fas fa-chart-bar"></i>
              Analytics Dashboard
            </h1>
            <p>Track quiz performance and student engagement</p>
          </div>
          <div className="header-actions">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="form-select"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 3 months</option>
              <option value="365">Last year</option>
            </select>
          </div>
        </motion.div>

        {/* Overview Stats */}
        <motion.div className="overview-stats" variants={itemVariants}>
          <h2>Overview</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon quiz">
                <i className="fas fa-list-alt"></i>
              </div>
              <div className="stat-content">
                <div className="stat-number">{analytics.overview.totalQuizzes}</div>
                <div className="stat-label">Total Quizzes</div>
                <div className="stat-change positive">+{Math.floor(Math.random() * 5) + 1} this month</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon attempts">
                <i className="fas fa-play-circle"></i>
              </div>
              <div className="stat-content">
                <div className="stat-number">{analytics.overview.totalAttempts}</div>
                <div className="stat-label">Total Attempts</div>
                <div className="stat-change positive">+{Math.floor(Math.random() * 20) + 5} this week</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon students">
                <i className="fas fa-users"></i>
              </div>
              <div className="stat-content">
                <div className="stat-number">{analytics.overview.totalStudents}</div>
                <div className="stat-label">Active Students</div>
                <div className="stat-change positive">+{Math.floor(Math.random() * 3) + 1} this week</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon score">
                <i className="fas fa-chart-line"></i>
              </div>
              <div className="stat-content">
                <div className="stat-number">{analytics.overview.averageScore}%</div>
                <div className="stat-label">Average Score</div>
                <div className="stat-change positive">+{Math.floor(Math.random() * 5) + 1}% from last month</div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="analytics-content">
          {/* Quiz Performance */}
          <motion.div className="quiz-performance" variants={itemVariants}>
            <div className="section-header">
              <h2>Quiz Performance</h2>
              <button className="btn btn-secondary btn-sm">
                <i className="fas fa-download"></i>
                Export Report
              </button>
            </div>

            <div className="performance-table">
              <table>
                <thead>
                  <tr>
                    <th>Quiz Title</th>
                    <th>Category</th>
                    <th>Difficulty</th>
                    <th>Attempts</th>
                    <th>Avg Score</th>
                    <th>Completion Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {analytics.quizPerformance.map((quiz) => (
                    <tr key={quiz.id}>
                      <td>
                        <div className="quiz-title">{quiz.title}</div>
                      </td>
                      <td>
                        <span className="category-badge">
                          {quiz.category ? quiz.category.replace('_', ' ') : 'General'}
                        </span>
                      </td>
                      <td>
                        <span className={`difficulty-badge ${getDifficultyColor(quiz.difficulty)}`}>
                          {quiz.difficulty}
                        </span>
                      </td>
                      <td>{quiz.attempts}</td>
                      <td>
                        <span className={`score-text ${getScoreColor(quiz.averageScore)}`}>
                          {quiz.averageScore}%
                        </span>
                      </td>
                      <td>
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{ width: `${quiz.completionRate}%` }}
                          ></div>
                          <span className="progress-text">{quiz.completionRate}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Category Breakdown */}
          <motion.div className="category-breakdown" variants={itemVariants}>
            <div className="section-header">
              <h2>Category Performance</h2>
            </div>

            <div className="categories-grid">
              {analytics.categoryBreakdown.map((category) => (
                <div key={category.category} className="category-card">
                  <div className="category-header">
                    <h3>{category.category.replace('_', ' ')}</h3>
                    <span className="quiz-count">{category.count} quizzes</span>
                  </div>
                  <div className="category-stats">
                    <div className="stat-item">
                      <span className="stat-label">Average Score</span>
                      <span className={`stat-value ${getScoreColor(category.averageScore)}`}>
                        {category.averageScore}%
                      </span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Total Attempts</span>
                      <span className="stat-value">{category.totalAttempts}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Student Activity */}
          <motion.div className="student-activity" variants={itemVariants}>
            <div className="section-header">
              <h2>Recent Student Activity</h2>
              <a href="/students" className="btn btn-secondary btn-sm">
                View All Students
              </a>
            </div>

            <div className="activity-list">
              {analytics.studentActivity.map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-icon">
                    <i className={`fas fa-${activity.action === 'completed' ? 'check-circle' : 'play-circle'}`}></i>
                  </div>
                  <div className="activity-content">
                    <div className="activity-text">
                      <strong>{activity.student}</strong> {activity.action} 
                      <span className="quiz-name">{activity.quiz}</span>
                      {activity.score && (
                        <span className={`score-badge ${getScoreColor(activity.score)}`}>
                          {activity.score}%
                        </span>
                      )}
                    </div>
                    <div className="activity-time">
                      {formatDate(activity.timestamp)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div className="recent-activity" variants={itemVariants}>
            <div className="section-header">
              <h2>Recent Activity</h2>
            </div>

            <div className="activity-timeline">
              {analytics.recentActivity.map((activity) => (
                <div key={activity.id} className="timeline-item">
                  <div className={`timeline-icon ${activity.type}`}>
                    <i className={`fas fa-${activity.type === 'quiz' ? 'list-alt' : 'user'}`}></i>
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-text">{activity.action}</div>
                    <div className="timeline-time">{formatDate(activity.timestamp)}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Analytics;
