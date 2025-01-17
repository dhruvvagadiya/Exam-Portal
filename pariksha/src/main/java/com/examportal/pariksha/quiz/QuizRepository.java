package com.examportal.pariksha.quiz;

import com.examportal.pariksha.quiz.dto.QuizListDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Integer> {

    Boolean existsById(int id);

    @Query(value = "SELECT * from quiz q where q.id = ?1", nativeQuery = true)
    Optional<Quiz> searchById(int id);

    @Query("SELECT new com.examportal.pariksha.quiz.dto.QuizListDTO(q.id, q.title, " +
            "(SELECT COUNT(qs) FROM Questions qs WHERE qs.quiz = q) AS numberOfQuestions, " +
            "q.description, q.marksPerQuestion, q.category, q.isActive) FROM Quiz q")
    List<QuizListDTO> getAllQuizForCategory();

    @Query("SELECT new com.examportal.pariksha.quiz.dto.QuizListDTO(q.id, q.title, " +
            "(SELECT COUNT(qs) FROM Questions qs WHERE qs.quiz = q) AS numberOfQuestions, " +
            "q.description, q.marksPerQuestion, q.category, q.isActive) FROM Quiz q WHERE q.category.id = ?1" +
            "ORDER BY createdAt")
    List<QuizListDTO> getAllQuizForCategory(int category);
}
