package com.examportal.pariksha.service;

import com.examportal.pariksha.models.Quiz;
import org.springframework.http.ResponseEntity;

public interface QuizService {

    ResponseEntity<?> saveQuiz(Quiz quiz);

    ResponseEntity<?> getQuizById(int quizid);
}
