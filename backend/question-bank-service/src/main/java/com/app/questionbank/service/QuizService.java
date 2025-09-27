package com.app.questionbank.service;

import com.app.questionbank.entity.Quiz;
import com.app.questionbank.repository.QuizRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class QuizService {

    private final QuizRepository quizRepository;

    public Quiz createQuiz(Quiz quiz) {
        log.info("Creating new quiz: {}", quiz.getTitle());
        quiz.setCreatedAt(LocalDateTime.now());
        return quizRepository.save(quiz);
    }

    public Page<Quiz> getAllQuizzes(Pageable pageable) {
        log.debug("Fetching all quizzes with pagination");
        return quizRepository.findAll(pageable);
    }

    public Quiz getQuizById(Long id) {
        log.debug("Fetching quiz by ID: {}", id);
        return quizRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Quiz not found with id: " + id));
    }

    public List<Quiz> getQuizzesByTopic(String topic) {
        log.debug("Fetching quizzes by topic: {}", topic);
        return quizRepository.findByCategoryContainingIgnoreCase(topic);
    }

    public List<Quiz> getQuizzesByDifficulty(String difficulty) {
        log.debug("Fetching quizzes by difficulty: {}", difficulty);
        try {
            Quiz.Difficulty diff = Quiz.Difficulty.valueOf(difficulty.toUpperCase());
            return quizRepository.findByDifficulty(diff);
        } catch (IllegalArgumentException e) {
            log.error("Invalid difficulty level: {}", difficulty);
            throw new RuntimeException("Invalid difficulty level: " + difficulty);
        }
    }

    public List<Quiz> getQuizzesByCreatedBy(Long userId) {
        log.debug("Fetching quizzes created by user ID: {}", userId);
        return quizRepository.findByCreatedBy(userId);
    }

    public Quiz updateQuiz(Long id, Quiz updatedQuiz) {
        log.info("Updating quiz with ID: {}", id);
        
        Quiz existingQuiz = getQuizById(id);
        
        existingQuiz.setTitle(updatedQuiz.getTitle());
        existingQuiz.setDescription(updatedQuiz.getDescription());
        existingQuiz.setCategory(updatedQuiz.getCategory());
        existingQuiz.setDifficulty(updatedQuiz.getDifficulty());
        existingQuiz.setTimeLimit(updatedQuiz.getTimeLimit());
        existingQuiz.setUpdatedAt(LocalDateTime.now());
        
        return quizRepository.save(existingQuiz);
    }

    public void deleteQuiz(Long id) {
        log.info("Deleting quiz with ID: {}", id);
        Quiz quiz = getQuizById(id);
        quizRepository.delete(quiz);
    }

    public List<Quiz> searchQuizzes(String keyword) {
        log.debug("Searching quizzes with keyword: {}", keyword);
        return quizRepository.findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(keyword, keyword);
    }

    public Map<String, Object> getQuizStatistics(Long quizId) {
        log.debug("Getting statistics for quiz ID: {}", quizId);
        
        Quiz quiz = getQuizById(quizId);
        Map<String, Object> stats = new HashMap<>();
        
        stats.put("quizId", quiz.getId());
        stats.put("title", quiz.getTitle());
        stats.put("questionCount", quiz.getQuestions() != null ? quiz.getQuestions().size() : 0);
        stats.put("createdAt", quiz.getCreatedAt());
        stats.put("difficulty", quiz.getDifficulty());
        stats.put("category", quiz.getCategory());
        stats.put("timeLimit", quiz.getTimeLimit());
        
        // Add more statistics as needed
        // stats.put("totalAttempts", resultRepository.countByQuizId(quizId));
        // stats.put("averageScore", resultRepository.getAverageScoreByQuizId(quizId));
        
        return stats;
    }

    public boolean existsById(Long quizId) {
        return quizRepository.existsById(quizId);
    }
}