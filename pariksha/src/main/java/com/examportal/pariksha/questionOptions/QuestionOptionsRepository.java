package com.examportal.pariksha.questionOptions;

import com.examportal.pariksha.questionOptions.QuestionOptions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionOptionsRepository extends JpaRepository<QuestionOptions, Integer> {
    List<QuestionOptions> findByQuestionId(int questionId);
}
