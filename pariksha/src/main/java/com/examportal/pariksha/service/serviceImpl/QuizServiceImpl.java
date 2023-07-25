package com.examportal.pariksha.service.serviceImpl;

import com.examportal.pariksha.models.QuestionOptions;
import com.examportal.pariksha.models.Questions;
import com.examportal.pariksha.models.Quiz;
import com.examportal.pariksha.models.User;
import com.examportal.pariksha.repo.QuestionOptionsRepository;
import com.examportal.pariksha.repo.QuestionsRepository;
import com.examportal.pariksha.repo.QuizRepository;
import com.examportal.pariksha.security.payload.response.MessageResponse;
import com.examportal.pariksha.service.QuizService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class QuizServiceImpl implements QuizService {

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private QuestionsRepository questionsRepository;

    @Autowired
    private QuestionOptionsRepository questionOptionsRepository;

    @Override
    @Transactional
    public ResponseEntity<?> saveQuiz(Quiz quiz) {

        try {
            User user = new User(); user.setId(1);
            quiz.setCreatedBy(user);

            this.quizRepository.save(quiz);

            for(Questions question : quiz.getQuestions()) {
                question.setQuiz(quiz);
                this.questionsRepository.save(question);

                for(QuestionOptions options : question.getQuestionOptionsList()) {
                    options.setQuestion(question);
                    this.questionOptionsRepository.save(options);
                }

            }
            return new ResponseEntity<>(quiz,    HttpStatusCode.valueOf(200));
        }
        catch (Exception e){
            return new ResponseEntity<>(new MessageResponse("Some error occurred!"), HttpStatusCode.valueOf(400));
        }

    }

    @Override
    public ResponseEntity<?> getQuizById(int quizid) {
        if(quizid < 1) {
            return new ResponseEntity<>(new MessageResponse("Invalid Request!"), HttpStatusCode.valueOf(400));
        }
        Optional<Quiz> quiz = quizRepository.findById(quizid);

        return new ResponseEntity<>(quiz.get(), HttpStatusCode.valueOf(200));
    }
}
