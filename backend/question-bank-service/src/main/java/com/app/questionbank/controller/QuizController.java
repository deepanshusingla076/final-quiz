package com.app.questionbank.controller;

import com.app.questionbank.dto.QuizGenerationRequest;
import com.app.questionbank.entity.Question;
import com.app.questionbank.entity.Quiz;
import com.app.questionbank.service.GeminiAiService;
import com.app.questionbank.service.QuestionService;
import com.app.questionbank.service.QuizService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/quizzes")
@RequiredArgsConstructor
@Validated
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
public class QuizController {

    private final QuizService quizService;
    private final QuestionService questionService;
    private final GeminiAiService geminiAiService;

    // Generate quiz using AI
    @PostMapping("/generate")
    public ResponseEntity<?> generateQuiz(@Valid @RequestBody QuizGenerationRequest request) {
        try {
            log.info("Generating AI quiz for topic: {}", request.getTopic());
            Quiz quiz = geminiAiService.generateQuizWithGemini(request);
            return ResponseEntity.ok(quiz);
        } catch (Exception e) {
            log.error("Error generating quiz: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Failed to generate quiz", "message", e.getMessage()));
        }
    }

    // Create manual quiz
    @PostMapping
    public ResponseEntity<Quiz> createQuiz(@Valid @RequestBody Quiz quiz) {
        log.info("Creating manual quiz: {}", quiz.getTitle());
        Quiz savedQuiz = quizService.createQuiz(quiz);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedQuiz);
    }

    // Get all quizzes with pagination
    @GetMapping
    public ResponseEntity<Page<Quiz>> getAllQuizzes(Pageable pageable) {
        Page<Quiz> quizzes = quizService.getAllQuizzes(pageable);
        return ResponseEntity.ok(quizzes);
    }

    // Get quiz by ID
    @GetMapping("/{id}")
    public ResponseEntity<Quiz> getQuizById(@PathVariable Long id) {
        Quiz quiz = quizService.getQuizById(id);
        return ResponseEntity.ok(quiz);
    }

    // Get quizzes by topic
    @GetMapping("/topic/{topic}")
    public ResponseEntity<List<Quiz>> getQuizzesByTopic(@PathVariable String topic) {
        List<Quiz> quizzes = quizService.getQuizzesByTopic(topic);
        return ResponseEntity.ok(quizzes);
    }

    // Get quizzes by difficulty
    @GetMapping("/difficulty/{difficulty}")
    public ResponseEntity<List<Quiz>> getQuizzesByDifficulty(@PathVariable String difficulty) {
        List<Quiz> quizzes = quizService.getQuizzesByDifficulty(difficulty);
        return ResponseEntity.ok(quizzes);
    }

    // Get quizzes created by user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Quiz>> getQuizzesByCreatedBy(@PathVariable Long userId) {
        List<Quiz> quizzes = quizService.getQuizzesByCreatedBy(userId);
        return ResponseEntity.ok(quizzes);
    }

    // Update quiz
    @PutMapping("/{id}")
    public ResponseEntity<Quiz> updateQuiz(@PathVariable Long id, @Valid @RequestBody Quiz quiz) {
        log.info("Updating quiz with ID: {}", id);
        Quiz updatedQuiz = quizService.updateQuiz(id, quiz);
        return ResponseEntity.ok(updatedQuiz);
    }

    // Delete quiz
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuiz(@PathVariable Long id) {
        log.info("Deleting quiz with ID: {}", id);
        quizService.deleteQuiz(id);
        return ResponseEntity.noContent().build();
    }

    // Get questions for a quiz
    @GetMapping("/{quizId}/questions")
    public ResponseEntity<List<Question>> getQuizQuestions(@PathVariable Long quizId) {
        List<Question> questions = questionService.getQuestionsByQuizId(quizId);
        return ResponseEntity.ok(questions);
    }

    // Add question to quiz
    @PostMapping("/{quizId}/questions")
    public ResponseEntity<Question> addQuestionToQuiz(@PathVariable Long quizId, 
                                                     @Valid @RequestBody Question question) {
        log.info("Adding question to quiz ID: {}", quizId);
        Question savedQuestion = questionService.addQuestionToQuiz(quizId, question);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedQuestion);
    }

    // Update question
    @PutMapping("/{quizId}/questions/{questionId}")
    public ResponseEntity<Question> updateQuestion(@PathVariable Long quizId,
                                                  @PathVariable Long questionId,
                                                  @Valid @RequestBody Question question) {
        log.info("Updating question ID: {} in quiz ID: {}", questionId, quizId);
        Question updatedQuestion = questionService.updateQuestion(questionId, question);
        return ResponseEntity.ok(updatedQuestion);
    }

    // Delete question
    @DeleteMapping("/{quizId}/questions/{questionId}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long quizId, @PathVariable Long questionId) {
        log.info("Deleting question ID: {} from quiz ID: {}", questionId, quizId);
        questionService.deleteQuestion(questionId);
        return ResponseEntity.noContent().build();
    }

    // Search quizzes
    @GetMapping("/search")
    public ResponseEntity<List<Quiz>> searchQuizzes(@RequestParam String keyword) {
        List<Quiz> quizzes = quizService.searchQuizzes(keyword);
        return ResponseEntity.ok(quizzes);
    }

    // Get quiz statistics
    @GetMapping("/{id}/stats")
    public ResponseEntity<Map<String, Object>> getQuizStats(@PathVariable Long id) {
        Map<String, Object> stats = quizService.getQuizStatistics(id);
        return ResponseEntity.ok(stats);
    }
}