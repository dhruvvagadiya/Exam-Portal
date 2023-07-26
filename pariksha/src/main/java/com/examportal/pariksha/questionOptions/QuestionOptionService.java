package com.examportal.pariksha.questionOptions;

import org.springframework.http.ResponseEntity;

public interface QuestionOptionService {

    ResponseEntity<?> getAllOptionsOfQuestion(int questionId);
}
