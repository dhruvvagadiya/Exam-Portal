package com.examportal.pariksha.service;

import org.springframework.http.ResponseEntity;

public interface QuestionService {

    ResponseEntity<?> getAllQuestionsOfQuiz(int quizId);
}
