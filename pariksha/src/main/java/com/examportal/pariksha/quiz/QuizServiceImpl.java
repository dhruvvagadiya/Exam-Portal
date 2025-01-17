package com.examportal.pariksha.quiz;

import com.examportal.pariksha.questionOptions.QuestionOptions;
import com.examportal.pariksha.question.Questions;
import com.examportal.pariksha.user.User;
import com.examportal.pariksha.questionOptions.QuestionOptionsRepository;
import com.examportal.pariksha.question.QuestionsRepository;
import com.examportal.pariksha.user.UserRepository;
import com.examportal.pariksha.security.payload.response.MessageResponse;
import com.examportal.pariksha.quiz.dto.QuizListDTO;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class QuizServiceImpl implements QuizService {

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private QuestionsRepository questionsRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private QuestionOptionsRepository questionOptionsRepository;

    @Override
    public ResponseEntity<?> getAllQuizForCategory(int category) {
        List<QuizListDTO> list = new ArrayList<>();
        if(category == 0) {
            list = quizRepository.getAllQuizForCategory();
        }
        else {
            list = quizRepository.getAllQuizForCategory(category);
        }
        return new ResponseEntity<>(list, HttpStatusCode.valueOf(200));
    }

    @Override
    public ResponseEntity<?> updateBasicQuizDetails(QuizListDTO quizListDTO) {
        Optional<Quiz> optionalQuiz = quizRepository.searchById(quizListDTO.getId());
        if(optionalQuiz.isPresent()) {
            Quiz quiz = optionalQuiz.get();

            quiz.setTitle(quizListDTO.getTitle());
            quiz.setCategory(quizListDTO.getCategory());
            quiz.setDescription(quizListDTO.getDescription());
            quiz.setMarksPerQuestion(quizListDTO.getMarksPerQuestion());
            quiz.setUpdatedAt(new Date());

            quizListDTO.setCategory(quiz.getCategory());

            quizRepository.save(quiz);

            return new ResponseEntity<>(quizListDTO,
                    HttpStatusCode.valueOf(200));
        }
        return new ResponseEntity<>(new MessageResponse("Invalid Request!"), HttpStatusCode.valueOf(400));
    }

    @Override
    @Transactional
    public ResponseEntity<?> saveQuiz(Quiz quiz, String username) {

        try {

            User user = userRepository.findByUsername(username).get();
            quiz.setCreatedBy(user);
            quiz.setIsActive(0);

            this.quizRepository.save(quiz);

            if(quiz.getQuestions() != null) {
                for(Questions question : quiz.getQuestions()) {
                    question.setQuiz(quiz);
                    this.questionsRepository.save(question);
                    
                    for(QuestionOptions options : question.getQuestionOptionsList()) {
                        options.setQuestion(question);
                        this.questionOptionsRepository.save(options);
                    }

                }
            }

            return new ResponseEntity<>(quiz, HttpStatusCode.valueOf(200));
        }
        catch (Exception e){
            System.out.println(e.getMessage());
            return new ResponseEntity<>(new MessageResponse("Some error occurred!"), HttpStatusCode.valueOf(400));
        }

    }

    @Override
    public ResponseEntity<?> getQuizById(int quizid) {
        if(quizid < 1) {
            return new ResponseEntity<>(new MessageResponse("Invalid Request!"), HttpStatusCode.valueOf(400));
        }
        Optional<Quiz> quiz = quizRepository.findById(quizid);

        if(quiz.isPresent()) {
            return new ResponseEntity<>(quiz.get(), HttpStatusCode.valueOf(200));
        }

        return new ResponseEntity<>(new MessageResponse("Invalid Request!"), HttpStatusCode.valueOf(400));
    }

    @Override
    public ResponseEntity<?> publishUnpublish(int quizid) {
        if(quizRepository.existsById(quizid)) {
            Quiz quiz = quizRepository.searchById(quizid).get();

            if(quiz.getIsActive() == 0 && !quiz.hasValidQuestions()) {
                return new ResponseEntity<>(new MessageResponse("Please add minimum 5 questions in the quiz!"), HttpStatusCode.valueOf(400));
            }

            quiz.toggleActive();
            quizRepository.save(quiz);
            return new ResponseEntity<>(true, HttpStatusCode.valueOf(200));
        }
        else {
            return new ResponseEntity<>(new MessageResponse("Invalid Request!"), HttpStatusCode.valueOf(400));
        }
    }
}
