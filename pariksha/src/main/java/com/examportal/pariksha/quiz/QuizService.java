package com.examportal.pariksha.quiz;

import com.examportal.pariksha.quiz.Quiz;
import com.examportal.pariksha.quiz.dto.QuizListDTO;
import org.springframework.http.ResponseEntity;

public interface QuizService {

    ResponseEntity<?> saveQuiz(Quiz quiz, String username);

    ResponseEntity<?> getQuizById(int quizid);

    ResponseEntity<?> publishUnpublish(int quizid);

    ResponseEntity<?> getAllQuizForCategory(int category);

    ResponseEntity<?> updateBasicQuizDetails(QuizListDTO quizListDTO);
}
