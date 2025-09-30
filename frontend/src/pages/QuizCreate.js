import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import quizService from '../services/quizService';
import DashboardLayout from '../components/DashboardLayout';
import toast from 'react-hot-toast';
import '../styles/QuizForms.css';

const QuizCreate = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [quizData, setQuizData] = useState({
    title: '',
    description: '',
    difficulty: 'MEDIUM',
    timeLimit: 30,
    isActive: true,
    questions: []
  });

  const [currentQuestion, setCurrentQuestion] = useState({
    questionText: '',
    type: 'MULTIPLE_CHOICE',
    options: ['', '', '', ''],
    correctAnswer: '',
    points: 1,
    explanation: ''
  });

  const [showQuestionForm, setShowQuestionForm] = useState(false);

  const difficulties = ['EASY', 'MEDIUM', 'HARD'];
  const questionTypes = [
    { value: 'MULTIPLE_CHOICE', label: 'Multiple Choice' },
    { value: 'TRUE_FALSE', label: 'True/False' },
    { value: 'SHORT_ANSWER', label: 'Short Answer' }
  ];

  const handleQuizDataChange = (field, value) => {
    setQuizData(prev => ({ ...prev, [field]: value }));
  };

  const handleQuestionChange = (field, value) => {
    setCurrentQuestion(prev => ({ ...prev, [field]: value }));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...currentQuestion.options];
    newOptions[index] = value;
    setCurrentQuestion(prev => ({ ...prev, options: newOptions }));
  };

  const addQuestion = () => {
    // Validate question
    if (!currentQuestion.questionText.trim()) {
      toast.error('Question text is required');
      return;
    }

    if (currentQuestion.type === 'MULTIPLE_CHOICE') {
      const validOptions = currentQuestion.options.filter(opt => opt.trim());
      if (validOptions.length < 2) {
        toast.error('Multiple choice questions need at least 2 options');
        return;
      }
      if (!currentQuestion.correctAnswer.trim()) {
        toast.error('Please select the correct answer');
        return;
      }
    }

    if (currentQuestion.type === 'TRUE_FALSE' && !currentQuestion.correctAnswer) {
      toast.error('Please select true or false as the correct answer');
      return;
    }

    // Add question to quiz
    const questionToAdd = {
      ...currentQuestion,
      id: Date.now(), // Temporary ID for frontend
      options: currentQuestion.type === 'MULTIPLE_CHOICE' ? 
        currentQuestion.options.filter(opt => opt.trim()) : 
        currentQuestion.type === 'TRUE_FALSE' ? ['True', 'False'] : []
    };

    setQuizData(prev => ({
      ...prev,
      questions: [...prev.questions, questionToAdd]
    }));

    // Reset question form
    setCurrentQuestion({
      questionText: '',
      type: 'MULTIPLE_CHOICE',
      options: ['', '', '', ''],
      correctAnswer: '',
      points: 1,
      explanation: ''
    });

    setShowQuestionForm(false);
    toast.success('Question added successfully');
  };

  const removeQuestion = (index) => {
    setQuizData(prev => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index)
    }));
    toast.success('Question removed');
  };

  const saveQuiz = async () => {
    // Validate quiz
    if (!quizData.title.trim()) {
      toast.error('Quiz title is required');
      return;
    }

    if (quizData.questions.length === 0) {
      toast.error('Please add at least one question');
      return;
    }

    try {
      setLoading(true);
      
      const quizToSave = {
        ...quizData,
        createdBy: user.id,
        createdAt: new Date().toISOString()
      };

      await quizService.createQuiz(quizToSave);
      toast.success('Quiz created successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating quiz:', error);
      toast.error('Failed to create quiz. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
        className="quiz-create-page"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="page-header" variants={itemVariants}>
          <h1>
            <i className="fas fa-plus-circle"></i>
            Create New Quiz
          </h1>
        </motion.div>

        <motion.div className="quiz-form-container" variants={itemVariants}>
          {/* Basic Quiz Information */}
          <div className="form-section">
            <h2>Quiz Details</h2>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="title">Quiz Title *</label>
                <input
                  type="text"
                  id="title"
                  value={quizData.title}
                  onChange={(e) => handleQuizDataChange('title', e.target.value)}
                  className="form-input"
                  placeholder="Enter quiz title"
                  maxLength="100"
                />
              </div>

              <div className="form-group">
                <label htmlFor="difficulty">Difficulty</label>
                <select
                  id="difficulty"
                  value={quizData.difficulty}
                  onChange={(e) => handleQuizDataChange('difficulty', e.target.value)}
                  className="form-select"
                >
                  {difficulties.map(diff => (
                    <option key={diff} value={diff}>{diff}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="timeLimit">Time Limit (minutes)</label>
                <input
                  type="number"
                  id="timeLimit"
                  value={quizData.timeLimit}
                  onChange={(e) => handleQuizDataChange('timeLimit', parseInt(e.target.value) || 0)}
                  className="form-input"
                  min="1"
                  max="180"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={quizData.description}
                onChange={(e) => handleQuizDataChange('description', e.target.value)}
                className="form-textarea"
                placeholder="Describe what this quiz covers..."
                rows="3"
                maxLength="500"
              />
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={quizData.isActive}
                  onChange={(e) => handleQuizDataChange('isActive', e.target.checked)}
                />
                <span className="checkmark"></span>
                Make quiz active immediately
              </label>
            </div>
          </div>

          {/* Questions Section */}
          <div className="form-section">
            <div className="section-header">
              <h2>Questions ({quizData.questions.length})</h2>
              <button
                type="button"
                onClick={() => setShowQuestionForm(true)}
                className="btn btn-primary"
              >
                <i className="fas fa-plus"></i>
                Add Question
              </button>
            </div>

            {/* Question List */}
            {quizData.questions.length > 0 && (
              <div className="questions-list">
                {quizData.questions.map((question, index) => (
                  <div key={question.id} className="question-item">
                    <div className="question-header">
                      <span className="question-number">Q{index + 1}</span>
                      <span className="question-type">{question.type.replace('_', ' ')}</span>
                      <span className="question-points">{question.points} pts</span>
                      <button
                        type="button"
                        onClick={() => removeQuestion(index)}
                        className="btn-remove"
                        title="Remove question"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                    <div className="question-content">
                      <p className="question-text">{question.questionText}</p>
                      {question.type === 'MULTIPLE_CHOICE' && (
                        <div className="options-list">
                          {question.options.map((option, optIndex) => (
                            <div
                              key={optIndex}
                              className={`option-item ${option === question.correctAnswer ? 'correct' : ''}`}
                            >
                              {option === question.correctAnswer && <i className="fas fa-check"></i>}
                              {option}
                            </div>
                          ))}
                        </div>
                      )}
                      {question.type === 'TRUE_FALSE' && (
                        <div className="correct-answer">
                          Correct Answer: <span className="answer">{question.correctAnswer}</span>
                        </div>
                      )}
                      {question.explanation && (
                        <div className="explanation">
                          <strong>Explanation:</strong> {question.explanation}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Question Form Modal */}
            {showQuestionForm && (
              <div className="modal-overlay">
                <div className="question-form-modal">
                  <div className="modal-header">
                    <h3>Add Question</h3>
                    <button
                      type="button"
                      onClick={() => setShowQuestionForm(false)}
                      className="btn-close"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>

                  <div className="modal-content">
                    <div className="form-group">
                      <label htmlFor="questionText">Question Text *</label>
                      <textarea
                        id="questionText"
                        value={currentQuestion.questionText}
                        onChange={(e) => handleQuestionChange('questionText', e.target.value)}
                        className="form-textarea"
                        placeholder="Enter your question..."
                        rows="3"
                        maxLength="500"
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="questionType">Question Type</label>
                        <select
                          id="questionType"
                          value={currentQuestion.type}
                          onChange={(e) => handleQuestionChange('type', e.target.value)}
                          className="form-select"
                        >
                          {questionTypes.map(type => (
                            <option key={type.value} value={type.value}>
                              {type.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <label htmlFor="points">Points</label>
                        <input
                          type="number"
                          id="points"
                          value={currentQuestion.points}
                          onChange={(e) => handleQuestionChange('points', parseInt(e.target.value) || 1)}
                          className="form-input"
                          min="1"
                          max="10"
                        />
                      </div>
                    </div>

                    {/* Multiple Choice Options */}
                    {currentQuestion.type === 'MULTIPLE_CHOICE' && (
                      <div className="options-section">
                        <label>Answer Options</label>
                        {currentQuestion.options.map((option, index) => (
                          <div key={index} className="option-input-group">
                            <input
                              type="text"
                              value={option}
                              onChange={(e) => handleOptionChange(index, e.target.value)}
                              className="form-input"
                              placeholder={`Option ${index + 1}`}
                              maxLength="200"
                            />
                            <label className="radio-label">
                              <input
                                type="radio"
                                name="correctAnswer"
                                value={option}
                                checked={currentQuestion.correctAnswer === option}
                                onChange={(e) => handleQuestionChange('correctAnswer', e.target.value)}
                              />
                              <span className="radio-mark"></span>
                              Correct
                            </label>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* True/False Options */}
                    {currentQuestion.type === 'TRUE_FALSE' && (
                      <div className="form-group">
                        <label>Correct Answer</label>
                        <div className="radio-group">
                          <label className="radio-label">
                            <input
                              type="radio"
                              name="tfAnswer"
                              value="True"
                              checked={currentQuestion.correctAnswer === 'True'}
                              onChange={(e) => handleQuestionChange('correctAnswer', e.target.value)}
                            />
                            <span className="radio-mark"></span>
                            True
                          </label>
                          <label className="radio-label">
                            <input
                              type="radio"
                              name="tfAnswer"
                              value="False"
                              checked={currentQuestion.correctAnswer === 'False'}
                              onChange={(e) => handleQuestionChange('correctAnswer', e.target.value)}
                            />
                            <span className="radio-mark"></span>
                            False
                          </label>
                        </div>
                      </div>
                    )}

                    {/* Short Answer */}
                    {currentQuestion.type === 'SHORT_ANSWER' && (
                      <div className="form-group">
                        <label htmlFor="shortAnswer">Sample Answer</label>
                        <input
                          type="text"
                          id="shortAnswer"
                          value={currentQuestion.correctAnswer}
                          onChange={(e) => handleQuestionChange('correctAnswer', e.target.value)}
                          className="form-input"
                          placeholder="Enter a sample correct answer..."
                          maxLength="200"
                        />
                        <small>This will help with grading. Students' answers will be reviewed manually.</small>
                      </div>
                    )}

                    <div className="form-group">
                      <label htmlFor="explanation">Explanation (Optional)</label>
                      <textarea
                        id="explanation"
                        value={currentQuestion.explanation}
                        onChange={(e) => handleQuestionChange('explanation', e.target.value)}
                        className="form-textarea"
                        placeholder="Explain why this is the correct answer..."
                        rows="2"
                        maxLength="300"
                      />
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      onClick={() => setShowQuestionForm(false)}
                      className="btn btn-secondary"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={addQuestion}
                      className="btn btn-primary"
                    >
                      Add Question
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={saveQuiz}
              disabled={loading || quizData.questions.length === 0}
              className="btn btn-primary btn-large"
            >
              {loading ? (
                <>
                  <div className="spinner small"></div>
                  Creating Quiz...
                </>
              ) : (
                <>
                  <i className="fas fa-save"></i>
                  Create Quiz
                </>
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

export default QuizCreate;
