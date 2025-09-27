package com.app.questionbank.service;

import com.app.questionbank.dto.GeminiRequest;
import com.app.questionbank.dto.GeminiResponse;
import com.app.questionbank.dto.QuizGenerationRequest;
import com.app.questionbank.entity.Question;
import com.app.questionbank.entity.Quiz;
import com.app.questionbank.repository.QuestionRepository;
import com.app.questionbank.repository.QuizRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class GeminiAiService {

    private final WebClient.Builder webClientBuilder;
    private final QuizRepository quizRepository;
    private final QuestionRepository questionRepository;
    private final ObjectMapper objectMapper;

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

    public Quiz generateQuizWithGemini(QuizGenerationRequest request) {
        try {
            log.info("Generating quiz with Gemini AI for topic: {}", request.getTopic());
            
            // Create prompt for Gemini AI
            String prompt = createQuizPrompt(request);
            
            // Call Gemini AI API
            String aiResponse = callGeminiApi(prompt);
            
            // Parse AI response and create quiz
            Quiz quiz = parseAiResponseToQuiz(aiResponse, request);
            
            // Save quiz and questions to database
            Quiz savedQuiz = quizRepository.save(quiz);
            
            // Save questions
            if (quiz.getQuestions() != null) {
                for (Question question : quiz.getQuestions()) {
                    question.setQuiz(savedQuiz);
                    questionRepository.save(question);
                }
            }
            
            log.info("Successfully generated quiz with {} questions", 
                quiz.getQuestions() != null ? quiz.getQuestions().size() : 0);
            return savedQuiz;
            
        } catch (Exception e) {
            log.error("Error generating quiz with Gemini AI: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to generate quiz: " + e.getMessage());
        }
    }

    private String createQuizPrompt(QuizGenerationRequest request) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("Generate a quiz with the following specifications:\n");
        prompt.append("Topic: ").append(request.getTopic()).append("\n");
        prompt.append("Difficulty: ").append(request.getDifficulty()).append("\n");
        prompt.append("Number of questions: ").append(request.getQuestionCount()).append("\n");
        prompt.append("Question type: ").append(request.getQuestionType()).append("\n\n");
        
        prompt.append("Please return the response in the following JSON format:\n");
        prompt.append("{\n");
        prompt.append("  \"title\": \"Quiz Title\",\n");
        prompt.append("  \"description\": \"Quiz Description\",\n");
        prompt.append("  \"questions\": [\n");
        prompt.append("    {\n");
        prompt.append("      \"questionText\": \"Question text here\",\n");
        prompt.append("      \"options\": [\"Option A\", \"Option B\", \"Option C\", \"Option D\"],\n");
        prompt.append("      \"correctAnswer\": \"Correct option text\",\n");
        prompt.append("      \"explanation\": \"Explanation for the correct answer\",\n");
        prompt.append("      \"marks\": 1\n");
        prompt.append("    }\n");
        prompt.append("  ]\n");
        prompt.append("}\n\n");
        
        prompt.append("Additional requirements:\n");
        prompt.append("- Make questions engaging and educational\n");
        prompt.append("- Ensure options are plausible but only one is correct\n");
        prompt.append("- Provide clear explanations for correct answers\n");
        prompt.append("- Use appropriate difficulty level\n");
        
        return prompt.toString();
    }

    private String callGeminiApi(String prompt) {
        try {
            WebClient webClient = webClientBuilder.build();
            
            // Create request body for Gemini API
            GeminiRequest request = GeminiRequest.builder()
                .contents(List.of(
                    GeminiRequest.Content.builder()
                        .parts(List.of(
                            GeminiRequest.Part.builder()
                                .text(prompt)
                                .build()
                        ))
                        .build()
                ))
                .build();

            // Make API call
            Mono<GeminiResponse> responseMono = webClient
                .post()
                .uri(apiUrl + "?key=" + apiKey)
                .header("Content-Type", "application/json")
                .bodyValue(request)
                .retrieve()
                .bodyToMono(GeminiResponse.class);

            GeminiResponse response = responseMono.block();
            
            if (response != null && response.getCandidates() != null && !response.getCandidates().isEmpty()) {
                return response.getCandidates().get(0).getContent().getParts().get(0).getText();
            } else {
                throw new RuntimeException("No response from Gemini AI");
            }
            
        } catch (Exception e) {
            log.error("Error calling Gemini API: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to call Gemini API: " + e.getMessage());
        }
    }

    private Quiz parseAiResponseToQuiz(String aiResponse, QuizGenerationRequest request) {
        try {
            // Clean the response - remove markdown code blocks if present
            String cleanResponse = aiResponse.replaceAll("```json\\n?", "").replaceAll("```\\n?", "").trim();
            
            // Parse JSON response
            JsonNode jsonNode = objectMapper.readTree(cleanResponse);
            
            // Create quiz entity
            Quiz quiz = new Quiz();
            quiz.setTitle(jsonNode.get("title").asText());
            quiz.setDescription(jsonNode.get("description").asText());
            quiz.setCategory(request.getTopic());
            quiz.setDifficulty(Quiz.Difficulty.valueOf(request.getDifficulty().toUpperCase()));
            quiz.setTimeLimit(request.getTimeLimit());
            quiz.setCreatedBy(request.getCreatedBy());
            quiz.setIsActive(true);
            quiz.setQuestions(new ArrayList<>());
            
            // Parse questions
            JsonNode questionsNode = jsonNode.get("questions");
            if (questionsNode != null && questionsNode.isArray()) {
                quiz.setTotalQuestions(questionsNode.size());
                
                for (JsonNode questionNode : questionsNode) {
                    Question question = new Question();
                    question.setQuestionText(questionNode.get("questionText").asText());
                    question.setType(Question.QuestionType.valueOf(request.getQuestionType().toUpperCase()));
                    question.setDifficulty(Question.Difficulty.valueOf(request.getDifficulty().toUpperCase()));
                    question.setCategory(request.getTopic());
                    question.setCorrectAnswer(questionNode.get("correctAnswer").asText());
                    question.setExplanation(questionNode.get("explanation").asText());
                    question.setMarks(questionNode.has("marks") ? questionNode.get("marks").asInt(1) : 1);
                    
                    // Parse options
                    JsonNode optionsNode = questionNode.get("options");
                    if (optionsNode != null && optionsNode.isArray()) {
                        List<String> options = new ArrayList<>();
                        for (JsonNode optionNode : optionsNode) {
                            options.add(optionNode.asText());
                        }
                        question.setOptions(options);
                    }
                    
                    quiz.getQuestions().add(question);
                }
            }
            
            return quiz;
            
        } catch (Exception e) {
            log.error("Error parsing AI response: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to parse AI response: " + e.getMessage());
        }
    }

    public String generateQuestionExplanation(String questionText, String correctAnswer) {
        try {
            String prompt = String.format(
                "Provide a detailed explanation for why this is the correct answer:\n" +
                "Question: %s\n" +
                "Correct Answer: %s\n" +
                "Please provide a clear, educational explanation.",
                questionText, correctAnswer
            );
            
            return callGeminiApi(prompt);
            
        } catch (Exception e) {
            log.error("Error generating explanation: {}", e.getMessage(), e);
            return "Explanation not available at this time.";
        }
    }
}