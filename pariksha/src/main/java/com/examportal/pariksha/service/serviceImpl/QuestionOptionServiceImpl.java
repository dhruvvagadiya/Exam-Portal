package com.examportal.pariksha.service.serviceImpl;

import com.examportal.pariksha.repo.QuestionOptionsRepository;
import com.examportal.pariksha.security.payload.response.MessageResponse;
import com.examportal.pariksha.service.QuestionOptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class QuestionOptionServiceImpl implements QuestionOptionService {

    @Autowired
    private QuestionOptionsRepository questionOptionsRepository;

    @Override
    public ResponseEntity<?> getAllOptionsOfQuestion(int questionId) {
        if(questionId < 1){
            return new ResponseEntity<>(new MessageResponse("Invalid Request!"), HttpStatusCode.valueOf(400));
        }

        return  new ResponseEntity<>(questionOptionsRepository.findByQuestionId(questionId), HttpStatusCode.valueOf(200));
    }
}
