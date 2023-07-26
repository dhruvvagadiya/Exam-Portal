package com.examportal.pariksha.repo;

import com.examportal.pariksha.models.QuestionOptions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionOptionsRepository extends JpaRepository<QuestionOptions, Integer> {
    List<QuestionOptions> findByQuestionId(int questionId);
}
