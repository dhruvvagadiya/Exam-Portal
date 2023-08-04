package com.examportal.pariksha.question;

import com.examportal.pariksha.questionOptions.QuestionOptions;
import com.examportal.pariksha.questionOptions.QuestionOptionsRepository;
import com.examportal.pariksha.quiz.Quiz;
import com.examportal.pariksha.quiz.QuizRepository;
import com.examportal.pariksha.security.payload.response.MessageResponse;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    private QuestionsRepository questionsRepository;

    @Autowired
    private QuestionOptionsRepository questionOptionsRepository;

    @Autowired
    private QuizRepository quizRepository;

    @Override
    public ResponseEntity<?> getAllQuestionsOfQuiz(@RequestParam  int quizId) {
        if(!quizRepository.existsById(quizId)){
            return new ResponseEntity<>(new MessageResponse("Invalid Request!"), HttpStatusCode.valueOf(400));
        }

        return  new ResponseEntity<>(questionsRepository.findByQuizId(quizId), HttpStatusCode.valueOf(200));
    }

    @Override
    public ResponseEntity<?> getQuestionById(int questionId) {
        if(!questionsRepository.existsById(questionId)) {
            return new ResponseEntity<>(new MessageResponse("Invalid Request!"), HttpStatusCode.valueOf(400));
        }

        return new ResponseEntity<>(questionsRepository.findById(questionId).get(), HttpStatusCode.valueOf(200));
    }

    @Override
    @Transactional
    public ResponseEntity<?> upsertQuestion(Questions questions, int quizId) {
        //create question
        if(questions.hasAnswer() && quizRepository.existsById(quizId)) {
            if(questions.getId() == 0) {

                Quiz tmp = new Quiz();
                tmp.setId(quizId);

                questions.setQuiz(tmp);
                questions = questionsRepository.save(questions);

                for(QuestionOptions options : questions.getQuestionOptionsList()) {
                    options.setQuestion(questions);
                    questionOptionsRepository.save(options);
                }

                return new ResponseEntity<>(questions, HttpStatusCode.valueOf(200));
            }
            //update question
            else if(questionsRepository.existsById(questions.getId())) {

                Questions question1 = questionsRepository.findById(questions.getId()).get();

                List<QuestionOptions> options = question1.getQuestionOptionsList();

                HashMap<Integer, QuestionOptions> map = new HashMap<>();
                List<QuestionOptions> add = new ArrayList<>();

                questions.getQuestionOptionsList().forEach(e -> {
                    if(e.getId() != 0) map.put(e.getId(), e);
                    else {
                        add.add(e);
                    }
                });

                for(int i=options.size()-1; i>=0; i--) {
                    if(map.containsKey(options.get(i).getId())) {
                        options.get(i).updateOption(map.get(options.    get(i).getId()));
                    }
                    else {
                        options.remove(i);
                    }
                }

                for(QuestionOptions op : add) {
                    op.setQuestion(question1);
                    question1.addOption(op);
                }

                question1.setTitle(questions.getTitle());

                questionsRepository.save(question1);

                return new ResponseEntity<>(question1, HttpStatusCode.valueOf(200));
            }
            else {
                return new ResponseEntity<>(new MessageResponse("Invalid Request!"), HttpStatusCode.valueOf(400));
            }
        }
        else {
            return new ResponseEntity<>(new MessageResponse("Please select answer for the question"), HttpStatusCode.valueOf(400));
        }
    }

    @Override
    public ResponseEntity<?> deleteQuestion(int questionId) {
        if(questionsRepository.existsById(questionId)) {

            questionsRepository.deleteById(questionId);
            return new ResponseEntity<>(new MessageResponse("Success!"), HttpStatusCode.valueOf(200));

        }
        return new ResponseEntity<>(new MessageResponse("Invalid Request!"), HttpStatusCode.valueOf(400));
    }
}
