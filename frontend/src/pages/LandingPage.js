import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import Navigation from "../components/Navigation";
import "../App.css";

const LandingPage = () => {
  const { isAuthenticated } = useAuth();
  const [activeSection, setActiveSection] = useState('home');
  // Handle navigation highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home'];
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (

    <div className="landing-page">
      {/* Navigation */}
      <Navigation activeSection={activeSection} onNavigate={scrollToSection} />
      {/* Hero Section */}
      <motion.section 
        id="home"
        className="hero"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="hero-container">
          <motion.div className="hero-content" variants={itemVariants}>
            <h1 className="hero-title">
              Welcome to <span className="accent">QWIZZ</span>
            </h1>
            <p className="hero-subtitle">
              The most <strong>AI-powered</strong> and <strong>college-ready</strong> quiz platform — 
              where teachers create, assign, and manage quizzes, and students{" "}
              <strong>learn</strong>, <strong>attempt</strong>, and <strong>excel</strong> with ease
            </p>

            <div className="hero-cta">
              {isAuthenticated ? (
                <Link to="/dashboard" className="btn btn-primary btn-large">
                  <i className="fas fa-tachometer-alt"></i>
                  Go to Dashboard
                </Link>
              ) : (
                <Link to="/auth" className="btn btn-primary btn-large">
                  <i className="fas fa-rocket"></i>
                  Get Started Free
                </Link>
              )}
            </div>
          </motion.div>

          <motion.div className="hero-visual" variants={itemVariants}>
            <div className="floating-card card-1">
              <i className="fas fa-brain"></i>
              <span>AI Powered</span>
            </div>
            <div className="floating-card card-2">
              <i className="fas fa-users"></i>
              <span>Community</span>
            </div>
            <div className="floating-card card-3">
              <i className="fas fa-trophy"></i>
              <span>Compete</span>
            </div>
            <div className="floating-card card-4">
              <i className="fas fa-chart-line"></i>
              <span>Track Progress</span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose <strong>QWIZZ</strong>?</h2>
          <p className="section-subtitle">Smart, fast, and built for colleges</p>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-robot"></i>
              </div>
              <h3>AI Quiz Generation</h3>
              <p>Teachers can auto-generate quizzes instantly using our <strong>Gemini AI</strong> integration.</p>
              <a href="/quiz/ai-generate" className="feature-link">
                Generate with AI <i className="fas fa-arrow-right"></i>
              </a>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-edit"></i>
              </div>
              <h3>Create Custom Quizzes</h3>
              <p>Build quizzes manually with multiple question types, difficulty levels, and assignments.</p>
              <a href="/quiz/create" className="feature-link">
                Create Quiz <i className="fas fa-arrow-right"></i>
              </a>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3>Group & Section Assignment</h3>
              <p>Assign quizzes to <strong>specific groups</strong>. Students see only the quizzes meant for them.</p>
              <a href="/groups" className="feature-link">
                Manage Groups <i className="fas fa-arrow-right"></i>
              </a>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-user-graduate"></i>
              </div>
              <h3>Student Dashboard</h3>
              <p>Students view assigned quizzes, attempt once, track history, and see results.</p>
              <a href="/student/dashboard" className="feature-link">
                Go to Dashboard <i className="fas fa-arrow-right"></i>
              </a>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-chart-bar"></i>
              </div>
              <h3>Teacher Analytics</h3>
              <p>View performance, export results, and analyze scores with <strong>insights</strong>.</p>
              <a href="/teacher/analytics" className="feature-link">
                View Analytics <i className="fas fa-arrow-right"></i>
              </a>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-mobile-alt"></i>
              </div>
              <h3>Mobile Friendly</h3>
              <p><strong>Responsive neo-brutalist design</strong> works on all devices.</p>
              <button type="button" className="feature-link" onClick={() => {}}>
                Learn More <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">200+</div>
              <div className="stat-label">Quizzes Created</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">1000+</div>
              <div className="stat-label">Students Registered</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">5000+</div>
              <div className="stat-label">Quiz Attempts</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">95%</div>
              <div className="stat-label">Teacher Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Quiz Journey?</h2>
            <p>Join thousands of learners and creators on QWIZZ today!</p>
            <div className="cta-buttons">
              {isAuthenticated ? (
                <>
                  <a href="/quiz/create" className="btn btn-primary btn-large">
                    <i className="fas fa-plus"></i>
                    Create Your First Quiz
                  </a>
                  <a href="/quiz/ai-generate" className="btn btn-accent btn-large">
                    <i className="fas fa-magic"></i>
                    Try AI Generator
                  </a>
                </>
              ) : (
                <>
                  <a href="/auth" className="btn btn-primary btn-large">
                    <i className="fas fa-user-plus"></i>
                    Sign Up Now
                  </a>
                  <a href="/auth" className="btn btn-secondary btn-large">
                    <i className="fas fa-sign-in-alt"></i>
                    Login
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h3>QWIZZ</h3>
            <p>Interactive quiz platform with AI-powered quiz generation</p>
            <div className="social-links">
              <button type="button" className="social-link" onClick={() => {}}><i className="fab fa-twitter"></i></button>
              <button type="button" className="social-link" onClick={() => {}}><i className="fab fa-facebook"></i></button>
              <button type="button" className="social-link" onClick={() => {}}><i className="fab fa-instagram"></i></button>
              <button type="button" className="social-link" onClick={() => {}}><i className="fab fa-github"></i></button>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/features">Features</a></li>
              <li><a href="/about">About</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li><a href="/help">Help Center</a></li>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; 2024 QWIZZ. All rights reserved. Made with{" "}
            <i className="fas fa-heart"></i>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
