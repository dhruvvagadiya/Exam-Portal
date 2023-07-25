package com.examportal.pariksha.controller;

import com.examportal.pariksha.models.Quiz;
import com.examportal.pariksha.service.QuizService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/quiz")
public class QuizController {

    @Autowired
    private QuizService quizService;

    @PostMapping
    public ResponseEntity<?> createQuiz (@RequestBody @Valid Quiz quiz) {
        return quizService.saveQuiz(quiz);
    }

    @GetMapping
    public ResponseEntity<?> getQuizById (@RequestParam int quizid) {
        return quizService.getQuizById(quizid);
    }
}
