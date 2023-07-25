package com.examportal.pariksha.repo;

import com.examportal.pariksha.models.Questions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionsRepository extends JpaRepository<Questions, Integer> {
    List<Questions> findByQuizId (int quizId);

}
