package com.examportal.pariksha.question;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/question")
@CrossOrigin(origins = "*", maxAge = 3600)
public class QuestionsController {

    @Autowired
    QuestionService questionService;

    @GetMapping("")
    public ResponseEntity<?> getAllQuestionsOfQuiz (@RequestParam int quizId) {
        return questionService.getAllQuestionsOfQuiz(quizId);
    }

    @GetMapping("{questionId}")
    public ResponseEntity<?> getQuestionById (@PathVariable("questionId") int questionId) {
        return questionService.getQuestionById(questionId);
    }

    @PostMapping()
    public ResponseEntity<?> upsertQuestion (@Valid @RequestBody Questions questions, @RequestParam int quizId) {
        return questionService.upsertQuestion(questions, quizId);
    }

    @DeleteMapping()
    public ResponseEntity<?> deleteQuestion(@RequestParam int questionId) {
        return questionService.deleteQuestion(questionId);
    }
}
