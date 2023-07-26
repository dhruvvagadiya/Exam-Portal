package com.examportal.pariksha.repo;

import com.examportal.pariksha.models.Quiz;
import com.examportal.pariksha.viewmodels.quiz.QuizList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Integer> {

    Boolean existsById(int id);

    @Query(value = "SELECT * from quiz q where q.id = ?1", nativeQuery = true)
    Quiz searchById(int id);


    @Query(value = "select q.id, q.title, (select count(*) from questions que where que.quiz_id = q.id) as numberOfQuestions, description from quiz q", nativeQuery = true)
    List<QuizList> getAllQuizForCategory();

//    List<QuizList> getAllQuizForCategory(int category);
}
