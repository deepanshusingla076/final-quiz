import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import Navigation from "../components/Navigation";
import "../App.css";

const LandingPage = () => {
  const { isAuthenticated, user } = useAuth();
  const [activeSection, setActiveSection] = useState('home');
  const [openFaq, setOpenFaq] = useState(null);

  // Handle navigation highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'features', 'faq', 'contact'];
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

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqData = [
    {
      question: "How does AI quiz generation work?",
      answer: "Our AI-powered system uses Google Gemini to create high-quality quizzes based on your specified topics and difficulty levels. Simply provide a topic, choose difficulty, and get instant, relevant questions with explanations."
    },
    {
      question: "Can students retake quizzes?",
      answer: "Quiz retake policies are set by teachers when creating quizzes. Teachers can choose to allow unlimited attempts, limited attempts, or single-attempt only, depending on their assessment needs."
    },
    {
      question: "How are quiz results analyzed?",
      answer: "QWIZZ provides comprehensive analytics including score distributions, question difficulty analysis, time spent per question, and performance trends over time. Teachers get detailed insights to improve their teaching methods."
    },
    {
      question: "Is the platform mobile-friendly?",
      answer: "Absolutely! QWIZZ features a responsive neo-brutalist design that works seamlessly on all devices - smartphones, tablets, and desktops. Students can take quizzes anywhere, anytime."
    },
    {
      question: "How secure are quiz questions and results?",
      answer: "We use JWT-based authentication, encrypted data transmission, and secure cloud storage. All quiz data is protected with enterprise-grade security measures and role-based access controls."
    },
    {
      question: "Can I export quiz results and analytics?",
      answer: "Yes! Teachers can export detailed analytics and results in multiple formats including CSV and PDF. This makes it easy to share performance data with administrators or include in reports."
    }
  ];

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
      <motion.section 
        id="features"
        className="features"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="container">
          <motion.h2 className="section-title" variants={itemVariants}>
            Why Choose <strong>QWIZZ</strong>?
          </motion.h2>
          <motion.p className="section-subtitle" variants={itemVariants}>
            Smart, fast, and built for colleges
          </motion.p>

          <div className="features-grid">
            <motion.div className="feature-card" variants={itemVariants}>
              <div className="feature-icon">
                <i className="fas fa-robot"></i>
              </div>
              <h3>AI Quiz Generation</h3>
              <p>Teachers can auto-generate quizzes instantly using our <strong>Gemini AI</strong> integration.</p>
              <Link to={isAuthenticated && user?.role === 'TEACHER' ? "/quiz/ai-generate" : "/auth"} className="feature-link">
                Generate with AI <i className="fas fa-arrow-right"></i>
              </Link>
            </motion.div>

            <motion.div className="feature-card" variants={itemVariants}>
              <div className="feature-icon">
                <i className="fas fa-edit"></i>
              </div>
              <h3>Create Custom Quizzes</h3>
              <p>Build quizzes manually with multiple question types, difficulty levels, and assignments.</p>
              <Link to={isAuthenticated && user?.role === 'TEACHER' ? "/quiz/create" : "/auth"} className="feature-link">
                Create Quiz <i className="fas fa-arrow-right"></i>
              </Link>
            </motion.div>

            <motion.div className="feature-card" variants={itemVariants}>
              <div className="feature-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3>Role-Based Access</h3>
              <p>Secure authentication with <strong>role-based permissions</strong> for teachers and students.</p>
              <Link to={isAuthenticated ? "/dashboard" : "/auth"} className="feature-link">
                Access Dashboard <i className="fas fa-arrow-right"></i>
              </Link>
            </motion.div>

            <motion.div className="feature-card" variants={itemVariants}>
              <div className="feature-icon">
                <i className="fas fa-user-graduate"></i>
              </div>
              <h3>Student Dashboard</h3>
              <p>Students view assigned quizzes, attempt once, track history, and see results.</p>
              <Link to={isAuthenticated && user?.role === 'STUDENT' ? "/student/dashboard" : "/auth"} className="feature-link">
                Student Portal <i className="fas fa-arrow-right"></i>
              </Link>
            </motion.div>

            <motion.div className="feature-card" variants={itemVariants}>
              <div className="feature-icon">
                <i className="fas fa-chart-bar"></i>
              </div>
              <h3>Advanced Analytics</h3>
              <p>View performance, export results, and analyze scores with <strong>detailed insights</strong>.</p>
              <Link to={isAuthenticated && user?.role === 'TEACHER' ? "/analytics" : "/auth"} className="feature-link">
                View Analytics <i className="fas fa-arrow-right"></i>
              </Link>
            </motion.div>

            <motion.div className="feature-card" variants={itemVariants}>
              <div className="feature-icon">
                <i className="fas fa-mobile-alt"></i>
              </div>
              <h3>Mobile Responsive</h3>
              <p><strong>Neo-brutalist design</strong> that works perfectly on all devices and screen sizes.</p>
              <a href="#features" className="feature-link">
                Learn More <i className="fas fa-arrow-right"></i>
              </a>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section 
        id="faq"
        className="faq-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="container">
          <motion.h2 className="section-title" variants={itemVariants}>
            Frequently Asked <strong>Questions</strong>
          </motion.h2>
          <motion.p className="section-subtitle" variants={itemVariants}>
            Everything you need to know about QWIZZ
          </motion.p>

          <div className="faq-container">
            {faqData.map((faq, index) => (
              <motion.div 
                key={index}
                className={`faq-item ${openFaq === index ? 'active' : ''}`}
                variants={itemVariants}
              >
                <div 
                  className="faq-question"
                  onClick={() => toggleFaq(index)}
                >
                  <h4>{faq.question}</h4>
                  <i className={`fas fa-chevron-${openFaq === index ? 'up' : 'down'}`}></i>
                </div>
                <motion.div 
                  className="faq-answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ 
                    height: openFaq === index ? 'auto' : 0, 
                    opacity: openFaq === index ? 1 : 0 
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="faq-content">
                    <p>{faq.answer}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        className="stats"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="container">
          <div className="stats-grid">
            <motion.div className="stat-card" variants={itemVariants}>
              <div className="stat-number">500+</div>
              <div className="stat-label">Quizzes Created</div>
            </motion.div>
            <motion.div className="stat-card" variants={itemVariants}>
              <div className="stat-number">2000+</div>
              <div className="stat-label">Students Registered</div>
            </motion.div>
            <motion.div className="stat-card" variants={itemVariants}>
              <div className="stat-number">10000+</div>
              <div className="stat-label">Quiz Attempts</div>
            </motion.div>
            <motion.div className="stat-card" variants={itemVariants}>
              <div className="stat-number">98%</div>
              <div className="stat-label">Teacher Satisfaction</div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        id="contact"
        className="contact-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="container">
          <motion.h2 className="section-title" variants={itemVariants}>
            Get in <strong>Touch</strong>
          </motion.h2>
          <motion.p className="section-subtitle" variants={itemVariants}>
            Have questions? We're here to help!
          </motion.p>

          <div className="contact-grid">
            <motion.div className="contact-card" variants={itemVariants}>
              <div className="contact-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <h4>Email Support</h4>
              <p>Get help from our support team</p>
              <a href="mailto:support@qwizz.com" className="contact-link">
                support@qwizz.com
              </a>
            </motion.div>

            <motion.div className="contact-card" variants={itemVariants}>
              <div className="contact-icon">
                <i className="fas fa-book"></i>
              </div>
              <h4>Documentation</h4>
              <p>Learn how to use QWIZZ effectively</p>
              <a href="#" className="contact-link">
                View Docs
              </a>
            </motion.div>

            <motion.div className="contact-card" variants={itemVariants}>
              <div className="contact-icon">
                <i className="fas fa-comments"></i>
              </div>
              <h4>Community</h4>
              <p>Join our community of educators</p>
              <a href="#" className="contact-link">
                Join Discord
              </a>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="cta"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="container">
          <motion.div className="cta-content" variants={itemVariants}>
            <h2>Ready to Transform Your Teaching?</h2>
            <p>Join thousands of educators using QWIZZ to create engaging quizzes and track student progress!</p>
            <div className="cta-buttons">
              {isAuthenticated ? (
                <>
                  {user?.role === 'TEACHER' ? (
                    <>
                      <Link to="/quiz/create" className="btn btn-primary btn-large">
                        <i className="fas fa-plus"></i>
                        Create Your First Quiz
                      </Link>
                      <Link to="/quiz/ai-generate" className="btn btn-accent btn-large">
                        <i className="fas fa-magic"></i>
                        Try AI Generator
                      </Link>
                    </>
                  ) : (
                    <Link to="/student/dashboard" className="btn btn-primary btn-large">
                      <i className="fas fa-tachometer-alt"></i>
                      Go to Dashboard
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <Link to="/auth" className="btn btn-primary btn-large">
                    <i className="fas fa-user-plus"></i>
                    Sign Up Now
                  </Link>
                  <Link to="/auth" className="btn btn-secondary btn-large">
                    <i className="fas fa-sign-in-alt"></i>
                    Login
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h3>QWIZZ</h3>
            <p>AI-powered quiz platform for modern education</p>
            <div className="social-links">
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-github"></i></a>
              <a href="#"><i className="fab fa-linkedin"></i></a>
              <a href="#"><i className="fab fa-discord"></i></a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Platform</h4>
            <ul>
              <li><Link to="/auth">Get Started</Link></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#contact">Support</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Resources</h4>
            <ul>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">API Reference</a></li>
              <li><a href="#">Community</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Cookie Policy</a></li>
              <li><a href="#">GDPR</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; 2024 QWIZZ. All rights reserved. Made with{" "}
            <i className="fas fa-heart"></i> for educators worldwide.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;