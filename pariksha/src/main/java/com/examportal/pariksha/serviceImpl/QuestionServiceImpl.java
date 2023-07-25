package com.examportal.pariksha.serviceImpl;

import com.examportal.pariksha.repo.QuestionsRepository;
import com.examportal.pariksha.security.payload.response.MessageResponse;
import com.examportal.pariksha.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    private QuestionsRepository questionsRepository;

    @Override
    public ResponseEntity<?> getAllQuestionsOfQuiz(int quizId) {
        if(quizId < 1){
            return new ResponseEntity<>(new MessageResponse("Invalid Request!"), HttpStatusCode.valueOf(400));
        }

        return  new ResponseEntity<>(questionsRepository.findByQuizId(quizId), HttpStatusCode.valueOf(200));
    }
}
