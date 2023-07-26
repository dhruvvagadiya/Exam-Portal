package com.examportal.pariksha.question;

import com.examportal.pariksha.question.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/question")
public class QuestionsController {

    @Autowired
    QuestionService questionService;

    @GetMapping("")
    public ResponseEntity<?> getAllQuestionsOfQuiz (@RequestParam int quizId) {
        return questionService.getAllQuestionsOfQuiz(quizId);
    }
}
