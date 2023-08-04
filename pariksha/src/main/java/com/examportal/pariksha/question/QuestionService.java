package com.examportal.pariksha.question;

import org.springframework.http.ResponseEntity;

public interface QuestionService {

    ResponseEntity<?> getAllQuestionsOfQuiz(int quizId);

    ResponseEntity<?> getQuestionById (int questionId);

    ResponseEntity<?> upsertQuestion (Questions questions, int quizId);

    ResponseEntity<?> deleteQuestion (int questionId);

}
