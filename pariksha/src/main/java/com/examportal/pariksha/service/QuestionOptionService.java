package com.examportal.pariksha.service;

import org.springframework.http.ResponseEntity;

public interface QuestionOptionService {

    ResponseEntity<?> getAllOptionsOfQuestion(int questionId);
}
