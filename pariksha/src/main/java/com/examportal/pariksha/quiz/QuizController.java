package com.examportal.pariksha.quiz;

import com.examportal.pariksha.quiz.dto.QuizListDTO;
import com.examportal.pariksha.security.jwt.JwtUtils;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/quiz")
public class QuizController {

    @Autowired
    private QuizService quizService;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping
    public ResponseEntity<?> createQuiz (@RequestBody @Valid Quiz quiz, @RequestHeader String authorization) {
        String username = jwtUtils.getUserNameFromJwtToken(authorization.split(" ")[1]);
        return quizService.saveQuiz(quiz, username);
    }

    @PostMapping("update")
    public ResponseEntity<?> updateBasicQuizDetails(@RequestBody @Valid QuizListDTO quizListDTO) {return quizService.updateBasicQuizDetails(quizListDTO);}

    @GetMapping("getByCategory")
    public ResponseEntity<?> getAllQuizList(@RequestParam int category) { return quizService.getAllQuizForCategory(category); }

    @GetMapping
    public ResponseEntity<?> getQuizById (@RequestParam int quizid) {
        return quizService.getQuizById(quizid);
    }

    @PostMapping("toggleStatus")
    public ResponseEntity<?> publishUnpublish (@RequestParam int quizId) {
        return this.quizService.publishUnpublish(quizId);
    }
}
