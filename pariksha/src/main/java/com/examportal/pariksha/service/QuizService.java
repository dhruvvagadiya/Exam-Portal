package com.examportal.pariksha.service;

import com.examportal.pariksha.models.Quiz;
import org.springframework.http.ResponseEntity;

public interface QuizService {

    ResponseEntity<?> saveQuiz(Quiz quiz, String username);

    ResponseEntity<?> getQuizById(int quizid);

    ResponseEntity<?> publishUnpublish(int quizid);

    ResponseEntity<?> getAllQuizForCategory(int category);
}
