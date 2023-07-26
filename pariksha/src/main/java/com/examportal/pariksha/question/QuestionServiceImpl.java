package com.examportal.pariksha.question;

import com.examportal.pariksha.question.QuestionsRepository;
import com.examportal.pariksha.security.payload.response.MessageResponse;
import com.examportal.pariksha.question.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

@Service
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    private QuestionsRepository questionsRepository;

    @Override
    public ResponseEntity<?> getAllQuestionsOfQuiz(@RequestParam  int quizId) {
        if(quizId < 1){
            return new ResponseEntity<>(new MessageResponse("Invalid Request!"), HttpStatusCode.valueOf(400));
        }

        return  new ResponseEntity<>(questionsRepository.findByQuizId(quizId), HttpStatusCode.valueOf(200));
    }
}
