package com.examportal.pariksha.questionOptions;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/questionoption")
public class QuestionOptionsController {

    @Autowired
    private QuestionOptionService questionOptionService;

    @GetMapping("")
    public ResponseEntity<?> getAllOptionsOfQuestion (@RequestParam int questionId) {
        return questionOptionService.getAllOptionsOfQuestion(questionId);
    }
}
