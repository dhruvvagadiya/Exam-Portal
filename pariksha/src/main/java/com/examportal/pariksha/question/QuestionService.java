package com.examportal.pariksha.question;

import org.springframework.http.ResponseEntity;

public interface QuestionService {

    ResponseEntity<?> getAllQuestionsOfQuiz(int quizId);
}
